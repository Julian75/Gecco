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
  }

  public listarTodos () {
    this.servicioNovedad.listarTodos().subscribe( res =>{
      this.listarNovedades = res;
      console.log(res)
      this.dataSource = new MatTableDataSource( this.listarNovedades);
    })
  }

   // Filtrado
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
