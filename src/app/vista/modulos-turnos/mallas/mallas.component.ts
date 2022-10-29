import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { Modulo } from './../../../modelos/modulo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialService } from 'src/app/servicios/serviciosSiga/historial.service';
import { AgregarNovedadComponent } from '../novedades/agregar-novedad/agregar-novedad.component';
import { MatDialog } from '@angular/material/dialog';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { ModificarNovedadesComponent } from '../novedades/modificar-novedades/modificar-novedades.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import * as XLSX from 'xlsx';
import { NovedadConsultaSevice } from 'src/app/servicios/novedadConsulta.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit {
  dtOptions: any = {};
  public listaAsignacionesTurnoVendedores: any = [];
  public listaMal: any = [];
  public listaEstado: any = [];
  public listaMa: any = [];
  public listaMallas: any = [];
  public listaMallasFiltrado: any = [];
  public usuario: any = [];
  public fecha: Date = new Date();
  public fechaActual:any
  public fechaInicio: any;
  public valorLimiteBusqHistorial: any;
  public valorMaxIngreso: any;
  public validar = false;
  public validacionMalla = false;
  public listaHistorial: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns = ['usuarioVendedor', 'oficina', 'sitioVenta', 'sitioVentaAsistencia', 'horaIngreso', 'horaIngresoSiga', 'fecha', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioHistorial: HistorialService,
    private servicioEstado: EstadoService,
    private servicioNovedad: NovedadService,
    private servicioNovedadConsulta: NovedadConsultaSevice,
    private servicioUsuario: UsuarioService,
    private servicioOficina: OficinasService,
    private servicioTurnos: TurnosService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.listarEstados();
  }

  public listarTodos () {
    this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
      this.servicioTurnos.listarTodos().subscribe(resTurnos=>{
        resConfiguracion.forEach(elementConfiguracion => {
          if(elementConfiguracion.nombre == 'tiempo_limite_busq_historial'){
            this.valorLimiteBusqHistorial = elementConfiguracion.valor
          }
          if(elementConfiguracion.nombre == 'tiempo_max_ingreso'){
            this.valorMaxIngreso = elementConfiguracion.valor
          }
        });
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
          if(resUsuario.idRol.idJerarquia.id == 2 ){
            this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
              this.listaAsignacionesTurnoVendedores = res;
              const fechaActual2 = this.fecha.getDate() + "/"+ (this.fecha.getMonth()+1)+ "/" + this.fecha.getFullYear()
              this.fechaActual = this.fecha.getFullYear() + "/"+ (this.fecha.getMonth()+1)+ "/" +this.fecha.getDate();
              var horaActual = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(this.fecha.getHours()), Number(this.fecha.getMinutes()));
              this.servicioConsultasGenerales.listarAsignarTurnosVendedores(this.fechaActual).subscribe(resAsigTurnVende=>{
                resAsigTurnVende.forEach(element => {
                  var malla1 = {
                    listaAsignarTurnoVendedor: {},
                    estado: {},
                    listaSigaApi: {},
                    ideOficina: 0,
                    ideZona: 0,
                    nombreEstado: '',
                    turnoInicio: '',
                    turnoFinal: '',
                    validar: false,
                    tipoMalla: 'Malla Ingreso'
                  };
                  resTurnos.forEach(elementTurno => {
                    if(elementTurno.id == element.idTurno){
                      malla1.turnoInicio = elementTurno.horaInicio
                      malla1.turnoFinal = elementTurno.horaFinal
                    }
                  });
                  var horaFinal = malla1.turnoInicio.split(':')
                  var horaAsignada = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1]))

                  var horaAsignadaMenos = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1])-this.valorLimiteBusqHistorial)
                  var horaAsignadaMas = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1])+this.valorLimiteBusqHistorial)
                  if( horaActual >= horaAsignada){
                    this.servicioHistorial.listarPorId(fechaActual2, element.idVendedor).subscribe(resHistorial=>{
                      this.listaHistorial=[]
                      resHistorial.forEach((elementHistorial:any) => {
                        var horaIngresoSigaSplit = elementHistorial.hora.split(":")
                        var horaIngresoSiga = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaIngresoSigaSplit[0]),Number(horaIngresoSigaSplit[1]))
                        if(elementHistorial.operacion == "I" && horaIngresoSiga>=horaAsignadaMenos && horaIngresoSiga<=horaAsignadaMas){
                          this.listaHistorial.push(elementHistorial)
                        }
                      });
                      if(this.listaHistorial.length>=1){
                        var primerObjeto  = this.listaHistorial[0]
                        var horaAsignadaArray = malla1.turnoInicio.split(':')
                        var horaI = primerObjeto.hora.split(':')
                        var horaAdicional = new Date(1928,6,25,Number(horaAsignadaArray[0]),Number(horaAsignadaArray[1])+this.valorMaxIngreso)
                        var horaAsignada = new Date(1928,6,25,Number(horaAsignadaArray[0]),Number(horaAsignadaArray[1]))
                        var horaIngreso = new Date(1928,6,25,Number(horaI[0]),Number(horaI[1]))
                        if(horaIngreso>=horaAsignada && horaIngreso<=horaAdicional && primerObjeto.ideSitioventa == element.idSitioVenta){
                          this.cumplioMayor(element, primerObjeto, malla1)
                        }else if(horaIngreso<horaAsignada && primerObjeto.ideSitioventa == element.idSitioVenta){
                          this.cumplioMenor(element, primerObjeto, malla1)
                        }else if(primerObjeto.ideSitioventa != element.idSitioVenta){
                          this.ingresoSitioDiferente(element, primerObjeto, malla1)
                        }else{
                          this.noCumplio(element, primerObjeto, malla1)
                        }
                      }else{
                        this.noIngreso(element, res, malla1)
                      }
                    })
                  }else{
                    this.aunNoEsHora(element, malla1)
                  }
                  this.listaMallas.push(malla1)
                })
                this.dataSource = new MatTableDataSource(this.listaMallas);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              })
            })
          }else if(resUsuario.idRol.idJerarquia.id == 3){
            this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
              const fechaActual2 = this.fecha.getDate() + "/"+ (this.fecha.getMonth()+1)+ "/" + this.fecha.getFullYear()
              this.fechaActual = this.fecha.getFullYear() + "/"+ (this.fecha.getMonth()+1)+ "/" +this.fecha.getDate();
              var horaActual = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(this.fecha.getHours()), Number(this.fecha.getMinutes()));
              this.servicioConsultasGenerales.listarAsignarTurnosVendedores(this.fechaActual).subscribe(resAsigTurnVende=>{
                resAsigTurnVende.forEach(element => {
                  if(element.ideSubzona  == resUsuario.ideSubzona){
                    var malla1 = {
                      listaAsignarTurnoVendedor: {},
                      estado: {},
                      listaSigaApi: {},
                      ideOficina: 0,
                      ideZona: 0,
                      nombreEstado: '',
                      turnoInicio: '',
                      turnoFinal: '',
                      validar: false,
                      tipoMalla: 'Malla Ingreso'
                    };
                    resTurnos.forEach(elementTurno => {
                      if(elementTurno.id == element.idTurno){
                        malla1.turnoInicio = elementTurno.horaInicio
                        malla1.turnoFinal = elementTurno.horaFinal
                      }
                    });
                    var horaFinal = malla1.turnoInicio.split(':')
                    var horaAsignada = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1]))
                    var horaAsignadaMenos = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1])-this.valorLimiteBusqHistorial)
                    var horaAsignadaMas = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1])+this.valorLimiteBusqHistorial)
                    var fechaInicio = new Date(element.fechaInicio);
                    var fechaF = new Date(element.fechaFinal);
                    const fechaFinal = new Date(fechaF.getFullYear(), fechaF.getMonth(), fechaF.getDate()+1);
                    if(new Date(this.fechaActual)>=fechaInicio && new Date(this.fechaActual)<=fechaFinal && element.estado!='Eliminado'){
                      if( horaActual >= horaAsignada){
                        this.servicioHistorial.listarPorId(fechaActual2, element.idVendedor).subscribe(resHistorial=>{
                          this.listaHistorial=[]
                          resHistorial.forEach((elementHistorial:any) => {
                            var horaIngresoSigaSplit = elementHistorial.hora.split(":")
                            var horaIngresoSiga = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaIngresoSigaSplit[0]),Number(horaIngresoSigaSplit[1]))
                            if(elementHistorial.operacion == "I" && horaIngresoSiga>=horaAsignadaMenos && horaIngresoSiga<=horaAsignadaMas){
                              this.listaHistorial.push(elementHistorial)
                            }
                          });
                          if(this.listaHistorial.length>=1){
                            var primerObjeto  = this.listaHistorial[0]
                            var horaAsignadaArray = malla1.turnoInicio.split(':')
                            var horaI = primerObjeto.hora.split(':')
                            var horaAdicional = new Date(1928,6,25,Number(horaAsignadaArray[0]),Number(horaAsignadaArray[1])+this.valorMaxIngreso)
                            var horaAsignada = new Date(1928,6,25,Number(horaAsignadaArray[0]),Number(horaAsignadaArray[1]))
                            var horaIngreso = new Date(1928,6,25,Number(horaI[0]),Number(horaI[1]))
                            if(horaIngreso>=horaAsignada && horaIngreso<=horaAdicional && primerObjeto.ideSitioventa == element.idSitioVenta){
                              this.cumplioMayor(element, primerObjeto, malla1)
                            }else if(horaIngreso<horaAsignada && primerObjeto.ideSitioventa == element.idSitioVenta){
                              this.cumplioMenor(element, primerObjeto, malla1)
                            }else if(primerObjeto.ideSitioventa != element.idSitioVenta){
                              this.ingresoSitioDiferente(element, primerObjeto, malla1)
                            }else{
                              this.noCumplio(element, primerObjeto, malla1)
                            }
                          }else{
                            this.noIngreso(element, res, malla1)
                          }
                        })
                      }else{
                        this.aunNoEsHora(element, malla1)
                      }
                      this.listaMallas.push(malla1)
                    };
                  }
                })
                this.dataSource = new MatTableDataSource(this.listaMallas);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              })
            })
          }else if(resUsuario.idRol.idJerarquia.id == 4){
            this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
              const fechaActual2 = this.fecha.getDate() + "/"+ (this.fecha.getMonth()+1)+ "/" + this.fecha.getFullYear()
              this.fechaActual = this.fecha.getFullYear() + "/"+ (this.fecha.getMonth()+1)+ "/" +this.fecha.getDate();
              var horaActual = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(this.fecha.getHours()), Number(this.fecha.getMinutes()));
              this.servicioConsultasGenerales.listarAsignarTurnosVendedores(this.fechaActual).subscribe(resAsigTurnVende=>{
                resAsigTurnVende.forEach(element => {
                  if(element.idOficina  == resUsuario.ideOficina){
                    var malla1 = {
                      listaAsignarTurnoVendedor: {},
                      estado: {},
                      listaSigaApi: {},
                      ideOficina: 0,
                      ideZona: 0,
                      nombreEstado: '',
                      turnoInicio: '',
                      turnoFinal: '',
                      validar: false,
                      tipoMalla: 'Malla Ingreso'
                    };
                    resTurnos.forEach(elementTurno => {
                      if(elementTurno.id == element.idTurno){
                        malla1.turnoInicio = elementTurno.horaInicio
                        malla1.turnoFinal = elementTurno.horaFinal
                      }
                    });
                    var horaFinal = malla1.turnoInicio.split(':')
                    var horaAsignada = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1]))
                    var horaAsignadaMenos = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1])-this.valorLimiteBusqHistorial)
                    var horaAsignadaMas = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaFinal[0]),Number(horaFinal[1])+this.valorLimiteBusqHistorial)
                    var fechaInicio = new Date(element.fechaInicio);
                    var fechaF = new Date(element.fechaFinal);
                    const fechaFinal = new Date(fechaF.getFullYear(), fechaF.getMonth(), fechaF.getDate()+1);
                    if(new Date(this.fechaActual)>=fechaInicio && new Date(this.fechaActual)<=fechaFinal && element.estado!='Eliminado'){
                      if( horaActual >= horaAsignada){
                        this.servicioHistorial.listarPorId(fechaActual2, element.idVendedor).subscribe(resHistorial=>{
                          this.listaHistorial=[]
                          resHistorial.forEach((elementHistorial:any) => {
                            var horaIngresoSigaSplit = elementHistorial.hora.split(":")
                            var horaIngresoSiga = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(),Number(horaIngresoSigaSplit[0]),Number(horaIngresoSigaSplit[1]))
                            if(elementHistorial.operacion == "I" && horaIngresoSiga>=horaAsignadaMenos && horaIngresoSiga<=horaAsignadaMas){
                              this.listaHistorial.push(elementHistorial)
                            }
                          });
                          if(this.listaHistorial.length>=1){
                            var primerObjeto  = this.listaHistorial[0]
                            var horaAsignadaArray = malla1.turnoInicio.split(':')
                            var horaI = primerObjeto.hora.split(':')
                            var horaAdicional = new Date(1928,6,25,Number(horaAsignadaArray[0]),Number(horaAsignadaArray[1])+this.valorMaxIngreso)
                            var horaAsignada = new Date(1928,6,25,Number(horaAsignadaArray[0]),Number(horaAsignadaArray[1]))
                            var horaIngreso = new Date(1928,6,25,Number(horaI[0]),Number(horaI[1]))
                            if(horaIngreso>=horaAsignada && horaIngreso<=horaAdicional && primerObjeto.ideSitioventa == element.idSitioVenta){
                              this.cumplioMayor(element, primerObjeto, malla1)
                            }else if(horaIngreso<horaAsignada && primerObjeto.ideSitioventa == element.idSitioVenta){
                              this.cumplioMenor(element, primerObjeto, malla1)
                            }else if(primerObjeto.ideSitioventa != element.idSitioVenta){
                              this.ingresoSitioDiferente(element, primerObjeto, malla1)
                            }else{
                              this.noCumplio(element, primerObjeto, malla1)
                            }
                          }else{
                            this.noIngreso(element, res, malla1)
                          }
                        })
                      }else{
                        this.aunNoEsHora(element, malla1)
                      }
                      this.listaMallas.push(malla1)
                    };
                  }
                })
                this.dataSource = new MatTableDataSource(this.listaMallas);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              })
            })
          }
        })
      })
    })

  }

  existe(idAsignarTurnoVendedor:Number){
    this.servicioNovedad.listarTodos().subscribe(resNovedades=>{
      resNovedades.forEach(elementNovedades => {
        if(elementNovedades.idAsignarTurnoVendedor.id == idAsignarTurnoVendedor){
          this.validar == true
        }
      });
    })
  }

  public listarEstados(){
    this.servicioEstado.listarTodos().subscribe(res =>{
      res.forEach(element => {
        if(element.idModulo.id == 7){
          this.listaEstado.push(element)
        }
      });
    })
  }

  public agregarNovedad(idAsignarTurnoV:number, idE:string, tipoMalla:string){
    const dialogRef = this.dialog.open(AgregarNovedadComponent, {
      width: '500px',
      data: {idAsignarTurnoVendedor: idAsignarTurnoV, idEstado:idE, tipoMalla: tipoMalla},
    });
  }

  visualizarNovedad(id: number): void {
    const dialogRef = this.dialog.open(ModificarNovedadesComponent, {
      width: '500px',
      data: id
    });
  }

   // Filtrado
   descripcion:any
   applyFilter() {
    this.listaMallasFiltrado = []
    if(this.descripcion==""){
      this.dataSource = new MatTableDataSource(this.listaMallas);
    }else{
      const filterValue = this.descripcion.descripcion;
      this.dataSource.filter = filterValue.trim().toString();
      this.listaMallas.forEach((element:any) => {
        if(element.estado.descripcion == filterValue){
          this.listaMallasFiltrado.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listaMallasFiltrado);
    }
  }

  listaMallasIngresoCompletos: any = []
  exportToExcel(): void {
    this.listaMallasIngresoCompletos = []
    for (let index = 0; index < this.listaMallas.length; index++) {
      const element = this.listaMallas[index];
      var obj = {
        "Ide Vendedor | Nombre Vendedor": element.listaAsignarTurnoVendedor.idVendedor+" - "+element.listaAsignarTurnoVendedor.nombreVendedor,
        "Oficina": element.listaAsignarTurnoVendedor.nombreOficina,
        "Sitio Venta Asignado": element.listaAsignarTurnoVendedor.nombreSitioVenta,
        "Sitio Venta Ingresa": element.listaSigaApi.nom_sitioventa,
        "Hora Asignada": element.turnoInicio,
        "Hora Ingreso": element.listaSigaApi.hora,
        "Fechas Asignadas": element.listaAsignarTurnoVendedor.fechaInicio+" - "+element.listaAsignarTurnoVendedor.fechaFinal,
        Estado: element.estado.descripcion
      }
      this.listaMallasIngresoCompletos.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaMallasIngresoCompletos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaMallasIngreso");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  // Metodos para malla de turnos

  //Cuando no ingreso
  public noIngreso(element:any, res:any, malla1:any){
    this.servicioEstado.listarPorId(18).subscribe(resEstado=>{
      if(element != null && res != null){
        malla1.listaAsignarTurnoVendedor = element
        malla1.estado = resEstado
        malla1.listaSigaApi = {}
        malla1.ideOficina = element.idOficina
        this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
          resOficina.forEach(elementOficinia => {
            malla1.ideZona = elementOficinia.ideSubzona
            malla1.nombreEstado = 'No_ingreso'
            malla1.validar = false
            this.servicioNovedadConsulta.listarPorId(this.fechaActual).subscribe(resNovedad=>{
              for (let index = 0; index < resNovedad.length; index++) {
                const elementNovedad = resNovedad[index];
                  this.servicioAsignarTurnoVendedor.listarPorId(elementNovedad.id_asignar_turno_vendedor).subscribe(resAsignarTurnoVendedor=>{
                    if(resAsignarTurnoVendedor.idVendedor == element.idVendedor && resAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta && elementNovedad.tipo_malla == 'Malla Ingreso'){
                      malla1.validar = true
                    }
                  })
              }
            })
          });
        })
      }
    })
  }

  // Cumplio pero en horario mayor al asignado
  public cumplioMayor(element:any, primerObjeto:any, malla1:any){
    this.servicioEstado.listarPorId(15).subscribe(resEstado=>{
      if(element != null && resEstado != null && primerObjeto != null){
        malla1.listaAsignarTurnoVendedor = element
        malla1.estado = resEstado
        malla1.listaSigaApi = primerObjeto
        malla1.ideOficina = element.idOficina
        this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
          resOficina.forEach(elementOficinia => {
          malla1.ideZona = elementOficinia.ideSubzona
          malla1.nombreEstado = 'Cumplio'
          malla1.validar = true
          })
        })
      }
    })
  }

  //Cumplio pero en horario menor al asignado
  public cumplioMenor(element:any, primerObjeto:any, malla1:any){
    this.servicioEstado.listarPorId(15).subscribe(resEstado=>{
      if(element != null && resEstado != null && primerObjeto != null){
        malla1.listaAsignarTurnoVendedor = element
        malla1.estado = resEstado
        malla1.listaSigaApi = primerObjeto
        malla1.ideOficina = element.idOficina
        this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
          resOficina.forEach(elementOficinia => {
          malla1.ideZona = elementOficinia.ideSubzona
          malla1.nombreEstado = 'Cumplio'
          malla1.validar = true
          })
        })
      }
    })
  }

  // Ingreso a punto de venta diferente
  public ingresoSitioDiferente(element:any, primerObjeto:any, malla1:any){
    this.servicioEstado.listarPorId(25).subscribe(resEstado=>{
      if(element != null && resEstado != null && primerObjeto != null){
        malla1.listaAsignarTurnoVendedor = element
        malla1.estado = resEstado
        malla1.listaSigaApi = primerObjeto
        malla1.ideOficina = element.idOficina
        this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
          resOficina.forEach(elementOficinia => {
            malla1.ideZona = elementOficinia.ideSubzona
            malla1.nombreEstado = 'Incumplio'
            malla1.validar = false
            this.servicioNovedadConsulta.listarPorId(this.fechaActual).subscribe(resNovedad=>{
              for (let index = 0; index < resNovedad.length; index++) {
                const elementNovedad = resNovedad[index];
                  this.servicioAsignarTurnoVendedor.listarPorId(elementNovedad.id_asignar_turno_vendedor).subscribe(resAsignarTurnoVendedor=>{
                    if(resAsignarTurnoVendedor.idVendedor == element.idVendedor && resAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta && elementNovedad.tipo_malla == 'Malla Ingreso'){
                      malla1.validar = true
                    }
                  })
              }
            })
          })
        })
      }
    })
  }

  // No cumplio
  public noCumplio(element:any, primerObjeto:any, malla1:any){
    this.servicioEstado.listarPorId(16).subscribe(resEstado=>{
      if(element != null && resEstado != null && primerObjeto != null){
        malla1.listaAsignarTurnoVendedor = element
        malla1.estado = resEstado
        malla1.listaSigaApi = primerObjeto
        malla1.ideOficina = element.idOficina
        this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
          resOficina.forEach(elementOficinia => {
            malla1.ideZona = elementOficinia.ideSubzona
            malla1.nombreEstado = 'Incumplio'
            malla1.validar = false
            this.servicioNovedadConsulta.listarPorId(this.fechaActual).subscribe(resNovedad=>{
              for (let index = 0; index < resNovedad.length; index++) {
                const elementNovedad = resNovedad[index];
                  this.servicioAsignarTurnoVendedor.listarPorId(elementNovedad.id_asignar_turno_vendedor).subscribe(resAsignarTurnoVendedor=>{
                    if(resAsignarTurnoVendedor.idVendedor == element.idVendedor && resAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta && elementNovedad.tipo_malla == 'Malla Ingreso'){
                      malla1.validar = true
                    }
                  })
              }
            })
          })
        })
      }
    })
  }

  // Aun no es hora de ingreso
  public aunNoEsHora(element:any, malla1:any){
    this.servicioEstado.listarPorId(17).subscribe(resEstado=>{
      if(element != null && resEstado != null){
        malla1.listaAsignarTurnoVendedor = element
        malla1.estado = resEstado
        malla1.listaSigaApi = {}
        malla1.ideOficina = element.idOficina
        this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
          resOficina.forEach(elementOficinia => {
            malla1.ideZona = elementOficinia.ideSubzona
            malla1.nombreEstado = 'Aun'
            malla1.validar = false
          })
        })
      }
    })
  }


}
