import {
  ApplicationRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {
  ComponentContainer,
  GoldenLayout,
  LogicalZIndex,
  ResolvedComponentItemConfig,
} from 'golden-layout'
import { BaseComponentDirective } from '../base-component.directive'
import { GoldenLayoutComponentService } from '../../../services/golden-layout/golden-layout-component.service'
import { ImpairmentFormComponent } from '../../impairment-form/impairment-form.component'
import { NetworkMonitorComponent } from '../../network-monitor/network-monitor.component'
import { EnvironmentCardComponent } from '../../environment/environment-card/environment-card.component'
import { BearerCardComponent } from '../../bearer/bearer-card/bearer-card.component'
import { LiveGraphComponent } from '../../live-graph/live-graph.component'

// import { FormWizardComponent } from '../../form-wizard/form-wizard.component';
@Component({
  selector: 'app-golden-layout-host',
  template: '<ng-template #componentViewContainer></ng-template>',
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        padding: 0;
        position: relative;
      }
    `,
  ],
})
export class GoldenLayoutHostComponent implements OnDestroy {
  private _goldenLayout!: GoldenLayout
  private readonly _goldenLayoutElement: HTMLElement
  private _virtualActive = true
  private _viewContainerRefActive = false
  private readonly _componentRefMap = new Map<
    ComponentContainer,
    ComponentRef<BaseComponentDirective>
  >()
  private _goldenLayoutBoundingClientRect: DOMRect = new DOMRect()

  private readonly _goldenLayoutBindComponentEventListener = (
    container: ComponentContainer,
    itemConfig: ResolvedComponentItemConfig,
  ) => this.handleBindComponentEvent(container, itemConfig)
  private readonly _goldenLayoutUnbindComponentEventListener = (
    container: ComponentContainer,
  ) => this.handleUnbindComponentEvent(container)

  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true })
  private readonly _componentViewContainerRef!: ViewContainerRef

  get goldenLayout() {
    return this._goldenLayout
  }
  get virtualActive() {
    return this._virtualActive
  }
  get viewContainerRefActive() {
    return this._viewContainerRefActive
  }
  get isGoldenLayoutSubWindow() {
    return this._goldenLayout.isSubWindow
  }

  constructor(
    private readonly _appRef: ApplicationRef,
    private readonly _elRef: ElementRef<HTMLElement>,
    private readonly goldenLayoutComponentService: GoldenLayoutComponentService,
  ) {
    this._goldenLayoutElement = this._elRef.nativeElement
  }

  async load(): Promise<void> {
    this.goldenLayoutComponentService.registerComponentType(
      LiveGraphComponent.componentTypeName,
      LiveGraphComponent,
    )

    this.goldenLayoutComponentService.registerComponentType(
      EnvironmentCardComponent.componentTypeName,
      EnvironmentCardComponent,
    )
    this.goldenLayoutComponentService.registerComponentType(
      BearerCardComponent.componentTypeName,
      BearerCardComponent,
    )

    this.goldenLayoutComponentService.registerComponentType(
      NetworkMonitorComponent.componentTypeName,
      NetworkMonitorComponent,
    )

    this.goldenLayoutComponentService.registerComponentType(
      ImpairmentFormComponent.componentTypeName,
      ImpairmentFormComponent,
    )
  }

  ngOnDestroy() {
    this._goldenLayout.destroy()
  }

  initialise() {
    this._goldenLayout = new GoldenLayout(
      this._goldenLayoutElement,
      this._goldenLayoutBindComponentEventListener,
      this._goldenLayoutUnbindComponentEventListener,
    )
    this._goldenLayout.resizeWithContainerAutomatically = true
    this._goldenLayout.beforeVirtualRectingEvent = (count) =>
      this.handleBeforeVirtualRectingEvent(count)

    if (this._goldenLayout.isSubWindow) {
      this._goldenLayout.checkAddDefaultPopinButton()
    }
  }

  setVirtualActive(value: boolean) {
    this._goldenLayout.clear()
    this._virtualActive = value
    if (!this._virtualActive) {
      this._viewContainerRefActive = false
    }
  }

  setViewContainerRefActive(value: boolean) {
    this._goldenLayout.clear()
    if (value && !this.virtualActive) {
      throw new Error('ViewContainerRef active only possible if VirtualActive')
    }
    this._viewContainerRefActive = value
  }

  setSize(width: number, height: number) {
    this._goldenLayout.setSize(width, height)
  }

  getComponentRef(container: ComponentContainer) {
    return this._componentRefMap.get(container)
  }

  private handleBindComponentEvent(
    container: ComponentContainer,
    itemConfig: ResolvedComponentItemConfig,
  ): ComponentContainer.BindableComponent {
    const componentType = itemConfig.componentType
    const componentRef = this.goldenLayoutComponentService.createComponent(
      componentType,
      container,
    )
    const component = componentRef.instance

    this._componentRefMap.set(container, componentRef)

    if (this._virtualActive) {
      container.virtualRectingRequiredEvent = (container, width, height) =>
        this.handleContainerVirtualRectingRequiredEvent(
          container,
          width,
          height,
        )
      container.virtualVisibilityChangeRequiredEvent = (container, visible) =>
        this.handleContainerVisibilityChangeRequiredEvent(container, visible)
      container.virtualZIndexChangeRequiredEvent = (
        container,
        logicalZIndex,
        defaultZIndex,
      ) =>
        this.handleContainerVirtualZIndexChangeRequiredEvent(
          container,
          logicalZIndex,
          defaultZIndex,
        )

      if (this._viewContainerRefActive) {
        this._componentViewContainerRef.insert(componentRef.hostView)
      } else {
        this._appRef.attachView(componentRef.hostView)
        const componentRootElement = component.rootHtmlElement
        this._goldenLayoutElement.appendChild(componentRootElement)
      }
    } else {
      this._appRef.attachView(componentRef.hostView)
      const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>)
        .rootNodes[0] as HTMLElement
      container.element.appendChild(domElem)
    }

    return {
      component,
      virtual: this._virtualActive,
    }
  }

  private handleUnbindComponentEvent(container: ComponentContainer) {
    const componentRef = this._componentRefMap.get(container)
    if (componentRef === undefined) {
      throw new Error('Could not unbind component. Container not found')
    }
    this._componentRefMap.delete(container)

    const hostView = componentRef.hostView

    if (container.virtual) {
      if (this._viewContainerRefActive) {
        const viewRefIndex = this._componentViewContainerRef.indexOf(hostView)
        if (viewRefIndex < 0) {
          throw new Error('Could not unbind component. ViewRef not found')
        }
        this._componentViewContainerRef.remove(viewRefIndex)
      } else {
        const component = componentRef.instance
        const componentRootElement = component.rootHtmlElement
        this._goldenLayoutElement.removeChild(componentRootElement)
        this._appRef.detachView(hostView)
      }
    } else {
      const component = componentRef.instance
      const componentRootElement = component.rootHtmlElement
      container.element.removeChild(componentRootElement)
      this._appRef.detachView(hostView)
    }

    componentRef.destroy()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleBeforeVirtualRectingEvent(_count: number) {
    this._goldenLayoutBoundingClientRect =
      this._goldenLayoutElement.getBoundingClientRect()
  }

  private handleContainerVirtualRectingRequiredEvent(
    container: ComponentContainer,
    width: number,
    height: number,
  ) {
    const containerBoundingClientRect =
      container.element.getBoundingClientRect()
    const left =
      containerBoundingClientRect.left -
      this._goldenLayoutBoundingClientRect.left
    const top =
      containerBoundingClientRect.top - this._goldenLayoutBoundingClientRect.top

    const componentRef = this._componentRefMap.get(container)
    if (componentRef === undefined) {
      throw new Error(
        'handleContainerVirtualRectingRequiredEvent: ComponentRef not found',
      )
    }
    const component = componentRef.instance
    component.setPositionAndSize(left, top, width, height)
  }

  private handleContainerVisibilityChangeRequiredEvent(
    container: ComponentContainer,
    visible: boolean,
  ) {
    const componentRef = this._componentRefMap.get(container)
    if (componentRef === undefined) {
      throw new Error(
        'handleContainerVisibilityChangeRequiredEvent: ComponentRef not found',
      )
    }
    const component = componentRef.instance
    component.setVisibility(visible)
  }

  private handleContainerVirtualZIndexChangeRequiredEvent(
    container: ComponentContainer,
    logicalZIndex: LogicalZIndex,
    defaultZIndex: string,
  ) {
    const componentRef = this._componentRefMap.get(container)
    if (componentRef === undefined) {
      throw new Error(
        'handleContainerVirtualZIndexChangeRequiredEvent: ComponentRef not found',
      )
    }
    const component = componentRef.instance
    component.setZIndex(defaultZIndex)
  }
}
