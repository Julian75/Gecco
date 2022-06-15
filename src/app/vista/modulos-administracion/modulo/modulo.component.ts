import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarModuloComponent } from './modificar-modulo/modificar-modulo.component';
import { ModuloService } from './../../../servicios/modulo.service';

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarModuloComponent } from './agregar-modulo/agregar-modulo.component';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  dtOptions: any = {};
  public listarModulos: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioModulo: ModuloService,
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
    this.servicioModulo.listarTodos().subscribe( res =>{
      this.listarModulos = res;
      console.log(res)
      this.dataSource = new MatTableDataSource( this.listarModulos);
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarModuloComponent, {
      width: '500px',
    });
  }

  modificarModulo(id: number): void {
    const dialogRef = this.dialog.open(ModificarModuloComponent, {
      width: '500px',
      data: id
    });
    console.log(id)
  }

  eliminarModulo(id:number){
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
        this.servicioModulo.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el modulo.',
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

