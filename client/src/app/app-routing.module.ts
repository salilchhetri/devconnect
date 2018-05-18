import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule, LoadChildren } from "@angular/router";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: './components/register/register.module#RegisterModule'
  },
  {
    path: '',
    loadChildren: './components/home/home.module#HomeModule',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
