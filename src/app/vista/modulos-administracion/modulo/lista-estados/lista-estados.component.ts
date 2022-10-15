import { AgregarEstadoComponent } from './agregar-estado/agregar-estado.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarEstadoComponent } from './modificar-estado/modificar-estado.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { Estado } from 'src/app/modelos/estado';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-estados',
  templateUrl: './lista-estados.component.html',
  styleUrls: ['./lista-estados.component.css']
})
export class ListaEstadosComponent implements OnInit {
  dtOptions: any = {};
  public listarEstadosModulo: any = [];
  public modulo: any;

  displayedColumns = ['id', 'descripcion', 'observacion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioEstadoModulo: EstadoService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.servicioEstadoModulo.listarTodos().subscribe( res =>{
        res.forEach(element => {
          if(element.idModulo.id == id){
            this.listarEstadosModulo.push(element)
            this.modulo = element.idModulo.descripcion
          }
        });
        this.dataSource = new MatTableDataSource(this.listarEstadosModulo);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
    })
  }

  abrirModal(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const dialogRef = this.dialog.open(AgregarEstadoComponent, {
        width: '500px',
        data: id
      });
    })
  }

   modificarEstado(id: number): void {
     const dialogRef = this.dialog.open(ModificarEstadoComponent, {
       width: '500px',
       data: id
     });
   }

   eliminarEstado(id:number){
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
         this.servicioEstadoModulo.eliminar(id).subscribe(res=>{
           swalWithBootstrapButtons.fire(
             'Eliminado!',
             'Se elimino el Estado.',
             'success'
           )
         })
         window.location.reload();
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
      this.dataSource = new MatTableDataSource(this.listarEstadosModulo);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Estado, filter: string) => {
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

  listadoEstados: any = [];
  listaEstadosCompletos: any = []
  idModulo: any;
  exportToExcel(): void {
    this.listaEstadosCompletos = []
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idModulo = params.get('id');
      this.servicioEstadoModulo.listarTodos().subscribe(resEstados=>{
        this.listadoEstados = resEstados
        for (let index = 0; index < this.listadoEstados.length; index++) {
          const element = this.listadoEstados[index];
          if(element.idModulo.id == this.idModulo){
            var obj = {
              Id: element.id,
              Modulo: element.idModulo.descripcion,
              'Estado del Modulo': element.descripcion,
            }
            this.listaEstadosCompletos.push(obj)
          }
        }
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.listaEstadosCompletos);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "listaEstados");
        });
      })
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

