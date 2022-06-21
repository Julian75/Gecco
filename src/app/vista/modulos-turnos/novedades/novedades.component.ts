import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NovedadService } from 'src/app/servicios/novedad.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  dtOptions: any = {};
  public listarNovedades: any = [];

  displayedColumns = ['id', 'usuario', 'turno', 'tipoNovedad', 'fecha', 'observacion', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private servicioNovedad: NovedadService,
  ) {
   }

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
    this.servicioNovedad.listarTodos().subscribe( res =>{
      this.listarNovedades = res;
      console.log(res)
      this.dataSource = new MatTableDataSource( this.listarNovedades);
    })
  }

}
