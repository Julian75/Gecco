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

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {
  dtOptions: any = {};
  color = ('primary');
  public fecha: Date = new Date();

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
        this.dataSource = new MatTableDataSource(data);
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  name = 'jerarquia.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('jerarquia');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
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
