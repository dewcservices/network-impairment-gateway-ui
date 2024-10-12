# Install Angular CLI

To install the Angular CLI (@angular/cli) globally without root access, you can use npm's local user directory instead of the global directory (which typically requires root). Here's how you can achieve that:


## Step 1: Set Up Local npm Directory

1. Create a directory for global npm installations:

```bash
mkdir -p ~/.npm-global
```

2. Configure npm to use this directory for global installations:

```bash
npm config set prefix ~/.npm-global
```

3. Add the npm global binaries to your PATH

- Open your terminal and edit the .bash_profile file:
```bash
vim ~/.bash_profile
```

- Add the following line at the end of the file:

```bash
export PATH=~/.npm-global/bin:$PATH
```

4. Reload your shell (or source the file):

```bash
source ~/.bashrc
```

## Step 2: Install Angular CLI Globally in User Directory

Now, you can install the Angular CLI without needing root permissions:

```bash
npm install -g @angular/cli
```

Since npm is now configured to use your local directory, it won’t attempt to write to the global system directory that requires root access.

## Step 3: Verify the Installation
You can verify the installation by running:

```bash
ng version
```

This will confirm that the Angular CLI is installed and available in your user environment.

# Create Angular Project

```bash
ng new network-impairment-gateway-ui
? Would you like to add Angular routing? (y/N) Y
? Which stylesheet format would you like to use?
> SCSS

ng add @angular/material
The package @angular/material@x.y.z will be installed and executed.
Would you like to proceed? (Y/n) Y
? Choose a prebuilt theme name, or "custom" for a custom theme:
> Indigo/Pink
? Set up global Angular Material typography styles? (y/N) Y
? Include the Angular animations module? (Use arrow keys)
? Include the Angular animations module? (Use arrow keys)
> Include and enable animations

touch ./material.modules.ts
```

./material.modules.ts
```ts
import {NgModule} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
  exports: [
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
  ]
})
export class MaterialModules {}
```

Add the material modules to the app.module.ts of the project

```ts
...
import { MaterialModules } from '../../../../material.module';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    // material
    MaterialModules,
    ...
  ],
  providers: [
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Add Formly

```bash
ng add @ngx-formly/schematics --ui-theme=material
The package @ngx-formly/schematics@x.y.z will be installed and executed.
Would you like to proceed? Yes
```

Add to app.module.ts

```ts
// required angular modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../../../material.module';
// formly
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  imports: [
    ...
    CommonModule,
    ReactiveFormsModule,
    // material
    MaterialModules,
    // formly
    FormlyMaterialModule,
    FormlyModule.forRoot(),
    ...
  ],
  ...
})
export class AppModule { }
```

## Add Golden Layout

```bash
npm install golden-layout --save
ng generate component components/golden-layout-host
generate service components/golden-layout-host/golden-layout-component
ng generate component components/golden-layout/color
```
