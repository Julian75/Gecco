import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { OpcionesVisitaService } from 'src/app/servicios/opcionesVisita.service';
import { AgregarOpcionesVisitaComponent } from './agregar-opciones-visita/agregar-opciones-visita.component';
import { ModificarOpcionesVisitaComponent } from './modificar-opciones-visita/modificar-opciones-visita.component';

@Component({
  selector: 'app-opciones-visita',
  templateUrl: './opciones-visita.component.html',
  styleUrls: ['./opciones-visita.component.css']
})
export class OpcionesVisitaComponent implements OnInit {
  dtOptions: any = {};

  displayedColumns = ['idOpcionVisita', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public servicioOpcionesVisita: OpcionesVisitaService,
  ) {}


  ngOnInit(): void {
    this.listarTodo();
  }

  public listarTodo(){
    this.servicioOpcionesVisita.listarTodos().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
    })
  }

  abrilModal():void{
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const dialogRef = this.dialog.open(AgregarOpcionesVisitaComponent, {
        width: '500px',
        data: id
      });
    })
  }

  modificarOpcion(id: number): void {
    const dialogRef = this.dialog.open(ModificarOpcionesVisitaComponent, {
      width: '500px',
      data: id
    });

  }

  eliminarOpcion(id:number){
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
        this.servicioOpcionesVisita.eliminar(id).subscribe(res=>{
          this.listarTodo();
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
  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
