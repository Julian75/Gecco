import { JerarquiaService } from './../../../servicios/jerarquia.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarJerarquiaComponent } from './agregar-jerarquia/agregar-jerarquia.component';
import { ModificarJerarquiaComponent } from './modificar-jerarquia/modificar-jerarquia.component';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Jerarquia } from 'src/app/modelos/jerarquia';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {
  dtOptions: any = {};
  color = ('primary');
  public fecha: Date = new Date();
  public listaJerarquia: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private jerarquiaService: JerarquiaService,
    public dialog: MatDialog,
    private asignarTurnoVendedorSevicio: AsignarTurnoVendedorService,
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  abrirmodal(): void {
    const dialogRef = this.dialog.open(AgregarJerarquiaComponent, {
      width: '500px',
    });
  }

  public listarTodos(){
    this.jerarquiaService.listarTodos().subscribe(
      data => {
        this.listaJerarquia = data
        this.dataSource = new MatTableDataSource(this.listaJerarquia);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  modificarJerarquia(id: number, descripcion: String): void {
    const dialogRef = this.dialog.open(ModificarJerarquiaComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarJerarquia(id:number){
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
        this.jerarquiaService.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó la Jerarquia.',
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
      this.dataSource = new MatTableDataSource(this.listaJerarquia);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Jerarquia, filter: string) => {
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
  listadoJerarquia: any = [];
  listaJerarquiaCompletos: any = []
  exportToExcel(): void {
    this.listaJerarquiaCompletos = []
    this.jerarquiaService.listarTodos().subscribe(resJerarquia=>{
      this.listadoJerarquia = resJerarquia
      for (let index = 0; index < this.listadoJerarquia.length; index++) {
        const element = this.listadoJerarquia[index];
        var obj = {
          "Id": element.id,
          "Descripcion": element.descripcion,
        }
        this.listaJerarquiaCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaJerarquiaCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaJerarquias");
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

  documentos: any = []
  documentito:any;
  public aleatorio(){
    this.asignarTurnoVendedorSevicio.listarTodos().subscribe(res=>{
      res.forEach(element => {
        this.documentos.push(element.nombreVendedor)
      });
      var horaLimite = new Date(1982,2,12,this.fecha.getHours(), this.fecha.getMinutes()+1, this.fecha.getSeconds())
      var inter = setInterval(() => {
        var horaActual = new Date(1982,2,12,new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())
          if (horaActual<horaLimite) {
            var random = Math.floor(Math.random()*this.documentos.length)
            var valor = this.documentos[random]
            this.documentito = valor
          }else{
            clearInterval(inter)
          }
        },100)
    })
  }


}
