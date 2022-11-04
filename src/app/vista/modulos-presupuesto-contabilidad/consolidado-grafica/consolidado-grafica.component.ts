import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { LibroMayorService } from 'src/app/servicios/libroMayor.service';
import * as fs from 'file-saver'
import { Workbook, Worksheet } from 'exceljs'
import { data } from 'jquery';
import { style } from '@angular/animations';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-consolidado-grafica',
  templateUrl: './consolidado-grafica.component.html',
  styleUrls: ['./consolidado-grafica.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
   ]
})
export class ConsolidadoGraficaComponent implements OnInit {
  //solo año
  selectYear:any
  date = new FormControl();
  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;

  //Excel
  private _workbook!: Workbook

  constructor(
    private servicioLibroMayor: LibroMayorService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioCuentas: CuentasService,
  ) { }

  ngOnInit(): void {
  }

  chosenYearHandler(ev, input){
    let { _d } = ev;
    this.selectYear = _d;
    this.picker.close()
  }

  listaClases: any = []
  consolidadoGuardar(){
    this.listaClases = []
    var listaPosiciones = []
    this.servicioConsultasGenerales.listarLibrosMayorAño((this.selectYear.getFullYear()-2)).subscribe(resLibrosMayorAñoAnteriorDos=>{
      this.servicioConsultasGenerales.listarLibrosMayorAño((this.selectYear.getFullYear()-1)).subscribe(resLibrosMayorAñoAnteriorUno=>{
        this.servicioConsultasGenerales.listarLibrosMayorAño(this.selectYear.getFullYear()).subscribe(resLibrosMayorAño=>{
          this.servicioConsultasGenerales.listarCuentasPorJerarquia(1).subscribe(resCuentasJerarquia=>{
            var i = 0
            var obj = {
              libroMayor: {},
              libroMayorAnteriorDos: {},
              libroMayorAnteriorUno: {},
              clase: 0,
            }
            resLibrosMayorAño.forEach(elementLibroMayorAño => {
            //   this.servicioLibroMayor.listarPorId(elementLibroMayorAño.id).subscribe(resLibroMayorId=>{
            //     for (let index = 0; index < resCuentasJerarquia.length; index++) {
            //       const element = resCuentasJerarquia[index];
            //       var codigoSplit = String(resLibroMayorId.idCuenta.codigo).split('')
            //       if(element.codigo == Number(codigoSplit[0])){
            //         var obj = {
            //           libroMayor: resLibroMayorId,
            //           clase: element.codigo
            //         }
            //         this.listaClases.push(obj)
            //         i++
            //         }
            //         console.log(this.listaClases)
            //       }
            //       this.listaClases.sort((a, b) => Number(a.clase) - Number(b.clase))
            //       if(i == resLibrosMayorAño.length){
            //         var obj2 = {
            //           libroMayor: '',
            //           clase: ''
            //         }
            //         console.log(this.listaClases)
            //         for (let index = 0; index < this.listaClases.length; index++) {
            //           if(index >= 1){
            //             if(this.listaClases[index].clase != this.listaClases[index-1].clase){
            //               listaPosiciones.push(index)
            //             }
            //           }
            //         }
            //         console.log(listaPosiciones)
            //         listaPosiciones.forEach(element => {
            //           this.listaClases.splice(element, 0, obj2)
            //         });
            //         this.descargarExcel(this.listaClases, resCuentasJerarquia)
            //       }
            //     })
            })
          })
        })
      })
    });
  }

  private descargarExcel(listaClases: any, cantidadClases: any){
    this._workbook = new Workbook()
    this._workbook.creator = 'DigiDev';

    this.crearHoja(listaClases, cantidadClases);

    this._workbook.xlsx.writeBuffer().then((data)=>{
      const blob = new Blob([data])
      fs.saveAs(blob, 'consolidado.xlsx');
    })
  }

