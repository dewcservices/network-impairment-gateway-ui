import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {
  DragSource,
  GoldenLayout,
  LayoutConfig,
  ResolvedLayoutConfig,
} from 'golden-layout'
import { GoldenLayoutComponentService } from '../../../services/golden-layout/golden-layout-component.service'
import { GoldenLayoutHostComponent } from '../golden-layout-host/golden-layout-host.component'
import { predefinedLayoutNames, predefinedLayouts } from '../predefined-layouts'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnDestroy {
  private _goldenLayoutHostComponent!: GoldenLayoutHostComponent
  private _goldenLayout!: GoldenLayout
  private _savedLayout: ResolvedLayoutConfig | undefined

  private _selectedRegisteredComponentTypeName!: string
  private _selectedLayoutName!: string
  private readonly _dragSources: (DragSource | undefined)[] = []

  @ViewChild('dragMe') private readonly _dragMeElementRef!: ElementRef
  @ViewChild('virtualRadio')
  private readonly _virtualRadioElementRef!: ElementRef<HTMLInputElement>
  @ViewChild('viewComponentRefRadio')
  private readonly _viewComponentRefRadioElementRef!: ElementRef<HTMLInputElement>
  @ViewChild('appRefRadio')
  private readonly _appRefRadioElementRef!: ElementRef<HTMLInputElement>

  public registeredComponentTypeNames!: readonly string[]
  public initialRegisteredComponentTypeName!: string
  public layoutNames!: readonly string[]
  public initialLayoutName!: string
  public saveLayoutButtonDisabled = true

  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef

  get element() {
    return this._elRef.nativeElement
  }

  constructor(
    private readonly _elRef: ElementRef<HTMLElement>,
    private readonly _goldenLayoutComponentService: GoldenLayoutComponentService,
  ) {}

  ngOnDestroy() {
    for (const dragSource of this._dragSources) {
      if (dragSource) {
        this._goldenLayout.removeDragSource(dragSource)
      }
    }
  }

  initialise(value: GoldenLayoutHostComponent) {
    this._goldenLayoutHostComponent = value
    this._goldenLayout = this._goldenLayoutHostComponent.goldenLayout

    this._virtualRadioElementRef.nativeElement.checked =
      this._goldenLayoutHostComponent.virtualActive
    this.updateViewComponentRefRadio()
    this._goldenLayoutHostComponent.load().then(() => {
      this.registeredComponentTypeNames =
        this._goldenLayoutComponentService.getRegisteredComponentTypeNames()
      this._selectedRegisteredComponentTypeName =
        this.registeredComponentTypeNames[0]
      this.initialRegisteredComponentTypeName =
        this._selectedRegisteredComponentTypeName

      this.layoutNames = predefinedLayoutNames
      this._selectedLayoutName = this.layoutNames[0]
      this.initialLayoutName = this._selectedLayoutName

      this.initialiseDragSources()
    })
  }

  handleRadioClick() {
    this._goldenLayoutHostComponent.setVirtualActive(
      this._virtualRadioElementRef.nativeElement.checked,
    )
    this.updateViewComponentRefRadio()
  }

  handleViewComponentRefOrAppRefRadioClick() {
    this._goldenLayoutHostComponent.setViewContainerRefActive(
      this._viewComponentRefRadioElementRef.nativeElement.checked,
    )
  }

  handleRegisteredComponentTypeSelectChange(value: string) {
    this._selectedRegisteredComponentTypeName = value
  }

  handleAddComponentButtonClick() {
    const componentType = this._selectedRegisteredComponentTypeName
    this._goldenLayout.addComponent(componentType)
  }

  handleLayoutSelectChange(value: string) {
    this._selectedLayoutName = value
  }

  handleLoadLayoutButtonClick() {
    const selectedLayout = predefinedLayouts.find(
      (layout) => layout.name === this._selectedLayoutName,
    )
    if (selectedLayout === undefined) {
      throw new Error('handleLoadLayoutButtonClick Error')
    } else {
      this._goldenLayout.loadLayout(selectedLayout.config)
    }
  }

  handleSaveLayoutButtonClick() {
    this._savedLayout = this._goldenLayout.saveLayout()
    this.saveLayoutButtonDisabled = false
  }

  handleReloadSavedLayoutClick() {
    if (this._savedLayout === undefined) {
      throw new Error('No saved layout')
    } else {
      const layoutConfig = LayoutConfig.fromResolved(this._savedLayout)
      this._goldenLayout.loadLayout(layoutConfig)
    }
  }

  private initialiseDragSources() {
    this.loadDragSource('Drag me !', 'Color', this._dragMeElementRef)
  }

  private loadDragSource(
    title: string,
    componentName: string,
    element: ElementRef | undefined,
  ): void {
    if (!this._goldenLayout) {
      return
    }

    const config = () => {
      const item: DragSource.ComponentItemConfig = {
        state: undefined,
        title,
        type: componentName,
      }
      return item
    }
    this._dragSources.push(
      this._goldenLayout.newDragSource(element?.nativeElement, config),
    )
  }

  private updateViewComponentRefRadio() {
    const viewComponentRefActive =
      this._goldenLayoutHostComponent.viewContainerRefActive
    this._viewComponentRefRadioElementRef.nativeElement.checked =
      viewComponentRefActive
    this._appRefRadioElementRef.nativeElement.checked = !viewComponentRefActive
    const virtualActive = this._goldenLayoutHostComponent.virtualActive
    this._viewComponentRefRadioElementRef.nativeElement.disabled =
      !virtualActive
    this._appRefRadioElementRef.nativeElement.disabled = !virtualActive
  }
}
