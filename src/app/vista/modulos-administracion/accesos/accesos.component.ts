import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { AgregarAccesosComponent } from './agregar-accesos/agregar-accesos.component';
import Swal from 'sweetalert2';
import { ModificarAccesosComponent } from './modificar-accesos/modificar-accesos.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  dtOptions: any = {};
  public listarAccesoRol: any = [];
  public nombreRol: any;
  public Rol: any;
  displayedColumns = ['id', 'idModulo','idRol', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    // private servicioAccesoRol: ,
    public dialog: MatDialog,
    public accesoServicio : AccesoService,
    private route: ActivatedRoute,
    private accessoRol : AccesoService

  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }
  public listarTodos(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      // console.log(id);
      this.accessoRol.listarTodos().subscribe( res =>{
        res.forEach(element => {
          if(element.idRol.id == id){
            this.listarAccesoRol.push(element)
            this.Rol = element.idRol.descripcion;
            this.nombreRol = element.idRol.descripcion
            console.log(this.nombreRol)
          }
        });
        this.dataSource = new MatTableDataSource(this.listarAccesoRol);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  abrirModal(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const dialogRef = this.dialog.open(AgregarAccesosComponent, {
        width: '500px',
        data: id
      });
    })
  }
  modificarAcceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarAccesosComponent, {
      width: '500px',
      data: id
    });
    console.log(id)
  }

  eliminarAcceso(id:number){
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
        this.accesoServicio.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el modulo.',
            'success'
          )
        })
        window.location.reload();
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

  name = 'listaAccesos.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('accesos');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}





