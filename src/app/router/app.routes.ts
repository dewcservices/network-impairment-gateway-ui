import { Routes } from '@angular/router'

import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component'

import { ComposableTestComponent } from '../pages/composable-test/composable-test.component'
import { HomeComponent } from '../pages/home/home.component'
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component'

import { BearerFormComponent } from '../components/bearer/bearer-form/bearer-form.component'
import { EnvironmentFormComponent } from '../components/environment/environment-form/environment-form.component'
import { ImpairmentFormComponent } from '../components/impairment-form/impairment-form.component'
import { NetworkMonitorComponent } from '../components/network-monitor/network-monitor.component'

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
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
    path: 'bearer-form',
    component: BearerFormComponent,
  },
  {
    path: 'environment-form',
    component: EnvironmentFormComponent,
  },
  {
    path: 'impairment-form',
    component: ImpairmentFormComponent,
  },
  {
    path: 'network-monitor',
    component: NetworkMonitorComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
]
