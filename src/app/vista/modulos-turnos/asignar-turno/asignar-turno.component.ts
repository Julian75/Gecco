import { AsignarTurnoService } from './../../../servicios/asignarTurno.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrls: ['./asignar-turno.component.css']
})
export class AsignarTurnoComponent implements OnInit {
  dtOptions: any = {};
  public listarTurnos: any = [];
  public listarOficinas: any = [];
  public listarSitioVentas: any = [];

  displayedColumns = ['id', 'estado', 'horaInicio', 'horaFinal', 'nombreOficina', 'nombreSitioVenta', 'tipoTurno', 'Opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarTurno: AsignarTurnoService,
    private serviceOficina: OficinasService,
    private serviceSitioVenta: SitioVentaService
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
    this.servicioAsignarTurno.listarTodos().subscribe( res =>{
      this.listarTurnos = res;
      console.log(res)
      this.dataSource = new MatTableDataSource(this.listarTurnos);
    })
  }

  eliminarUsuario(id:number){
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
        this.servicioAsignarTurno.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el usuario.',
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
