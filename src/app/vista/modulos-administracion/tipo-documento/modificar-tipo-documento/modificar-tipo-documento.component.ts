import { TipoDocumento } from './../../../../modelos/tipoDocumento';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDocumentoService } from './../../../../servicios/tipoDocumento.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-modificar-tipo-documento',
  templateUrl: './modificar-tipo-documento.component.html',
  styleUrls: ['./modificar-tipo-documento.component.css']
})
export class ModificarTipoDocumentoComponent implements OnInit {
  public formTipoDocumento!: FormGroup;
  color = ('primary');
  public idTipoDocumento: any;
  public listaTiposDocumentos: any = [];  // lista de modulos
  public listarEstado: any = [];
  public estadosDisponibles:any = [];

  constructor(
    private servicioTipoDocumento: TipoDocumentoService,
    private servicioEstado: EstadoService,
    public dialogRef: MatDialogRef<ModificarTipoDocumentoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoDocumento();
    this.listarEstados()
  }

  private crearFormulario() {
    this.formTipoDocumento = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 4){
          this.estadosDisponibles.push(element)
          console.log(this.estadosDisponibles)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  public listarporidTipoDocumento() {
    this.idTipoDocumento = this.data;
    this.servicioTipoDocumento.listarPorId(this.idTipoDocumento).subscribe(res => {
      this.listaTiposDocumentos = res;
      console.log(res)
      this.formTipoDocumento.controls['id'].setValue(this.listaTiposDocumentos.id);
      this.formTipoDocumento.controls['descripcion'].setValue(this.listaTiposDocumentos.descripcion);
      this.formTipoDocumento.controls['estado'].setValue(this.listaTiposDocumentos.idEstado.id);
    })
  }

  public guardar() {
    let tipoDocumento : TipoDocumento = new TipoDocumento();
    tipoDocumento.id=Number(this.data);
    const descripcion = this.formTipoDocumento.controls['descripcion'].value;
    const estado = this.formTipoDocumento.controls['estado'].value;
    this.servicioTipoDocumento.listarPorId(tipoDocumento.id).subscribe(res=>{
      if(descripcion == res.descripcion && estado == res.idEstado.id){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'No hubieron cambios!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(descripcion==null || descripcion==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        tipoDocumento.descripcion=descripcion
        this.servicioEstado.listarPorId(estado).subscribe(resEstado=>{
          tipoDocumento.idEstado = resEstado
          this.actualizarTipoDocumento(tipoDocumento);
        })
      }
    })

    // tipoDocumento.descripcion=this.formTipoDocumento.controls['descripcion'].value;
    // tipoDocumento.idEstado=this.formTipoDocumento.controls['estado'].value;
    // console.log()
    // if(tipoDocumento.descripcion==null || tipoDocumento.descripcion==""){
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'El campo esta vacio!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // }else{
    //   this.actualizarTipoDocumento(tipoDocumento);
    // }
  }

  public actualizarTipoDocumento(tipoDocumento: TipoDocumento) {
    this.servicioTipoDocumento.actualizar(tipoDocumento).subscribe(res => {
      console.log("Tipo Documento actualizado")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Documento modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
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