  private crearHoja(listaClases: any, cantidadClases){
    const hoja = this._workbook.addWorksheet('consolidado')

    //Estable el ancho de cada columna
    hoja.getColumn('B').width = 43;
    hoja.getColumn('C').width = 21;
    hoja.getColumn('D').width = 21;
    hoja.getColumn('E').width = 21;
    hoja.getColumn('F').width = 21;
    hoja.getColumn('G').width = 15;
    hoja.columns.forEach((column)=>{
      if(column.number == 2){
        column.alignment = { horizontal: 'left', wrapText: true}
      }
    })

    //Combinacion de celdas
    hoja.mergeCells('B2:G3') //Combinar Celdas
    hoja.mergeCells('B4:G5') //Combinar Celdas
    hoja.mergeCells('B6:G6') //Combinar Celdas
    hoja.mergeCells('B8:G8') //Combinar Celdas

    //Capturar años
    var añoanterioruno = this.selectYear.getFullYear()-1
    var añoanteriordos = this.selectYear.getFullYear()-2
    var tituloAños = añoanteriordos+' - '+añoanterioruno+' vs '+this.selectYear.getFullYear()

    //Titulos principales
    this.titulosPrincipales(hoja,[
      { value: 'ESTADO DE RESULTADO CONSOLIDADO', cell: 'B2'},
      { value: ''+tituloAños, cell: 'B4'}
    ])

    //Header Tablas
    this.headerTabla(hoja,[
      { value: 'VENTAS BRUTAS', cell: 'B7'},
      { value: ''+añoanteriordos, cell: 'C7'},
      { value: ''+añoanterioruno, cell: 'D7'},
      { value: ''+this.selectYear.getFullYear(), cell: 'E7'},
      { value: 'Variación '+(String(añoanterioruno).split(''))[2]+(String(añoanterioruno).split(''))[3]+'/'+(String(this.selectYear.getFullYear()).split(''))[2]+(String(this.selectYear.getFullYear()).split(''))[3], cell: 'F7'},
      { value: '%', cell: 'G7'},
    ])

    //Bordes por fila
    hoja.getRow(2).eachCell(cell => Object.assign(cell, {
      border: {
        bottom: { style: 'medium'},
      }
    }))
    hoja.getRow(7).eachCell(cell => Object.assign(cell, {
      border: {
        bottom: { style: 'thin'},
        top: { style: 'thin'},
        left: { style: 'thin'},
        rigth: { style: 'thin'},
      }
    }))
  
    //Insertamos el libro mayor
    const libroMayor = hoja.getRows(9, listaClases.length)
    for (let index = 0; index < libroMayor.length; index++) {
      const element = libroMayor[index];
      const listaFilas = listaClases[index]
      console.log(element, listaFilas)
      if(index == 0){
        this.agregarDatos(element, listaFilas)
      }else{
        if(listaClases[index] != undefined){
          this.agregarDatos(element, listaFilas)
        }
      }
     }
  }

  private agregarDatos(element, listaFilas){
    if(listaFilas.libroMayor != ''){
      element.values = [
        '',
        listaFilas.libroMayor.idCuenta.descripcion,
        listaFilas.libroMayor.valor,
        '',
        '',
        '',
        '',
      ]
    }else{
      element.values = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]
    }
  }

  private titulosPrincipales(
    hoja: Worksheet,
    cells: { value: string; cell: string }[]
    ){
      cells.forEach(element => {
      const hojaActual = hoja.getCell(element.cell)
      //configurar estilos
      hojaActual.value = element.value;
      hojaActual.style = {
        font: { size: 20, bold: true,  color: { argb: 'FFFFFF' } },
        fill: {
          type: 'pattern' , //patron o bloque
          pattern: 'solid',
          fgColor: { argb: '16365C' },
        },
        alignment: { horizontal: 'center', vertical: 'middle' },
      }
    }); 
  }

  private headerTabla(
    hoja: Worksheet,
    cells: { value: string; cell: string }[]
    ){
      cells.forEach(element => {
      const hojaActual = hoja.getCell(element.cell)
      //configurar estilos
      hojaActual.value = element.value;
      hojaActual.style = {
        font: { size: 15, bold: true,  color: { argb: '000000' }, italic: true },
        fill: {
          type: 'pattern' , //patron o bloque
          pattern: 'solid',
          fgColor: { argb: 'F49295' },
        },
        alignment: { horizontal: 'center', vertical: 'middle' },
      }
    });
    
  }
}
