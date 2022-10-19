import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { VisitasSigaService } from 'src/app/servicios/serviciosSiga/visitasSiga.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  panelOpenState = false;
  public idRol: any = [];
  public listaAccessForm: any = [];
  public acceso: any;
  public fecha : Date = new Date();
  public listaVisita:any = []
  public valor: any;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioAcceso: AccesoService,
    private servicioVisita: VisitasSigaService,
    private servicioConfiguracion: ConfiguracionService
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
            document.getElementById('Administracion')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 1 || this.listaAccessForm[i] == 12 || this.listaAccessForm[i] == 2 || this.listaAccessForm[i] == 6 || this.listaAccessForm[i] == 13 || this.listaAccessForm[i] == 7 || this.listaAccessForm[i] == 20 || this.listaAccessForm[i] == 14 || this.listaAccessForm[i]== 40 || this.listaAccessForm[i]== 41 ){
            document.getElementById('Malla')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 16 || this.listaAccessForm[i] == 17 || this.listaAccessForm[i] == 18){
            document.getElementById('Visita')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 28){
            document.getElementById('Raspa')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i]== 22 || this.listaAccessForm[i]== 23 || this.listaAccessForm[i]== 26 || this.listaAccessForm[i]== 29 || this.listaAccessForm[i]== 30 || this.listaAccessForm[i]== 31 || this.listaAccessForm[i]== 32 || this.listaAccessForm[i]== 33 || this.listaAccessForm[i] == 58 ){
            document.getElementById('Compra')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i]== 42 || this.listaAccessForm[i]== 43 || this.listaAccessForm[i]== 44 || this.listaAccessForm[i]== 45 || this.listaAccessForm[i]== 46 || this.listaAccessForm[i] == 38 || this.listaAccessForm[i] == 47 || this.listaAccessForm[i] == 66){
            document.getElementById('RecepcionDatos')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 49 || this.listaAccessForm[i] == 50 || this.listaAccessForm[i] == 68 ){
            document.getElementById('RegistroIngreso')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 51 || this.listaAccessForm[i] == 52 || this.listaAccessForm[i] == 55 || this.listaAccessForm[i] == 56 || this.listaAccessForm[i] == 59 || this.listaAccessForm[i] == 60 || this.listaAccessForm[i] == 61 || this.listaAccessForm[i] == 62 || this.listaAccessForm[i] == 69 || this.listaAccessForm[i] == 70 || this.listaAccessForm[i] == 71 || this.listaAccessForm[i] == 72 || this.listaAccessForm[i] == 73) {
            document.getElementById('Inventario')?.setAttribute('style', 'display: block;')
          }else if(this.listaAccessForm[i] == 63 || this.listaAccessForm[i] == 64 || this.listaAccessForm[i] == 65 || this.listaAccessForm[i] == 74 || this.listaAccessForm[i] == 75 ){
            document.getElementById('MatrizDeNecesidades')?.setAttribute('style', 'display: block;')
          }
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
          if (this.listaAccessForm[i] == 14) {
            document.getElementById('14')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 16) {
            document.getElementById('16')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 17) {
            document.getElementById('17')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 18) {
            document.getElementById('18')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 19) {
            document.getElementById('19')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 20) {
            document.getElementById('20')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 21) {
            document.getElementById('21')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 22) {
            document.getElementById('22')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 23 || this.listaAccessForm[i] == 24) {
            document.getElementById('23')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 26) {
            document.getElementById('26')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 28) {
            document.getElementById('28')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 29) {
            document.getElementById('29')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 30) {
            document.getElementById('30')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 31) {
            document.getElementById('31')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 32) {
            document.getElementById('32')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 33) {
            document.getElementById('33')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 38 || this.listaAccessForm[i] == 39) {
            document.getElementById('38')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 40) {
            document.getElementById('40')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 41) {
            document.getElementById('41')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 42) {
            document.getElementById('42')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 43) {
            document.getElementById('43')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 44) {
            document.getElementById('44')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 45) {
            document.getElementById('45')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 46) {
            document.getElementById('46')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 47) {
            document.getElementById('47')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 49) {
            document.getElementById('49')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 50) {
            document.getElementById('50')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 51) {
            document.getElementById('51')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 52) {
            document.getElementById('52')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 53) {
            document.getElementById('53')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 54) {
            document.getElementById('54')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 55) {
            document.getElementById('55')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 56) {
            document.getElementById('56')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 57) {
            document.getElementById('57')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 58) {
            document.getElementById('58')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 59) {
            document.getElementById('59')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 60) {
            document.getElementById('60')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 61) {
            document.getElementById('61')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 62) {
            document.getElementById('62')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 63) {
            document.getElementById('63')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 64) {
            document.getElementById('64')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 65) {
            document.getElementById('65')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 66) {
            document.getElementById('66')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 68) {
            document.getElementById('68')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 69) {
            document.getElementById('69')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 70) {
            document.getElementById('70')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 71) {
            document.getElementById('71')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 72) {
            document.getElementById('72')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 73) {
            document.getElementById('73')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 74) {
            document.getElementById('74')?.setAttribute('style', 'display: block;')
          }
          if (this.listaAccessForm[i] == 75) {
            document.getElementById('75')?.setAttribute('style', 'display: block;')
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
          document.getElementById('Visita')?.setAttribute('style', 'display: block;')
          document.getElementById('15')?.setAttribute('style', 'display: block;')
          if(localStorage.getItem('visita') == 'false'){
            document.getElementById('15')?.setAttribute('style', 'display: none;')
            document.getElementById('Visita')?.setAttribute('style', 'display: none;')
          }if(localStorage.getItem('visita')==null){
            localStorage.setItem('visita', 'true')
          }
        }else{
          document.getElementById('15')?.setAttribute('style', 'display: none;')
        }
      })
    })
  }

}
