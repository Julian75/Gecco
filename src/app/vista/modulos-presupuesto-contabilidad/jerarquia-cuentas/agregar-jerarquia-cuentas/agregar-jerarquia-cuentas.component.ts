import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JerarquiaCuentas } from './../../../../modelos/jerarquiaCuentas';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-jerarquia-cuentas',
  templateUrl: './agregar-jerarquia-cuentas.component.html',
  styleUrls: ['./agregar-jerarquia-cuentas.component.css']
})
export class AgregarJerarquiaCuentasComponent implements OnInit {
  public formJerarquiaCuentas!: FormGroup;
  public listarJerarquiaCuentas: any = [];
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private servicioJerarquiaCuentas: JerarquiaCuentasService,
    public dialogRef: MatDialogRef<AgregarJerarquiaCuentasComponent>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTodos();
  }

  private crearFormulario(){
    this.formJerarquiaCuentas = this.fb.group({
      id: 0,
      descripcion: [null, Validators.required],
    });
  }
  public listarTodos(){
    this.servicioJerarquiaCuentas.listarTodos().subscribe(resJerarquiaCuentas => {
      this.listarJerarquiaCuentas = resJerarquiaCuentas;
    });
  }
  public guardar(){
    let jerarquiaCuentas : JerarquiaCuentas = new JerarquiaCuentas();
    const descripcion = this.formJerarquiaCuentas.controls['descripcion'].value
    this.servicioJerarquiaCuentas.listarTodos().subscribe(resJerarquiaCuentas => {
      this.listarJerarquiaCuentas = resJerarquiaCuentas;
      if(descripcion== null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo no puede estar vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: block;')
        for (let i = 0; i < this.listarJerarquiaCuentas.length; i++) {
          if (this.listarJerarquiaCuentas[i].descripcion.toLowerCase() == descripcion.toLowerCase()) {
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              icon: 'error',
              title: 'Jerarquia Existente',
              showConfirmButton: false,
              timer: 1500
            });
            return;
          }
        }
        jerarquiaCuentas.descripcion = descripcion.toUpperCase();
        this.servicioJerarquiaCuentas.registrar(jerarquiaCuentas).subscribe(res => {
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          Swal.fire({
            icon: 'success',
            title: 'Jerarquia Registrada',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
          window.location.reload();
        });
      }
    });
  }

}
