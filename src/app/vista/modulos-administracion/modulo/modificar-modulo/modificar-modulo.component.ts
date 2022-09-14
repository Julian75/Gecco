import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ModuloService } from 'src/app/servicios/modulo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Modulo } from 'src/app/modelos/modulo';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Modulo2 } from 'src/app/modelos/modelos2/modulo2';

@Component({
  selector: 'app-modificar-modulo',
  templateUrl: './modificar-modulo.component.html',
  styleUrls: ['./modificar-modulo.component.css']
})
export class ModificarModuloComponent implements OnInit {

  public formModulo!: FormGroup;
  public idModulo: any;
  public listaModulos: any = [];  // lista de modulos

  constructor(
    private servicioModulo: ModuloService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarModuloComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidModulo();
  }

  private crearFormulario() {
    this.formModulo = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  public listarporidModulo() {
    this.idModulo = this.data;
    this.servicioModulo.listarPorId(this.idModulo).subscribe(res => {
      this.listaModulos = res;
      this.formModulo.controls['id'].setValue(this.listaModulos.id);
      this.formModulo.controls['descripcion'].setValue(this.listaModulos.descripcion);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let modulo : Modulo2 = new Modulo2();
    modulo.id=Number(this.data);
    modulo.descripcion=this.formModulo.value.descripcion[0].toUpperCase() + this.formModulo.value.descripcion.slice(1).toLowerCase();
    if(modulo.descripcion==null || modulo.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioModulo.listarPorId(Number(this.data)).subscribe(resMod=>{
        this.servicioModulo.listarTodos().subscribe(resModulo=>{
          if(resMod.descripcion.toLowerCase() == modulo.descripcion.toLowerCase()){
            Swal.fire({
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload();
          }else{
            resModulo.forEach(element => {
              if(element.descripcion.toLowerCase() == modulo.descripcion.toLowerCase()){
                this.existe = true
              }else{
                this.existe = false
              }
              this.listaExis.push(this.existe)
            });
            const existe = this.listaExis.includes( true );
            if(existe == true){
              Swal.fire({
                icon: 'error',
                title: 'Ese Modulo ya existe!',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              this.actualizarModulo(modulo);
            }
          }
        })
      })
    }
  }

  public actualizarModulo(modulo: Modulo2) {
    this.servicioModificar.actualizarModulo(modulo).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modulo modificado!',
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
