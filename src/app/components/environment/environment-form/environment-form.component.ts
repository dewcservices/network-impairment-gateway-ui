import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { environmentFormlyFields } from '../environment-formly-fields' // Adjust path as necessary

@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrl: './environment-form.component.scss',
})
export class EnvironmentFormComponent {
  @Input() mode: 'create' | 'view' = 'create' // Add a mode input property (default is 'create')
  @Input() model: any = {} // Model for the form data (can be passed for view mode)
  form = new FormGroup({})

  options: FormlyFormOptions = {}
  fields: FormlyFieldConfig[] = environmentFormlyFields

  ngOnInit() {
    this.fields = environmentFormlyFields.map((field) => {
      // If in view mode, make all fields disabled
      return this.mode === 'view' ? this.makeFieldReadOnly(field) : field
    })
  }

  // Function to disable fields in view mode
  makeFieldReadOnly(field: FormlyFieldConfig): FormlyFieldConfig {
    if (field.fieldGroup) {
      field.fieldGroup = field.fieldGroup.map((fgField) =>
        this.makeFieldReadOnly(fgField),
      )
    } else {
      field.props = {
        ...field.props,
        disabled: true, // Disable the field for read-only mode
      }
    }
    return field
  }

  submit() {
    if (this.form.valid) {
      console.log(this.model)
      // Handle the model submission
    }
  }
}
