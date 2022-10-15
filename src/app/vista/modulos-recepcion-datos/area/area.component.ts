import { AreaService } from 'src/app/servicios/area.service';
import { AgregarAreaComponent } from './agregar-area/agregar-area.component';
import { ModificarAreaComponent } from './modificar-area/modificar-area.component';
import { Component, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { Area } from 'src/app/modelos/area';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  displayedColumns = ['id', 'descripcion','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public listaArea: any = [];

  constructor(
    public dialog: MatDialog,
    private servicioArea: AreaService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }
  public listarTodos(){
    this.servicioArea.listarTodos().subscribe(res=>{
      this.listaArea = res
      this.dataSource = new MatTableDataSource(this.listaArea);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
    error=>{
      console.log(error);
    }
  }
  abrirModal(){
    const dialogRef = this.dialog.open(AgregarAreaComponent, {
      width: '500px',
    });
  }
  modificarTipoServicio(id: number): void {
    const dialogRef = this.dialog.open(ModificarAreaComponent, {
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
        this.servicioArea.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la Area.',
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
      this.dataSource = new MatTableDataSource(this.listaArea);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Area, filter: string) => {
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

  listaAreas: any = []; // Es para traer todos los dato del servicio area
  listAreas: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listAreas = []
    this.servicioArea.listarTodos().subscribe(resArea=>{
      this.listaAreas = resArea
      for (let index = 0; index < this.listaAreas.length; index++) {
        const element = this.listaAreas[index];
        var obj = {
          "Id": element.id,
          "Area": element.descripcion
        }
        this.listAreas.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listAreas);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaAreas");
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
