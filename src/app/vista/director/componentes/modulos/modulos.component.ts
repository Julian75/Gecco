import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuloService } from 'src/app/servicios/modulo.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {

  dtOptions: any = {};
  public listarModulos: any = [];

  displayedColumns = ['id', 'descripcion', 'symbol'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private servicioModulo: ModuloService,
  ) { }

  ngOnInit(): void {
    this.listarTodos;
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true,
      buttons: [
        {
          extend: 'excel',
          text: '<i class="fa-solid fa-file-excel text-success btnexcel" style="background-color:#6DBE53;"></i>',
        },
        {
          extend: 'pdf',
          text: '<i class="fa-solid fa-file-pdf" style="background-color: #DA161A;"></i>',
        },
         {
          extend: 'print',
          text: '<i class="fa-solid fa-print " style="color:#959595" ></i>',
         }
      ]
    };
  }

public listarTodos () {
  this.servicioModulo.listarTodos().subscribe( res =>{
    this.listarModulos = res;
    this.dataSource = new MatTableDataSource( this.listarModulos);
  })
}

}
