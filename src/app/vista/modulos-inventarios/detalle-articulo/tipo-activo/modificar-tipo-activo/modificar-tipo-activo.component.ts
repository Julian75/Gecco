import { TipoActivo2 } from './../../../../../modelos/modelos2/tipoActivo2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModificarService } from './../../../../../servicios/modificar.service';
import { TipoActivoService } from './../../../../../servicios/tipoActivo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-tipo-activo',
  templateUrl: './modificar-tipo-activo.component.html',
  styleUrls: ['./modificar-tipo-activo.component.css']
})
export class ModificarTipoActivoComponent implements OnInit {
  public formTipoActivo!: FormGroup;
  color = ('primary');
  public idTipoActivo: any;
  public listaTiposActivo: any = [];  // lista de Activo
  public encontrado = false;
  public encontrados: any = [];

  constructor(
    private servicioTipoActivo: TipoActivoService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarTipoActivoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoActivo();
  }

  private crearFormulario() {
    this.formTipoActivo = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required]
    });
  }

  public listarporidTipoActivo() {
    this.idTipoActivo = this.data;
    this.servicioTipoActivo.listarPorId(this.idTipoActivo).subscribe(res => {
      this.listaTiposActivo = res;
      this.formTipoActivo.controls['id'].setValue(this.listaTiposActivo.id);
      this.formTipoActivo.controls['descripcion'].setValue(this.listaTiposActivo.descripcion);
    })
  }

  public guardar() {
    this.encontrados = [];
    let tipoActivo : TipoActivo2 = new TipoActivo2();
    tipoActivo.id=Number(this.data);
    if(this.formTipoActivo.valid){
      const descripcion = this.formTipoActivo.value.descripcion;
      this.servicioTipoActivo.listarPorId(tipoActivo.id).subscribe(res=>{
        if(descripcion.toLowerCase() == res.descripcion.toLowerCase()){
          tipoActivo.descripcion=descripcion
          this.servicioModificar.actualizarTipoActivo(tipoActivo).subscribe(res=>{
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
          this.servicioTipoActivo.listarTodos().subscribe(resTi => {
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
                title: 'El tipo de activo ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              tipoActivo.descripcion=descripcion
              this.servicioModificar.actualizarTipoActivo(tipoActivo).subscribe(res=>{
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
