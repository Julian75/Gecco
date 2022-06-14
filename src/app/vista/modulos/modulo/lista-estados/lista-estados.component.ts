import { AgregarEstadoComponent } from './agregar-estado/agregar-estado.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/servicios/estado.service';

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


  constructor(
    private servicioEstadoModulo: EstadoService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
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
