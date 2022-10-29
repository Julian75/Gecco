import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { ChatRemitenteService } from 'src/app/servicios/chatRemitente.service';

@Component({
  selector: 'app-chat-solicitudes-sc',
  templateUrl: './chat-solicitudes-sc.component.html',
  styleUrls: ['./chat-solicitudes-sc.component.css']
})
export class ChatSolicitudesScComponent implements OnInit {

  listaCorreosPqrs: any = []
  listaCorreosPqrsCompletos: any = []
  listaAccesos: any = []

  constructor(
    public chatServicio: ChatRemitenteService,
    public AccesosServicio: AccesoService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listaCorreos();
  }

  listaCorreos(){
    this.listaCorreosPqrs = []
    this.listaCorreosPqrsCompletos = []
    this.chatServicio.listarTodos().subscribe(resCorreosSOlicitudPQRS=>{
      this.AccesosServicio.listarTodos().subscribe(resAccesos=>{
        resCorreosSOlicitudPQRS.forEach(elementCorreoSolicitudPQRS => {
          if(elementCorreoSolicitudPQRS.idSolicitudSC.id == Number(this.data)){
            var obj = {
              chatCorreos: elementCorreoSolicitudPQRS,
              emisor: false //Para saber si este usuario es quien tiene el modulo 38
            }
            this.listaAccesos = []
            resAccesos.forEach(elementAcesos => {
             if(elementAcesos.idRol.id == elementCorreoSolicitudPQRS.idUsuarioEnvia.idRol.id){
              this.listaAccesos.push(elementAcesos.idModulo.id)
             }
            });
            this.listaAccesos.forEach(elementAcceso => {
              if(elementAcceso == 38){
                obj.emisor = true
              }
            });
            this.listaCorreosPqrs.push(obj)
            this.listaCorreosPqrsCompletos = this.listaCorreosPqrs.sort((a, b) => Number(new Date(a.chatCorreos.fecha)) - Number(new Date(b.chatCorreos.fecha)))
          }
        });
      })
    })
  }

}
