import { ConfiguracionService } from './../../../servicios/configuracion.service';
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
  public listaVisita:any = [];
  public valor: any;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioAcceso: AccesoService,
    private servicioVisita: VisitasSigaService,
    private servicioConfiguracion: ConfiguracionService,
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
          if(this.listaAccessForm[i] == 5 || this.listaAccessForm[i] == 4 || this.listaAccessForm[i] == 3 || this.listaAccessForm[i] == 10 || this.listaAccessForm[i] == 11 || this.listaAccessForm[i] == 19 || this.listaAccessForm[i] == 21){
            document.getElementById('Administracion2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 1 || this.listaAccessForm[i] == 12 || this.listaAccessForm[i] == 2 || this.listaAccessForm[i] == 6 || this.listaAccessForm[i] == 13 || this.listaAccessForm[i] == 7 || this.listaAccessForm[i] == 20 || this.listaAccessForm[i] == 14 || this.listaAccessForm[i]== 40 || this.listaAccessForm[i]== 41){
            document.getElementById('Malla2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 16 || this.listaAccessForm[i] == 17 || this.listaAccessForm[i] == 18){
            document.getElementById('Visita2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 28){
            document.getElementById('Raspa2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i]== 22 || this.listaAccessForm[i]== 23 || this.listaAccessForm[i]== 26 || this.listaAccessForm[i]== 29 || this.listaAccessForm[i]== 30 || this.listaAccessForm[i]== 31 || this.listaAccessForm[i]==32 || this.listaAccessForm[i]==33 ){
            document.getElementById('Compra2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i]== 42 || this.listaAccessForm[i]== 43 || this.listaAccessForm[i]== 44 || this.listaAccessForm[i]== 45 || this.listaAccessForm[i]== 46 || this.listaAccessForm[i] == 38 || this.listaAccessForm[i] == 39 || this.listaAccessForm[i] == 47){
            document.getElementById('RecepcionDatos2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i]== 49 || this.listaAccessForm[i]== 50  || this.listaAccessForm[i]== 51){
            document.getElementById('RegistroIngreso2')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 52 || this.listaAccessForm[i] == 53 || this.listaAccessForm[i] == 54 || this.listaAccessForm[i] == 55 || this.listaAccessForm[i] == 56 || this.listaAccessForm[i] == 57 || this.listaAccessForm[i]== 58 || this.listaAccessForm[i]== 59) {
            document.getElementById('Inventario')?.setAttribute('style', 'display: block;')
          }
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
          if (this.listaAccessForm[i] == 14) {
            document.getElementById('1414')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 16) {
            document.getElementById('1616')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 17) {
            document.getElementById('1717')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 18) {
            document.getElementById('1818')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 19) {
            document.getElementById('1919')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 20) {
            document.getElementById('2020')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 2121) {
            document.getElementById('2121')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 22) {
            document.getElementById('2222')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 23 || this.listaAccessForm[i] == 24) {
            document.getElementById('2323')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 26) {
            document.getElementById('2626')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 28) {
            document.getElementById('2828')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 29) {
            document.getElementById('2929')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 30) {
            document.getElementById('3030')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 31) {
            document.getElementById('3131')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 32) {
            document.getElementById('3232')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 33) {
            document.getElementById('3333')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 38 || this.listaAccessForm[i] == 39) {
            document.getElementById('3838')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 40) {
            document.getElementById('4040')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 41) {
            document.getElementById('4141')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 42) {
            document.getElementById('4242')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 43) {
            document.getElementById('4343')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 44) {
            document.getElementById('4444')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 45) {
            document.getElementById('4545')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 46) {
            document.getElementById('4646')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 47) {
            document.getElementById('4747')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 49) {
            document.getElementById('4949')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 50) {
            document.getElementById('5050')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 51) {
            document.getElementById('5151')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 52) {
            document.getElementById('5252')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 53) {
            document.getElementById('5353')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 54) {
            document.getElementById('5454')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 55) {
            document.getElementById('5555')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 56) {
            document.getElementById('5656')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 57) {
            document.getElementById('5757')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 58) {
            document.getElementById('5858')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 59) {
            document.getElementById('5959')?.setAttribute('style', 'display: block;')
          }
        }
      })
    })
  }

  public visitas(){
    this.servicioConfiguracion.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.nombre == "tiempo_max_visita") {
          this.valor = Number(element.valor);
        }
      });
      const fechaActual = (this.fecha.getDate())+ "/"+ (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear()
      this.servicioVisita.listarPorId(fechaActual, String(sessionStorage.getItem('usuario'))).subscribe(res =>{
        res.forEach(element =>{
          this.listaVisita.push(element)
        })
        let ultimo = this.listaVisita[0]
        var horaFinal = ultimo.hora.split(':')
        var hora = new Date(1928,6,25,horaFinal[0],Number(horaFinal[1]))
        var horaFinal3 = new Date(1928,6,25,horaFinal[0],Number(horaFinal[1])+this.valor)
        var horaActual = new Date(1928,6,25,this.fecha.getHours(), this.fecha.getMinutes());

        if(horaActual>=hora && horaActual<=horaFinal3){
          document.getElementById('Visita2')?.setAttribute('style', 'display: block;')
          document.getElementById('1515')?.setAttribute('style', 'display: block;')
          if(localStorage.getItem('visita') == 'false'){
            document.getElementById('15')?.setAttribute('style', 'display: none;')
            document.getElementById('Visita2')?.setAttribute('style', 'display: none;')
          }if(localStorage.getItem('visita')==null){
            localStorage.setItem('visita', 'true')
          }
        }else{
          document.getElementById('1515')?.setAttribute('style', 'display: none;')
        }
      })
    })
  }

}
