import { ModificarRolComponent } from './modificar-rol/modificar-rol.component';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';
import { RolService } from './../../../servicios/rol.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  dtOptions: any = {};
  public listarRoles: any = [];

  displayedColumns = ['id', 'descripcion','estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private servicioRol: RolService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true,
      buttons: [
        {
          extend: 'excel',
          text: '<i class="fa-solid fa-file-excel text-success btnexcel" style="background-color:#6DBE53;"></i>',
        },
        {
          extend: 'pdf',
          text: '<i class="fa-solid fa-file-pdf" style="background-color: #DA161A;"></i>',
        },
         {
          extend: 'print',
          text: '<i class="fa-solid fa-print " style="color:#959595" ></i>',
         }
      ]
    };
  }

  public listarTodos () {
    this.servicioRol.listarTodos().subscribe( res =>{
      this.listarRoles = res;
      console.log(res)
      this.dataSource = new MatTableDataSource( this.listarRoles);
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarRolComponent, {
      width: '500px',
    });
  }

  modificarRol(id: number): void {
    const dialogRef = this.dialog.open(ModificarRolComponent, {
      width: '500px',
      data: id
    });
    console.log(id)
  }

  eliminarRol(id:number){
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
        this.servicioRol.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Rol.',
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
}
