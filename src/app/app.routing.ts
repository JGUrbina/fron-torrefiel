import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { SetpasswordComponent } from './components/setpassword/setpassword.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user/resetpass', component: ResetPassComponent},
  {path: 'user/:passwordreset/:token', component: SetpasswordComponent},
  {path: 'user/confirmation/:token', component: SetpasswordComponent},
  {path: '**', component: ErrorPageComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const appRoutingProviders: any[] = [RouterModule];
