import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PersonalService } from '../../services/personal.service';
import { Personal } from '../../interface/personal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombres = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  apellidos = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  dni = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  direccion = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  estCivil = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  telefono = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  SegSocial = new FormControl({ value: '', disabled: true }, [Validators.required]);

  profesor:Personal = null;

  constructor(private personalServices:PersonalService) { 
    // this.personalServices.show('15498672').subscribe((data:Personal)=>{
    //   this.profesor = data[0];
    //   //console.log(data[0].dep_cod);
    // },error=>{
    //   console.log(error);
    // });
  }

  ngOnInit(): void {
    //console.log(this.profesor)
  }

  habilitar(){
    this.nombres.enable();
    this.apellidos.enable();
    this.dni.enable();
    this.direccion.enable();
    this.estCivil.enable();
    this.telefono.enable();
    this.SegSocial.enable();
  }

  modificar(){
    //console.log(this.profesor);
    if (this.nombres.valid && this.apellidos.valid && 
      this.dni.valid && this.direccion.valid && 
      this.estCivil.valid && this.telefono.valid && this.SegSocial.valid) {
        this.personalServices.editar(this.profesor).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Datos actualizados',
            showConfirmButton: false,
            timer: 1500,
          });
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      //console.log('todos validos');
    } else{
      //console.log('no todos validos');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete todos los campos!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    this.inputsDisabled();
    //this.personalServices.show(this.profesor.per_dni);
  }

  inputsDisabled(){
    this.nombres.disable();
    this.apellidos.disable();
    this.dni.disable();
    this.direccion.disable();
    this.estCivil.disable();
    this.telefono.disable();
    this.SegSocial.disable();
  }

}
