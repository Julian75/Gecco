import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OpcionesVisitaService } from 'src/app/servicios/opcionesVisita.service';

@Component({
  selector: 'app-visita-detalle',
  templateUrl: './visita-detalle.component.html',
  styleUrls: ['./visita-detalle.component.css']
})
export class VisitaDetalleComponent implements OnInit {

  dtOptions: any = {};
  public listarOpciones: any = [];

  displayedColumns = ['id', 'descripcion', 'opcion'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private servicioOpciones: OpcionesVisitaService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 4,
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
    this.servicioOpciones.listarTodos().subscribe( res =>{
      this.listarOpciones = res;
      this.dataSource = new MatTableDataSource( this.listarOpciones);
      console.log(res)
    })
  }
}
