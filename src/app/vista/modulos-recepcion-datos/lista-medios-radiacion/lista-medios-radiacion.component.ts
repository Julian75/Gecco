import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MediosRadiacionService } from 'src/app/servicios/medioRadiacion.service';
import { AgregarMediosRadiacionComponent } from './agregar-medios-radiacion/agregar-medios-radiacion.component';
import { ModificarMediosRadiacionComponent } from './modificar-medios-radiacion/modificar-medios-radiacion.component';
import { MediosRadiacion } from 'src/app/modelos/medioRadiacion';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-medios-radiacion',
  templateUrl: './lista-medios-radiacion.component.html',
  styleUrls: ['./lista-medios-radiacion.component.css']
})
export class ListaMediosRadiacionComponent implements OnInit {
  dtOptions: any = {};
  public listarMediosRadiacion: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioMediosRadiacion: MediosRadiacionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.servicioMediosRadiacion.listarTodos().subscribe(
      (res) => {
        this.listarMediosRadiacion = res;
        this.dataSource = new MatTableDataSource(this.listarMediosRadiacion);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
      }
    );
  }

  abrirModal(){
    const dialogRef = this.dialog.open(AgregarMediosRadiacionComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTodos();
    });

  }
  modificarMedioRadiacion(id:number){
    const dialogRef = this.dialog.open(ModificarMediosRadiacionComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTodos();
    });
  }
  eliminarMedioRadiacion(id:number){
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
        this.servicioMediosRadiacion.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el tipo documento.',
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
      this.dataSource = new MatTableDataSource(this.listarMediosRadiacion);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: MediosRadiacion, filter: string) => {
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

  listaMediosRadicacion: any = []; // Es para traer todos los datos del servicio medios de radicacion
  listMediosRadicacion: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listMediosRadicacion = []
    this.servicioMediosRadiacion.listarTodos().subscribe(resMediosRadicacion=>{
      this.listaMediosRadicacion = resMediosRadicacion
      for (let index = 0; index < this.listaMediosRadicacion.length; index++) {
        const element = this.listaMediosRadicacion[index];
        var obj = {
          "Id": element.id,
          "Medio de Radicación": element.descripcion
        }
        this.listMediosRadicacion.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listMediosRadicacion);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaMediosRadicacion");
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
