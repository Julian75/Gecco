import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dtOptions: any = {};
  public listarUsuarios: any = [];

  displayedColumns = ['id', 'nombre', 'apellido', 'correo', 'documento', 'tipoDocumento', 'estado', 'rol', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    // private servicioTurno: TurnosService,
    // public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.listarTodos();
    // this.dtOptions = {
    //   dom: 'Bfrtip',
    //   pagingType: 'full_numbers',
    //   pageLength: 7,
    //   processing: true,
    //   buttons: [
    //     {
    //       extend: 'excel',
    //       text: '<i class="fa-solid fa-file-excel text-success btnexcel" style="background-color:#6DBE53;"></i>',
    //     },
    //     {
    //       extend: 'pdf',
    //       text: '<i class="fa-solid fa-file-pdf" style="background-color: #DA161A;"></i>',
    //     },
    //      {
    //       extend: 'print',
    //       text: '<i class="fa-solid fa-print " style="color:#959595" ></i>',
    //      }
    //   ]
    // };
  }

  // public listarTodos () {
  //   this.servicioTurno.listarTodos().subscribe( res =>{
  //     this.listarTurnos = res;
  //     this.dataSource = new MatTableDataSource( this.listarTurnos);
  //     console.log(res)
  //   })
  // }

  // eliminarTurnos(id:number){
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger mx-5'
  //     },
  //     buttonsStyling: false
  //   })

  //   swalWithBootstrapButtons.fire({
  //     title: '¿Estas seguro?',
  //     text: "No podrás revertir esto!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Si, Eliminar!',
  //     cancelButtonText: 'No, Cancelar!',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.servicioTurno.eliminar(id).subscribe(res=>{
  //         this.listarTodos();
  //         swalWithBootstrapButtons.fire(
  //           'Eliminado!',
  //           'Se elimino el turno.',
  //           'success'
  //         )
  //       })
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       swalWithBootstrapButtons.fire(
  //         'Cancelado!',
  //         '',
  //         'error'
  //       )
  //     }
  //   })
  // }

}
