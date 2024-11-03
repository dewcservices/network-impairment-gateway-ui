import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { ControlsComponent } from '../../components/golden-layout/controls/controls.component'
import { GoldenLayoutHostComponent } from '../../components/golden-layout/golden-layout-host/golden-layout-host.component'
import { ImpairmentService } from '../../services/impairment.service'

@Component({
  selector: 'app-composable-test',
  templateUrl: './composable-test.component.html',
  styleUrl: './composable-test.component.scss',
})
export class ComposableTestComponent implements AfterViewInit {
  title = 'golden-layout-ng-app'

  private _controlsElement!: HTMLElement

  @ViewChild('controls') private readonly _controlsComponent!: ControlsComponent
  @ViewChild('goldenLayoutHost')
  private readonly _goldenLayoutHostComponent!: GoldenLayoutHostComponent

  constructor(private readonly impairmentService: ImpairmentService) {
    this.impairmentService.getImpairment().subscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._controlsElement = this._controlsComponent.element

      this._goldenLayoutHostComponent.initialise()
      this._controlsComponent.initialise(this._goldenLayoutHostComponent)

      if (this._goldenLayoutHostComponent.isGoldenLayoutSubWindow) {
        this._controlsElement.style.display = 'none'
      }
    }, 0)
  }
}
