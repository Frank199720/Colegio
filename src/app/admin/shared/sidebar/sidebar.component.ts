import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from '../../admin.component';
import { Nivel } from '../../interface/nivel';
import { CursoService } from '../../services/curso.service';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  niveles:Nivel[];
  selectGrado:number=1;
  public href: string = "";
  constructor(private modal:NgbModal , private servicebyNivel:CursoService,private router:Router) { 
    this.servicebyNivel.getNiveles().subscribe((data:Nivel[])=>{
      this.niveles=data;
    });
  }
  codigoSeccion:number;
  ngOnInit(): void {
    this.href = this.router.url;
    $('[data-widget="treeview"]').each(function() {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
  });
  }
  ngAfterViewInit() {
   
}
  abriModalNota(contenido){
    this.modal.open(contenido,{ size: "lg"})
  }
  actualizarGrado(){

  }
  irAnotas(){
    console.log(this.selectGrado);
    this.router.navigateByUrl('colegio/notas/'+this.selectGrado);
    this.modal.dismissAll();
  }
}
 