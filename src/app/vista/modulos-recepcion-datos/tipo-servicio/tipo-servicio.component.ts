import { Component, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { AgregarTipoServicioComponent } from './agregar-tipo-servicio/agregar-tipo-servicio.component';
import { ModificarTipoServicioComponent } from './modificar-tipo-servicio/modificar-tipo-servicio.component';
import { TipoServicioService } from 'src/app/servicios/tipoServicio.service';
import { TipoServicio } from 'src/app/modelos/tipoServicio';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.css']
})
export class TipoServicioComponent implements OnInit {
  displayedColumns = ['id', 'descripcion','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public listaServicio: any = [];

  constructor(
    public dialog: MatDialog,
    private servicioTipoServicio: TipoServicioService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }
  public listarTodos(){
    this.servicioTipoServicio.listarTodos().subscribe(res=>{
      this.listaServicio = res
      this.dataSource = new MatTableDataSource(this.listaServicio);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
    error=>{
    }
  }
  abrirModal(){
    const dialogRef = this.dialog.open(AgregarTipoServicioComponent, {
      width: '500px',
    });
  }
  modificarTipoServicio(id: number): void {
    const dialogRef = this.dialog.open(ModificarTipoServicioComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoServicio(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-5'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioTipoServicio.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el tipo de servicio.',
            'success'
          )
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          '',
          'error'
        )
      }
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaServicio);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: TipoServicio, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  listaTiposServicios: any = []; // Es para traer todos los datos del servicio tipo servicio
  listTiposServicios: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listTiposServicios = []
    this.servicioTipoServicio.listarTodos().subscribe(resTipoServicio=>{
      this.listaTiposServicios = resTipoServicio
      for (let index = 0; index < this.listaTiposServicios.length; index++) {
        const element = this.listaTiposServicios[index];
        var obj = {
          "Id": element.id,
          "Tipo Servicio": element.descripcion
        }
        this.listTiposServicios.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listTiposServicios);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaTiposServicios");
      });
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
