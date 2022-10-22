import { ConsultasGeneralesService } from './../../../../servicios/consultasGenerales.service';
import { OrdenCompra } from 'src/app/modelos/ordenCompra';
import { startWith, map, Observable } from 'rxjs';
import { MatrizNecesidad2 } from './../../../../modelos/modelos2/matrizNecesidad2';
import { MatrizNecesidadDetalle2 } from './../../../../modelos/modelos2/matrizNecesidadDetalle2';
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';
import Swal from 'sweetalert2';
import { MatrizNecesidadDetalle } from 'src/app/modelos/MatrizNecesidadDetalle';
import * as FileSaver from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//Grafica
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexLegend,
  ApexResponsive
} from "ng-apexcharts";
import { ModificarService } from 'src/app/servicios/modificar.service';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { uniqueSort } from 'jquery';
import { FirmasService } from 'src/app/servicios/Firmas.service';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { GestionProcesoService } from 'src/app/servicios/gestionProceso.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { RechazoMatrizDetalleComponent } from './rechazo-matriz-detalle/rechazo-matriz-detalle.component';
import { AccesoService } from 'src/app/servicios/Acceso.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-visualizar-detalle-matriz-necesidades',
  templateUrl: './visualizar-detalle-matriz-necesidades.component.html',
  styleUrls: ['./visualizar-detalle-matriz-necesidades.component.css']
})
export class VisualizarDetalleMatrizNecesidadesComponent implements OnInit {
  dtOptions: any = {};
  public listarMatrizDetalle: any = [];
  public formDetalleMatrizNecesidad!: FormGroup;
  listaMatrizDetalleNecesidades: any = []
  displayedColumns = ['descripcionMatrizDetalle','fecha','porcentajeMatrizDetalle','cantidadEjecuciones', 'cantidadObjetosEstimados', 'cantidadEjecucionesCompletas','costoEjecucionComprada','cantidadObjetosComprados','codigoCompra', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  color = ('primary')
  //Select Codigos Compras
  control = new FormControl<string | OrdenCompra>("");
  opcionesFiltradas!: Observable<OrdenCompra[]>;

  //Grafico
  @ViewChild("chart") chart: VisualizarDetalleMatrizNecesidadesComponent;
  public chartOptions: Partial<ChartOptions>;
  public colorRojo = "#f70000";
  public colorAmarillo = "#f6f700";
  public colorVerdeOscuro = "#15a604";
  public colorVerdeClaro = "#00f704";
  public valor = 0;
  public colorFondo = "";
  public colorGradual = "";

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VisualizarDetalleMatrizNecesidadesComponent>,
    private servicioMatrizNecesidades: MatrizNecesidadService,
    private servicioOrdenCompra: OrdenCompraService,
    private servicioMatrizDetalle: MatrizNecesidadDetalleService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: MatDialog,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioFirmas: FirmasService,
    private servicioSubirPdf: SubirPdfService,
    private servicioGestionProceso: GestionProcesoService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private servicioUsuario: UsuarioService,
    private servicioAcceso: AccesoService,
  ) { }

