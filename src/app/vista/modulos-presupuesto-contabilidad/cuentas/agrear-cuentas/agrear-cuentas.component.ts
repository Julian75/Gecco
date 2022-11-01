import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cuentas } from 'src/app/modelos/cuentas';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrear-cuentas',
  templateUrl: './agrear-cuentas.component.html',
  styleUrls: ['./agrear-cuentas.component.css']
})
export class AgrearCuentasComponent implements OnInit {
  public formCuenta!: FormGroup;
  public listJerarquiaCuentas: any = [];
  public listaJerarquiaCuentas: any = [];
  public encontrados: any = [];
  public encontrado: any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgrearCuentasComponent>,
    private servicioCuentas: CuentasService,
    private servicioJerarquiaCuenta: JerarquiaCuentasService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarJerarquia();
  }

  private crearFormulario() {
    this.formCuenta = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      codigo: [null,Validators.required],
      jerarquia: [null,Validators.required]
    });
  }

  public listarJerarquia(){
    this.servicioJerarquiaCuenta.listarTodos().subscribe(resJerarquiaCuentas=>{
      this.listJerarquiaCuentas = resJerarquiaCuentas
    })
  }

  public guardar() {
    this.encontrados = [];
    let cuenta : Cuentas = new Cuentas();
    const idJerarquia = this.formCuenta.value.jerarquia.id;
    if(this.formCuenta.valid){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      cuenta.descripcion=this.formCuenta.controls['descripcion'].value.toUpperCase();
      cuenta.codigo=this.formCuenta.controls['codigo'].value;
      this.servicioJerarquiaCuenta.listarPorId(idJerarquia).subscribe(resjerarquiaCuenta => {
        this.listaJerarquiaCuentas = resjerarquiaCuenta;
        cuenta.idJerarquiaCuentas = this.listaJerarquiaCuentas
        this.servicioCuentas.listarTodos().subscribe(resCuentas => {
          resCuentas.forEach(elementCuenta => {
            if(elementCuenta.codigo == cuenta.codigo){
              this.encontrado = true;
            }else{
              this.encontrado = false;
            }
            this.encontrados.push(this.encontrado);
          })
          const encontrado = this.encontrados.includes(true);
          if(encontrado == true){
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'La cuenta ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.registrarCuenta(cuenta);
          }
        })
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

  public registrarCuenta(cuenta: Cuentas) {
    this.servicioCuentas.registrar(cuenta).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cuenta Registrada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();

    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
