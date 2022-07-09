import { Component, OnInit } from '@angular/core';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { VisitasSigaService } from 'src/app/servicios/serviciosSiga/visitasSiga.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-side-movil',
  templateUrl: './side-movil.component.html',
  styleUrls: ['./side-movil.component.css']
})
export class SideMovilComponent implements OnInit {
  panelOpenState = false;
  public idRol: any = [];
  public listaAccessForm: any = [];
  public acceso: any;
  public fecha : Date = new Date();
  public listaVisita:any = []

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioAcceso: AccesoService,
    private servicioVisita: VisitasSigaService,
  ) { }

  ngOnInit(): void {
    this.listarAccesos()
    this.visitas()
  }

  public listarAccesos () {
    const idUsuario = Number(sessionStorage.getItem('id'))
    this.servicioUsuario.listarPorId(idUsuario).subscribe(res=>{
      this.idRol = res.idRol.id
      this.servicioAcceso.listarTodos().subscribe( res =>{
        res.forEach(element => {
          if (element.idRol.id == this.idRol) {
            this.listaAccessForm.push(element.idModulo.id)
          }
        });
        for (let i = 0; i < this.listaAccessForm.length; i++) {
          if (this.listaAccessForm[i] == 1) {
            document.getElementById('1')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 2) {
            document.getElementById('2')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 3) {
            document.getElementById('3')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 4) {
            document.getElementById('4')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 5) {
            document.getElementById('5')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 6) {
            document.getElementById('6')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 7) {
            document.getElementById('7')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 10) {
            document.getElementById('10')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 11) {
            document.getElementById('11')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 12) {
            document.getElementById('12')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 13) {
            document.getElementById('13')?.setAttribute('style', 'display: block;')
          }
        }
      })
    })
  }

  public visitas(){
    const fechaActual = (this.fecha.getDate()-3)+ "/"+ (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear()
    console.log(fechaActual)
    this.servicioVisita.listarPorId(fechaActual, String(sessionStorage.getItem('documento'))).subscribe(res =>{
      res.forEach(element =>{
        this.listaVisita.push(element)
      })
      let ultimo = this.listaVisita[this.listaVisita.length - 1]
      var horaFinal = ultimo.hora.split(':')
      var horaFinal3 = new Date(2022,7,5,horaFinal[0],Number(horaFinal[1])+5)
      var horaFinal4 = horaFinal3.getHours() + ":" + horaFinal3.getMinutes();
      var horaActual = new Date().getHours() + ":" + new Date().getMinutes();

      if(horaActual>=ultimo.hora && horaActual<=horaFinal4){
        document.getElementById('14')?.setAttribute('style', 'display: block;')
      }else{
        document.getElementById('14')?.setAttribute('style', 'display: none;')
      }
    })
  }

}
