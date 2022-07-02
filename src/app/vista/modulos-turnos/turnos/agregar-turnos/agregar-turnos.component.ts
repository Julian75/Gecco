import { Turnos } from './../../../../modelos/turnos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/servicios/estado.service';
import { TipoTurnoService } from 'src/app/servicios/tipoTurno.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-turnos',
  templateUrl: './agregar-turnos.component.html',
  styleUrls: ['./agregar-turnos.component.css']
})
export class AgregarTurnosComponent implements OnInit {

  public formTurno!: FormGroup;
  public listarEstado: any = [];
  public estadosDisponibles: any = [];
  public listarTipoTurno: any = [];
  public listarExiste: any = [];
  public encontrado = false;
  public hora = false;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioTurnos: TurnosService,
    private servicioEstado : EstadoService,
    private servicioTipoTurno : TipoTurnoService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
    this.listarTipoTurnos();
  }

  private crearFormulario() {
    this.formTurno = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      horaInicio: [null,Validators.required],
      horaFinal: [null,Validators.required],
      estado: [null,Validators.required],
      tipoTurno: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 2){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  public listarTipoTurnos() {
    this.servicioTipoTurno.listarTodos().subscribe(res => {
      this.listarTipoTurno = res;
    });
  }

  public guardar() {
    const horasI = this.formTurno.controls['horaInicio'].value;
    const horaF = this.formTurno.controls['horaFinal'].value;
    const estadito = this.formTurno.controls['estado'].value;
    const tipoTurni = this.formTurno.controls['tipoTurno'].value;
    if(horasI == null || horaF == null || estadito == null || tipoTurni == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos se encuentran vacios!',
        showConfirmButton: false,
        timer: 1500
      })
      this.crearFormulario()
    }else{
      this.encontrado=false
      this.hora = false;
       let turno : Turnos = new Turnos();
       this.servicioTurnos.listarTodos().subscribe(res => {
        const idTurno = res.length+1
        turno.descripcion = "Turno "+idTurno
        const horaInicio = this.formTurno.controls['horaInicio'].value;
        const horaFinal = this.formTurno.controls['horaFinal'].value;
        for (let i = 0; i < res.length; i++) {
          if(res[i].horaInicio == horaInicio && res[i].horaFinal == horaFinal){
            this.encontrado = true
          }else if(horaInicio > horaFinal || horaInicio == horaFinal){
              this.hora = true
              this.encontrado = true
          }
          else{
            this.encontrado = false
          }
          this.listarExiste.push(this.encontrado)
        }
        const existe = this.listarExiste.includes( true )
        if(existe == false ){
          turno.horaInicio = this.formTurno.controls['horaInicio'].value;
          turno.horaFinal = this.formTurno.controls['horaFinal'].value;
          const idEstado = this.formTurno.controls['estado'].value;
            this.servicioEstado.listarPorId(idEstado).subscribe(res => {
            this.listarEstado = res;
            turno.idEstado= this.listarEstado
            const idTipoTurno = this.formTurno.controls['tipoTurno'].value;
            this.servicioTipoTurno.listarPorId(idTipoTurno).subscribe(res => {
              this.listarTipoTurno = res;
              turno.idTipoTurno= this.listarTipoTurno
              if(turno.descripcion==null || turno.descripcion=="" || turno.horaInicio==undefined || turno.horaInicio==null || turno.idEstado==undefined || turno.idTipoTurno==null || turno.idTipoTurno==undefined || turno.idEstado==null){
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El campo esta vacio!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                this.registrarTurno(turno);
              }
            })
          })
        }
        if(existe == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este turno ya esta guardado!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/turnos']);
        }
        if(this.hora == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Por favor ingrese una hora valida!',
          })
          this.crearFormulario();
          this.router.navigate(['/agregarTurno']);
        }
      });
    }
  }

    public registrarTurno(turno: Turnos) {
      this.servicioTurnos.registrar(turno).subscribe(res=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Turno Registrado!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/turnos']);

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
