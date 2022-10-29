import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProcesoService } from 'src/app/servicios/proceso.service';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { SubProceso2 } from 'src/app/modelos/modelos2/subProceso2';
import { EstadoService } from 'src/app/servicios/estado.service';
@Component({
  selector: 'app-modificar-subproceso',
  templateUrl: './modificar-subproceso.component.html',
  styleUrls: ['./modificar-subproceso.component.css']
})
export class ModificarSubprocesoComponent implements OnInit {
  public formSubProceso!: FormGroup;
  public listaProceso: any = [];
  public validar:any = [];
  public validarTodo: any = [];
  color = ('primary');
  constructor(
    private serviceTipoProceso: TipoProcesoService,
    private serviceSubProceso: SubProcesoService,
    private serviceModificar: ModificarService,
    private servicioEstado: EstadoService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarProcesos();
    this.listarPorSubProceso();
  }

  private crearFormulario() {
    this.formSubProceso = this.formBuilder.group({
      id: [this.data],
      descripcion: ['', Validators.required],
      idTipoProceso: ['', Validators.required],
    });
  }

  public listarPorSubProceso(){
    this.serviceSubProceso.listarPorId(Number(this.data)).subscribe( SubProceso => {
      this.formSubProceso.patchValue({
        descripcion: SubProceso.descripcion,
        idTipoProceso: SubProceso.idTipoProceso,
      });
    })
  }


  public listarProcesos(){
    this.serviceTipoProceso.listarTodos().subscribe( data => {
      this.listaProceso = data;
    })
  }

  validar2: any = [];
  public guardar(){
    this.validar = []
    this.validarTodo = []
    this.validar2 = []
    if(this.formSubProceso.valid){
      let subProceso2: SubProceso2 = new SubProceso2()
      document.getElementById("snipper").setAttribute("style", "display: block;")
      this.serviceSubProceso.listarPorId(Number(this.data)).subscribe( SubProceso => {
        this.validar = SubProceso;
        this.serviceSubProceso.listarTodos().subscribe( SubProceso => {
          this.validarTodo = SubProceso;
          this.validar2 = this.validarTodo.filter((item:any) => item.descripcion === this.formSubProceso.value.descripcion && item.idTipoProceso.id === this.formSubProceso.value.idTipoProceso.id);
          if(this.validar.descripcion === this.formSubProceso.value.descripcion && this.validar.idTipoProceso.id === this.formSubProceso.value.idTipoProceso.id){
            document.getElementById("snipper").setAttribute("style", "display: none;")
            Swal.fire({
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            })
            window.location.reload();
          }else if(this.validar2.length > 0){
            document.getElementById("snipper").setAttribute("style", "display: none;")
            Swal.fire({
              icon: 'error',
              title: 'El subproceso ya existe!',
              showConfirmButton: false,
              timer: 2000
            })
          }else{
            subProceso2.id = Number(this.data)
            subProceso2.descripcion = this.formSubProceso.value.descripcion
            this.servicioEstado.listarPorId(90).subscribe(resEstado=>{
              subProceso2.idEstado = resEstado.id
              subProceso2.idTipoProceso = this.formSubProceso.value.idTipoProceso.id
              this.serviceModificar.actualizarSubProceso(subProceso2).subscribe( data => {
                document.getElementById("snipper").setAttribute("style", "display: none;")
                Swal.fire({
                  icon: 'success',
                  title: 'SubProceso modificado!',
                  showConfirmButton: false,
                  timer: 1500
                })
                window.location.reload();
              })
            })
          }
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  compareFunction(o1: any, o2: any) {
    return o1.id === o2.id;
  }

}
