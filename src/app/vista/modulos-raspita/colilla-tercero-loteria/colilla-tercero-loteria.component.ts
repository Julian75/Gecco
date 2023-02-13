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
    private servicioColillaTerceroLoteria: ColillaTerceroLoteriaService
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

  file: any
  fileReader: any
  workBook: any
  sheetName: any
  excelData: any = []
  public readExcel(event: any){
    this.file = event.target.files[0];

    this.fileReader = new FileReader();
    this.fileReader.readAsBinaryString(this.file);

    this.fileReader.onload = (e)=>{
      this.workBook = XLSX.read(this.fileReader.result,{type:'binary'})
      this.sheetName = this.workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(this.workBook.Sheets[this.sheetName[0]])
    }
  }

  consultarColillasCompleto(){
    if(this.excelData.length > 0){
      document.getElementById('visualizarTabla')?.setAttribute('style', 'display: none;')
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.listaColillaTercero = []
      for (let index = 0; index < this.excelData.length; index++) {
        const elementData = this.excelData[index];
        if(elementData.serie == undefined || elementData.colilla == undefined){
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          if(index == 0){
            Swal.fire({
              icon: 'error',
              title: 'El archivo se encuentra sin ninguna serie con colilla!',
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Debe indicar la serie y colilla de todos!',
              showConfirmButton: false,
              timer: 1500
            });
          }
          break
        }else{
          this.servicioColillaTerceroLoteria.listarPorId(elementData.serie.toUpperCase(),Number(elementData.colilla)).subscribe(resColillaTercero => {
            if(resColillaTercero.length > 0){
              resColillaTercero.forEach(elementColillaTercero => {
                this.listaColillaTercero.push(elementColillaTercero)
              });
            }
            console.log(this.listaColillaTercero)
            if(this.listaColillaTercero.length == this.excelData.length){
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              document.getElementById('visualizarTabla')?.setAttribute('style', 'display: block;')
              this.dataSource = new MatTableDataSource(this.listaColillaTercero);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          })
        }
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Debe seleccionar un archivo!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  public exportToExcel() {
    for (let i = 0; i < this.listaColillaTercero.length; i++) {
      const element = this.listaColillaTercero[i];
      console.log(element)
      var obj = {
        'Colilla': element.colilla,
        'Serie': element.serie,
        'Consecutivo': element.colilla_tercero,
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
