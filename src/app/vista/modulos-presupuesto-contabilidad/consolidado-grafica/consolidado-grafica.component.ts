import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
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
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

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

  //Tabla
  displayedColumns = ['id', 'descripcion'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tablaMostrar: boolean = false;

  //Listas de cada cuenta del excel
  listChance: any = []
  listVentasRaspa: any = []
  listLineaNegocios: any = []
  listCostoVentas: any = []
  listGastoAdmin: any = []
  listGastoVenta: any = []
  listGastoFinanciero: any = []
  listIngresoNoOPeracionales: any = []
  listEgresosNoOperacionales: any = []
  listProvisionImpuestoRenta: any = []
  //Variables operaciones
  ventasNetas: any = [];
  utilidadBruta: any = [];
  sumaGastos: any = [];
  utilidadOperativa: any = [];
  utilidadAntesImpuesto: any = [];

  //Excel
  private _workbook!: Workbook

  public listaMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

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
    this.listChance = []
    this.listVentasRaspa = []
    this.listLineaNegocios = []
    this.listCostoVentas = []
    this.listGastoAdmin = []
    this.listGastoVenta = []
    this.listGastoFinanciero = []
    this.listIngresoNoOPeracionales = []
    this.listEgresosNoOperacionales = []
    this.listProvisionImpuestoRenta = []
    this.ventasNetas = []
    this.utilidadBruta = []
    this.utilidadOperativa = [];
    this.utilidadAntesImpuesto = [];
    this.sumaGastos = []

    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
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
          var mesAlerta = ""
          var fechaSplit = mesActual.split('-')
          var fechaAnteriorDos = (this.selectYear.getFullYear()-2)+'-'+(fechaSplit[1])+'-01'
          var fechaAnteriorUno = (this.selectYear.getFullYear()-1)+'-'+(fechaSplit[1])+'-01'
          this.servicioLibroMayor.listarPorId(elementLibroMayorAño.id).subscribe(resLibroMayorId=>{
            if(resLibroMayorId.idCuenta.codigo == 41357001 || resLibroMayorId.idCuenta.codigo == 41357002 || resLibroMayorId.idCuenta.codigo == 415030 || resLibroMayorId.idCuenta.codigo == 6 || resLibroMayorId.idCuenta.codigo == 51 || resLibroMayorId.idCuenta.codigo == 52 || resLibroMayorId.idCuenta.codigo == 53 || resLibroMayorId.idCuenta.codigo == 5305 || resLibroMayorId.idCuenta.codigo == 42 || resLibroMayorId.idCuenta.codigo == 54){
              this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorDos).subscribe(resLibroMayorAnteriorDos=>{
                for (let i = 0; i < this.listaMeses.length; i++) {
                  const element = this.listaMeses[i];
                  if(Number(fechaSplit[1]) == i){
                    mesAlerta = element
                  }
                }
                // if(resLibroMayorAnteriorDos.length <= 0){
                //   Swal.fire({
                //     icon: 'error',
                //     title: 'Falta el valor del libro mayor de la cuenta'+resLibroMayorId.idCuenta.codigo+'en el mes de '+mesAlerta+' del año '+(this.selectYear.getFullYear()-2)+'!',
                //     showConfirmButton: false,
                //     timer: 2500
                //   });
                //   document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                // }else{
                  this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorUno).subscribe(resLibroMayorAnteriorUno=>{
                    if(resLibroMayorAnteriorUno.length <= 0){
                      Swal.fire({
                        icon: 'error',
                        title: 'Falta el valor del libro mayor de la cuenta'+resLibroMayorId.idCuenta.codigo+'en el mes de '+mesAlerta+' del año '+(this.selectYear.getFullYear()-1)+'!',
                        showConfirmButton: false,
                        timer: 2500
                      });
                      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                    }else{
                      this.objetoModificar = []
                      if(this.listaClases.length>0){
                        this.listaExiste = []
                        for (let index = 0; index < this.listaClases.length; index++) {
                          const element = this.listaClases[index];
                          if(element.cuenta.codigo == resLibroMayorId.idCuenta.codigo){
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
                          this.agregarLibrosMayoresCuentas(obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno)
                          i++
                        }
                      }else{
                        this.agregarLibrosMayoresCuentas(obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno)
                        i++
                      }
                      if(i == resLibrosMayorAño.length){
                        for (let index = 0; index < this.listaClases.length; index++) {
                          const element = this.listaClases[index];
                          if(element.cuenta.codigo == 41357001){
                            this.listChance.push(element)
                          }else if(element.cuenta.codigo == 41357002){
                            this.listVentasRaspa.push(element)
                          }else if(element.cuenta.codigo == 415030){
                            this.listLineaNegocios.push(element)
                          }else if(element.cuenta.codigo == 6){
                            this.listCostoVentas.push(element)
                          }else if(element.cuenta.codigo == 51){
                            this.listGastoAdmin.push(element)
                          }else if(element.cuenta.codigo == 52){
                            this.listGastoVenta.push(element)
                          }else if(element.cuenta.codigo == 5305){
                            this.listGastoFinanciero.push(element)
                          }else if(element.cuenta.codigo == 42){
                            this.listIngresoNoOPeracionales.push(element)
                          }else if(element.cuenta.codigo == 53){
                            this.listEgresosNoOperacionales.push(element)
                          }else if(element.cuenta.codigo == 54){
                            this.listProvisionImpuestoRenta.push(element)
                          }
                          if(element.cuenta.codigo == 41357001 || element.cuenta.codigo == 41357002 || element.cuenta.codigo == 415030){
                            console.log(element)
                            var objVentasNetas = {
                              libroMayorAnteriorDos: {},
                              libroMayorAnteriorUno: {},
                              libroMayor: {}
                            }
                            if(this.ventasNetas.length <= 0){
                              objVentasNetas.libroMayorAnteriorDos = element.libroMayorAnteriorDos
                              objVentasNetas.libroMayorAnteriorUno = element.libroMayorAnteriorUno
                              objVentasNetas.libroMayor = element.libroMayor
                              console.log(objVentasNetas)
                              this.ventasNetas.push(objVentasNetas)
                            }else{
                              var objetoVentasNetasMod = {
                                libroMayorAnteriorDos: {},
                                libroMayorAnteriorUno: {},
                                libroMayor: {}
                              }
                              for (let index = 0; index < this.ventasNetas.length; index++) {
                                const elementVentaNeta = this.ventasNetas[index];
                                console.log(elementVentaNeta)
                                var sumaValorLibMayDos = Number(elementVentaNeta.libroMayorAnteriorDos.valor) + Number(element.libroMayorAnteriorDos.valor)
                                elementVentaNeta.libroMayorAnteriorDos.valor = sumaValorLibMayDos
                                var sumaValoresLibMayUno = Number(elementVentaNeta.libroMayorAnteriorUno.valor) + Number(element.libroMayorAnteriorUno.valor)
                                elementVentaNeta.libroMayorAnteriorUno.valor = sumaValoresLibMayUno
                                var sumaValoresLibMay = Number(elementVentaNeta.libroMayor.valor) + Number(element.libroMayor.valor)
                                elementVentaNeta.libroMayor.valor = sumaValoresLibMay
                                objetoVentasNetasMod.libroMayorAnteriorDos = elementVentaNeta.libroMayorAnteriorDos
                                objetoVentasNetasMod.libroMayorAnteriorUno = elementVentaNeta.libroMayorAnteriorUno
                                objetoVentasNetasMod.libroMayor = elementVentaNeta.libroMayor
                                this.ventasNetas.splice(index, 1, objetoVentasNetasMod)
                              }
                            }
                          }
                          if(element.cuenta.codigo == 51 || element.cuenta.codigo == 52 || element.cuenta.codigo == 5305){
                            console.log(element)
                            var objGastos = {
                              libroMayorAnteriorDos: {},
                              libroMayorAnteriorUno: {},
                              libroMayor: {}
                            }
                            if(this.sumaGastos.length <= 0){
                              objGastos.libroMayorAnteriorDos = element.libroMayorAnteriorDos
                              objGastos.libroMayorAnteriorUno = element.libroMayorAnteriorUno
                              objGastos.libroMayor = element.libroMayor
                              console.log(objGastos)
                              this.sumaGastos.push(objGastos)
                            }else{
                              var objGastosMod = {
                                libroMayorAnteriorDos: {},
                                libroMayorAnteriorUno: {},
                                libroMayor: {}
                              }
                              for (let index = 0; index < this.sumaGastos.length; index++) {
                                const elementGasto = this.sumaGastos[index];
                                console.log(elementGasto)
                                var sumaValorLibMayDos = Number(elementGasto.libroMayorAnteriorDos.valor) + Number(element.libroMayorAnteriorDos.valor)
                                elementGasto.libroMayorAnteriorDos.valor = sumaValorLibMayDos
                                var sumaValoresLibMayUno = Number(elementGasto.libroMayorAnteriorUno.valor) + Number(element.libroMayorAnteriorUno.valor)
                                elementGasto.libroMayorAnteriorUno.valor = sumaValoresLibMayUno
                                var sumaValoresLibMay = Number(elementGasto.libroMayor.valor) + Number(element.libroMayor.valor)
                                elementGasto.libroMayor.valor = sumaValoresLibMay
                                objGastosMod.libroMayorAnteriorDos = elementGasto.libroMayorAnteriorDos
                                objGastosMod.libroMayorAnteriorUno = elementGasto.libroMayorAnteriorUno
                                objGastosMod.libroMayor = elementGasto.libroMayor
                                this.sumaGastos.splice(index, 1, objGastosMod)
                              }
                            }
                          }
                          if((index+1) == this.listaClases.length){
                            if(this.ventasNetas.length > 0 && this.listCostoVentas.length > 0){
                              var objUtilidadBruta = {
                                libroMayorAnteriorDos: 0,
                                libroMayorAnteriorUno: 0,
                                libroMayor: 0
                              }
                              objUtilidadBruta.libroMayorAnteriorDos = Number(this.ventasNetas[0].libroMayorAnteriorDos.valor)-Number(this.listCostoVentas[0].libroMayorAnteriorDos.valor)
                              objUtilidadBruta.libroMayorAnteriorUno = Number(this.ventasNetas[0].libroMayorAnteriorUno.valor)-Number(this.listCostoVentas[0].libroMayorAnteriorUno.valor)
                              objUtilidadBruta.libroMayor = Number(this.ventasNetas[0].libroMayor.valor)-Number(this.listCostoVentas[0].libroMayor.valor)
                              this.utilidadBruta.push(objUtilidadBruta)
                            }
                            if(this.sumaGastos.length > 0 && this.utilidadBruta.length > 0){
                              var objUtilidadOperativa = {
                                libroMayorAnteriorDos: 0,
                                libroMayorAnteriorUno: 0,
                                libroMayor: 0
                              }
                              objUtilidadOperativa.libroMayorAnteriorDos = Number(this.utilidadBruta[0].libroMayorAnteriorDos)-Number(this.sumaGastos[0].libroMayorAnteriorDos.valor)
                              objUtilidadOperativa.libroMayorAnteriorUno = Number(this.utilidadBruta[0].libroMayorAnteriorUno)-Number(this.sumaGastos[0].libroMayorAnteriorUno.valor)
                              objUtilidadOperativa.libroMayor = Number(this.utilidadBruta[0].libroMayor)-Number(this.sumaGastos[0].libroMayor.valor)
                              this.utilidadOperativa.push(objUtilidadOperativa)
                            }
                            console.log(this.ventasNetas)
                            this.tablaMostrar = true
                            console.log(this.listChance, this.listVentasRaspa, this.listLineaNegocios)
                            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                          }
                        }

                        // this.descargarExcel(this.listaClases)
                      }
                    }
                  })
                // }
              })
            }else{
              i++
            }
          })
        })
      })
    })
  }

  agregarLibrosMayoresCuentas(obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno){
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

  private descargarExcel(listaClases: any){
    this._workbook = new Workbook()
    this._workbook.creator = 'DigiDev';

    this.crearHoja(listaClases);

    this._workbook.xlsx.writeBuffer().then((data)=>{
      const blob = new Blob([data])
      fs.saveAs(blob, 'consolidado.xlsx');
    })
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
  }

  listaDatosNecesarios: any = [];
  private crearHoja(listaClases: any){
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

    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })

    hoja.getRow(9).values = [
      '',
      'CHANCE',
      formatterPeso.format(this.listChance[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listChance[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listChance[0].libroMayor.valor),
      formatterPeso.format(Number(this.listChance[0].libroMayor.valor)-Number(this.listChance[0].libroMayorAnteriorUno.valor)),
      (((this.listChance[0].libroMayor.valor-this.listChance[0].libroMayorAnteriorUno.valor)/this.listChance[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(10).values = [
      '',
      'VENTAS DE RASPAS',
      formatterPeso.format(this.listVentasRaspa[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listVentasRaspa[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listVentasRaspa[0].libroMayor.valor),
      formatterPeso.format(Number(this.listVentasRaspa[0].libroMayor.valor)-Number(this.listVentasRaspa[0].libroMayorAnteriorUno.valor)),
      (((this.listVentasRaspa[0].libroMayor.valor-this.listVentasRaspa[0].libroMayorAnteriorUno.valor)/this.listVentasRaspa[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(11).values = [
      '',
      'LINEA DE NEGOCIOS',
      formatterPeso.format(this.listLineaNegocios[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listLineaNegocios[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listLineaNegocios[0].libroMayor.valor),
      formatterPeso.format(Number(this.listLineaNegocios[0].libroMayor.valor)-Number(this.listLineaNegocios[0].libroMayorAnteriorUno.valor)),
      (((this.listLineaNegocios[0].libroMayor.valor-this.listLineaNegocios[0].libroMayorAnteriorUno.valor)/this.listLineaNegocios[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(12).values = [
      '',
      'VENTAS NETAS',
      formatterPeso.format(this.ventasNetas[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.ventasNetas[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.ventasNetas[0].libroMayor.valor),
      formatterPeso.format(Number(this.ventasNetas[0].libroMayor.valor)-Number(this.ventasNetas[0].libroMayorAnteriorUno.valor)),
      (((this.ventasNetas[0].libroMayor.valor-this.ventasNetas[0].libroMayorAnteriorUno.valor)/this.ventasNetas[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(13).values = [
      '',
      '(-) COSTO DE VENTA',
      formatterPeso.format(this.listCostoVentas[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listCostoVentas[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listCostoVentas[0].libroMayor.valor),
      formatterPeso.format(Number(this.listCostoVentas[0].libroMayor.valor)-Number(this.listCostoVentas[0].libroMayorAnteriorUno.valor)),
      (((this.listCostoVentas[0].libroMayor.valor-this.listCostoVentas[0].libroMayorAnteriorUno.valor)/this.listCostoVentas[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(14).values = [
      '',
      'UTILIDAD BRUTA',
      formatterPeso.format(this.utilidadBruta[0].libroMayorAnteriorDos),
      formatterPeso.format(this.utilidadBruta[0].libroMayorAnteriorUno),
      formatterPeso.format(this.utilidadBruta[0].libroMayor),
      formatterPeso.format(Number(this.utilidadBruta[0].libroMayor)-Number(this.utilidadBruta[0].libroMayorAnteriorUno)),
      (((this.utilidadBruta[0].libroMayor-this.utilidadBruta[0].libroMayorAnteriorUno)/this.utilidadBruta[0].libroMayor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(16).values = [
      '',
      'GASTOS DE ADMINISTRACIÓN',
      formatterPeso.format(this.listGastoAdmin[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoAdmin[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoAdmin[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoAdmin[0].libroMayor.valor)-Number(this.listGastoAdmin[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoAdmin[0].libroMayor.valor-this.listGastoAdmin[0].libroMayorAnteriorUno.valor)/this.listGastoAdmin[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(17).values = [
      '',
      'GASTOS DE VENTAS',
      formatterPeso.format(this.listGastoVenta[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoVenta[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoVenta[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoVenta[0].libroMayor.valor)-Number(this.listGastoVenta[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoVenta[0].libroMayor.valor-this.listGastoVenta[0].libroMayorAnteriorUno.valor)/this.listGastoVenta[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(18).values = [
      '',
      'UTILIDAD OPERATIVA',
      formatterPeso.format(this.listGastoFinanciero[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoFinanciero[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoFinanciero[0].libroMayor.valor)-Number(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoFinanciero[0].libroMayor.valor-this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)/this.listGastoFinanciero[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(19).values = [
      '',
      'GASTOS FINANCIEROS',
      formatterPeso.format(this.listGastoFinanciero[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoFinanciero[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoFinanciero[0].libroMayor.valor)-Number(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoFinanciero[0].libroMayor.valor-this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)/this.listGastoFinanciero[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    //Estilos completos para toda la tabla
    var listaCeldas = ['C', 'D', 'E', 'F', 'G']
    for (let index = 0; index < 17; index++) {
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
              fgColor: { argb: 'B8CCE4' }, //Azul Oscuro
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }else if((index+9)==14 || (index+9)==19  || (index+9)==23){
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'F49BA0' }, //Rojo
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }else{
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'DCEFF6' }, //Azul claro
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }
      });
      //configurar estilos
      if((index+9)==14 || (index+9)==19  || (index+9)==23){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'F49BA0' }, // Rojo
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }else if((index+9) == 15 || (index+9) == 20){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: 'FFFFFF' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' }, //Blanco
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }else{
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'B8CCE4' }, //Azul Oscuro
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }
      hoja.getRow(index+9).eachCell(cell => {
        if(Number(cell.col) != 1){
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
