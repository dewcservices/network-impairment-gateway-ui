import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { GoldenLayoutHostComponent } from '../../components/golden-layout/golden-layout-host/golden-layout-host.component'
import { ImpairmentService } from '../../services/impairment.service'
import { predefinedLayouts } from '../../components/golden-layout/predefined-layouts'
import { GoldenLayout } from 'golden-layout'
import { GoldenLayoutComponentService } from '../../services/golden-layout/golden-layout-component.service'

@Component({
  selector: 'app-impairment-page',
  templateUrl: './impairment-page.component.html',
  styleUrl: './impairment-page.component.scss',
})
export class ImpairmentPageComponent implements AfterViewInit {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef
  @ViewChild('goldenLayoutHost')
  private readonly _goldenLayoutHostComponent!: GoldenLayoutHostComponent
  private _goldenLayout!: GoldenLayout
  public registeredComponentTypeNames!: readonly string[]
  constructor(
    private readonly impairmentService: ImpairmentService,
    private readonly _goldenLayoutComponentService: GoldenLayoutComponentService,
  ) {
    this.impairmentService.getImpairment().subscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._goldenLayoutHostComponent.initialise()
      this._goldenLayout = this._goldenLayoutHostComponent.goldenLayout
      this._goldenLayoutHostComponent.load().then(() => {
        this.registeredComponentTypeNames =
          this._goldenLayoutComponentService.getRegisteredComponentTypeNames()
      })
      this.loadLayout('impairment-gateway')
    }, 0)
  }

  loadLayout(selectedLayoutName: string) {
    const selectedLayout = predefinedLayouts.find(
      (layout) => layout.name === selectedLayoutName,
    )
    if (selectedLayout === undefined) {
      throw new Error('handleLoadLayoutButtonClick Error')
    } else {
      this._goldenLayout.loadLayout(selectedLayout.config)
    }
  }
}
