import { Router } from '@angular/router';
import { ElementosVisita } from './../../../modelos/elementosVisita';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitaDetalle } from 'src/app/modelos/visitaDetalle';
import { Visitas } from 'src/app/modelos/visitas';
import { ElementosVisitaService } from 'src/app/servicios/ElementosVisita.service';
import { OpcionesVisitaService } from 'src/app/servicios/opcionesVisita.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VisitasService } from 'src/app/servicios/visitas.service';
import { VisitasSigaService } from 'src/app/servicios/serviciosSiga/visitasSiga.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import Swal from 'sweetalert2';
import { VisitaDetalleService } from 'src/app/servicios/visitaDetalle.service';

@Component({
  selector: 'app-visita-detalle',
  templateUrl: './visita-detalle.component.html',
  styleUrls: ['./visita-detalle.component.css']
})
export class VisitaDetalleComponent implements OnInit {

  public formVisitaDetalle!: FormGroup;
  dtOptions: any = {};
  public listarElementosVisita: any = [];
  public listarOpciones: any = [];
  public lista: any = [];
  public fecha: Date = new Date();
  public visitas: any = [];
  public visitasSiga: any = [];
  public elementos: any = [];
  public nomSitioventa:any= [];

  constructor(
    private fb: FormBuilder,
    private servicioOpciones: OpcionesVisitaService,
    private servicioElementosVisita: ElementosVisitaService,
    private servicioUsuario: UsuarioService,
    private servicioVisita: VisitasService,
    private servicioVisitaDetalle: VisitaDetalleService,
    private servicioVisitaSiga: VisitasSigaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTodos();
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 4,
      processing: true,
      buttons: [
        {
          extend: 'excel',
          text: '<i class="fa-solid fa-file-excel text-success btnexcel" style="background-color:#6DBE53;"></i>',
        },
        {
          extend: 'pdf',
          text: '<i class="fa-solid fa-file-pdf" style="background-color: #DA161A;"></i>',
        },
         {
          extend: 'print',
          text: '<i class="fa-solid fa-print " style="color:#959595" ></i>',
         }
      ]
    };
  }

  private crearFormulario() {
    this.formVisitaDetalle = this.fb.group({
      id: 0,
      lol: [null,Validators.required],
      opcion: [null,Validators.required],
      ideSitioventa: [null,Validators.required],
      nomSitioventa: [null,Validators.required],
    });
  }

  public listarTodos () {
    this.servicioOpciones.listarTodos().subscribe( res =>{
      this.listarOpciones = res;
    })
    this.servicioElementosVisita.listarTodos().subscribe( res =>{
      this.listarElementosVisita = res;
    })
    const fechaActual = (this.fecha.getDate()-3)+ "/"+ (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear()
    var documento = String(sessionStorage.getItem('usuario'))
    this.servicioVisitaSiga.listarPorId(fechaActual, documento).subscribe( res => {
      res.forEach(element => {
        this.visitasSiga.push(element)
      });
      this.nomSitioventa = this.visitasSiga[this.visitasSiga.length - 1]
    })
  }

  public guardar(){
    if(this.lista.length < 1){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe completar todo el formulario para registrar su visita detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioElementosVisita.listarTodos().subscribe( res =>{
        this.listarElementosVisita = res;
        if(this.lista.length == this.listarElementosVisita.length){
          let visita : Visitas = new Visitas();
          var idUsuario = Number(sessionStorage.getItem('id'))
          this.servicioUsuario.listarPorId(idUsuario).subscribe(res =>{
            visita.idUsuario = res
            visita.fechaRegistro = this.fecha
            this.registrarVisita(visita, this.lista)
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Le falta completar el formulario!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }

  capturarOpcion(elemento:any,opcion:any){
    var obj = {
      elemento: elemento,
      opcion: opcion
    }
    for (let i = 0; i < this.listarElementosVisita.length; i++) {
      const element = this.lista[i];
      if (element) {
        if (element.elemento.id == obj.elemento.id) {
          this.lista.splice([i], 1, obj)
          break
        }else if(obj.elemento.id == element.elemento.id+1){
          var id2 = element.elemento.id+1
          if (obj.elemento.id < id2) {
            this.lista.push(obj)
            break
          }
        }
      }else{
        this.lista.push(obj)
        break
      }
    }
  }

  public registrarVisita(visita: Visitas, lista:any) {
    this.servicioVisita.registrar(visita).subscribe(res=>{
      this.registrarVisitaDetalle(lista)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public registrarVisitaDetalle(lista:any) {
    this.visitasSiga = []
    let visitaDetalle : VisitaDetalle = new VisitaDetalle();
    this.servicioVisita.listarTodos().subscribe(res=>{
      res.forEach(visita => {
        if(visita.idUsuario.id == Number(sessionStorage.getItem('id'))){
          this.visitas.push(visita.id)
        }
      })
      const fechaActual = (this.fecha.getDate()-3)+ "/"+ (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear()
      var documento = String(sessionStorage.getItem('usuario'))
      this.servicioVisitaSiga.listarPorId(fechaActual, documento).subscribe( res => {
        res.forEach(element => {
          this.visitasSiga.push(element)
        });
        let ultimo = this.visitasSiga[this.visitasSiga.length - 1]
        visitaDetalle.ideSitioventa = Number(ultimo.ideSitioVenta)
        visitaDetalle.nomSitioventa = ultimo.nom_sitioventa
        let ultimaVisita = this.visitas[this.visitas.length - 1]
        this.servicioVisita.listarPorId(ultimaVisita).subscribe(resVisita=>{
          visitaDetalle.idVisitas = resVisita
          visitaDetalle.descripcion= "Visita "+resVisita.id
          this.listarOpciones = lista
          for (let i = 0; i < this.lista.length; i++) {
            const element = this.lista[i];
            visitaDetalle.idElementosVisita = element.elemento
            visitaDetalle.idOpcionesVisita = element.opcion
            this.registrarVisitaDetal(visitaDetalle);
          }
        })
      })
    })
  }

  public registrarVisitaDetal(visitaDetalle: VisitaDetalle) {
    this.servicioVisitaDetalle.registrar(visitaDetalle).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Visita Detalle Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.setItem('visita', 'false')
      window.location.reload();
      this.router.navigate(['/vista']);
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
