import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AgregarOpcionesSolicitudBajasComponent } from './agregar-opciones-solicitud-bajas/agregar-opciones-solicitud-bajas.component';
import { ModificarOpcionesSolicitudBajasComponent } from './modificar-opciones-solicitud-bajas/modificar-opciones-solicitud-bajas.component';
import { OpcionArticuloBajaService } from 'src/app/servicios/opcionArticuloBaja.service';
import { OpcionArticuloBaja } from 'src/app/modelos/opcionArticuloBaja';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-opciones-solicitud-bajas',
  templateUrl: './opciones-solicitud-bajas.component.html',
  styleUrls: ['./opciones-solicitud-bajas.component.css']
})
export class OpcionesSolicitudBajasComponent implements OnInit {

  dtOptions: any = {};
  public listaOpciones: any = [];

  displayedColumns = ['idOpcionVisita', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public servicioOpcionesBajas: OpcionArticuloBajaService,
  ) {}


  ngOnInit(): void {
    this.listarTodo();
  }

  public listarTodo(){
    this.servicioOpcionesBajas.listarTodos().subscribe(res=>{
      this.listaOpciones = res
      this.dataSource = new MatTableDataSource(this.listaOpciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrilModal():void{
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const dialogRef = this.dialog.open(AgregarOpcionesSolicitudBajasComponent, {
        width: '500px',
        data: id
      });
    })
  }

  modificarOpcion(id: number): void {
    const dialogRef = this.dialog.open(ModificarOpcionesSolicitudBajasComponent, {
      width: '500px',
      data: id
    });

  }

  eliminarOpcion(id:number){
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
        this.servicioOpcionesBajas.eliminar(id).subscribe(res=>{
          this.listarTodo();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la Opcion Correctamente.',
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
      this.dataSource = new MatTableDataSource(this.listaOpciones);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: OpcionArticuloBaja, filter: string) => {
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

  listadoEstadoActivoBajaSolicitud: any = []; //listar todos los datos del servicio estado baja activo
  listaEstadoActivoBajaSolicitud: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoEstadoActivoBajaSolicitud = []
    this.servicioOpcionesBajas.listarTodos().subscribe(resEstadoActivoBaja=>{
      this.listaEstadoActivoBajaSolicitud = resEstadoActivoBaja
      for (let index = 0; index < this.listaEstadoActivoBajaSolicitud.length; index++) {
        const element = this.listaEstadoActivoBajaSolicitud[index];
        var obj = {
          "Id": element.id,
          "Estado Activo": element.descripcion,
        }
        this.listadoEstadoActivoBajaSolicitud.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listadoEstadoActivoBajaSolicitud);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaEstadosActivo");
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
