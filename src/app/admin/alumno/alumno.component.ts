import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  
  formAlumno:FormGroup;
  constructor(private formBuilder:FormBuilder,private modal:NgbModal) { }
  saveCurso(){
    
    
   }
   opensave(contenido){
     this.modal.open(contenido,{size:'lg',backdrop:'static',scrollable:true});
     
   }
   cerrarModal(contenido){
     this.modal.dismissAll();
   }
   openedit(contenido){
     
   }
   eliminar(){
 
   }
  ngOnInit(): void {
    this.formAlumno = this.formBuilder.group({
      codigoEducando:   [,[Validators.required,Validators.minLength(3)]],
      nombre:   [,Validators.required]
    })
  }

}
