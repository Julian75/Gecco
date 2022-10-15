import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { AgregarAccesosComponent } from './agregar-accesos/agregar-accesos.component';
import Swal from 'sweetalert2';
import { ModificarAccesosComponent } from './modificar-accesos/modificar-accesos.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { Accesos } from 'src/app/modelos/accesos';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  dtOptions: any = {};
  public listarAccesoRol: any = [];
  public nombreRol: any;
  public Rol: any;
  displayedColumns = ['id', 'idModulo','idRol', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    // private servicioAccesoRol: ,
    public dialog: MatDialog,
    public accesoServicio : AccesoService,
    private route: ActivatedRoute,
    private accessoRol : AccesoService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }
  public listarTodos(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.accessoRol.listarTodos().subscribe( res =>{
        res.forEach(element => {
          if(element.idRol.id == id){
            this.listarAccesoRol.push(element)
            this.Rol = element.idRol.descripcion;
            this.nombreRol = element.idRol.descripcion
          }
        });
        this.dataSource = new MatTableDataSource(this.listarAccesoRol);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  abrirModal(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const dialogRef = this.dialog.open(AgregarAccesosComponent, {
        width: '500px',
        data: id
      });
    })
  }
  modificarAcceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarAccesosComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarAcceso(id:number){
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
        this.accesoServicio.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el acceso.',
            'success'
          )
        })
        this.router.navigate(['/roles']);
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
      this.dataSource = new MatTableDataSource(this.listarAccesoRol);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Accesos, filter: string) => {
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

  listadoAccesos: any = [];
  listaAccesosCompletos: any = []
  idRol: any;
  exportToExcel(): void {
    this.listaAccesosCompletos = []
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRol = params.get('id');
      this.accessoRol.listarTodos().subscribe(resRoles=>{
        this.listadoAccesos = resRoles
        for (let index = 0; index < this.listadoAccesos.length; index++) {
          const element = this.listadoAccesos[index];
          if(element.idRol.id == this.idRol){
            var obj = {
              Id: element.id,
              Rol: element.idRol.descripcion,
              'Modulo de Acceso': element.idModulo.descripcion,
            }
            this.listaAccesosCompletos.push(obj)
          }
        }
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.listaAccesosCompletos);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "listaAccesos");
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





