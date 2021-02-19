import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../admin/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // formLogin:FormGroup = this.formBuilder.group({
  //   login:   ['usuario',[Validators.required]],
  //   password:   ['contraseña',Validators.required]
  // })
  login:string;
  password:string;
  constructor(private router:Router , private AuthService:AuthService) { }
  
  auth(){
    
    this.AuthService.login(this.login,this.password).subscribe(resp=>{
      console.log(resp);
      if(resp[0]){

        if(resp[0].per_dni){
          if(resp[0].usu_rol=='ADMIN'){
            this.router.navigateByUrl('colegio/home');
          }else{
            this.router.navigateByUrl('colegio/profesor')
          }
        }else{
          alert("xd");
        }
      }else{
        Swal.fire({
          title:'Error',
          text:'Credenciales no validas',
          icon:'warning'
        })
      }
      
      
    })
  }
  ngOnInit(): void {
  }

}
