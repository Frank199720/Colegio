import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./shared/error/error.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren : () => import('./auth/auth.module').then( m=>m.AuthModule)
  },
  {
    path:'colegio',
    loadChildren :() =>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: "404",
    component: ErrorComponent,
  },
  {
    path: "**",
    redirectTo: "404",
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
