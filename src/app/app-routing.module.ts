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
    redirectTo: "auth",
  },
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
