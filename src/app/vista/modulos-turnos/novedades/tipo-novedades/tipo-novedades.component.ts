import { AgregarTipoNovedadesComponent } from './agregar-tipo-novedades/agregar-tipo-novedades.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TipoNovedadesService } from 'src/app/servicios/tipoNovedades.Service';
import { ModificarTipoNovedadesComponent } from './modificar-tipo-novedades/modificar-tipo-novedades.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-novedades',
  templateUrl: './tipo-novedades.component.html',
  styleUrls: ['./tipo-novedades.component.css']
})
export class TipoNovedadesComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoNovedades: any = [];

  displayedColumns = ['id', 'descripcion', 'observacion', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioTipoNovedades: TipoNovedadesService,
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
    this.servicioTipoNovedades.listarTodos().subscribe( res =>{
      this.listarTipoNovedades = res;
      this.dataSource = new MatTableDataSource( this.listarTipoNovedades);
    })
  }

  agregarTipoNovedades(): void {
    const dialogRef = this.dialog.open(AgregarTipoNovedadesComponent, {
      width: '500px',
    });
  }

  modificarTipoNovedades(id: number): void {
    const dialogRef = this.dialog.open(ModificarTipoNovedadesComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoNovedades(id:number){
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
        this.servicioTipoNovedades.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Tipo de novedad.',
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
