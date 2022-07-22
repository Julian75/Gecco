import { SolicitudService } from './../../../servicios/solicitud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {

  public listaEstado: any = [];

  constructor(
    private servicioSolicitud: SolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.estado();
  }

  public estado(){
    this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(res => {
      console.log(res)
      if (res.idEstado.descripcion == "Viable") {
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: red;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Cotización"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Rechazo cotización"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Finalizado"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Registro"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: green;")
        document.getElementById("card5")?.setAttribute("style", "background-color: green;")
      }else{
        document.getElementById("card1")?.setAttribute("style", "background-color: red;")
        document.getElementById("card2")?.setAttribute("style", "background-color: red;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }
    })
  }
}
