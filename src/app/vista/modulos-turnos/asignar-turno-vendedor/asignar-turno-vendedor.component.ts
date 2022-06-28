import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { UsuarioVendedoresService } from 'src/app/servicios/serviciosSiga/usuariosVendedores.service';

@Component({
  selector: 'app-asignar-turno-vendedor',
  templateUrl: './asignar-turno-vendedor.component.html',
  styleUrls: ['./asignar-turno-vendedor.component.css']
})
export class AsignarTurnoVendedorComponent implements OnInit {

  dtOptions: any = {};
  public listaAsignarTurnoVendedor: any = [];

  displayedColumns = ['id', 'nombreVendedor', 'nombreOficina', 'nombreSitioVenta', 'fechaInicio', 'fechaFinal', 'turno'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioUsuarioVendedor: UsuarioVendedoresService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
      this.listaAsignarTurnoVendedor = res;
      this.dataSource = new MatTableDataSource( this.listaAsignarTurnoVendedor);
      console.log(res)
    })
    this.servicioUsuarioVendedor.listarPorId(13).subscribe(res=>{
      console.log(res)
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
