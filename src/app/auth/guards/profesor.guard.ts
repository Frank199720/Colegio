import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../admin/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProfesorGuard implements CanActivate, CanLoad {
  constructor(private authService:AuthService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.authService.verifyAuthProfesor()
     .pipe(
      tap( isAutenticado=>{
        if(!isAutenticado){
          console.log("jai");
          this.router.navigate(['404'])
        }
      })
    )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.verifyAuthProfesor()
      .pipe(
        tap( isAutenticado=>{
          if(!isAutenticado){
            
            this.router.navigate(['404'])
          }
        })
      )
  }
}
