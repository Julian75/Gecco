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

  listaClases: any = [] // Lista de todos los libros mayores de las cuentas
  existe: boolean = false;
  listaExiste: any = [];
  idPosicionCuenta: any
  objetoModificar: any = []
  obj2: any = []
  consolidadoGuardar(){
    this.listaClases = []
    var listaPosiciones = []
    this.servicioConsultasGenerales.listarLibrosMayorAño(this.selectYear.getFullYear()).subscribe(resLibrosMayorAño=>{ // Libro Mayor Actual
      this.servicioConsultasGenerales.listarCuentasPorJerarquia(1).subscribe(resCuentasJerarquia=>{
        var i = 0
        resLibrosMayorAño.forEach(elementLibroMayorAño => {
          var obj = {
            cuenta: {},
            libroMayor: {},
            libroMayorAnteriorDos: {},
            libroMayorAnteriorUno: {},
            clase: 0,
          }
          var mesActual = new Date(elementLibroMayorAño.fecha).toISOString().slice(0,10)
          var fechaSplit = mesActual.split('-')
          var fechaAnteriorDos = (this.selectYear.getFullYear()-2)+'-'+(fechaSplit[1])+'-01'
          var fechaAnteriorUno = (this.selectYear.getFullYear()-1)+'-'+(fechaSplit[1])+'-01'
          this.servicioLibroMayor.listarPorId(elementLibroMayorAño.id).subscribe(resLibroMayorId=>{
            this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorDos).subscribe(resLibroMayorAnteriorDos=>{
              this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorUno).subscribe(resLibroMayorAnteriorUno=>{
                this.objetoModificar = []
                if(this.listaClases.length>0){
                  this.listaExiste = []
                  for (let index = 0; index < this.listaClases.length; index++) {
                    const element = this.listaClases[index];
                    if(element.cuenta.id == resLibroMayorId.idCuenta.id){
                      this.existe = true
                      this.idPosicionCuenta = index
                      this.objetoModificar.push(element)
                    }else{ this.existe = false }
                    this.listaExiste.push(this.existe)
                  }
                  const existe = this.listaExiste.includes(true)
                  if(existe == true){
                    this.listaClases[this.idPosicionCuenta].libroMayor.valor = Number(this.listaClases[this.idPosicionCuenta].libroMayor.valor)+Number(resLibroMayorId.valor)
                    if(resLibroMayorAnteriorDos.length > 0){
                      resLibroMayorAnteriorDos.forEach(elementLibroMayorAnteriorDos => {
                        var objetoModificar2 = {
                          cuenta: {},
                          libroMayor: {},
                          libroMayorAnteriorDos: {},
                          libroMayorAnteriorUno: {},
                          clase: 0,
                        }
                        this.objetoModificar.forEach(elementModificar => {
                          var objetoVacio = Object.entries(elementModificar.libroMayorAnteriorDos).length === 0
                          console.log(objetoVacio)
                          if(objetoVacio == true){
                            if(elementModificar.cuenta.id == elementLibroMayorAnteriorDos.idCuenta){
                              objetoModificar2.cuenta = elementModificar.cuenta
                              objetoModificar2.libroMayor = elementModificar.libroMayor
                              objetoModificar2.libroMayorAnteriorDos = elementLibroMayorAnteriorDos
                              objetoModificar2.libroMayorAnteriorUno = elementModificar.libroMayorAnteriorUno
                              objetoModificar2.clase = elementModificar.clase
                              this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar2)
                            }
                          }else{
                            if(elementModificar.cuenta.id == elementLibroMayorAnteriorDos.idCuenta){
                              var sumaValores = Number(elementModificar.libroMayorAnteriorDos.valor) + Number(elementLibroMayorAnteriorDos.valor)
                              elementModificar.libroMayorAnteriorDos.valor = sumaValores
                              objetoModificar2.cuenta = elementModificar.cuenta
                              objetoModificar2.libroMayor = elementModificar.libroMayor
                              objetoModificar2.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
                              objetoModificar2.libroMayorAnteriorUno = elementModificar.libroMayorAnteriorUno
                              objetoModificar2.clase = elementModificar.clase
                              this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar2)
                            }
                          }
                        })
                      });
                    }
                    if(resLibroMayorAnteriorUno.length > 0){
                      resLibroMayorAnteriorUno.forEach(elementLibroMayorAnteriorUno => {
                        var objetoModificar3 = {
                          cuenta: {},
                          libroMayor: {},
                          libroMayorAnteriorDos: {},
                          libroMayorAnteriorUno: {},
                          clase: 0,
                        }
                        this.objetoModificar.forEach(elementModificar => {
                          var objetoVacio2 = Object.entries(elementModificar.libroMayorAnteriorUno).length === 0
                          if(objetoVacio2 == true){
                            if(elementModificar.cuenta.id == elementLibroMayorAnteriorUno.idCuenta){
                              objetoModificar3.cuenta = elementModificar.cuenta
                              objetoModificar3.libroMayor = elementModificar.libroMayor
                              objetoModificar3.libroMayorAnteriorUno = elementLibroMayorAnteriorUno
                              objetoModificar3.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
                              objetoModificar3.clase = elementModificar.clase
                              this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar3)
                            }
                          }else{
                            if(elementModificar.cuenta.id == elementLibroMayorAnteriorUno.idCuenta){
                              var sumaValores = Number(elementModificar.libroMayorAnteriorUno.valor) + Number(elementLibroMayorAnteriorUno.valor)
                              elementModificar.libroMayorAnteriorUno.valor = sumaValores
                              objetoModificar3.cuenta = elementModificar.cuenta
                              objetoModificar3.libroMayor = elementModificar.libroMayor
                              objetoModificar3.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
                              objetoModificar3.libroMayorAnteriorUno = elementModificar.libroMayorAnteriorUno
                              objetoModificar3.clase = elementModificar.clase
                              this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar3)
                            }
                          }
                        })
                      });
                    }
                    i++
                  }else{
                    this.agregarLibrosMayoresCuentas(resCuentasJerarquia, obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno)
                    i++
                  }
                }else{
                  this.agregarLibrosMayoresCuentas(resCuentasJerarquia, obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno)
                  i++
                }
                this.listaClases.sort((a, b) => Number(a.clase) - Number(b.clase))
                if(i == resLibrosMayorAño.length){
                  console.log(this.listaClases)
                  var obj2 = {
                    cuenta: '',
                    libroMayorAnteriorDos: '',
                    libroMayorAnteriorUno: '',
                    libroMayor: '',
                    clase: ''
                  }
                  for (let index = 0; index < this.listaClases.length; index++) {
                    if(index >= 1){
                      if(this.listaClases[index].clase != this.listaClases[index-1].clase){
                        listaPosiciones.push(index)
                      }
                    }
                  }
                  listaPosiciones.forEach(element => {
                    this.listaClases.splice(element, 0, obj2)
                  });
                  this.descargarExcel(this.listaClases, resCuentasJerarquia)
                }
              })
            })
          })
        })
      })
    })
  }

  agregarLibrosMayoresCuentas(resCuentasJerarquia, obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno){
    for (let index = 0; index < resCuentasJerarquia.length; index++){
      const element = resCuentasJerarquia[index];
      var codigoSplit = String(resLibroMayorId.idCuenta.codigo).split('')
      if(element.codigo == Number(codigoSplit[0])){
        obj.cuenta = resLibroMayorId.idCuenta
        obj.libroMayor = resLibroMayorId
        if(resLibroMayorAnteriorDos.length > 0){
          resLibroMayorAnteriorDos.forEach(elementLibroMayorAnteriorDos => {
            obj.libroMayorAnteriorDos = elementLibroMayorAnteriorDos
          });
        }
        if(resLibroMayorAnteriorUno.length > 0){
          resLibroMayorAnteriorUno.forEach(elementLibroMayorAnteriorUno => {
            obj.libroMayorAnteriorUno = elementLibroMayorAnteriorUno
          });
        }
        obj.clase = element.codigo
        console.log(obj)
        this.listaClases.push(obj)
      }
    }
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
      if(column.number == 3 || column.number == 4 || column.number == 5){
        column.alignment = { horizontal: 'right', wrapText: true}
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
      if(index == 0){
        this.agregarDatos(element, listaFilas)
      }else{
        if(listaClases[index] != undefined){
          this.agregarDatos(element, listaFilas)
        }
      }
    }
    var listaCeldas = ['C', 'D', 'E', 'F', 'G']

    for (let index = 0; index < listaClases.length; index++) {
      const hojaActual = hoja.getCell("B"+(index+9))
      const element = listaClases[index];
      listaCeldas.forEach(elementCelda => {
        const hojaC = hoja.getCell(elementCelda+(index+9))
        if(element.libroMayor != ''){
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'D9ECF0' },
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }
      });
      //configurar estilos
      if(element.libroMayor != ''){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'B8CCE4' },
          },
          alignment: { horizontal: 'center', vertical: 'middle' },

        }
        hoja.getRow(index+9).eachCell(cell => {
          console.log(cell.col)
          if(cell.value != ''){
            Object.assign(cell,{
            border: {
              bottom: { style: 'thin'},
              top: { style: 'thin'},
              left: { style: 'thin'},
              rigth: { style: 'thin'},
            }
          })
          }
      })
      }
    }
  }

  private agregarDatos(element, listaFilas){
    if(listaFilas.libroMayor != ''){
      element.values = [
        '',
        listaFilas.libroMayor.idCuenta.descripcion,
        listaFilas.libroMayorAnteriorDos.valor,
        listaFilas.libroMayorAnteriorUno.valor,
        listaFilas.libroMayor.valor,
        listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
        (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
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
