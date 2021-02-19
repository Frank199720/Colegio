import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerp',
  templateUrl: './headerp.component.html',
  styleUrls: ['./headerp.component.css']
})
export class HeaderpComponent implements OnInit {

  constructor(private AuthService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    localStorage.removeItem('token');
    this.AuthService.restart();
    this.router.navigate(['auth']);
  }
}
