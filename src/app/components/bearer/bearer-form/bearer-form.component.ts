import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { bearerFormlyFields } from '../bearer-formly-fields'

@Component({
  selector: 'app-bearer-form',
  templateUrl: './bearer-form.component.html',
  styleUrl: './bearer-form.component.scss',
})
export class BearerFormComponent implements OnInit {
  @Input() mode: 'create' | 'view' = 'create' // Controls form behavior
  @Input() model: any = {} // Pass an existing bearer for edit or view
  form = new FormGroup({})

  options: FormlyFormOptions = {}

  fields: FormlyFieldConfig[] = bearerFormlyFields

  ngOnInit() {
    // Update field configurations if the mode is 'view'
    if (this.mode === 'view') {
      this.fields.forEach((field) => {
        field.props = { ...field.props, readonly: true }
      })
    }
  }

  submit() {
    if (this.form.valid) {
      console.log(this.model)
      // Handle create or edit logic here
    }
  }
}
