import { TipoProceso2 } from './../../../../modelos/modelos2/tipoProceso2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModificarService } from './../../../../servicios/modificar.service';
import { TipoProcesoService } from './../../../../servicios/tipoProceso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-tipo-proceso',
  templateUrl: './modificar-tipo-proceso.component.html',
  styleUrls: ['./modificar-tipo-proceso.component.css']
})
export class ModificarTipoProcesoComponent implements OnInit {
  public formTipoProceso!: FormGroup;
  color = ('primary');
  public idTipoProceso: any;
  public listaTiposProceso: any = [];  // lista de Procesos
  public encontrado = false;
  public encontrados: any = [];

  constructor(
    private servicioTipoProceso: TipoProcesoService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarTipoProcesoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoProceso();
  }

  private crearFormulario() {
    this.formTipoProceso = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required]
    });
  }

  public listarporidTipoProceso() {
    this.idTipoProceso = this.data;
    this.servicioTipoProceso.listarPorId(this.idTipoProceso).subscribe(res => {
      this.listaTiposProceso = res;
      this.formTipoProceso.controls['id'].setValue(this.listaTiposProceso.id);
      this.formTipoProceso.controls['descripcion'].setValue(this.listaTiposProceso.descripcion);
    })
  }

  public guardar() {
    this.encontrados = [];
    let tipoProceso : TipoProceso2 = new TipoProceso2();
    tipoProceso.id=Number(this.data);
    if(this.formTipoProceso.valid){
      const descripcion = this.formTipoProceso.value.descripcion;
      this.servicioTipoProceso.listarPorId(tipoProceso.id).subscribe(res=>{
        if(descripcion.toLowerCase() == res.descripcion.toLowerCase()){
          tipoProceso.descripcion=descripcion
          this.servicioModificar.actualizarTipoProceso(tipoProceso).subscribe(res=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            })
            this.dialogRef.close();
            window.location.reload();
          })
        }else{
          this.servicioTipoProceso.listarTodos().subscribe(resTi => {
            resTi.forEach(element => {
              if(descripcion.toLowerCase() == element.descripcion.toLowerCase()){
                this.encontrado = true;
              }else{
                this.encontrado = false;
              }
              this.encontrados.push(this.encontrado)
            })
            const existe = this.encontrados.includes(true);
            if(existe == true){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El tipo de proceso ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              tipoProceso.descripcion=descripcion
              this.servicioModificar.actualizarTipoProceso(tipoProceso).subscribe(res=>{
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Se modificó correctamente!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.dialogRef.close();
                window.location.reload();
              }, error => {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Ocurrió un error al modificar!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            }
          })

        }

      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo está vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
