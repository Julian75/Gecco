import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JerarquiaCuentas } from 'src/app/modelos/jerarquiaCuentas';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { JerarquiaCuentas2 } from 'src/app/modelos/modelos2/jerarquiaCuentas2';

@Component({
  selector: 'app-modificar-jerarquia-cuentas',
  templateUrl: './modificar-jerarquia-cuentas.component.html',
  styleUrls: ['./modificar-jerarquia-cuentas.component.css']
})
export class ModificarJerarquiaCuentasComponent implements OnInit {
  public formJerarquiaCuentas!: FormGroup;
  public listarJerarquiaCuentas: any = [];
  dataSource!:MatTableDataSource<any>;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioJerarquiaCuentas: JerarquiaCuentasService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarJerarquiaCuentasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidjerarquia();
  }

  private crearFormulario(){
    this.formJerarquiaCuentas = this.fb.group({
      id: 0,
      descripcion: [null, Validators.required],
    });
  }
  public listarporidjerarquia(){
    this.listarJerarquiaCuentas = this.data;
    this.servicioJerarquiaCuentas.listarPorId(this.listarJerarquiaCuentas).subscribe( res => {
      this.formJerarquiaCuentas.patchValue(res);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let jerarquiaCuentas: JerarquiaCuentas2 = new JerarquiaCuentas2();
    jerarquiaCuentas.id = this.formJerarquiaCuentas.value.id;
    jerarquiaCuentas.descripcion = this.formJerarquiaCuentas.value.descripcion.toUpperCase();
    this.servicioJerarquiaCuentas.listarPorId(this.formJerarquiaCuentas.value.id).subscribe(resJerarquiaCuenta=>{
      this.servicioJerarquiaCuentas.listarTodos().subscribe(resJerarquia=>{
        if (jerarquiaCuentas.descripcion == null || jerarquiaCuentas.descripcion == undefined || jerarquiaCuentas.descripcion == "") {
          Swal.fire({
            icon: 'error',
            title: 'Campo Vacio!',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(resJerarquiaCuenta.descripcion.toLowerCase() == jerarquiaCuentas.descripcion.toLowerCase()){
          Swal.fire({
            icon: 'success',
            title: 'No hubieron cambios!',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
          window.location.reload();
        }else{
          document.getElementById('snipper')?.setAttribute('style', 'display: block;')
          resJerarquia.forEach(element => {
            if(element.descripcion.toUpperCase() == jerarquiaCuentas.descripcion.toUpperCase()){
              this.existe = true
            }else{
              this.existe = false
            }
            this.listaExis.push(this.existe)
          });
          const existe = this.listaExis.includes( true );
          if(existe == true){
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              icon: 'error',
              title: 'Esa Jerarquia ya existe!',
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            this.servicioModificar.actualizarJerarquiaCuentas(jerarquiaCuentas).subscribe(res => {
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                icon: 'success',
                title: 'Jerarquia Modificada',
                showConfirmButton: false,
                timer: 1500
              })
              this.dialogRef.close();
              window.location.reload();

            });
          }
        }
      })
    })
  }

}
