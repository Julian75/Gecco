import { UsuarioService } from 'src/app/servicios/usuario.service';
import { GenerarCotizacionComponent } from './../generar-cotizacion/generar-cotizacion.component';
import { SolicitudesComponent } from './../solicitudes/solicitudes.component';
import { Router } from '@angular/router';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaCotizacionesComponent } from '../lista-cotizaciones/lista-cotizaciones.component';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {

  public listaEstado: any = [];
  public lista: any = [];
  public habilitar = false

  constructor(
    private servicioSolicitud: SolicitudService,
    private servicioAccesos: AccesoService,
    private servicioUsuario: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.estado();
  }

  public estado(){
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
      if(res.idEstado.id == 28){
        document.getElementById("card1")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card2")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if (res.idEstado.id == 29) {
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if (res.idEstado.id == 30) {
        document.getElementById("card1")?.setAttribute("style", "background-color: red;")
        document.getElementById("card2")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 36){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 35){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 34){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.descripcion == "Registro"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: green;")
        document.getElementById("card5")?.setAttribute("style", "background-color: green;")
      }else{
        document.getElementById("card1")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card2")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }
    })
  }

  public solicitudes(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 28){
              const dialogRef = this.dialog.open(SolicitudesComponent, {
                width: '1000px',
                height: '430px',
                data: this.lista[0]
              });
            }else if(res.idEstado.id == 30){
              console.log("modificar solicitud")
            }
          })
        }else if(this.habilitar == false){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 28){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Aún no se ha validado la solicitud!',
                showConfirmButton: false,
                timer: 1500
              })
            }if(res.idEstado.id == 30){
              console.log("modificar soliticud")
            }
          })
        }
      })
    })

  }

  public solicitudes2(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
    this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 29){
              const dialogRef = this.dialog.open(GenerarCotizacionComponent, {
                width: '1000px',
                height: '430px',
                data: this.lista[0]
              });
            }
          })
        }else if(this.habilitar == false){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 29){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Aún no se ha registrado la cotización!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }
      })
    })
  }

  public solicitudes3(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 24 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 36){
              const dialogRef = this.dialog.open(ListaCotizacionesComponent, {
                width: '1000px',
                height: '430px',
                data: this.lista[0]
              });
            }
          })
        }else if(this.habilitar == false){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 35){
              console.log("modificar cotizacion")
            }
            if(res.idEstado.id == 36){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Aún no se ha validado la cotización!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }
      })
    })
  }

  // Card registro
  public solicitudes4(){

  }

  // Card aprobacion
  public solicitudes5(){

  }
}
