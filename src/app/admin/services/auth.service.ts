import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { User } from '../interface/user';
import {tap,map} from 'rxjs/operators'
import { Observable ,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Route="http://127.0.0.1:8000/api";
  private _user:User | undefined;
  get user(){
    return this._user;
  }
  constructor(private httpCLient:HttpClient) {

  }
  restart(){
    this._user=null;
  }
  verificaAuth():Observable<boolean>{
      if(!localStorage.getItem('token')){
        return of(false);
      }else{
        let id=localStorage.getItem('token');
        console.log(id);
        return this.httpCLient.get<User>(this.Route+'/verify/'+id)
        .pipe(
          map(user=>{
              console.log('map',user);
              return true;
          })
        )
      } 
  }
  verifyAuthProfesor():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }else{
      let id=localStorage.getItem('token');
      console.log(id);
      return this.httpCLient.get<User>(this.Route+'/verify/'+id)
      .pipe(
        map(user=>{
            if(user[0].usu_rol=='PROF')
            return true
            else return false;
        })
      )
    }
    
  }
  verifyAuthAdmin():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }else{
      let id=localStorage.getItem('token');
      console.log(id);
      return this.httpCLient.get<User>(this.Route+'/verify/'+id)
      .pipe(
        map(user=>{
            if(user[0].usu_rol=='ADMIN')
            return true
            else return false;
        })
      )
    }
    
  }
  login(login:string , password:string){

    return this.httpCLient.get<User>(this.Route+'/login/'+login+'/'+password)
    .pipe(
      tap(user=> this._user=user[0]),
      tap(user=>{
        console.log(this._user);
        if(user[0])
        localStorage.setItem('token',user[0].per_dni)
      } )
    );
    console.log(this._user)
  }
  
}
