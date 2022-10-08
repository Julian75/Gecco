import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProcesoService } from 'src/app/servicios/proceso.service';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-subproceso',
  templateUrl: './agregar-subproceso.component.html',
  styleUrls: ['./agregar-subproceso.component.css']
})
export class AgregarSubprocesoComponent implements OnInit {
  public formSubProceso!: FormGroup;
  public listaProceso: any = [];
  public validar:any = [];
  color = ('primary');
  constructor(
    private serviceTipoProceso: TipoProcesoService,
    private serviceSubProceso: SubProcesoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarProcesos();
  }

  private crearFormulario() {
    this.formSubProceso = this.formBuilder.group({
      descripcion: ['', Validators.required],
      idTipoProceso: ['', Validators.required],
    });
  }

  public listarProcesos(){
    this.serviceTipoProceso.listarTodos().subscribe( data => {
      this.listaProceso = data;
    })
  }

  public guardar(){
    if(this.formSubProceso.valid){
      this.serviceSubProceso.listarTodos().subscribe( data => {
        this.validar = data;
        let validare= this.validar.find((x:any) => x.descripcion.toLowerCase() === this.formSubProceso.value.descripcion.toLowerCase() && x.idTipoProceso.id === this.formSubProceso.value.idTipoProceso.id);
        if(validare){
          Swal.fire({
            icon: 'error',
            title: 'El subproceso ya existe',
            showConfirmButton: false,
            timer: 2500
          })
        }else{
            this.serviceSubProceso.registrar(this.formSubProceso.value).subscribe( data => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Subproceso agregado',
                showConfirmButton: false,
                timer: 2500
              })
              window.location.reload();
            })

        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 2500
      });
    }

  }

  compareFunction(o1: any, o2: any) {
    return o1.id === o2.id;
  }

}
