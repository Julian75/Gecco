import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { Proveedor } from 'src/app/modelos/proveedor';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  displayedColumns = ['id', 'direccion','tipoDocumento', 'documento','nombre','observacion','telefono','estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaProveedor: any = [];
  constructor(
    private servicioProveedor: ProveedorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listaTodos();
  }

  public listaTodos() {
    this.servicioProveedor.listarTodos().subscribe(res => {
      this.listaProveedor = res
      this.dataSource = new MatTableDataSource(this.listaProveedor);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  modificarProveedor(id: number): void {
    const dialogRef = this.dialog.open(ModificarProveedorComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarProveedor(id:number){
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
        this.servicioProveedor.eliminar(id).subscribe(res=>{
          this.listaTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Proveedor Correctamente.',
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
      this.dataSource = new MatTableDataSource(this.listaProveedor);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Proveedor, filter: string) => {
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

  listadoProveedores: any = [];
  listaProveedoresCompletos: any = []
  exportToExcel(): void {
    this.listaProveedoresCompletos = []
    this.servicioProveedor.listarTodos().subscribe(resProveedores=>{
      this.listadoProveedores = resProveedores
      for (let index = 0; index < this.listadoProveedores.length; index++) {
        const element = this.listadoProveedores[index];
        var obj = {
          "Id": element.id,
          "Nombre": element.nombre,
          "Tipo de Documento": element.idTipoDocumento.descripcion,
          Documento: element.documento,
          Direccion: element.direccion,
          Telefono: element.telefono,
          Observacion: element.observacion,
          Estado: element.idEstado.descripcion
        }
        this.listaProveedoresCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaProveedoresCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaProveedores");
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
