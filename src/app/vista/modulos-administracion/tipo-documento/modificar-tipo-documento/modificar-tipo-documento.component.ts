
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDocumentoService } from './../../../../servicios/tipoDocumento.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { TipoDocumento2 } from 'src/app/modelos/modelos2/tipoDocumento2';

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
  public encontrado = false;
  public encontrados: any = [];

  constructor(
    private servicioTipoDocumento: TipoDocumentoService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
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
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  public listarporidTipoDocumento() {
    this.idTipoDocumento = this.data;
    this.servicioTipoDocumento.listarPorId(this.idTipoDocumento).subscribe(res => {
      this.listaTiposDocumentos = res;
      this.formTipoDocumento.controls['id'].setValue(this.listaTiposDocumentos.id);
      this.formTipoDocumento.controls['descripcion'].setValue(this.listaTiposDocumentos.descripcion);
      this.formTipoDocumento.controls['estado'].setValue(this.listaTiposDocumentos.idEstado);
    })
  }

  public guardar() {
    this.encontrados = [];
    let tipoDocumento : TipoDocumento2 = new TipoDocumento2();
    tipoDocumento.id=Number(this.data);
    if(this.formTipoDocumento.valid){
      const estado = this.formTipoDocumento.value.estado.id;
      const descripcion = this.formTipoDocumento.value.descripcion;
      this.servicioTipoDocumento.listarPorId(tipoDocumento.id).subscribe(res=>{
        if(descripcion.toLowerCase() == res.descripcion.toLowerCase() && estado == res.idEstado.id){
          tipoDocumento.descripcion=descripcion
          this.servicioEstado.listarPorId(estado).subscribe(resEstado=>{
            tipoDocumento.idEstado = resEstado.id
            this.servicioModificar.actualizarTipoDocumento(tipoDocumento).subscribe(res=>{
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
          })
        }else{
          this.servicioTipoDocumento.listarTodos().subscribe(resTi => {
            resTi.forEach(element => {
              if(descripcion.toLowerCase() == element.descripcion.toLowerCase() && estado == element.idEstado.id){
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
                title: 'El tipo de documento ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              tipoDocumento.descripcion=descripcion
              this.servicioEstado.listarPorId(estado).subscribe(resEstado=>{
                tipoDocumento.idEstado = resEstado.id
                this.servicioModificar.actualizarTipoDocumento(tipoDocumento).subscribe(res=>{
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


  compareFunction(o1: any, o2: any) {
    return o1.id === o2.id;
  }
}
