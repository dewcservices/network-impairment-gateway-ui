import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

import { AppRoutingModule } from './router/app-routing.module'
import { AppComponent } from './app.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyMaterialModule } from '@ngx-formly/material'

import { MaterialModules } from './material.modules'
import { GoldenLayoutHostComponent } from './components/golden-layout/golden-layout-host/golden-layout-host.component'
import { ControlsComponent } from './components/golden-layout/controls/controls.component'
import { TextComponent } from './components/golden-layout/text/text.component'
import { BooleanComponent } from './components/golden-layout/boolean/boolean.component'
import { ColorComponent } from './components/golden-layout/color/color.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { ComposableTestComponent } from './pages/composable-test/composable-test.component'
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component'
import { HomeComponent } from './pages/home/home.component'

import {
  provideCharts,
  BaseChartDirective,
  withDefaultRegisterables,
} from 'ng2-charts'

import { GoldenLayoutComponentService } from './services/golden-layout/golden-layout-component.service'
import { BearerFormComponent } from './components/bearer/bearer-form/bearer-form.component'
import { EnvironmentFormComponent } from './components/environment/environment-form/environment-form.component'
import { ImpairmentFormComponent } from './components/impairment-form/impairment-form.component'
import { NetworkMonitorComponent } from './components/network-monitor/network-monitor.component'
import { EnvironmentCardComponent } from './components/environment/environment-card/environment-card.component'
import { BearerCardComponent } from './components/bearer/bearer-card/bearer-card.component'
import { EnvironmentService } from './services/environment.service'
import { BearerService } from './services/bearer.service'
import { ImpairmentService } from './services/impairment.service'
import { LiveGraphComponent } from './components/live-graph/live-graph.component'

@NgModule({
  declarations: [
    AppComponent,
    GoldenLayoutHostComponent,
    ControlsComponent,
    TextComponent,
    BooleanComponent,
    ColorComponent,
    NotFoundPageComponent,
    ComposableTestComponent,
    DefaultLayoutComponent,
    HomeComponent,
    BearerFormComponent,
    EnvironmentFormComponent,
    ImpairmentFormComponent,
    NetworkMonitorComponent,
    EnvironmentCardComponent,
    BearerCardComponent,
    LiveGraphComponent,
  ],
  imports: [
    // material
    MaterialModules,
    BrowserModule,
    AppRoutingModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
    BaseChartDirective,
  ],
  providers: [
    GoldenLayoutComponentService,
    provideAnimationsAsync(),
    EnvironmentService,
    BearerService,
    ImpairmentService,
    provideHttpClient(withInterceptorsFromDi()), // Replaces HttpClientModule
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
