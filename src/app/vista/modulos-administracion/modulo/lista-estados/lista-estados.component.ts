import { AgregarEstadoComponent } from './agregar-estado/agregar-estado.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarEstadoComponent } from './modificar-estado/modificar-estado.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista-estados',
  templateUrl: './lista-estados.component.html',
  styleUrls: ['./lista-estados.component.css']
})
export class ListaEstadosComponent implements OnInit {
  dtOptions: any = {};
  public listarEstadosModulo: any = [];
  public modulo: any;

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioEstadoModulo: EstadoService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.servicioEstadoModulo.listarTodos().subscribe( res =>{
        res.forEach(element => {
          if(element.idModulo.id == id){
            this.listarEstadosModulo.push(element)
            this.modulo = element.idModulo.descripcion
          }
        });
        console.log(this.listarEstadosModulo)
        this.dataSource = new MatTableDataSource(this.listarEstadosModulo);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
    })
  }

  abrirModal(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const dialogRef = this.dialog.open(AgregarEstadoComponent, {
        width: '500px',
        data: id
      });
    })
  }

   modificarEstado(id: number): void {
     const dialogRef = this.dialog.open(ModificarEstadoComponent, {
       width: '500px',
       data: id
     });
     console.log(id)
   }

   eliminarEstado(id:number){
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
         this.servicioEstadoModulo.eliminar(id).subscribe(res=>{
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
