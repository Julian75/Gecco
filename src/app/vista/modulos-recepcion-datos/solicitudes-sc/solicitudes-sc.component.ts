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

@Component({
  selector: 'app-solicitudes-sc',
  templateUrl: './solicitudes-sc.component.html',
  styleUrls: ['./solicitudes-sc.component.css']
})
export class SolicitudesScComponent implements OnInit {

  public fecha: Date = new Date;
  public listarSolicitud: any = [];
  public tiempoLimite: any;
  public tiempoCaducado: any;
  displayedColumns = ['id', 'fecha', 'vence', 'municipio', 'incidente', 'motivoSolicitud', 'medioRadicacion', 'tipoServicio', 'nombreCliente', 'telefono', 'auxiliarRadicacion', 'escala', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioSolicitudSc: SolicitudSCService,
    private servicioUsuario: UsuarioService,
    private servicioAccesos: AccesoService,
    private servicioHistorial: HistorialSolicitudesService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioArchivosSolicitudSC: ArchivoSolicitudService,
    private servicioPdf: SubirPdfService,
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
      height: '500px',
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
  public listarTodos () {
    this.listaDecisionPao = []
    this.listaDecisionRemitente = []
    this.listarSolicitud = []
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
              var fechaActual = this.fecha.getTime();
              var fechaFin = new Date(elementSolicitud.vence);
              var fecha2 = fechaFin.getTime();

              var resta = fecha2 - fechaActual;
              var diferencia = resta/(1000*60*60*24)
              var diasHabiles = 0

              if(diferencia > 0){
                for (let i = 0; i < diferencia; i++) {
                  var fechaTrancurriendo = this.fecha.getFullYear() + "-"+ this.fecha.getMonth()+ "-" +(this.fecha.getDate()+i);
                  var fechaTrancurriendo2 = new Date(fechaTrancurriendo);
                  if ((fechaTrancurriendo2.getDay() == 0) || (fechaTrancurriendo2.getDay() == 6)) {
                    console.log("dias de finde")
                  }else{
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
                if(diasHabiles <= Number(this.tiempoCaducado)){
                  obj.prorroga = true
                }
              }else if(diasHabiles < 1){
                obj.nombre = "No_cumplio"
              }
              this.servicioConsultasGenerales.listarHistorialSC(elementSolicitud.id).subscribe(resHistorial=>{
                console.log(resHistorial)
                if(resHistorial.length>=1){
                  resHistorial.forEach(elementHistorial => {
                    if(elementHistorial.idUsuario == Number(sessionStorage.getItem('id')) && elementHistorial.idEstado == 65){
                      pendienteHistorialPao = true
                    }
                    listaHistorialPao.push(pendienteHistorialPao)
                  })
                  const listaHisPao = listaHistorialPao.includes( true );
                  if(listaHisPao == true){
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
            console.log(this.listarSolicitud)
            this.dataSource = new MatTableDataSource(this.listarSolicitud);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }else if(remitente == true){
          this.idModulo = 39
          this.servicioHistorial.listarTodos().subscribe(resHistorial=>{
            resHistorial.forEach(elementHistorial => {
              if(elementHistorial.idUsuario.id == Number(sessionStorage.getItem('id')) && elementHistorial.idEstado.id == 65){
                var obj = {
                  solicitud: elementHistorial.idSolicitudSC,
                }
                this.listarSolicitud.push(obj)
              }
            });
            console.log(this.listarSolicitud)
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
    this.servicioConsultasGenerales.listarArchivosSC(idSolicitudSC).subscribe(resArchivos=>{
      resArchivos.forEach(elementArchivos => {
        this.servicioPdf.listarTodosSegunda().subscribe(resPdf => {
          for(const i in resPdf){
            if (elementArchivos.nombreArchivo == resPdf[i].name) {
              window.location.href = resPdf[i].url
            }
          }
        })
      });
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  name = 'solicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('jerarquia');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
