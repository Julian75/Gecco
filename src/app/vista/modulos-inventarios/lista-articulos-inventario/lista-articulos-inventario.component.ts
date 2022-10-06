import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { VisualizarHistorialArticuloComponent } from '../../modulos-compra/articulos/visualizar-historial-articulo/visualizar-historial-articulo.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
@Component({
  selector: 'app-lista-articulos-inventario',
  templateUrl: './lista-articulos-inventario.component.html',
  styleUrls: ['./lista-articulos-inventario.component.css']
})
export class ListaArticulosInventarioComponent implements OnInit {
  dtOptions: any = {};
  public listarInventario: any = [];

  displayedColumns = ['id', 'cantidad','fecha', 'articulo','usuario','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioInventario: InventarioService,
    private servicioSolicitudBaja: ArticulosBajaService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodo()
  }

  listaCompletaInventario: any = []
  public listarTodo(){
    this.listaCompletaInventario = []
    this.servicioInventario.listarTodos().subscribe(resInventariosCompletos=>{
      this.servicioConsultasGenerales.listarInventariosSinBaja().subscribe(resInventariosSinBaja=>{
        resInventariosSinBaja.forEach(elementInventarioSinBaja => {
          resInventariosCompletos.forEach(elementInventario => {
            if(elementInventario.id == elementInventarioSinBaja.id){
              this.listaCompletaInventario.push(elementInventario)
            }
          });
        });
        this.listaCompletaInventario.sort()
        this.dataSource = new MatTableDataSource( this.listaCompletaInventario);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  mostrarHistorial(idArticulo:number):void{
    const dialogRef = this.dialog.open(VisualizarHistorialArticuloComponent, {
      width: '600px',
      height: '440px',
      data: idArticulo
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaRoles.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name)
  }
}
