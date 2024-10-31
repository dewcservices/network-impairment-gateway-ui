import { Component, ElementRef } from '@angular/core'
import { EnvironmentDTO } from '../../../dtos/environment-dtos'
import { BaseComponentDirective } from '../../golden-layout/base-component.directive'

@Component({
  selector: 'app-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrl: './environment-card.component.scss',
})
export class EnvironmentCardComponent extends BaseComponentDirective {
  environment: EnvironmentDTO = {
    title: 'Optus C1 Satellite',
    description: 'Satellite connection with DDIL impairments applied.',
    netem: {
      delay: { value: 500, unit: 'ms' },
      loss: { percentage: 2 },
      corrupt: { percentage: 1 },
    },
  }
  constructor(elRef: ElementRef) {
    super(elRef.nativeElement)
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EnvironmentCardComponent {
  export const componentTypeName = 'EnvironmentCard'
}
