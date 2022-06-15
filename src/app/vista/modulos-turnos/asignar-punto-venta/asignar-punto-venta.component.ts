import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { AsignarPuntoVentaService } from 'src/app/servicios/asignarPuntoVenta.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarAsignarPuntoVentaComponent } from './agregar-asignar-punto-venta/agregar-asignar-punto-venta.component';

@Component({
  selector: 'app-asignar-punto-venta',
  templateUrl: './asignar-punto-venta.component.html',
  styleUrls: ['./asignar-punto-venta.component.css']
})
export class AsignarPuntoVentaComponent implements OnInit {

  dtOptions: any = {};
  public listaAsignarPuntoVenta: any = [];

  displayedColumns = ['id', 'nombreOficina', 'nombreSitioVenta', 'horaInicio', 'horaFinal', 'tipoTurno', 'puntoVenta', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarPuntoVenta: AsignarPuntoVentaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 4,
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
    this.servicioAsignarPuntoVenta.listarTodos().subscribe( res =>{
      this.listaAsignarPuntoVenta = res;
      this.dataSource = new MatTableDataSource( this.listaAsignarPuntoVenta);
      console.log(res)
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarAsignarPuntoVentaComponent, {
      width: '500px',
    });
  }

  eliminarPuntoVenta(id:number){
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger mx-5'
    //   },
    //   buttonsStyling: false
    // })

    // swalWithBootstrapButtons.fire({
    //   title: '¿Estas seguro?',
    //   text: "No podrás revertir esto!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Si, Eliminar!',
    //   cancelButtonText: 'No, Cancelar!',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.servicioTurno.eliminar(id).subscribe(res=>{
    //       this.listarTodos();
    //       swalWithBootstrapButtons.fire(
    //         'Eliminado!',
    //         'Se elimino el turno.',
    //         'success'
    //       )
    //     })
    //   } else if (
    //     /* Read more about handling dismissals below */
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     swalWithBootstrapButtons.fire(
    //       'Cancelado!',
    //       '',
    //       'error'
    //     )
    //   }
    // })
  }

}
