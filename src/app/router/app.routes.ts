import { Routes } from '@angular/router'

import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component'

import { ComposableTestComponent } from '../pages/composable-test/composable-test.component'
import { HomeComponent } from '../pages/home/home.component'
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component'

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
    path: '**',
    redirectTo: 'not-found',
  },
]
