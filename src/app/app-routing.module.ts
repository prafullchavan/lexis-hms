import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {CountryComponent} from './_master/country/country.component';

const appRoutes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'master-country', component: CountryComponent},
{ path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
