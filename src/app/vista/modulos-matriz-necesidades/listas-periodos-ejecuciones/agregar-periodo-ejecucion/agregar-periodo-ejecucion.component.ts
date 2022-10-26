import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeriodoEjecucionService } from 'src/app/servicios/periodoEjecucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-periodo-ejecucion',
  templateUrl: './agregar-periodo-ejecucion.component.html',
  styleUrls: ['./agregar-periodo-ejecucion.component.css']
})
export class AgregarPeriodoEjecucionComponent implements OnInit {
  public formPeriodoEjecucion!: FormGroup;
  public listaPeriodoEjecucion: any = [];
  color = ('primary');
  constructor(
    private servicioPeriodoEjecucion: PeriodoEjecucionService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formPeriodoEjecucion = this.formBuilder.group({
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  validar: boolean = false;
  listaValidar: any = [];
  public guardar(){
    if(this.formPeriodoEjecucion.valid){
      document.getElementById("snipper").setAttribute("style", "display: block;")
      if(this.formPeriodoEjecucion.controls['cantidad'].value > 0){
        this.servicioPeriodoEjecucion.listarTodos().subscribe( resPeriodoEjecucion => {
          this.listaValidar = []
          resPeriodoEjecucion.forEach(elementPeriodoEjecucion => {
            if(elementPeriodoEjecucion.cantidad == this.formPeriodoEjecucion.controls['cantidad'].value){
              this.validar = true
            }else{
              this.validar = false
            }
            this.listaValidar.push(this.validar)
          });
          var valide = this.listaValidar.includes(true)
          if(valide == true){
            document.getElementById("snipper").setAttribute("style", "display: none;")
            Swal.fire({
              icon: 'error',
              title: 'El periodo ejecución ya existe',
              showConfirmButton: false,
              timer: 2500
            })
          }else{
            this.servicioPeriodoEjecucion.registrar(this.formPeriodoEjecucion.value).subscribe( data => {
              document.getElementById("snipper").setAttribute("style", "display: none;")
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Periodo ejecución agregado',
                showConfirmButton: false,
                timer: 2500
              })
              window.location.reload();
            })
          }
        })
      }else{
        document.getElementById("snipper").setAttribute("style", "display: none;")
        Swal.fire({
          icon: 'error',
          title: 'La cantidad en meses debe ser mayor a 0',
          showConfirmButton: false,
          timer: 2500
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 2500
      });
    }

  }

}
