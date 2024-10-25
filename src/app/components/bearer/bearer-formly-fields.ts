import { FormlyFieldConfig } from '@ngx-formly/core'
export const bearerFormlyFields: FormlyFieldConfig[] = [
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
