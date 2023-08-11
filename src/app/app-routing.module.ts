import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddChefComponent } from './components/add-chef/add-chef.component';
import { AddPlatComponent } from './components/add-plat/add-plat.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardChefComponent } from './components/dashboard-chef/dashboard-chef.component';
import { DisplayPlatComponent } from './components/display-plat/display-plat.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-admin', component: AddAdminComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'addChef', component: AddChefComponent},
  {path: 'addPlat', component: AddPlatComponent},
  {path: 'dashboardAdmin', component: DashboardAdminComponent},
  {path: 'dashboardChef', component: DashboardChefComponent},
 
  // Dynamic path
  {path: 'displayUser/:id', component: DisplayUserComponent},
 
  {path: 'displayPlat/:id', component: DisplayPlatComponent},

  {path: 'editPlat/:id', component: AddPlatComponent},

  {path: 'editUser/:id', component: AddAdminComponent},
  {path: 'editChef/:id', component: AddChefComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
