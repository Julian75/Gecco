import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ColillaTerceroLoteriaService } from 'src/app/servicios/serviciosSiga/colillaTercero.service';
import { ColillaTercero } from 'src/app/modelos/modelosSiga/colillaTercero';
@Component({
  selector: 'app-colilla-tercero-loteria',
  templateUrl: './colilla-tercero-loteria.component.html',
  styleUrls: ['./colilla-tercero-loteria.component.css']
})
export class ColillaTerceroLoteriaComponent implements OnInit {
  public formColillaTercero!: FormGroup;
  public listaColillaTercero: any = [];
  public exportarArthivo: any = []
  color = ('primary');
  displayedColumns = ['colilla','serie', 'colillaTercero'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private servicio: ColillaTerceroLoteriaService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  public crearFormulario(){
    this.formColillaTercero = this.formBuilder.group({
      serie: new FormControl('', [Validators.required]),
      colilla: new FormControl('', [Validators.required]),
    });
  }

  section:boolean = false;
  exportar:boolean = false;
  buscador:boolean = false;
  public guardar(){
    this.listaColillaTercero = [];
    if(this.formColillaTercero.valid){
      const spinner = document.getElementById('snipper');
      const paginator = document.getElementById('paginator');
      this.section = false;
      this.exportar = false;
      this.buscador = false;
      this.formColillaTercero.value.serie = this.formColillaTercero.value.serie.toUpperCase();
      if(isNaN(this.formColillaTercero.value.colilla)){//isNaN sirve para verificar si el valor se puede convertir en un numero o no
        paginator?.setAttribute('style', 'display: none;');
        Swal.fire({
          icon: 'error',
          title: 'La colilla debe ser un número',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        this.servicio.listarPorId(this.formColillaTercero.value.serie,this.formColillaTercero.value.colilla).subscribe( data => {
          if(data.length > 0){
            document.getElementById('snipper')?.setAttribute('style', 'display: block;')
            paginator?.setAttribute('style', 'display: block;');
            this.section = true;
            this.exportar = true;
            this.buscador = true;
            //Desde aqui
            async function sleep(ms: number) {
              try {
                await new Promise(resolve => setTimeout(resolve, ms));
              }
              catch (e) {
                spinner?.setAttribute('style', 'display: none;');
                stop();
              }
            }
            sleep(1000).then(() => {
              this.listaColillaTercero = data;
              this.dataSource = new MatTableDataSource(this.listaColillaTercero);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            }).catch(() => {
              spinner?.setAttribute('style', 'display: none;');
              stop();
            });
            //hasta aqui
          }else{
            paginator?.setAttribute('style', 'display: none;');
            Swal.fire({
              icon: 'error',
              title: 'No se encontraron registros',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public exportToExcel() {
    for (let i = 0; i < this.listaColillaTercero.length; i++) {
      var obj = {
        'Colilla': this.listaColillaTercero[i].colilla,
        'Serie': this.listaColillaTercero[i].serie,
        'Colilla Tercero': this.listaColillaTercero[i].colilla_tercero,
      }
      this.exportarArthivo.push(obj);
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportarArthivo);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Colilla Tercero');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName  +'.xlsx');
  }



  // Filtrado
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaColillaTercero);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: ColillaTercero, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1 ;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}
