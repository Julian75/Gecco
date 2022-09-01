import { ModificarSolicitudScComponent } from './modificar-solicitud-sc/modificar-solicitud-sc.component';
import { AsignarUsuariosPqrService } from './../../../servicios/asignacionUsuariosPqrs.service';
import { ClienteSCService } from './../../../servicios/clienteSC.service';
import { ArchivoSolicitudService } from './../../../servicios/archivoSolicitud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgregarHistorialSolicitudesComponent } from '../historial-solicitudes/agregar-historial-solicitudes/agregar-historial-solicitudes.component';
import { HistorialSolicitudesComponent } from '../historial-solicitudes/historial-solicitudes.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { HistorialSolicitudesService } from 'src/app/servicios/historialSolicitudes.service';
import { ModificarHistorialRemisionComponent } from '../historial-solicitudes/modificar-historial-remision/modificar-historial-remision.component';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { RemisionesDecisionComponent } from '../remisiones-decision/remisiones-decision.component';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { ProrrogaComponent } from '../prorroga/prorroga.component';
import { CorreoService } from 'src/app/servicios/Correo.service';
import { RegistroCorreoService } from 'src/app/servicios/registroCorreo.service';
import { Correo } from 'src/app/modelos/correo';
import { RegistroCorreo } from 'src/app/modelos/registroCorreo';
import { SolicitudSC } from 'src/app/modelos/solicitudSC';
import { DescargasMultiplesComponent } from '../descargas-multiples/descargas-multiples.component';

@Component({
  selector: 'app-solicitudes-sc',
  templateUrl: './solicitudes-sc.component.html',
  styleUrls: ['./solicitudes-sc.component.css']
})
export class SolicitudesScComponent implements OnInit {

  public fecha: Date = new Date;
  public fecha3: Date = new Date;
  public listaCorreos : any = [];
  public listarSolicitud: any = [];
  public tiempoLimite: any;
  public tiempoCaducado: any;
  displayedColumns = ['id', 'fecha', 'vence', 'municipio', 'incidente', 'motivoSolicitud', 'medioRadicacion', 'tipoServicio', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioSolicitudSc: SolicitudSCService,
    private servicioUsuario: UsuarioService,
    private servicioAccesos: AccesoService,
    private servicioRegistroCorreo: RegistroCorreoService,
    private servicioHistorial: HistorialSolicitudesService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioArchivosSolicitudSC: ArchivoSolicitudService,
    private servicioPdf: SubirPdfService,
    private servicioCorreo: CorreoService,
    private servicioCliente: ClienteSCService,
    private servicioAsignacionUsuarioPQRS: AsignarUsuariosPqrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.variables();
  }

  public abrirModal(idSolicitud: any){
    const dialogRef = this.dialog.open(AgregarHistorialSolicitudesComponent, {
      width: '500px',
      data: idSolicitud
    });
  }

  public abrirModificar(idSolicitud: any){
    const dialogRef = this.dialog.open(ModificarHistorialRemisionComponent, {
      width: '500px',
      data: idSolicitud
    });
  }

  public abrirHistorial(idSolicitud: any){
    const dialogRef = this.dialog.open(HistorialSolicitudesComponent, {
      width: '1000px',
      data: idSolicitud
    });
  }

  public prorroga(solicitud){
    const dialogRef = this.dialog.open(ProrrogaComponent, {
      width: '500px',
      height: '270px',
      data: solicitud
    });
  }

  public variables(){
    this.servicioConfiguracion.listarTodos().subscribe(res=>{
      res.forEach(element => {
        if(element.nombre == "tiempo_limite"){
          this.tiempoLimite = element.valor
        }else if(element.nombre == "tiempo_caducado"){
          this.tiempoCaducado = element.valor
        }
      });
    })
  }

