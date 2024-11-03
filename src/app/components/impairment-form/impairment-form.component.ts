/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ElementRef } from '@angular/core'
import { ComponentContainer } from 'golden-layout'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { BearerDetailsDTO } from '../../dtos/bearer-dtos'
import { EnvironmentDetailsDTO } from '../../dtos/environment-dtos'
import { EnvironmentService } from '../../services/environment.service'
import { ImpairmentService } from '../../services/impairment.service'
import { BearerService } from '../../services/bearer.service'
import { BaseComponentDirective } from '../golden-layout/base-component.directive'

@Component({
  selector: 'app-impairment-form',
  templateUrl: './impairment-form.component.html',
  styleUrl: './impairment-form.component.scss',
})
export class ImpairmentFormComponent
  extends BaseComponentDirective
  implements OnInit
{
  form = new FormGroup({})
  model = {
    bearer: 1,
    uplinkEnvironment: 1,
    downlinkEnvironment: 1,
  }

  bearers: BearerDetailsDTO[] = []
  environments: EnvironmentDetailsDTO[] = []

  fields: FormlyFieldConfig[] = [
    {
      key: 'bearer',
      type: 'select',
      templateOptions: {
        label: 'Select Bearer',
        required: true,
        options: [],
        valueProp: 'value',
        labelProp: 'label',
      },
    },
    {
      key: 'uplinkEnvironment',
      type: 'select',
      templateOptions: {
        label: 'Select Uplink Environment',
        required: true,
        options: [],
        valueProp: 'value',
        labelProp: 'label',
      },
    },
    {
      key: 'downlinkEnvironment',
      type: 'select',
      templateOptions: {
        label: 'Select Downlink Environment',
        required: true,
        options: [],
        valueProp: 'value',
        labelProp: 'label',
      },
    },
  ]

  constructor(
    @Inject(BaseComponentDirective.GoldenLayoutContainerInjectionToken)
    private container: ComponentContainer,
    elRef: ElementRef,
    private envService: EnvironmentService,
    private bearerService: BearerService,
    private impairmentService: ImpairmentService,
  ) {
    super(elRef.nativeElement)
    this.container.stateRequestEvent = () =>
      this.handleContainerStateRequestEvent()

    const state = this.container.initialState
    this.model = state as any
  }

  ngOnInit(): void {
    // Fetch bearers and environments from the API
    this.bearerService.getBearers().subscribe((data: BearerDetailsDTO[]) => {
      this.bearers = data
      this.fields[0].props!.options = this.bearers.map((bearer) => ({
        value: bearer.id,
        label: bearer.title,
      }))
    })

    this.envService
      .getEnvironments()
      .subscribe((data: EnvironmentDetailsDTO[]) => {
        this.environments = data

        this.fields[1].props!.options = this.environments.map((env) => ({
          value: env.id,
          label: env.title,
        }))

        this.fields[2].props!.options = this.environments.map((env) => ({
          value: env.id,
          label: env.title,
        }))
      })

    this.impairmentService.impairmentSettings$.subscribe((impairment) => {
      if (impairment) {
        this.model.bearer = impairment!.bearer_id
        this.model.uplinkEnvironment = impairment!.bearer_id
        this.model.downlinkEnvironment = impairment!.downlink_environment_id
        this.form.patchValue({
          bearer: this.model.bearer,
          uplinkEnvironment: this.model.uplinkEnvironment,
          downlinkEnvironment: this.model.downlinkEnvironment,
        })
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const selectedBearerId = this.model.bearer
      const selectedUplinkEnvironmentId = this.model.uplinkEnvironment
      const selectedDownlinkEnvironmentId = this.model.downlinkEnvironment

      // Backend call to set the impairment
      console.log('Selected Bearer ID:', selectedBearerId)
      console.log(
        'Selected Uplink Environment ID:',
        selectedUplinkEnvironmentId,
      )
      console.log(
        'Selected Downlink Environment ID:',
        selectedDownlinkEnvironmentId,
      )
      this.impairmentService
        .setImpairment(
          selectedBearerId,
          selectedUplinkEnvironmentId,
          selectedDownlinkEnvironmentId,
        )
        .subscribe({
          next: (response) => {
            console.log('Impairment set successfully', response)
          },
          error: (error) => {
            console.error('Error setting impairment', error)
          },
          complete: () => {
            console.log('Impairment process completed')
          },
        })
    }
  }
  updateValue(model: any) {
    this.model = model
  }

  handleContainerStateRequestEvent(): any {
    return this.model
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ImpairmentFormComponent {
  export const componentTypeName = 'ImpairmentForm'
}
