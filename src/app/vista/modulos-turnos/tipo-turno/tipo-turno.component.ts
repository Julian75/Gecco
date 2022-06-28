import { ModificarTipoTurnoComponent } from './modificar-tipo-turno/modificar-tipo-turno.component';
import { AgregarTipoTurnoComponent } from './agregar-tipo-turno/agregar-tipo-turno.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { TipoTurnoService } from 'src/app/servicios/tipoTurno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-turno',
  templateUrl: './tipo-turno.component.html',
  styleUrls: ['./tipo-turno.component.css']
})
export class TipoTurnoComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoTurnos: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioTipoTurno: TipoTurnoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioTipoTurno.listarTodos().subscribe( res =>{
      this.listarTipoTurnos = res;
      console.log(res)
      this.dataSource = new MatTableDataSource( this.listarTipoTurnos);
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarTipoTurnoComponent, {
      width: '500px',
    });
  }

  modificarTipoTurno(id: number): void {
    const dialogRef = this.dialog.open(ModificarTipoTurnoComponent, {
      width: '500px',
      data: id
    });
    console.log(id)
  }

  eliminarTipoTurno(id:number){
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
        this.servicioTipoTurno.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Tipo de turno.',
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
