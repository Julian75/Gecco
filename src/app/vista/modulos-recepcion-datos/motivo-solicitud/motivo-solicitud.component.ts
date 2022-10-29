import { Component, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ModificarMotivoSolicitudComponent } from './modificar-motivo-solicitud/modificar-motivo-solicitud.component';
import { AgregarMotivoSolicitudComponent } from './agregar-motivo-solicitud/agregar-motivo-solicitud.component';
import { MotivoSolicitud } from 'src/app/modelos/MotivoSolicitud';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-motivo-solicitud',
  templateUrl: './motivo-solicitud.component.html',
  styleUrls: ['./motivo-solicitud.component.css']
})
export class MotivoSolicitudComponent implements OnInit {
  public motivoSolicitud: any = [];
  displayedColumns = ['id', 'descripcion','area','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioMotivoSolicitud: MotivoSolicitudService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.servicioMotivoSolicitud.listarTodos().subscribe(res=>{
      res.forEach(element => {
        this.motivoSolicitud.push(element);
      });
      this.dataSource = new MatTableDataSource(this.motivoSolicitud);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),error=>{
    }
  }
  abrirModal(){
    const dialogRef = this.dialog.open(AgregarMotivoSolicitudComponent, {
      width: '500px',
    });
  }

  modificarMotivoSolicitud(id: number): void {
    const dialogRef = this.dialog.open(ModificarMotivoSolicitudComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarMotivoSolicitud(id:number){
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
        this.servicioMotivoSolicitud.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el motivo.',
            'success'
          )
          window.location.reload()
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
      this.dataSource = new MatTableDataSource(this.motivoSolicitud);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: MotivoSolicitud, filter: string) => {
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

  listaMotivosSolicitud: any = []; // Es para traer todos los datos del servicio motivo solicitud
  listMotivosSolicitud: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listMotivosSolicitud = []
    this.servicioMotivoSolicitud.listarTodos().subscribe(resMotivosSolicitudes=>{
      this.listaMotivosSolicitud = resMotivosSolicitudes
      for (let index = 0; index < this.listaMotivosSolicitud.length; index++) {
        const element = this.listaMotivosSolicitud[index];
        var obj = {
          "Id": element.id,
          "Motivo Solicitud": element.descripcion,
          "Area": element.idArea.descripcion
        }
        this.listMotivosSolicitud.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listMotivosSolicitud);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaMotivosSolicitudes");
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
