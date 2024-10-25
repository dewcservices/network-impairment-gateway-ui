import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { BearerDetailsDTO } from '../../dtos/bearer-details-dto'
import { EnvironmentDetailsDTO } from '../../dtos/environment-details-dto'
import { HttpService } from '../../services/http-service.service'

@Component({
  selector: 'app-impairment-form',
  templateUrl: './impairment-form.component.html',
  styleUrl: './impairment-form.component.scss',
})
export class ImpairmentFormComponent {
  form = new FormGroup({})
  model = {
    bearer: -1,
    environment: -1,
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
      key: 'environment',
      type: 'select',
      templateOptions: {
        label: 'Select Environment',
        required: true,
        options: [],
        valueProp: 'value',
        labelProp: 'label',
      },
    },
  ]

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // Fetch bearers and environments from the API
    this.httpService.getBearers().subscribe((data: BearerDetailsDTO[]) => {
      this.bearers = data
      this.fields[0].props!.options = this.bearers.map((bearer) => ({
        value: bearer.id,
        label: bearer.title,
      }))
    })

    this.httpService
      .getEnvironments()
      .subscribe((data: EnvironmentDetailsDTO[]) => {
        this.environments = data
        this.fields[1].props!.options = this.environments.map((env) => ({
          value: env.id,
          label: env.title,
        }))
      })
  }

  onSubmit() {
    if (this.form.valid) {
      const selectedBearerId = this.model.bearer
      const selectedEnvironmentId = this.model.environment

      // Backend call to set the impairment
      console.log('Selected Bearer ID:', selectedBearerId)
      console.log('Selected Environment ID:', selectedEnvironmentId)
      this.httpService
        .setImpairment(selectedBearerId, selectedEnvironmentId)
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
}
