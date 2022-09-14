import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { IngresoPersonalEmpresa } from 'src/app/modelos/ingresoPersonalEmpresa';
import { IngresoPersonalEmpresaService } from 'src/app/servicios/ingresoPersonalEmpresa.service';

@Component({
  selector: 'app-registro-ingreso',
  templateUrl: './registro-ingreso.component.html',
  styleUrls: ['./registro-ingreso.component.css']
})
export class RegistroIngresoComponent implements OnInit {

  public listaRegistro: any = [];
  public personasRegistradas: any = [];

  myControl = new FormControl<string | IngresoPersonalEmpresa>("");
  options: IngresoPersonalEmpresa[] = [];
  filteredOptions!: Observable<IngresoPersonalEmpresa[]>;

  displayedColumns = ['id', 'nombre','fecha', 'horaIng', 'horaSal', 'area', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioRegistro : IngresoPersonalEmpresaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.listaRegistro();
  }

  // abrirModal(): void {
  //   const dialogRef = this.dialog.open(AgregarTipoDocumentoComponent, {
  //     width: '500px',
  //   });
  // }

  public listarTodos() {
    this.servicioRegistro.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 71){
          this.listaRegistro.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listaRegistro);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public listarRegistro(){
    this.servicioRegistro.listarTodos().subscribe(res=>{
      this.personasRegistradas = res
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => {
          const num_identificacion = typeof value == 'string' ? value : value?.documento.toString();
          return num_identificacion ? this._filter(num_identificacion as string, this.personasRegistradas) : this.personasRegistradas.slice();
        }),
      );
    })
  }

  textoRegistro:any
  displayFn(registro: IngresoPersonalEmpresa): any {
    this.textoRegistro = registro
    if(this.textoRegistro == ""){
      this.textoRegistro = " "
    }else{
      this.textoRegistro = registro.documento.toString()

      return this.textoRegistro;
    }
  }

  num:any
  public _filter(numIdentificacion: string, registro:any): IngresoPersonalEmpresa[] {

    const filterValue = numIdentificacion;

    this.num = (registro.filter((registro:any) => (registro.documento.toString().includes(filterValue)))).length
    return registro.filter((registro:any) => (registro.documento.toString().includes(filterValue)));
  }

  document: any;
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.document = event.option.value
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaRegistros.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('registroIngreso');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
