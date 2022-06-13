import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  dtOptions: any = {};
  public listarTurnos: any = [];

  displayedColumns = ['id', 'descripcion', 'horaInicio', 'horaFinal', 'estado', 'tipoTurno', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioTurno: TurnosService,
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
    this.servicioTurno.listarTodos().subscribe( res =>{
      this.listarTurnos = res;
      this.dataSource = new MatTableDataSource( this.listarTurnos);
    })
  }

  // abrirModal(): void {
  //   const dialogRef = this.dialog.open(AgregarTipoTurnoComponent, {
  //     width: '500px',
  //   });
  // }

  // modificarModulo(id: number): void {
  //   const dialogRef = this.dialog.open(ModificarModuloComponent, {
  //     width: '500px',
  //     data: id
  //   });
  //   console.log(id)
  // }

  // eliminarModulo(id:number){
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
  //       this.servicioModulo.eliminar(id).subscribe(res=>{
  //         this.listarTodos();
  //         swalWithBootstrapButtons.fire(
  //           'Eliminado!',
  //           'Se elimino el modulo.',
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
