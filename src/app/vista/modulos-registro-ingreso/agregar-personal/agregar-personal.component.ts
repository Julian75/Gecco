import { Component, Inject, OnInit } from '@angular/core';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoPersonalEmpresaService } from 'src/app/servicios/ingresoPersonalEmpresa.service';
import { IngresoPersonalEmpresa } from 'src/app/modelos/ingresoPersonalEmpresa';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { AreaService } from 'src/app/servicios/area.service';
import { SedeService } from 'src/app/servicios/sedes.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css']
})
export class AgregarPersonalComponent implements OnInit {

  public formPersonal!: FormGroup;
  public listaOficinas: any = [];
  public listaArea: any = [];
  public listaSede: any = [];
  public listarExiste:any =[]
  color = ('primary');
  public encontrado = false;
  public listaTipoDocumentos: any = [];
  public fecha: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private servicioEstado : EstadoService,
    private servicioPersonal : IngresoPersonalEmpresaService,
    private servicioOficinas : OficinasService,
    private servicioAreas : AreaService,
    private servicioSedes : SedeService,
    private servicioTipoDocumento : TipoDocumentoService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoDocumentos();
    this.listarOficinas();
    this.listarAreas();
    this.listarSedes();
    this.validar();
  }

  private crearFormulario() {
    this.formPersonal = this.fb.group({
      id: 0,
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
      documento: [null,Validators.required],
      area: [null,Validators.required],
      sede: [null,Validators.required],
      oficina: [null,Validators.required],
    });
  }

  public listarTipoDocumentos() {
    this.servicioTipoDocumento.listarTodos().subscribe(res => {
      this.listaTipoDocumentos = res
      this.formPersonal.controls['documento'].setValue(this.data);
    });
  }

  public listarAreas() {
    this.servicioAreas.listarTodos().subscribe(res => {
      this.listaArea = res
    });
  }

  public listarSedes() {
    this.servicioSedes.listarTodos().subscribe(res => {
      this.listaSede = res
    });
  }

  public listarOficinas() {
    this.servicioOficinas.listarTodos().subscribe(res => {
      this.listaOficinas = res;
    });
  }

  public validar(){
    if(typeof(this.data) === 'object'){
      document.getElementById("nom").setAttribute("style", "display: none;");
      document.getElementById("tipoDoc").setAttribute("style", "display: none;");
      document.getElementById("apell").setAttribute("style", "display: none;");
      document.getElementById("doc").setAttribute("style", "display: none;");
      document.getElementById("ofic").setAttribute("style", "display: none;");
    }
  }

  public guardar() {
    let personal : IngresoPersonalEmpresa = new IngresoPersonalEmpresa();
    if(typeof(this.data) === 'object'){
      console.log(this.data)
      const idArea = this.formPersonal.controls['area'].value;
      const idSede = this.formPersonal.controls['sede'].value;
      if(idArea==null || idSede==null || idArea==undefined || idSede==undefined){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Los campos estan vacios!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        personal.nombre = this.data['nombre'];
        personal.apellido = this.data['apellido'];
        personal.documento = this.data['documento'];
        personal.fecha = this.fecha
        personal.idTipoDocumento = this.data['idTipoDocumento'];
        personal.ideOficina = this.data['ideOficina'];
        this.servicioEstado.listarPorId(72).subscribe(resEstado => {
          personal.idEstado = resEstado
          this.servicioAreas.listarPorId(idArea).subscribe(resArea => {
            personal.idArea = resArea
            this.servicioSedes.listarPorId(idSede).subscribe(resSede => {
              personal.idSedes = resSede
              personal.horaIngreso = this.fecha.getHours() + ":" + this.fecha.getMinutes();
              personal.horaSalida = ""
              this.registrarPersonal(personal);
            })
          })
        });
      }
      console.log(personal)
    }else{
      this.listarExiste = []
      if(this.formPersonal.valid){
        document.getElementById('snipper')?.setAttribute('style', 'display: block;')
        const nombre = this.formPersonal.controls['nombre'].value;
        const apellido = this.formPersonal.controls['apellido'].value;
        const nombres = nombre.split(" ");
        const apellidos = apellido.split(" ");
        for (let i = 0; i < nombres.length; i++) {
          nombres[i] = nombres[i].charAt(0).toUpperCase() + nombres[i].substring(1).toLowerCase();
          personal.nombre = nombres.join(" ");
        }
        for (let i = 0; i < apellidos.length; i++) {
          apellidos[i] = apellidos[i].charAt(0).toUpperCase() + apellidos[i].substring(1).toLowerCase();
          personal.apellido = apellidos.join(" ");
        }
        personal.ideOficina = Number(this.formPersonal.controls['oficina'].value);
        const documento = this.formPersonal.controls['documento'].value;
        this.servicioPersonal.listarTodos().subscribe(res=>{
          for (let i = 0; i < res.length; i++) {
            if(res[i].documento == documento){
              this.encontrado = true
            }else{
              this.encontrado = false
            }
            this.listarExiste.push(this.encontrado)
          }
          const existe = this.listarExiste.includes(true)
          if(existe == false){
            personal.documento = this.formPersonal.controls['documento'].value;
            this.servicioEstado.listarPorId(72).subscribe(res => {
              personal.idEstado = res
              const idTipoDocumento = this.formPersonal.controls['tipoDocumento'].value;
              this.servicioTipoDocumento.listarPorId(idTipoDocumento).subscribe(res => {
                personal.idTipoDocumento = res
                const idArea = this.formPersonal.controls['area'].value;
                this.servicioAreas.listarPorId(idArea).subscribe(res => {
                  personal.idArea = res
                  const idSede = this.formPersonal.controls['sede'].value;
                  this.servicioSedes.listarPorId(idSede).subscribe(res => {
                    personal.idSedes = res
                    personal.horaSalida = ""
                    personal.fecha = this.fecha
                    if(this.fecha.getMinutes() < 10){
                      personal.horaSalida = this.fecha.getHours()+":0"+this.fecha.getMinutes()
                    }else{
                      personal.horaSalida = this.fecha.getHours()+":"+this.fecha.getMinutes()
                    }
                    console.log(personal)
                    if(personal.nombre==null || personal.apellido==null || personal.documento<=0 || personal.nombre=="" || personal.apellido=="" || personal.idEstado==null || personal.idTipoDocumento==null || personal.idArea==null || personal.idSedes==null || personal.idEstado==undefined || personal.idTipoDocumento==undefined || personal.idArea==undefined || personal.idSedes==undefined){
                      Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'El campo esta vacio!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }else{
                      this.registrarPersonal(personal);
                    }
                  })
                });
              })
            })
          }
          if(existe == true){
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ya existe un personal registrado con ese número de documento!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Campos Vacios!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  public registrarPersonal(personal: IngresoPersonalEmpresa) {
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    this.servicioPersonal.registrar(personal).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Personal Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
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
