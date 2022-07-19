import { SolicitudService } from './../../../servicios/solicitud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {

  public listaEstado: any = [];

  constructor(
    private servicioSolicitud: SolicitudService,
  ) { }

  ngOnInit(): void {
    this.estado();
  }

  public estado(){
    this.servicioSolicitud.listarPorId(2).subscribe(res => {
      console.log(res)
      if (res.idEstado.descripcion == "Solicitado") {
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: red;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Cotizacion"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Pendiente"){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: red;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }else if(res.idEstado.descripcion == "Finalizado"){
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
