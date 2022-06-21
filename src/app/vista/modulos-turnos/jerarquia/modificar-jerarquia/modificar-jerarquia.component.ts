import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jerarquia } from 'src/app/modelos/jerarquia';
import Swal from 'sweetalert2';
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


  public guardar() {
    let jerarquia: Jerarquia = new Jerarquia();
    jerarquia.id = this.formJerarquia.value.id;
    jerarquia.descripcion = this.formJerarquia.value.descripcion;
    if (jerarquia.descripcion == null || jerarquia.descripcion == undefined || jerarquia.descripcion == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una descripcion',
      })
    } else {

      this.servicioJerarquia.actualizar(jerarquia).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Se modificó correctamente',
        })
        this.dialogRef.close();
        this.router.navigate(['/jerarquia']);

      });
    }
  }
}
