import { Component, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';
import { AgregarEscalaSolicitudesComponent } from './agregar-escala-solicitudes/agregar-escala-solicitudes.component';
import { ModificarEscalaSolicitudesComponent } from './modificar-escala-solicitudes/modificar-escala-solicitudes.component';
import { EscalaSolicitudes } from 'src/app/modelos/escalaSolicitudes';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-escala-solicitudes',
  templateUrl: './escala-solicitudes.component.html',
  styleUrls: ['./escala-solicitudes.component.css']
})
export class EscalaSolicitudesComponent implements OnInit {
  displayedColumns = ['id', 'descripcion','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public listaEscala: any = [];

  constructor(
    public dialog: MatDialog,
    private servicioEscalaSolicitudes: EscalaSolicitudesService,
  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.servicioEscalaSolicitudes.listarTodos().subscribe(res=>{
      this.listaEscala = res
      this.dataSource = new MatTableDataSource(this.listaEscala);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  abrirModal(){
    const dialogRef = this.dialog.open(AgregarEscalaSolicitudesComponent, {
      width: '500px',
    });
  }
  modificarEscalaSolicitudes(id: number): void {
    const dialogRef = this.dialog.open(ModificarEscalaSolicitudesComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarEscalaSolicitudes(id:number){
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
        this.servicioEscalaSolicitudes.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la escala.',
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
      this.dataSource = new MatTableDataSource(this.listaEscala);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: EscalaSolicitudes, filter: string) => {
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

  listaEscalaSolicitudes: any = []; // Es para traer todos los datos del servicio escala solicitudes
  listEscalaSolicitudes: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listEscalaSolicitudes = []
    this.servicioEscalaSolicitudes.listarTodos().subscribe(resEscalaSolicitudes=>{
      this.listaEscalaSolicitudes = resEscalaSolicitudes
      for (let index = 0; index < this.listaEscalaSolicitudes.length; index++) {
        const element = this.listaEscalaSolicitudes[index];
        var obj = {
          "Id": element.id,
          "Escala Solicitud": element.descripcion
        }
        this.listEscalaSolicitudes.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listEscalaSolicitudes);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaEscalasSolicitudes");
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
