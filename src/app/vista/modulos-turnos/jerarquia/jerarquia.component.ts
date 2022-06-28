import { JerarquiaService } from './../../../servicios/jerarquia.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarJerarquiaComponent } from './agregar-jerarquia/agregar-jerarquia.component';
import { ModificarJerarquiaComponent } from './modificar-jerarquia/modificar-jerarquia.component';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {
  dtOptions: any = {};

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  constructor(
    private jerarquiaService: JerarquiaService,
    public dialog: MatDialog

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
      }
    );
  }

  modificarJerarquia(id: number, descripcion: String): void {
    console.log(id, descripcion);
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
            'Se eliminó el Tipo de novedad.',
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
}
