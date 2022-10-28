import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoNecesidadService } from 'src/app/servicios/tipoNecesidad.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { TipoNecesidad } from 'src/app/modelos/tipoNecesidad';
import { EstadoService } from 'src/app/servicios/estado.service';
import { TipoNecesidad2 } from 'src/app/modelos/modelos2/tipoNecesidad2';

@Component({
  selector: 'app-modificar-tipo-necesidades',
  templateUrl: './modificar-tipo-necesidades.component.html',
  styleUrls: ['./modificar-tipo-necesidades.component.css']
})
export class ModificarTipoNecesidadesComponent implements OnInit {

  public formTipoNecesidad!: FormGroup;
  public listarTipoNecesidad: any = [];
  dataSource!:MatTableDataSource<any>;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioTipoNecesidad: TipoNecesidadService,
    private servicioModificar: ModificarService,
    private servicioEstado: EstadoService,
    public dialogRef: MatDialogRef<ModificarTipoNecesidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoNecesidad();
  }

  private crearFormulario(){
    this.formTipoNecesidad = this.fb.group({
      id: 0,
      descripcion: [null, Validators.required],
    });
  }

  public listarporidTipoNecesidad(){
    this.listarTipoNecesidad = this.data;
    this.servicioTipoNecesidad.listarPorId(this.listarTipoNecesidad).subscribe( res => {
      this.formTipoNecesidad.patchValue(res);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let tipoNecesidad: TipoNecesidad2 = new TipoNecesidad2();
    tipoNecesidad.id = this.formTipoNecesidad.value.id;
    tipoNecesidad.descripcion = this.formTipoNecesidad.value.descripcion;
    this.servicioEstado.listarPorId(92).subscribe(resTipoNecesidad=>{
      tipoNecesidad.idEstado=resTipoNecesidad.id
      this.servicioTipoNecesidad.listarPorId(this.formTipoNecesidad.value.id).subscribe(resJera=>{
        this.servicioTipoNecesidad.listarTodos().subscribe(resTipoNecesidad=>{
          if (tipoNecesidad.descripcion == null || tipoNecesidad.descripcion == undefined || tipoNecesidad.descripcion == "") {
            Swal.fire({
              icon: 'error',
              title: 'Campo Vacio!',
              showConfirmButton: false,
              timer: 1500
            })
          }else if(resJera.descripcion.toLowerCase() == tipoNecesidad.descripcion.toLowerCase()){
            Swal.fire({
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload();
          }else{
            document.getElementById("snipper").setAttribute("style", "display: block;")
            resTipoNecesidad.forEach(element => {
              if(element.descripcion.toLowerCase() == tipoNecesidad.descripcion.toLowerCase()){
                this.existe = true
              }else{
                this.existe = false
              }
              this.listaExis.push(this.existe)
            });
            const existe = this.listaExis.includes( true );
            if(existe == true){
              document.getElementById("snipper").setAttribute("style", "display: none;")
              Swal.fire({
                icon: 'error',
                title: 'Ese tipo de necesidad ya existe!',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              this.servicioModificar.actualizarTipoNecesidad(tipoNecesidad).subscribe(res => {
                document.getElementById("snipper").setAttribute("style", "display: none;")
                Swal.fire({
                  icon: 'success',
                  title: 'Tipo De Necesidad Modificada',
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
    })
  }
}
