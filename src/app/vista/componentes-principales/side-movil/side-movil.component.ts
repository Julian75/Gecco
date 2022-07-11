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
    // this.visitas()
  }

  public listarAccesos () {
    const idUsuario = Number(sessionStorage.getItem('id'))
    this.servicioUsuario.listarPorId(idUsuario).subscribe(res=>{
      this.idRol = res.idRol.id
      this.servicioAcceso.listarTodos().subscribe( res =>{
        res.forEach(element => {
          if (element.idRol.id == this.idRol) {
            this.listaAccessForm.push(element.idModulo.id)
            console.log(this.listaAccessForm)
          }
        });
        for (let i = 0; i < this.listaAccessForm.length; i++) {
          if (this.listaAccessForm[i] == 1) {
            document.getElementById('111')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 2) {
            document.getElementById('222')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 3) {
            document.getElementById('333')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 4) {
            document.getElementById('444')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 5) {
            document.getElementById('555')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 6) {
            document.getElementById('666')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 7) {
            document.getElementById('777')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 10) {
            document.getElementById('1010')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 11) {
            document.getElementById('1111')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 12) {
            document.getElementById('1212')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 13) {
            document.getElementById('1313')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 13) {
            document.getElementById('1414')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 13) {
            document.getElementById('1616')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 13) {
            document.getElementById('1717')?.setAttribute('style', 'display: block;')
          }
        }
      })
    })
  }

  public visitas(){
    const fechaActual = (this.fecha.getDate())+ "/"+ (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear()
    console.log(fechaActual)
    this.servicioVisita.listarPorId(fechaActual, String(sessionStorage.getItem('usuario'))).subscribe(res =>{
      console.log(res)
      res.forEach(element =>{
        this.listaVisita.push(element)
      })
      console.log(this.listaVisita)
      let ultimo = this.listaVisita[0]
      var horaFinal = ultimo.hora.split(':')
      var hora = new Date(horaFinal[0],Number(horaFinal[1]))
      var horaFinal3 = new Date(horaFinal[0],Number(horaFinal[1])+5)
      var horaActual = new Date(this.fecha.getHours(), this.fecha.getMinutes());

      if(horaActual>=hora && horaActual<=horaFinal3){
        document.getElementById('1515')?.setAttribute('style', 'display: block;')
      }else{
        document.getElementById('1515')?.setAttribute('style', 'display: none;')
      }
    })
  }

}
