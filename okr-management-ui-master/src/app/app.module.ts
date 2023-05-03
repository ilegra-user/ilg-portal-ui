import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigurationsComponent } from './components/configuration/configurations.component';

import { MatTooltipModule } from '@angular/material/tooltip';

import { ObjectiveListComponent } from './components/objective/objective-list.component';
import { ObjectiveItemComponent } from './components/objective/objective-item.component';
import { KeyResultListComponent } from './components/keyresult/keyresult-list.component';
import { KeyResultItemComponent } from './components/keyresult/keyresult-item.component';

import { ObjectiveDialogComponent } from './components/objective/objective-dialog.component';

import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { DialogService } from './services/dialog.service';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatNativeDateModule,
  MatOptionModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { KeyResultDialogComponent } from './components/keyresult/keyresult-dialog.component';
import { InitiativeDialogComponent } from './components/initiative/initiative-dialog.component';

import { HttpErrorInterceptor } from './helpers/http-error.interceptor.ts';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

import { ObjectiveComponent } from './components/objective/objective.component';
import { CycleConfigurationComponent } from './components/configuration/cycle/cycle-configuration.component';
import { CycleConfigurationDialogComponent } from './components/configuration/cycle/cycle-configuration-dialog.component';
import { TeamConfigurationComponent } from './components/configuration/team/team-configuration.component';
import { TeamConfigurationDialogComponent } from './components/configuration/team/team-configuration-dialog.component';

import { KeyResultHistoryDialogComponent } from './components/keyresult/keyresult-history-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { TwoDigitDecimaNumberDirective } from './directives/two-digits-decimal-number.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationsComponent,
    ObjectiveListComponent,
    ObjectiveItemComponent,
    KeyResultListComponent,
    KeyResultItemComponent,
    ObjectiveDialogComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    KeyResultDialogComponent,
    InitiativeDialogComponent,
    UnauthorizedComponent,
    ObjectiveComponent,
    CycleConfigurationComponent,
    CycleConfigurationDialogComponent,
    TeamConfigurationComponent,
    TeamConfigurationDialogComponent,
    KeyResultHistoryDialogComponent,
    LoginComponent,
    TwoDigitDecimaNumberDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatTooltipModule
  ],
  providers: [
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
