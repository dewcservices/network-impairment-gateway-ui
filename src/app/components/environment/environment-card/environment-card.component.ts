import { Component, ElementRef, Inject, OnInit } from '@angular/core'
import { EnvironmentDTO, EnvironmentType } from '../../../dtos/environment-dtos'
import { EnvironmentService } from '../../../services/environment.service'
import { BaseComponentDirective } from '../../golden-layout/base-component.directive'
import { ComponentContainer } from 'golden-layout'

@Component({
  selector: 'app-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrl: './environment-card.component.scss',
})
export class EnvironmentCardComponent
  extends BaseComponentDirective
  implements OnInit
{
  private readonly envType: string
  selectedEnvironment: EnvironmentDTO | null = null

  constructor(
    @Inject(BaseComponentDirective.GoldenLayoutContainerInjectionToken)
    private readonly container: ComponentContainer,
    elRef: ElementRef,
    private readonly envService: EnvironmentService,
  ) {
    super(elRef.nativeElement)
    this.container.stateRequestEvent = () =>
      this.handleContainerStateRequestEvent()

    const state = this.container.initialState
    this.envType = state as string
  }

  ngOnInit(): void {
    if (this.envType === EnvironmentType.DOWNLINK)
      this.envService.downlinkEnvironment$.subscribe(
        (env) => (this.selectedEnvironment = env),
      )
    else
      this.envService.uplinkEnvironment$.subscribe(
        (env) => (this.selectedEnvironment = env),
      )
  }

  handleContainerStateRequestEvent(): string {
    return this.envType
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EnvironmentCardComponent {
  export const componentTypeName = 'EnvironmentCard'
}
