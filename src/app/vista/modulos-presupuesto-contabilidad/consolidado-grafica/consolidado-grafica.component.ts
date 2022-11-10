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
          }
          var mesActual = new Date(elementLibroMayorAño.fecha).toISOString().slice(0,10)
          var fechaSplit = mesActual.split('-')
          var fechaAnteriorDos = (this.selectYear.getFullYear()-2)+'-'+(fechaSplit[1])+'-01'
          var fechaAnteriorUno = (this.selectYear.getFullYear()-1)+'-'+(fechaSplit[1])+'-01'
          this.servicioLibroMayor.listarPorId(elementLibroMayorAño.id).subscribe(resLibroMayorId=>{
            if(resLibroMayorId.idCuenta.codigo == 41357001 || resLibroMayorId.idCuenta.codigo == 41357002 || resLibroMayorId.idCuenta.codigo == 415030 || resLibroMayorId.idCuenta.codigo == 6 || resLibroMayorId.idCuenta.codigo == 51 || resLibroMayorId.idCuenta.codigo == 52 || resLibroMayorId.idCuenta.codigo == 53 || resLibroMayorId.idCuenta.codigo == 5305 || resLibroMayorId.idCuenta.codigo == 42){
              this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorDos).subscribe(resLibroMayorAnteriorDos=>{
                this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorUno).subscribe(resLibroMayorAnteriorUno=>{
                  this.objetoModificar = []
                  if(this.listaClases.length>0){
                    this.listaExiste = []
                    for (let index = 0; index < this.listaClases.length; index++) {
                      const element = this.listaClases[index];
                      if(element.cuenta.codigo == resLibroMayorId.idCuenta.id){
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
                          }
                          this.objetoModificar.forEach(elementModificar => {
                            var objetoVacio2 = Object.entries(elementModificar.libroMayorAnteriorUno).length === 0
                            if(objetoVacio2 == true){
                              if(elementModificar.cuenta.id == elementLibroMayorAnteriorUno.idCuenta){
                                objetoModificar3.cuenta = elementModificar.cuenta
                                objetoModificar3.libroMayor = elementModificar.libroMayor
                                objetoModificar3.libroMayorAnteriorUno = elementLibroMayorAnteriorUno
                                objetoModificar3.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
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
                  if(i == resLibrosMayorAño.length){
                    this.descargarExcel(this.listaClases, resCuentasJerarquia)
                  }
                })
              })
            }else{
              i++
            }
          })
        })
      })
    })
  }

  agregarLibrosMayoresCuentas(resCuentasJerarquia, obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno){
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
    this.listaClases.push(obj)
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

  listaDatosNecesarios: any = [];
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
    hoja.mergeCells('B15:G15') //Combinar Celdas
    hoja.mergeCells('B20:G20') //Combinar Celdas
    hoja.mergeCells('B24:G24') //Combinar Celdas

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

    // Insertamos el libro mayor
    //Sumas de los tres primeros para la venta neta
    var ventasNetasDosAnteriores = 0
    var ventasNetasUnoAnteriores = 0
    var ventasNetasActual = 0
    var ventasNetasVariacion = 0
    //Valor total de utilidad bruta
    var utilidadBrutaDosAnteriores = 0
    var utilidadBrutaUnoAnteriores = 0
    var utilidadBrutaActual = 0
    //Suma de los valores necesarios para restarlo en la utilidad operativa
    var sumaOperativaDosAnteriores = 0
    var sumaOperativaUnoAnteriores = 0
    var sumaOperativaActual = 0
    //Valor total de utilidad operativa
    var utilidadOperativaDosAnteriores = 0
    var utilidadOperativaUnoAnteriores = 0
    var utilidadOperativaActual = 0
    //Valores del codigo 53
    var egresosNoOperacionalesUno1 = 0
    var egresosNoOperacionalesUno2 = 0
    var egresosNoOperacionalesUno3 = 0
    //Valores del codigo 5305
    var egresosNoOperacionalesDos1 = 0
    var egresosNoOperacionalesDos2 = 0
    var egresosNoOperacionalesDos3 = 0
    //Total de egresos no operacionales
    var egresosNoOperacionalesTotalDosAnteriores = 0
    var egresosNoOperacionalesTotalUnoAnteriores = 0
    var egresosNoOperacionalesTotalActual = 0
    //Valor de los ingresos no operacionales
    var ingresosNoOperacionalesDosAnteriores = 0
    var ingresosNoOperacionalesUnoAnteriores = 0
    var ingresosNoOperacionalesActual = 0
    //Total de utilidad antes de impuestos
    var utilidadAntesImpuestosDosAnteriores = 0
    var utilidadAntesImpuestosUnoAnteriores = 0
    var utilidadAntesImpuestosActual = 0
    for (let index = 0; index < listaClases.length; index++) {
      const listaFilas = listaClases[index]
      console.log(listaFilas)
      const CHANCE = hoja.getRow(9)
      const VENTASRASPA = hoja.getRow(10)
      const LINEANEGOCIOS = hoja.getRow(11)
      const VENTASNETAS = hoja.getRow(12)
      const COSTOSVENTA = hoja.getRow(13)
      const UTILIDADBRUTA = hoja.getRow(14)
      const GASTOSADMINISTRACION = hoja.getRow(16)
      const GASTOSVENTAS = hoja.getRow(17)
      const GASTOSFINANCIEROS = hoja.getRow(18)
      const UTILIDADOPERATIVA = hoja.getRow(19)
      const INGRESOSNOOPERACIONALES = hoja.getRow(21)
      const EGRESOSNOOPERACIONALES = hoja.getRow(22)
      const UTILIDADANTESIMPUESTOS = hoja.getRow(23)

      //Primera Tabla
      if(listaFilas.libroMayor.idCuenta.codigo == 41357001){
        ventasNetasDosAnteriores = Number(ventasNetasDosAnteriores)+Number(listaFilas.libroMayorAnteriorDos.valor)
        ventasNetasUnoAnteriores = Number(ventasNetasUnoAnteriores)+Number(listaFilas.libroMayorAnteriorUno.valor)
        ventasNetasActual = Number(ventasNetasActual)+Number(listaFilas.libroMayor.valor)
        ventasNetasVariacion = Number(ventasNetasVariacion)+(Number(listaFilas.libroMayor.valor)-Number(listaFilas.libroMayorAnteriorUno.valor))
        CHANCE.values = [
          '',
          'CHANCE',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          Number(listaFilas.libroMayor.valor)-Number(listaFilas.libroMayorAnteriorUno.valor),
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      if(listaFilas.libroMayor.idCuenta.codigo == 41357002){
        ventasNetasDosAnteriores = Number(ventasNetasDosAnteriores)+Number(listaFilas.libroMayorAnteriorDos.valor)
        ventasNetasUnoAnteriores = Number(ventasNetasUnoAnteriores)+Number(listaFilas.libroMayorAnteriorUno.valor)
        ventasNetasActual = Number(ventasNetasActual)+Number(listaFilas.libroMayor.valor)
        ventasNetasVariacion = Number(ventasNetasVariacion)+(Number(listaFilas.libroMayor.valor)-Number(listaFilas.libroMayorAnteriorUno.valor))
        VENTASRASPA.values = [
          '',
          'VENTAS RASPA',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      if(listaFilas.libroMayor.idCuenta.codigo == 415030){
        ventasNetasDosAnteriores = Number(ventasNetasDosAnteriores)+Number(listaFilas.libroMayorAnteriorDos.valor)
        ventasNetasUnoAnteriores = Number(ventasNetasUnoAnteriores)+Number(listaFilas.libroMayorAnteriorUno.valor)
        ventasNetasActual = Number(ventasNetasActual)+Number(listaFilas.libroMayor.valor)
        ventasNetasVariacion = Number(ventasNetasVariacion)+(Number(listaFilas.libroMayor.valor)-Number(listaFilas.libroMayorAnteriorUno.valor))
        LINEANEGOCIOS.values = [
          '',
          'LINEA DE NEGOCIOS',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      VENTASNETAS.values = [
        '',
        'VENTAS NETAS',
        ventasNetasDosAnteriores,
        ventasNetasUnoAnteriores,
        ventasNetasActual,
        ventasNetasVariacion,
        (((ventasNetasActual-ventasNetasUnoAnteriores)/ventasNetasActual)*100).toFixed(2)+'%',
      ]
      if(listaFilas.libroMayor.idCuenta.codigo == 6){
        COSTOSVENTA.values = [
          '',
          '(-) COSTO DE VENTA',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
        utilidadBrutaDosAnteriores = ventasNetasDosAnteriores-listaFilas.libroMayorAnteriorDos.valor
        utilidadBrutaUnoAnteriores = ventasNetasUnoAnteriores-listaFilas.libroMayorAnteriorUno.valor
        utilidadBrutaActual = ventasNetasActual-listaFilas.libroMayor.valor
        UTILIDADBRUTA.values = [
          '',
          'UTILIDAD BRUTA',
          ventasNetasDosAnteriores-listaFilas.libroMayorAnteriorDos.valor,
          ventasNetasUnoAnteriores-listaFilas.libroMayorAnteriorUno.valor,
          ventasNetasActual-listaFilas.libroMayor.valor,
          ventasNetasVariacion-(listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor),
          ((((ventasNetasActual-listaFilas.libroMayor.valor)-(ventasNetasUnoAnteriores-listaFilas.libroMayorAnteriorUno.valor))/(ventasNetasActual-listaFilas.libroMayor.valor))*100).toFixed(2)+'%',
        ]
      }

      //Tabla Dos
      if(listaFilas.libroMayor.idCuenta.codigo == 51){
        sumaOperativaDosAnteriores = sumaOperativaDosAnteriores+Number(listaFilas.libroMayorAnteriorDos.valor)
        sumaOperativaUnoAnteriores = sumaOperativaUnoAnteriores+Number(listaFilas.libroMayorAnteriorUno.valor)
        sumaOperativaActual = sumaOperativaActual+Number(listaFilas.libroMayor.valor)
        GASTOSADMINISTRACION.values = [
          '',
          'GASTOS DE ADMINISTRACION',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      if(listaFilas.libroMayor.idCuenta.codigo == 52){
        sumaOperativaDosAnteriores = sumaOperativaDosAnteriores+Number(listaFilas.libroMayorAnteriorDos.valor)
        sumaOperativaUnoAnteriores = sumaOperativaUnoAnteriores+Number(listaFilas.libroMayorAnteriorUno.valor)
        sumaOperativaActual = sumaOperativaActual+Number(listaFilas.libroMayor.valor)
        GASTOSVENTAS.values = [
          '',
          'GASTOS DE VENTAS',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      if(listaFilas.libroMayor.idCuenta.codigo == 5305){
        sumaOperativaDosAnteriores = sumaOperativaDosAnteriores+Number(listaFilas.libroMayorAnteriorDos.valor)
        sumaOperativaUnoAnteriores = sumaOperativaUnoAnteriores+Number(listaFilas.libroMayorAnteriorUno.valor)
        sumaOperativaActual = sumaOperativaActual+Number(listaFilas.libroMayor.valor)

        egresosNoOperacionalesDos1 = listaFilas.libroMayorAnteriorDos.valor
        egresosNoOperacionalesDos2 = listaFilas.libroMayorAnteriorUno.valor
        egresosNoOperacionalesDos3 = listaFilas.libroMayor.valor
        GASTOSFINANCIEROS.values = [
          '',
          'GASTOS FINANCIEROS',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      utilidadOperativaDosAnteriores = utilidadBrutaDosAnteriores-sumaOperativaDosAnteriores
      utilidadOperativaUnoAnteriores = utilidadBrutaUnoAnteriores-sumaOperativaUnoAnteriores
      utilidadOperativaActual = utilidadBrutaActual-sumaOperativaActual
      UTILIDADOPERATIVA.values = [
        '',
        'UTILIDAD OPERATIVA',
        utilidadOperativaDosAnteriores,
        utilidadOperativaUnoAnteriores,
        utilidadOperativaActual,
        utilidadOperativaActual-utilidadOperativaUnoAnteriores,
        (((utilidadOperativaActual-utilidadOperativaUnoAnteriores)/utilidadOperativaActual)*100).toFixed(2)+'%',
      ]

      //Tabla tres
      if(listaFilas.libroMayor.idCuenta.codigo == 42){

        ingresosNoOperacionalesDosAnteriores = listaFilas.libroMayorAnteriorDos.valor
        ingresosNoOperacionalesUnoAnteriores = listaFilas.libroMayorAnteriorUno.valor
        ingresosNoOperacionalesActual = listaFilas.libroMayor.valor

        INGRESOSNOOPERACIONALES.values = [
          '',
          'INGRESOS NO OPERACIONALES',
          listaFilas.libroMayorAnteriorDos.valor,
          listaFilas.libroMayorAnteriorUno.valor,
          listaFilas.libroMayor.valor,
          listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor,
          (((listaFilas.libroMayor.valor-listaFilas.libroMayorAnteriorUno.valor)/listaFilas.libroMayor.valor)*100).toFixed(2)+'%',
        ]
      }
      if(listaFilas.libroMayor.idCuenta.codigo == 53){
        egresosNoOperacionalesUno1 = listaFilas.libroMayorAnteriorDos.valor
        egresosNoOperacionalesUno2 = listaFilas.libroMayorAnteriorUno.valor
        egresosNoOperacionalesUno3 = listaFilas.libroMayor.valor
      }
      egresosNoOperacionalesTotalDosAnteriores = egresosNoOperacionalesUno1-egresosNoOperacionalesDos1
      egresosNoOperacionalesTotalUnoAnteriores = egresosNoOperacionalesUno2-egresosNoOperacionalesDos2
      egresosNoOperacionalesTotalActual = egresosNoOperacionalesUno3-egresosNoOperacionalesDos3
      EGRESOSNOOPERACIONALES.values = [
        '',
        'EGRESOS NO OPERACIONALES',
        egresosNoOperacionalesTotalDosAnteriores,
        egresosNoOperacionalesTotalUnoAnteriores,
        egresosNoOperacionalesTotalActual,
        egresosNoOperacionalesTotalActual-egresosNoOperacionalesTotalUnoAnteriores,
        (((egresosNoOperacionalesTotalActual-egresosNoOperacionalesTotalUnoAnteriores)/egresosNoOperacionalesTotalActual)*100).toFixed(2)+'%',
      ]
      utilidadAntesImpuestosDosAnteriores = (Number(utilidadOperativaDosAnteriores)+Number(ingresosNoOperacionalesDosAnteriores))-Number(egresosNoOperacionalesTotalDosAnteriores)
      utilidadAntesImpuestosUnoAnteriores = (Number(utilidadOperativaUnoAnteriores)+Number(ingresosNoOperacionalesUnoAnteriores))-Number(egresosNoOperacionalesTotalUnoAnteriores)
      utilidadAntesImpuestosActual = (Number(utilidadOperativaActual)+Number(ingresosNoOperacionalesActual))-Number(egresosNoOperacionalesTotalActual)
      UTILIDADANTESIMPUESTOS.values = [
        '',
        'UTILIDAD ANTES DE IMPUESTOS',
        utilidadAntesImpuestosDosAnteriores,
        utilidadAntesImpuestosUnoAnteriores,
        utilidadAntesImpuestosActual,
        utilidadAntesImpuestosActual-utilidadAntesImpuestosUnoAnteriores,
        (((utilidadAntesImpuestosActual-utilidadAntesImpuestosUnoAnteriores)/utilidadAntesImpuestosActual)*100).toFixed(2)+'%',
      ]
    }

    //Estilos completos para toda la tabla
    var listaCeldas = ['C', 'D', 'E', 'F', 'G']
    for (let index = 0; index < 15; index++) {
      const hojaActual = hoja.getCell("B"+(index+9))
      const element = listaClases[index];
      listaCeldas.forEach(elementCelda => {
        const hojaC = hoja.getCell(elementCelda+(index+9))
        if((index+9) == 12){
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'B8CCE4' },
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }else if((index+9)==14 || (index+9)==19  || (index+9)==23){
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'F49BA0' },
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }else{
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'DCEFF6' },
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }
      });
      //configurar estilos
      if((index+9)!=14 || (index+9)!=19 || (index+9)!=23){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'B8CCE4' },
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }else if((index+9)==15 || (index+9)==20 || (index+9)==24){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: 'FFFFFF' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' },
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }else{
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'F49BA0' },
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }
      hoja.getRow(index+9).eachCell(cell => {
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
