import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

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
  ],
  imports: [
    // material
    MaterialModules,
    BrowserModule,
    AppRoutingModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
