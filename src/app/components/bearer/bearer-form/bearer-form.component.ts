import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'

@Component({
  selector: 'app-bearer-form',
  templateUrl: './bearer-form.component.html',
  styleUrl: './bearer-form.component.scss',
})
export class BearerFormComponent {
  @Input() mode: 'create' | 'edit' | 'view' = 'create' // Controls form behavior
  @Input() bearer: any = null // Pass an existing bearer for edit or view
  form = new FormGroup({})
  model: any = {
    title: '',
    description: '',
    img: '',
    links: {},
  }
  options: FormlyFormOptions = {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
        required: true,
        minLength: 2,
        maxLength: 100,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        required: true,
        minLength: 5,
        maxLength: 500,
      },
    },
    {
      key: 'img',
      type: 'input',
      templateOptions: {
        label: 'Image URL',
        type: 'url',
        placeholder: 'Enter an image URL',
      },
    },
    {
      key: 'links',
      type: 'repeat', // dynamic array for links
      templateOptions: {
        addText: 'Add Link',
      },
      fieldArray: {
        fieldGroup: [
          {
            key: 'hbt.rate.value',
            type: 'input',
            templateOptions: {
              label: 'Rate Value',
              type: 'number',
              required: true,
            },
          },
          {
            key: 'hbt.rate.unit',
            type: 'select',
            templateOptions: {
              label: 'Rate Unit',
              options: [
                { value: 'kbit', label: 'Kbit' },
                { value: 'mbit', label: 'Mbit' },
                { value: 'gbit', label: 'Gbit' },
              ],
            },
          },
          {
            key: 'netem.delay.time',
            type: 'input',
            templateOptions: {
              label: 'Delay Time (ms)',
              type: 'number',
              required: true,
            },
          },
          {
            key: 'netem.loss.percentage',
            type: 'input',
            templateOptions: {
              label: 'Loss Percentage (%)',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
          },
        ],
      },
    },
  ]

  ngOnInit() {
    if (this.bearer) {
      this.model = this.bearer // Use bearer data for edit/view mode
    }

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