  decisionPao:boolean = false // Saber si debe listar lo de pao
  decisionRemitente:boolean = false // Saber si debe listar lo de remitente
  listaDecisionPao: any = [];
  listaDecisionRemitente: any = [];
  idModulo: any;
  usuarioMatrix: boolean = false;
  usuarioMatrix2: boolean = false;
  rchivo: boolean = false;
  listaRchivo: any = []
  listaUsuarioMatrix: any = [];
  public listarTodos () {
    this.listaDecisionPao = []
    this.listaDecisionRemitente = []
    this.listarSolicitud = []
    this.listaUsuarioMatrix = []
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(elementAcceso => {
          if(elementAcceso.idRol.id == resUsuario.idRol.id && elementAcceso.idModulo.id == 38){
            this.decisionPao = true
          }else if(elementAcceso.idRol.id == resUsuario.idRol.id && elementAcceso.idModulo.id == 39){
            this.decisionRemitente = true
          }
          this.listaDecisionPao.push(this.decisionPao)
          this.listaDecisionRemitente.push(this.decisionRemitente)
        });
        const pao = this.listaDecisionPao.includes( true );
        const remitente = this.listaDecisionRemitente.includes( true );
        if(pao == true){
          this.idModulo = 38
          this.servicioSolicitudSc.listarTodos().subscribe( res =>{
            res.forEach(elementSolicitud => {
              var obj = {
                solicitud: {},
                contador: 0,
                nombre: "",
                aprobar: false,
                archivo: false,
                prorroga: false
              }
              var listaHistorialPao = []
              var pendienteHistorialPao = false
              var fechaActual = this.fecha3.getTime();
              var fechaFin = new Date(elementSolicitud.vence);
              var fecha2 = fechaFin.getTime();

              var resta = fecha2 - fechaActual;
              var diferencia = resta/(1000*60*60*24)
              var diasHabiles = 0

              if(diferencia > 0){
                // fechaLoca.setDate(this.fecha3.getDate()+14)
                // console.log(fechaLoca)
                for (let i = 0; i < diferencia; i++) {
                  var fechaLoca = new Date();
                  fechaLoca.setDate(fechaLoca.getDate()+i)
                  var fechaTrancurriendo = fechaLoca.getFullYear() + "-"+ (fechaLoca.getMonth()+1)+ "-" +fechaLoca.getDate();
                  var fechaTrancurriendo2 = new Date(fechaTrancurriendo);
                  if ((fechaTrancurriendo2.getDay() == 0) || (fechaTrancurriendo2.getDay() == 6)) {
                    console.log("dias de finde")
                  }else if((fechaTrancurriendo2.getDay() == 1) || (fechaTrancurriendo2.getDay() == 2) || (fechaTrancurriendo2.getDay() == 3) || (fechaTrancurriendo2.getDay() == 4) || (fechaTrancurriendo2.getDay() == 5)){
                    diasHabiles = diasHabiles + 1
                  }
                }
              }

              if(elementSolicitud.idEstado.id == 67){
                obj.nombre = "Finalizado"
              }else if (diasHabiles > Number(this.tiempoLimite)) {
                obj.nombre = "Proceso"
              }else if((diasHabiles < (Number(this.tiempoLimite)+1)) && (diasHabiles > 0)){
                obj.nombre = "Medio"
                if(diasHabiles < (Number(this.tiempoCaducado)+1) && elementSolicitud.idEstado.id != 70){
                  obj.prorroga = true
                }
              }else if(diasHabiles < 1){
                obj.nombre = "No_cumplio"
              }
              this.servicioConsultasGenerales.listarHistorialSC(elementSolicitud.id).subscribe(resHistorial=>{
                if(resHistorial.length>=1){
                  resHistorial.forEach(elementHistorial => {
                    if(elementHistorial.idUsuario == Number(sessionStorage.getItem('id')) && elementSolicitud.idEstado.id == 69){
                      pendienteHistorialPao = true
                    }else if(elementHistorial.idUsuario == Number(sessionStorage.getItem('id')) && elementHistorial.idEstado == 65){
                      pendienteHistorialPao = true
                    }else if(elementHistorial.idUsuario == Number(sessionStorage.getItem('id')) && elementHistorial.idEstado == 65){
                      pendienteHistorialPao = true
                    }
                    listaHistorialPao.push(pendienteHistorialPao)
                  })
                  const listaHisPao = listaHistorialPao.includes( true );
                  if(listaHisPao == true){
                    obj.aprobar = true
                  }else if(elementSolicitud.idEstado.id == 68){
                    obj.aprobar = true
                  }
                }else if(resHistorial.length<1 && elementSolicitud.idEstado.id == 62){
                  obj.aprobar = true
                }
              })
              this.servicioConsultasGenerales.listarArchivosSC(elementSolicitud.id).subscribe(resArchivos=>{
                resArchivos.forEach(elementArchivos => {
                  if(elementArchivos.id_solicitudsc == elementSolicitud.id){
                    obj.archivo = true
                  }
                });
              })
              if(elementSolicitud.idEstado.id == 68){
                obj.aprobar = true
              }
              obj.solicitud = elementSolicitud
              obj.contador = diasHabiles

              this.listarSolicitud.push(obj)
            });
            this.listarSolicitud.reverse();
            this.dataSource = new MatTableDataSource(this.listarSolicitud);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.enviarCorreo(this.listarSolicitud)
          })
        }else if(remitente == true){
          this.listaRchivo = []
          this.idModulo = 39
          this.servicioHistorial.listarTodos().subscribe(resHistorial=>{
            resHistorial.forEach(elementHistorial => {
              if(elementHistorial.idUsuario.id == Number(sessionStorage.getItem('id')) && elementHistorial.idEstado.id == 65){
                var obj = {
                  solicitud: elementHistorial.idSolicitudSC,
                  incidente: false,
                  archivo:false
                }
                if(elementHistorial.idSolicitudSC.incidente == ""){
                  obj.incidente = true
                }else{ obj.incidente = false }
                this.servicioAsignacionUsuarioPQRS.listarTodos().subscribe(resAsigUsuPQRS=>{
                  resAsigUsuPQRS.forEach(elementUsuarioPqrs => {
                    if((elementUsuarioPqrs.idUsuario.id == elementHistorial.idUsuario.id && elementUsuarioPqrs.idArea.id == 1) || (elementUsuarioPqrs.idUsuario.id == elementHistorial.idUsuario.id && elementUsuarioPqrs.idArea.id == 2)){
                      this.usuarioMatrix = true
                    }else{ this.usuarioMatrix = false }
                    this.listaUsuarioMatrix.push(this.usuarioMatrix)
                  });
                  this.usuarioMatrix2 = this.listaUsuarioMatrix.includes( true )
                  console.log(this.usuarioMatrix2)
                })
                this.servicioConsultasGenerales.listarArchivosSC(elementHistorial.idSolicitudSC.id).subscribe(resArchivos=>{
                  resArchivos.forEach(elementArchivos => {
                    if(elementArchivos.id_solicitudsc == elementHistorial.idSolicitudSC.id){
                      this.rchivo = true
                    }else{
                      this.rchivo = false
                    }
                    this.listaRchivo.push(this.rchivo)
                  });
                  console.log(this.listaRchivo)
                  const rchi = this.listaRchivo.includes(true)
                  console.log(rchi)
                  if (rchi == true) {
                    obj.archivo = true
                  }
                })
                this.listarSolicitud.push(obj)
              }
            });
            this.listarSolicitud.reverse();
            this.dataSource = new MatTableDataSource(this.listarSolicitud);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
    })
  }

  //Descargar si subio soporte el cliente al momento de generar la solicitud
  public descargarPdf(idSolicitudSC: number){
    var listaPdf = []
    this.servicioPdf.listarTodosSegunda().subscribe(resPdf => {
      this.servicioConsultasGenerales.listarArchivosSC(idSolicitudSC).subscribe(resArchivos=>{
        resArchivos.forEach(elementArchivos => {
          for(const i in resPdf){
            if (elementArchivos.nombreArchivo == resPdf[i].name) {
              listaPdf.push(resPdf[i])
            }
          }
        })
        if(listaPdf.length > 1){
          const dialogRef = this.dialog.open(DescargasMultiplesComponent, {
            width: '500px',
            data: listaPdf
          });
        }else if(listaPdf.length == 1){
          console.log(listaPdf[0].url)
          window.location.href = listaPdf[0].url;
        }
      });
    })
  }

  fechActual: Date = new Date();
  correo: any
  contrasena:any
  existeapro: boolean = false
  listExist: any = []
  public enviarCorreo(solicitudes){
    this.listaCorreos= []
    this.listExist= []
    solicitudes.forEach(elementSolicitud => {
      if(elementSolicitud.nombre == 'Medio'){
        this.listaCorreos.push(elementSolicitud)
      }
    });
    this.servicioRegistroCorreo.listarTodos().subscribe(resCorreo=>{
      resCorreo.forEach(elementCorreo => {
        var fecha = new Date(elementCorreo.fecha)
        fecha.setDate(fecha.getDate() + 1)
        if(fecha.getDate() == this.fechActual.getDate() && fecha.getMonth() == this.fechActual.getMonth() && fecha.getFullYear() == this.fechActual.getFullYear() && elementCorreo.idUsuario.id == Number(sessionStorage.getItem('id'))){
          this.existeapro = true
        }else{ this.existeapro = false }
        this.listExist.push(this.existeapro)
      });
      const existe = this.listExist.includes( true );
      if(existe == false){
        let correo : Correo = new Correo()
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario => {
          this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
            resConfiguracion.forEach(elementConfi => {
              if(elementConfi.nombre == "correo_gecco"){
                this.correo = elementConfi.valor
              }
              if(elementConfi.nombre == "contraseña_correo"){
                this.contrasena = elementConfi.valor
              }
            });
            correo.correo = this.correo
            correo.contrasena = this.contrasena
            correo.to = resUsuario.correo
            correo.subject = "Solicitudes próximo a vencer"
            correo.messaje = "<!doctype html>"
            +"<html>"
            +"<head>"
            +"<meta charset='utf-8'>"
            +"</head>"
            +"<body>"
            +"<table style='border: 1px solid #000; text-align: center;'>"
            +"<tr>"
            +"<th style='border: 1px solid #000;'>Solicitud</th>"
            +"<th style='border: 1px solid #000;'>Fecha Vencimiento</th>"
            +"<th style='border: 1px solid #000;'>Documento Cliente</th>"
            +"<th style='border: 1px solid #000;'>Nombre Cliente</th>"
            +"<th style='border: 1px solid #000;'>Motivo Solicitud</th>"
            +"<th style='border: 1px solid #000;'>Tipo Servicio</th>"
            +"</tr>";
            this.listaCorreos.forEach(element => {
              correo.messaje += "<tr>"
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.solicitud.id+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.solicitud.vence+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.solicitud.idClienteSC.documento+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.solicitud.idClienteSC.nombre+" "+element.solicitud.idClienteSC.apellido+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.solicitud.idMotivoSolicitud.descripcion+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.solicitud.idTipoServicio.descripcion+"</td>";
              correo.messaje += "</tr>";
            });
            correo.messaje += "</table>"
            +"<br>"
            +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
            +"</body>"
            +"</html>";
            console.log(correo)
            this.enviarCorreo2(correo);
          })
        })
      }
    })
    console.log(this.listaCorreos)
  }

  public enviarCorreo2(correo: Correo){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      let registroCorre : RegistroCorreo = new RegistroCorreo()
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario => {
        registroCorre.idUsuario = resUsuario
        registroCorre.fecha = this.fechActual
        registroCorre.registro = "Si"
        this.registrarRegistroCorreo(registroCorre)
      })
    })
  }

  public registrarRegistroCorreo(registroCorreo: RegistroCorreo){
    this.servicioRegistroCorreo.registrar(registroCorreo).subscribe(res =>{
      console.log(res)
    })
  }

  public masonoRemisiones(solicitudSC){
    const dialogRef = this.dialog.open(RemisionesDecisionComponent, {
      width: '400px',
      data: solicitudSC
    });
  }

   // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarSolicitud);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: SolicitudSC, filter: string) => {
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

  name = 'solicitudesPQRS.xlsx';
  exportToExcel(): void {
    // document.getElementById('asignarTurnoVendedor').
    // for (let index = 0; index < 2; index++) {
    //   const element = 2[index];
    //   document.getElementById("opcion").remove();
    // }
    let element = document.getElementById('asignarTurnoVendedor');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1')
    XLSX.writeFile(book, this.name);

    var porcentaje = JSON.stringify(document.getElementById('asignarTurnoVendedor'));
    console.log(porcentaje)
  }

  public editar(idSolicitud){
    const dialogRef = this.dialog.open(ModificarSolicitudScComponent, {
      width: '500px',
      height: '250px',
      data: idSolicitud
    });
  }

}
