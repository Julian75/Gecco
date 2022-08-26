import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jerarquia } from 'src/app/modelos/jerarquia';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Jerarquia2 } from 'src/app/modelos/modelos2/jerarquia2';
@Component({
  selector: 'app-modificar-jerarquia',
  templateUrl: './modificar-jerarquia.component.html',
  styleUrls: ['./modificar-jerarquia.component.css']
})
export class ModificarJerarquiaComponent implements OnInit {
  public formJerarquia!: FormGroup;
  public listarJerarquia: any = [];
  dataSource!:MatTableDataSource<any>;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioJerarquia: JerarquiaService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarJerarquiaComponent>,
    private jerarquiaService: JerarquiaService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidjerarquia();
  }

  private crearFormulario(){
    this.formJerarquia = this.fb.group({
      id: 0,
      descripcion: [null, Validators.required],
    });
  }
  public listarporidjerarquia(){
    this.listarJerarquia = this.data;
    this.servicioJerarquia.listarPorId(this.listarJerarquia).subscribe( res => {
      this.formJerarquia.patchValue(res);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let jerarquia: Jerarquia2 = new Jerarquia2();
    jerarquia.id = this.formJerarquia.value.id;
    jerarquia.descripcion = this.formJerarquia.value.descripcion;
    this.servicioJerarquia.listarPorId(this.formJerarquia.value.id).subscribe(resJera=>{
      this.servicioJerarquia.listarTodos().subscribe(resJerarquia=>{
        if (jerarquia.descripcion == null || jerarquia.descripcion == undefined || jerarquia.descripcion == "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo no puede estar vacio!',
          })
        }else if(resJera.descripcion.toLowerCase() == jerarquia.descripcion.toLowerCase()){
          Swal.fire({
            icon: 'success',
            title: 'No hubieron cambios!',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
          window.location.reload();
        }else{
          resJerarquia.forEach(element => {
            if(element.descripcion.toLowerCase() == jerarquia.descripcion.toLowerCase()){
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
              title: 'Esa Jerarquia ya existe!',
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            this.servicioModificar.actualizarJerarquia(jerarquia).subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Jerarquia Modificada',
                text: 'La Jerarquia se modificó correctamente',
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
