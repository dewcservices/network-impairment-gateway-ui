import { FormlyFieldConfig } from '@ngx-formly/core'
export const environmentFormlyFields: FormlyFieldConfig[] = [
  {
    key: 'title',
    type: 'input',
    templateOptions: {
      label: 'Title',
      required: true,
      minLength: 5,
      maxLength: 100,
      description: 'Title of the bearer',
    },
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'Description',
      required: true,
      minLength: 10,
      maxLength: 500,
      description: 'A description of the satellite or bearer connection',
    },
  },
  {
    key: 'netem',
    wrappers: ['panel'],
    templateOptions: { label: 'NETEM Settings' },
    fieldGroup: [
      {
        key: 'delay',
        wrappers: ['panel'],
        templateOptions: { label: 'Delay' },
        fieldGroup: [
          {
            key: 'time',
            type: 'input',
            templateOptions: {
              label: 'Delay Time (ms)',
              type: 'number',
              description: 'The delay time in milliseconds',
            },
          },
          {
            key: 'jitter',
            type: 'input',
            templateOptions: {
              label: 'Jitter (ms)',
              type: 'number',
              description: 'The jitter in milliseconds',
            },
          },
          {
            key: 'correlation',
            type: 'input',
            templateOptions: {
              label: 'Correlation (%)',
              type: 'number',
              min: 0,
              max: 100,
              description: 'The correlation percentage between 0 and 100',
            },
          },
        ],
      },
      {
        key: 'loss',
        wrappers: ['panel'],
        templateOptions: { label: 'Loss' },
        fieldGroup: [
          {
            key: 'percentage',
            type: 'input',
            templateOptions: {
              label: 'Loss Percentage (%)',
              type: 'number',
              min: 0.0,
              max: 100.0,
              description: 'The loss percentage between 0 and 100',
            },
          },
          {
            key: 'interval',
            type: 'input',
            templateOptions: {
              label: 'Loss Interval (ms)',
              type: 'number',
              description: 'The loss interval in milliseconds',
            },
          },
          {
            key: 'correlation',
            type: 'input',
            templateOptions: {
              label: 'Correlation (%)',
              type: 'number',
              min: 0,
              max: 100,
              description: 'The correlation percentage between 0 and 100',
            },
          },
        ],
      },
      {
        key: 'corrupt',
        wrappers: ['panel'],
        templateOptions: { label: 'Corrupt' },
        fieldGroup: [
          {
            key: 'percentage',
            type: 'input',
            templateOptions: {
              label: 'Corrupt Percentage (%)',
              type: 'number',
              min: 0.0,
              max: 100.0,
              description: 'The corruption percentage between 0 and 100',
            },
          },
          {
            key: 'correlation',
            type: 'input',
            templateOptions: {
              label: 'Correlation (%)',
              type: 'number',
              min: 0,
              max: 100,
              description: 'The correlation percentage between 0 and 100',
            },
          },
        ],
      },
    ],
  },
]
