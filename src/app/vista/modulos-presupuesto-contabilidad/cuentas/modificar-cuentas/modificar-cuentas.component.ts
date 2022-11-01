import { Cuentas2 } from './../../../../modelos/modelos2/cuentas2';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-cuentas',
  templateUrl: './modificar-cuentas.component.html',
  styleUrls: ['./modificar-cuentas.component.css']
})
export class ModificarCuentasComponent implements OnInit {
  public formCuenta!: FormGroup;
  public listaCuentas : any = [];
  public listaJerarquiaCuentas: any = [];
  public encontrado : boolean = false;
  public encontrados: any = [];
  color = ('primary');

  constructor(
    private servicioCuentas: CuentasService,
    private servicioJerarquiaCuentas: JerarquiaCuentasService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarCuentasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidCuenta();
    this.listarJerarquiaCuentas();
  }

  private crearFormulario() {
    this.formCuenta = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      codigo: [null,Validators.required],
      jerarquia: [null,Validators.required],
    });
  }

  public listarJerarquiaCuentas() {
    this.servicioJerarquiaCuentas.listarTodos().subscribe(resJerarquiaCuentas => {
      this.listaJerarquiaCuentas = resJerarquiaCuentas
    });
  }

  cuenta: any = [];
  idCuenta: any;
  public listarporidCuenta() {
    this.cuenta = []
    this.idCuenta = this.data;
    this.servicioCuentas.listarPorId(this.idCuenta).subscribe(resCuenta => {
      this.listaCuentas = resCuenta;
      this.formCuenta.controls['id'].setValue(this.listaCuentas.id);
      this.formCuenta.controls['descripcion'].setValue(this.listaCuentas.descripcion);
      this.formCuenta.controls['codigo'].setValue(this.listaCuentas.codigo);
      this.formCuenta.controls['jerarquia'].setValue(this.listaCuentas.idJerarquiaCuentas.id);
    })
  }

  aprobar2: boolean = false;
  listAprobar2: any = [];
  idCuentita: any;
  public guardar() {
    this.encontrados = [];
    this.listAprobar2 = []
    let cuenta : Cuentas2 = new Cuentas2();
      this.idCuentita = this.data
      const descripcion = this.formCuenta.controls['descripcion'].value;
      const codigo = this.formCuenta.controls['codigo'].value;
      const jerarquia = this.formCuenta.controls['jerarquia'].value;
      if(this.formCuenta.valid){
        document.getElementById('snipper')?.setAttribute('style', 'display: block;')
        this.servicioCuentas.listarTodos().subscribe(resCuentasCompletos=>{
          this.servicioCuentas.listarPorId(this.idCuentita).subscribe(resCuenta=>{
            if(resCuenta.codigo == codigo && resCuenta.descripcion.toUpperCase() == descripcion.toUpperCase() && resCuenta.idJerarquiaCuentas.id == jerarquia){
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'No hubo cambios',
                showConfirmButton: false,
                timer: 1500
              })
              window.location.reload();
            }else{
              resCuentasCompletos.forEach(elementCuenta => {
                if(elementCuenta.id != resCuenta.id){
                  if(elementCuenta.codigo == codigo){
                    this.aprobar2 = true
                  }else{
                    this.aprobar2 = false
                  }
                  this.listAprobar2.push(this.aprobar2)
                }
              });
              const existe2 = this.listAprobar2.includes(true)
              if(existe2 == true){
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Esa cuenta ya existe',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                cuenta.id = resCuenta.id;
                cuenta.descripcion = descripcion.toUpperCase();
                cuenta.codigo = codigo;
                cuenta.idJerarquiaCuentas = jerarquia;
                this.modificarCuenta(cuenta)
              }
            }
          })
        })
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Campos vacios',
          showConfirmButton: false,
          timer: 1500
        })
      }
  }

  public modificarCuenta(cuenta: Cuentas2){
    this.servicioModificar.actualizarCuentas(cuenta).subscribe(res => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cuenta modificada!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocurrio un error al modificar el articulo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
