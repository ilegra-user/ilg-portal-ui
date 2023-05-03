import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './components/configuration/configurations.component';
import { LoginComponent } from './components/login/login.component';
import { ObjectiveComponent } from './components/objective/objective.component';
import { AuthGuard } from './helpers/auth.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'objectives' },
  {
    path: 'objectives',
    component: ObjectiveComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'configurations',
    component: ConfigurationsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
