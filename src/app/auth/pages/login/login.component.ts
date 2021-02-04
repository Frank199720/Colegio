import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }
  
  prueba(){
    this.router.navigateByUrl('colegio/home');
  }
  ngOnInit(): void {
  }

}
