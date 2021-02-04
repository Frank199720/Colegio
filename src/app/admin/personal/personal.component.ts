import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  accion:string;
  formPersonal:FormGroup;
  constructor(private formBuilder:FormBuilder,private modal:NgbModal) { }
  openSave(modalPersonal){
    this.accion="Registro de personal";
    this.modal.open(modalPersonal,{size:'lg',backdrop:'static'});
  }
  closeModal(modal){
    this.modal.dismissAll(modal);
  }
  ngOnInit(): void {
    this.formPersonal = this.formBuilder.group({
      codigoEducando:   [,[Validators.required,Validators.minLength(3)]],
      nombre:   [,Validators.required]
    })
  }

}