  ngOnInit(): void {
    this.servicioMatrizNecesidades.listarPorId(Number(this.id)).subscribe(resMatriz=>{
      this.valor = Math.round(resMatriz.porcentajeTotal)
      if (this.valor >= 0 && this.valor <= 33) {
        this.colorFondo = this.colorRojo;
        this.colorGradual = this.colorRojo;
      }
      if (this.valor >= 34 && this.valor <= 66) {
        this.colorFondo = this.colorAmarillo;
        this.colorGradual = this.colorRojo;
      }
      if (this.valor >= 67 && this.valor <= 80) {
        this.colorFondo = this.colorVerdeOscuro;
        this.colorGradual = this.colorRojo;
      }
      if (this.valor >= 81 && this.valor <= 100) {
        this.colorFondo = this.colorVerdeClaro;
        this.colorGradual = this.colorRojo;
      }
      this.chartOptions = {
        series: [this.valor],
        chart: {
          type: "radialBar",
          offsetY: -20,
          foreColor: "#97B4E2",
          height: 350,
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                opacity: 0.31,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: -2,
                fontSize: "22px"
              }
            }
          }
        },
        fill: {
          type: "gradient",
          colors: [this.colorFondo],
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: [this.colorGradual],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        labels: ["Average Results"]
      };
    })
    this.listarTodos();
    this.listarCodigosOrdenesCompras();
  }

  public formMatrizNecesidad!: FormGroup;
  public crearFormulario(){
    this.formMatrizNecesidad = this.fb.group({
      id: 0,
      proceso: [null,Validators.required],
      tipoNecesidad: [null,Validators.required],
      detalle: [null,Validators.required],
      cantidad: [null,Validators.required],
      cantidadEjecucion: [null,Validators.required],
      costoUnitario: [null,Validators.required],
      tipoActivo: [null,Validators.required],
    });
  }

  modificar:boolean = false
  listaMatrizDetalleFechas: any
  public listarTodos() {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    this.listarMatrizDetalle = [];
    this.servicioMatrizNecesidades.listarPorId(Number(this.id)).subscribe((resMatrizNecesidades: any) => {
      this.servicioMatrizDetalle.listarTodos().subscribe((resMatrizDetalle: any) => {
        resMatrizDetalle.forEach((element: any) => {
          if (element.idMatrizNecesidad.id == resMatrizNecesidades.id) {
            element.porcentaje = Math.round(element.porcentaje)
            element.costoEjecucionComprada = formatterPeso.format(element.costoEjecucionComprada)
            this.listarMatrizDetalle.push(element);
          }
        });
        this.listaMatrizDetalleFechas = this.listarMatrizDetalle.sort((a, b) => Number(new Date(a.fecha)) - Number(new Date(b.fecha)))
        this.dataSource = new MatTableDataSource(this.listaMatrizDetalleFechas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(usuario =>{
      this.servicioAcceso.listarTodos().subscribe(accesoUsuario =>{
        accesoUsuario.forEach(accesosUsuario => {
          if(accesosUsuario.idRol.id == usuario.idRol.id && accesosUsuario.idModulo.id == 76){
            this.modificar = true
          }
        });
      })
    })
  }

  listaCodigosOrdenesCompras: any = []
  listasOrdenesCompras: any = []
  public listarCodigosOrdenesCompras() {
    this.listaCodigosOrdenesCompras = []
    this.listasOrdenesCompras = []
    this.servicioOrdenCompra.listarTodos().subscribe(resCodigosOrdenesCompras=>{
      resCodigosOrdenesCompras.forEach(elementCodigoOrdenCompra => {
        if(elementCodigoOrdenCompra.idEstado.id == 44){
          this.listasOrdenesCompras.push(elementCodigoOrdenCompra)
        }
      });
      this.opcionesFiltradas = this.control.valueChanges.pipe(
        startWith(""),
        map(value => {
          const codigo = typeof value == 'string' ? value : value?.id.toString();
          return codigo ? this.filtrado(codigo as string, this.listasOrdenesCompras) : this.listasOrdenesCompras.slice();
        }),
        );
    })
  }

  public filtrado(codigoOrdenCompra: string, listaCodigosOrdenesCompras:any): OrdenCompra[] {
    const filterNo2 = codigoOrdenCompra

    return listaCodigosOrdenesCompras.filter((codigo:any) => (codigo.id.toString().includes(filterNo2)));
  }

  textoCodigoOrdenCompra:any
  displaySf(codigoOrdenComp: OrdenCompra): any {
    this.textoCodigoOrdenCompra = codigoOrdenComp
    if(this.textoCodigoOrdenCompra == ""){
      this.textoCodigoOrdenCompra = " "
    }else{
      this.textoCodigoOrdenCompra = codigoOrdenComp.id.toString()

      return this.textoCodigoOrdenCompra;
    }
  }

  ejecucionesCumplidasNum: any
  detalleMatrizNecesidad: any
  noseEncuentra:boolean = false;
  listaNoseEncuentra:any = [];
  //Ejecuciones cumplidas
  ejecucionesCumplidas(valor:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.ejecucionesCumplidasNum = valor.target.value
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0,
        codigoOrdenCompra: 0,
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.ejecucionesCumplidasNum = this.ejecucionesCumplidasNum
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].ejecucionesCumplidasNum = this.ejecucionesCumplidasNum
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0,
          codigoOrdenCompra: 0
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.ejecucionesCumplidasNum = this.ejecucionesCumplidasNum
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  costoEjecucionComprad: any
  detalleMatrizNecesidadCosto: any
  //Ejecuciones cumplidas
  costoEjecucionComprado(valor:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.costoEjecucionComprad = valor.target.value
    this.detalleMatrizNecesidadCosto = detalleMatrizNecesidad
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0,
        codigoOrdenCompra: 0
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.costoEjecucionComprad = this.costoEjecucionComprad
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].costoEjecucionComprad = this.costoEjecucionComprad
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0,
          codigoOrdenCompra: 0
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.costoEjecucionComprad = this.costoEjecucionComprad
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  objetosCompradosCo: any
  detalleMatrizNecesidadObjetos: any
  //Ejecuciones cumplidas
  objetosComprados(valor:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.objetosCompradosCo = valor.target.value
    this.detalleMatrizNecesidadObjetos = detalleMatrizNecesidad
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0,
        codigoOrdenCompra: 0
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.objetosCompradosCo = this.objetosCompradosCo
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].objetosCompradosCo = this.objetosCompradosCo
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0,
          codigoOrdenCompra: 0
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.objetosCompradosCo = this.objetosCompradosCo
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  codigoOrdenComp: any
  detalleMatrizNecesidadCodOrdenComp: any
  //codigoCompra
  capturarCodigoOrdenCompra(codgoOrdenComp:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.codigoOrdenComp = codgoOrdenComp.option.value.id
    console.log(this.codigoOrdenComp)
    this.detalleMatrizNecesidadCodOrdenComp = detalleMatrizNecesidad
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0,
        codigoOrdenCompra: 0
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.codigoOrdenCompra = this.codigoOrdenComp
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].codigoOrdenCompra = this.codigoOrdenComp
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0,
          codigoOrdenCompra: 0,
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.codigoOrdenCompra = this.codigoOrdenComp
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  //Pdf Requisición
  listFirmasPdf: any = [];
  nombreCompras: any;
  idSolicitud: any;
  idLiderProceso: any;
  idCompras: any;
  idProfesionalLogistico: any;
  idAdministrador: any;
  nombreAdministrador: any;
  nombreEmpresa: any;
  nombreGerente: any;
  nitEmpresa: any;
  nombreFirmaProfesionalLogisitico
  nombreFirmaDireccionAdministrativa
  nombreFirmaLiderProceso
  firmaProfesionalLogistico
  firmaDireccionAdministrativa
  firmaLiderProceso
  mostrarPdfOrdenCompra(elementMatrizDetalle){
    this.servicioOrdenCompra.listarPorId(Number(elementMatrizDetalle.idOrdenCompra)).subscribe(resOrdenCompra=>{
      this.servicioConsultasGenerales.listarOrdenCompra(resOrdenCompra.idSolicitud.id).subscribe(resOrdenCom=>{
        this.servicioFirmas.listarTodos().subscribe(resFirmas=>{
          this.servicioSubirPdf.listarTodasFirmas().subscribe(resImagenesFirmas=>{
            this.servicioSubirPdf.listarTodasFirmas().subscribe(resFirmasImagenes=>{
              this.servicioGestionProceso.listarTodos().subscribe(resGestionProc=>{
                this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
                  this.listFirmasPdf = resFirmasImagenes
                  resOrdenCom.forEach(element => {
                    var body = []
                    this.servicioOrdenCompra.listarPorId(element.id).subscribe(resOrden=>{
                      this.servicioConsultasGenerales.listarUsuariosAdministracion(element.idSolicitud).subscribe(resUsuariosAdministracion=>{
                        this.nombreCompras = resOrden.idUsuario.nombre+" "+resOrden.idUsuario.apellido
                        this.servicioSolicitudDetalle.listarTodos().subscribe(resDetalle=>{
                          resDetalle.forEach(element => {
                            if(element.idSolicitud.id == resOrden.idSolicitud.id && element.idEstado.id != 59){
                              this.idSolicitud = element.idSolicitud.idUsuario.nombre + " " + element.idSolicitud.idUsuario.apellido
                              this.idLiderProceso = element.idSolicitud.idUsuario.id
                              this.idCompras = element.id
                              var now = new Array
                              now.push(element.idArticulos.descripcion)
                              now.push(element.cantidad)
                              const formatterPeso = new Intl.NumberFormat('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                                minimumFractionDigits: 0
                              })
                              now.push(formatterPeso.format(element.valorUnitario))
                              now.push(formatterPeso.format(element.valorTotal))
                              body.push(now)
                            }
                          });

                          resGestionProc.forEach(element => {
                            if(element.idDetalleSolicitud.id == element.idDetalleSolicitud.id){
                              this.idProfesionalLogistico = element.idUsuario.id
                              this.nombreCompras = element.idUsuario.nombre+" "+element.idUsuario.apellido
                            }
                          });
                          resUsuariosAdministracion.forEach(element => {
                            this.idAdministrador = element.idUsuario
                          });
                          this.servicioUsuario.listarPorId(this.idAdministrador).subscribe(resUsuario=>{
                            this.nombreAdministrador = resUsuario.nombre+" "+resUsuario.apellido
                          })
                          resConfiguracion.forEach(element => {
                            if(element.nombre == 'nombre_entidad'){
                              this.nombreEmpresa = element.valor
                            }
                            if(element.nombre == 'Nombre_Gerencia'){
                              this.nombreGerente = element.valor
                            }
                            if(element.nombre == 'nit_empresa'){
                              this.nitEmpresa = element.valor
                            }
                          });
                          resFirmas.forEach(elementFirma => {
                            if(elementFirma.idUsuario.id == this.idProfesionalLogistico){
                              this.nombreFirmaProfesionalLogisitico = elementFirma.firma
                            }
                            if(elementFirma.idUsuario.id == this.idAdministrador){
                              this.nombreFirmaDireccionAdministrativa = elementFirma.firma
                            }
                            if(elementFirma.idUsuario.id == this.idLiderProceso){
                              this.nombreFirmaLiderProceso = elementFirma.firma
                            }
                          });
                          for (let index = 0; index < this.listFirmasPdf.length; index++) {
                            const element = this.listFirmasPdf[index];
                            if(element.name == this.nombreFirmaProfesionalLogisitico){
                              this.firmaProfesionalLogistico = element.url
                            }
                            if(element.name == this.nombreFirmaDireccionAdministrativa){
                              this.firmaDireccionAdministrativa = element.url
                            }
                            if(element.name == this.nombreFirmaLiderProceso){
                              this.firmaLiderProceso = element.url
                            }
                          }
                          console.log(this.firmaProfesionalLogistico, this.firmaLiderProceso, this.firmaDireccionAdministrativa)

                          this.servicioOrdenCompra.listarPorId(element.id).subscribe(async res=>{
                            const formatterPeso = new Intl.NumberFormat('es-CO', {
                              style: 'currency',
                              currency: 'COP',
                              minimumFractionDigits: 0
                            })
                            const pdfDefinition: any = {
                              content: [
                                {
                                  image: await this.getBase64ImageFromURL(
                                    'assets/logo/suchance.png'
                                  ),
                                  relativePosition: {x: 0, y: 0},
                                  width: 150,
                                },
                                {
                                  text: 'Nombre Empresa: '+this.nombreEmpresa,
                                  bold: true,
                                  margin: [0, 80, 0, 10]
                                },
                                {
                                  text: 'Nit Empresa: '+this.nitEmpresa,
                                  margin: [0, 0, 0, 10]
                                },
                                {
                                  text: 'Lider del Proceso: '+res.idSolicitud.idUsuario.nombre+' '+res.idSolicitud.idUsuario.apellido,
                                  margin: [0, 0, 0, 10]
                                },
                                {
                                  text: 'Fecha: '+res.idSolicitud.fecha,
                                  margin: [0, 0, 0, 10]
                                },
                                {
                                  text: 'Proveedor: '+res.idProveedor.nombre,
                                  margin: [0, 0, 0, 10]
                                },
                                {
                                  text: 'Orden Compra: '+res.id,
                                  relativePosition: {x: 250, y: -25},
                                  margin: [0, 0, 0, 20]
                                },
                                {
                                  text: 'Requisición',
                                  bold: true,
                                  fontSize: 20,
                                  alignment: 'center',
                                  margin: [0, 0, 0, 20]
                                },{
                                  table: {
                                    widths: ['*', '*', '*', '*'],
                                    body: [
                                      [
                                        'Articulo',
                                        'Cantidad',
                                        'Valor Unitario',
                                        'Valor Total'
                                      ],
                                    ]
                                  },
                                  margin: [0, 0, 0, 0.3]
                                },
                                {
                                  table: {
                                    widths: ['*', '*', '*', '*'],
                                    body: body
                                  },
                                  margin: [0, 0, 0, 40]
                                },
                                {
                                  text: 'SubTotal: '+ formatterPeso.format(res.subtotal) +' COP',
                                  relativePosition: {x: 350, y: -25},
                                  margin: [0, 0, 0, 20],
                                },
                                {
                                  text: 'Anticipo: '+ res.anticipoPorcentaje +'%',
                                  relativePosition: {x: 350, y: -25},
                                  margin: [0, 0, 0, 20],
                                },
                                {
                                  text: 'Valor Anticipo: '+ formatterPeso.format(res.descuento) +' COP',
                                  relativePosition: {x: 350, y: -25},
                                  margin: [0, 0, 0, 20],
                                },
                                {
                                  text: 'Total: '+ formatterPeso.format(res.valorAnticipo) +' COP',
                                  relativePosition: {x: 350, y: -25},
                                  margin: [0, 0, 0, 20],
                                },
                                {
                                  table: {
                                    widths: ['*', '*'],
                                    heights: 30,
                                    body: [
                                      [
                                        '',
                                        ''
                                      ],
                                    ]
                                  },
                                  margin: [0, -15, 0, 2],
                                  // pageBreak: 'before'
                                },
                                {
                                  text: 'Autorizo',
                                  margin: [100, 5, 0, 0],
                                  // relativePosition: {x: 350, y: -25},
                                  // margin: [-320, 30, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: this.nombreGerente,
                                  margin: [90, 5, 0, 0],
                                  fontSize: 10,
                                },
                                {
                                  text: 'Gerencia General',
                                  margin: [80, 5, 0, 0],
                                  // relativePosition: {x: 350, y: -25},
                                  // margin: [-320, 20, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: 'Realizó',
                                  // relativePosition: {x: 350, y: -25},
                                  margin: [370, -45, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: this.nombreCompras,
                                  margin: [330, 5, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: 'Profesional Logistico',
                                  // relativePosition: {x: 350, y: -25},
                                  margin: [340, 5, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  table: {
                                    widths: ['*', '*'],
                                    heights: 30,
                                    body: [
                                      [
                                        '',
                                        '',
                                      ],
                                    ]
                                  },
                                  margin: [0, 40, 0, 0]
                                },
                                {
                                  text: 'Aprobó',
                                  // relativePosition: {x: 350, y: -25},
                                  margin: [110, 5, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: this.nombreAdministrador,
                                  margin: [60, 5, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: 'Dirección Administrativa',
                                  // relativePosition: {x: 350, y: -25},
                                  margin: [75, 5, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: 'Solicito',
                                  // relativePosition: {x: 350, y: -25},
                                  margin: [370, -35, 0, 20],
                                  fontSize: 10
                                },
                                {
                                  text: this.idSolicitud,
                                  margin: [320, -15, 0, 0],
                                  fontSize: 10
                                },
                                {
                                  text: 'Lider del Proceso',
                                  // relativePosition: {x: 350, y: -25},
                                  margin: [348, 5, 0, 20],
                                  fontSize: 10
                                }
                              ]
                            }
                            const pdf = pdfMake.createPdf(pdfDefinition);
                            pdf.open();
                            localStorage.removeItem('idDireccionAdministrativa')
                            document.getElementById('snipper3')?.setAttribute('style', 'display: none;')
                          })
                        })
                      })
                    })
                  });
                })
              })
            })
          })
        })
      })
    })
  }

  //Get base 64
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarMatrizDetalle);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: MatrizNecesidadDetalle, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
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

  validarValoresIngresados: boolean = false;
  listaValidarValoresIngresadors: any = [];
  elementObtenidoDetalleMatriz: any = {};
  fechaActual: Date = new Date();
  aceptarDetalleMatriz(detalleMatrizNecesided: any) {
    if(this.listaMatrizDetalleNecesidades.length == 0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Para actualizar los datos en matriz detalle necesidad, debe tener tanto las ejecuciones cumplidas, también el costo de esa ejecuccion y los objetos comprados mayor a 0, y el codigo de la compra relacionado a esa ejecución!',
        showConfirmButton: false,
        timer: 3500
      })
    }else{
      this.servicioEstado.listarPorId(86).subscribe(resEstado=>{
        this.listaValidarValoresIngresadors = []
        this.elementObtenidoDetalleMatriz = {}
        console.log(this.listaMatrizDetalleNecesidades)
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesided.id){
            console.log(element.codigoOrdenCompra)
            if(element.ejecucionesCumplidasNum != 0 && element.costoEjecucionComprad != 0 && element.objetosCompradosCo != 0 && element.codigoOrdenCompra != 0){
              this.validarValoresIngresados = true
              this.elementObtenidoDetalleMatriz = element
            }else{
              this.validarValoresIngresados = false
            }
            this.listaValidarValoresIngresadors.push(this.validarValoresIngresados)
          }
        }
        const validarValoresIngre = this.listaValidarValoresIngresadors.includes(true)
        if(validarValoresIngre == true){
          let matrizNecesidadDetalleActualizar : MatrizNecesidadDetalle2 = new MatrizNecesidadDetalle2();
          let matrizNecesidad : MatrizNecesidad2 = new MatrizNecesidad2();
          if(Number(this.elementObtenidoDetalleMatriz.ejecucionesCumplidasNum) > Number(detalleMatrizNecesided.cantidadEjecuciones)){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'El número de ejecuciones cumplidas no debe ser mayor a la del objetivo!',
              showConfirmButton: false,
              timer: 3500
            })
          }else{
            console.log(this.listaMatrizDetalleNecesidades)
            matrizNecesidadDetalleActualizar.id = detalleMatrizNecesided.id
            matrizNecesidadDetalleActualizar.id_matriz_necesidad = detalleMatrizNecesided.idMatrizNecesidad.id
            var fecha = new Date(detalleMatrizNecesided.fecha)
            fecha.setDate(fecha.getDate()+1)
            matrizNecesidadDetalleActualizar.fecha = fecha

            matrizNecesidadDetalleActualizar.fecha_ejecutada = this.fechaActual.getFullYear()+"-"+(this.fechaActual.getMonth()+1)+"-"+this.fechaActual.getDate()
            matrizNecesidadDetalleActualizar.descripcion = detalleMatrizNecesided.descripcion
            matrizNecesidadDetalleActualizar.cantidad_ejecuciones = detalleMatrizNecesided.cantidadEjecuciones
            matrizNecesidadDetalleActualizar.cantidad_estimada = detalleMatrizNecesided.cantidadEstimada
            matrizNecesidadDetalleActualizar.cantidad_comprada = this.elementObtenidoDetalleMatriz.objetosCompradosCo
            matrizNecesidadDetalleActualizar.id_orden_compra = this.elementObtenidoDetalleMatriz.codigoOrdenCompra
            matrizNecesidadDetalleActualizar.costo_ejecucion_comprada = this.elementObtenidoDetalleMatriz.costoEjecucionComprad
            matrizNecesidadDetalleActualizar.cantidad_ejecuciones_cumplidas = this.elementObtenidoDetalleMatriz.ejecucionesCumplidasNum
            matrizNecesidadDetalleActualizar.id_estado = resEstado.id
            var lengthMatrizNecesidadesDetalle = this.listarMatrizDetalle.length
            var porcentajeIndividualEjecucionCompleta = 100/lengthMatrizNecesidadesDetalle
            var porcentajeEjecucionACumplir = porcentajeIndividualEjecucionCompleta/detalleMatrizNecesided.cantidadEjecuciones
            var porcentajeCumplidoFinalmente = porcentajeEjecucionACumplir*this.elementObtenidoDetalleMatriz.ejecucionesCumplidasNum
            matrizNecesidadDetalleActualizar.porcentaje = porcentajeCumplidoFinalmente
            matrizNecesidad.id = detalleMatrizNecesided.idMatrizNecesidad.id
            matrizNecesidad.cantidad = detalleMatrizNecesided.idMatrizNecesidad.cantidad
            matrizNecesidad.cantidadEjecuciones = detalleMatrizNecesided.idMatrizNecesidad.cantidadEjecuciones
            matrizNecesidad.costoEstimado = detalleMatrizNecesided.idMatrizNecesidad.costoEstimado
            if(detalleMatrizNecesided.idMatrizNecesidad.costoTotal == 0){
              matrizNecesidad.costoTotal = this.elementObtenidoDetalleMatriz.costoEjecucionComprad
            }else{
              matrizNecesidad.costoTotal = (Number(detalleMatrizNecesided.idMatrizNecesidad.costoTotal) + Number(this.elementObtenidoDetalleMatriz.costoEjecucionComprad))
            }
            matrizNecesidad.costoUnitario = detalleMatrizNecesided.idMatrizNecesidad.costoUnitario
            matrizNecesidad.detalle = detalleMatrizNecesided.idMatrizNecesidad.detalle
            var fechaMatrizNecesidad = new Date(detalleMatrizNecesided.idMatrizNecesidad.fecha)
            fechaMatrizNecesidad.setDate(fechaMatrizNecesidad.getDate()+1)
            matrizNecesidad.fecha = fechaMatrizNecesidad
            matrizNecesidad.idSubProceso = detalleMatrizNecesided.idMatrizNecesidad.idSubProceso.id
            matrizNecesidad.idTipoActivo = detalleMatrizNecesided.idMatrizNecesidad.idTipoActivo.id
            matrizNecesidad.idTipoNecesidad = detalleMatrizNecesided.idMatrizNecesidad.idTipoNecesidad.id
            if(detalleMatrizNecesided.idMatrizNecesidad.porcentajeTotal == 0){
              matrizNecesidad.porcentajeTotal = porcentajeCumplidoFinalmente
            }else{
              matrizNecesidad.porcentajeTotal = (Number(detalleMatrizNecesided.idMatrizNecesidad.porcentajeTotal) + Number(porcentajeCumplidoFinalmente))
            }
            var contador = 0
            if(matrizNecesidadDetalleActualizar.fecha.getFullYear() == this.fechaActual.getFullYear() && matrizNecesidadDetalleActualizar.fecha.getMonth() == this.fechaActual.getMonth() && detalleMatrizNecesided.idMatrizNecesidad.cumPlaneacion != 0){
              contador = detalleMatrizNecesided.idMatrizNecesidad.cumPlaneacion + 1
            }else if(matrizNecesidadDetalleActualizar.fecha.getFullYear() == this.fechaActual.getFullYear() && matrizNecesidadDetalleActualizar.fecha.getMonth() == this.fechaActual.getMonth() && detalleMatrizNecesided.idMatrizNecesidad.cumPlaneacion == 0){
              contador = 1
            }else{
              contador = detalleMatrizNecesided.idMatrizNecesidad.cumPlaneacion
            }
            matrizNecesidad.cumPlaneacion = contador
            this.actualizarMatrizNecesidadDetalleyMatrizNecesidad(matrizNecesidadDetalleActualizar, matrizNecesidad)
          }
        }else if(validarValoresIngre == false){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Para actualizar los datos en matriz detalle necesidad, debe tener tanto las ejecuciones cumplidas, también el costo de esa ejecuccion y los objetos comprados mayor a 0, y el codigo de la compra relacionado a esa ejecución!',
            showConfirmButton: false,
            timer: 3500
          })
        }
      })
    }
  }

  actualizarMatrizNecesidadDetalleyMatrizNecesidad(matrizNecesidadDetalleActualizar: MatrizNecesidadDetalle2, matrizNecesidadActualizar: MatrizNecesidad2){
    this.servicioModificar.actualizarMatrizNecesidadDetalle(matrizNecesidadDetalleActualizar).subscribe(resMatrizNecesidadDetalleActualizado=>{
      this.servicioModificar.actualizarMatrizNecesidad(matrizNecesidadActualizar).subscribe(resMatrizNecesidadActualizado=>{
        this.dialogRef.close();
        const dialogRef = this.dialog.open(VisualizarDetalleMatrizNecesidadesComponent, {
          width: '1000px',
          height: '440px',
          data: matrizNecesidadActualizar.id
        });
      }, error => {
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al actualizar la matriz necesidad!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar la matriz necesidad detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public rechazarDetalleMatriz(detalleMatrizNecesides: any){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(RechazoMatrizDetalleComponent, {
      width: '350px',
      data: detalleMatrizNecesides
    });
  }

  //this.listarMatrizDetalle
  listadoMatrices: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoMatrices = []
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    for (let index = 0; index < this.listarMatrizDetalle.length; index++) {
      const element = this.listarMatrizDetalle[index];
      var obj = {
        "Id Matriz Necesidad": element.idMatrizNecesidad.id,
        "Fecha Registro Matriz": element.idMatrizNecesidad.fecha,
        "Fecha Ejecucion Matriz Detalle": element.fecha,
        "Tipo Necesidad": element.idMatrizNecesidad.idTipoNecesidad.descripcion,
        "Proceso - SubProceso": element.idMatrizNecesidad.idSubProceso.idTipoProceso.descripcion+" - "+element.idMatrizNecesidad.idSubProceso.descripcion,
        "Descripcion Matriz Necesidad Detalle": element.descripcion,
        "Cantidad Estimada": element.cantidadEstimada,
        "Cantidad Ejecutada": element.cantidadComprada,
        "Ejecucion Estimada": element.cantidadEjecuciones,
        "Ejecuciones Cumplidas": element.cantidadEjecucionesCumplidas,
        "Costo Unitario Estimado": formatterPeso.format(element.idMatrizNecesidad.costoUnitario),
        "Costo Ejecucion Comprada": formatterPeso.format(element.costoEjecucionComprada),
        "Total Estimado": formatterPeso.format(element.idMatrizNecesidad.costoEstimado),
        "Total Comprado": formatterPeso.format(element.idMatrizNecesidad.costoTotal),
        "Porcentaje Cumplido Detalle": Math.round(element.porcentaje)+"%",
        "Porcentaje Total Cumplido": Math.round(element.idMatrizNecesidad.porcentajeTotal)+"%"
      }
      this.listadoMatrices.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listadoMatrices);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaMatrizDetalle");
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

}
