import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { OpcionArticuloBajaService } from 'src/app/servicios/opcionArticuloBaja.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InventarioService } from 'src/app/servicios/inventario.service';
import {MatDialog} from '@angular/material/dialog';
import { InformacionDetalladaActivosComponent } from './informacion-detallada-activos/informacion-detallada-activos.component';

@Component({
  selector: 'app-solicitud-articulos-baja',
  templateUrl: './solicitud-articulos-baja.component.html',
  styleUrls: ['./solicitud-articulos-baja.component.css']
})
export class SolicitudArticulosBajaComponent implements OnInit {

  displayedColumns = ['id', 'activo', 'placa', 'serial', 'categoria', 'observacion'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaArticulos: any = [];
  public listaOpciones: any = [];
  public formSolicitud!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicioAsignacionArticulo: AsignacionArticulosService,
    private servicioOpcionesBajas: OpcionArticuloBajaService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioInventario: InventarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarOpciones();
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      dato: [null,Validators.required],
    });
  }

  public listarOpciones(){
    this.servicioOpcionesBajas.listarTodos().subscribe(res=>{
      this.listaOpciones = res
    })
  }

  opcion: any;
  capturarOpcion(opcion:any){
    this.opcion=opcion
  }

  validar = true;
  public abrirDetalle(){
    this.servicioInventario.listarTodos().subscribe(resInventario=>{
      var dato = this.formSolicitud.controls['dato'].value;
      if(dato != null || dato != undefined && this.opcion != null){
        for (let i = 0; i < resInventario.length; i++) {
          const element = resInventario[i];
          if(element.idDetalleArticulo.placa.toLowerCase() == dato.toLowerCase() || element.idDetalleArticulo.serial.toLowerCase() == dato.toLowerCase()){
            const dialogRef = this.dialog.open(InformacionDetalladaActivosComponent, {
              width: '900px',
              height: '440px',
              data: element
            });
            dialogRef.afterClosed().subscribe(() =>{
              console.log("hola")
            });
            this.validar = false
          }else{
            if(i == resInventario.length && this.validar == true){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No se encontro ningun activo con esa placa o serial!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
          console.log(this.validar)
        };
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo y la seleccion no pueden estar vacios!',
          showConfirmButton: false,
          timer: 1500
        })
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
  name = 'listaAsignacionPuntoVentaArticulo.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('asignacionPuntoVenta');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}