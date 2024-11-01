import { Routes } from '@angular/router'

import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component'

import { ComposableTestComponent } from '../pages/composable-test/composable-test.component'

import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component'

import { ImpairmentPageComponent } from '../pages/impairment-page/impairment-page.component'

export const APP_ROUTES: Routes = [
  { path: '', component: ImpairmentPageComponent, pathMatch: 'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundPageComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'test',
    component: ComposableTestComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
]
