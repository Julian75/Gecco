import { EstadoService } from './../../../../servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TipoTurnoService } from 'src/app/servicios/tipoTurno.service';
import { Turnos } from 'src/app/modelos/turnos';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-turnos',
  templateUrl: './modificar-turnos.component.html',
  styleUrls: ['./modificar-turnos.component.css']
})
export class ModificarTurnosComponent implements OnInit {
  public formTurno!: FormGroup;
  public idTurno : any;
  public listarTurno : any = [];
  public listarEstado : any = [];
  public estadosDisponibles: any = [];
  public listarTipoTurno: any = [];
  public encontrado = false;
  public hora = false;
  public listarExiste: any = [];
  color = ('primary');

  constructor(
    private servicioTurno: TurnosService,
    private servicioEstado: EstadoService,
    private servicioTipoTurno: TipoTurnoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaporidTurno();
    this.listaEstado();
    this.listaTipoTurno();
  }

  private crearFormulario() {
    this.formTurno = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      horaInicio: [null,Validators.required],
      horaFinal: [null,Validators.required],
      estado: [null,Validators.required],
      tipoTurno: [null,Validators.required],
    });
  }

  public listaEstado() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 2){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  public listaTipoTurno() {
    this.servicioTipoTurno.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 1){
          this.listarTipoTurno.push(element);
        }
      });
    });
  }

  public listaporidTurno() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idTurno = params.get('id');
      this.servicioTurno.listarPorId(this.idTurno).subscribe(res => {
        this.listarTurno = res;
        this.formTurno.controls['id'].setValue(this.listarTurno.id);
        this.formTurno.controls['horaInicio'].setValue(this.listarTurno.horaInicio);
        this.formTurno.controls['horaFinal'].setValue(this.listarTurno.horaFinal);
        this.formTurno.controls['estado'].setValue(this.listarTurno.idEstado.id);
        this.formTurno.controls['tipoTurno'].setValue(this.listarTurno.idTipoTurno.id);
      })
    })
  }

  public guardar() {
    let turno : Turnos = new Turnos();
    const horaI = this.formTurno.controls['horaInicio'].value;
    const horaF = this.formTurno.controls['horaFinal'].value;
    const idEstad = this.formTurno.controls['estado'].value;
    const idTipoTurn = this.formTurno.controls['tipoTurno'].value;
    this.route.paramMap.subscribe((params: ParamMap) => {
      turno.id = Number(params.get('id'));
      this.servicioTurno.listarPorId(turno.id).subscribe(resTurno=>{
        const listaTurno = resTurno
        turno.descripcion = listaTurno.descripcion
        turno.horaInicio = listaTurno.horaInicio
        turno.horaFinal = listaTurno.horaFinal
        turno.idEstado = listaTurno.idEstado
        turno.idTipoTurno = listaTurno.idTipoTurno
        if(horaF == resTurno.horaFinal && horaI == resTurno.horaInicio && idEstad == resTurno.idEstado.id && idTipoTurn == resTurno.idTipoTurno.id){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'No hubieron cambios!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/turnos']);
        }else{
          this.servicioTurno.listarTodos().subscribe(res => {
            const horaInicio = this.formTurno.controls['horaInicio'].value;
            const horaFinal = this.formTurno.controls['horaFinal'].value;
            for (let i = 0; i < res.length; i++) {
              if(res[i].horaInicio == horaInicio && res[i].horaFinal == horaFinal){
                if(resTurno.idEstado.id == idEstad && resTurno.idTipoTurno == idTipoTurn){
                  this.encontrado = true
                }
                else{ this.encontrado = false }
              }else if(horaInicio > horaFinal || horaInicio == horaFinal){
                if(resTurno.idEstado.id == idEstad && resTurno.idTipoTurno == idTipoTurn){
                  this.encontrado = true
                  this.hora = true
                }
                else{ this.encontrado = false }
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
                    this.actualizarTurno(turno);
                  }
                })
              })
            }
            if(existe == true){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Este turno ya esta guardado o no hubieron cambios!',
                showConfirmButton: false,
                timer: 1500
              })
            }
            if(this.hora == true){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Por favor ingrese una hora valida!',
              })
            }
          })
        }
      })
    })
  }

  public actualizarTurno(turno: Turnos) {
    this.servicioTurno.actualizar(turno).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Turno modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/turnos']);
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }

}
