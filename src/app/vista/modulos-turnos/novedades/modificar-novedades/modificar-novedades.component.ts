import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Novedad } from 'src/app/modelos/novedad';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { TipoNovedadesService } from 'src/app/servicios/tipoNovedades.Service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-modificar-novedades',
  templateUrl: './modificar-novedades.component.html',
  styleUrls: ['./modificar-novedades.component.css']
})
export class ModificarNovedadesComponent implements OnInit {

  public formNovedad!: FormGroup;
  public idlistaVendedor: any;
  public listaNovedad: any = [];  // lista de modulos
  public listarTipoNovedades: any = [];
  public listaUsuarios: any = [];
  color = ('primary');

  constructor(
    private servicioNovedad: NovedadService,
    private servicioUsuarios: UsuarioService,
    private servicioTipoNovedad: TipoNovedadesService,
    public dialogRef: MatDialogRef<ModificarNovedadesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTodos();
  }

  private crearFormulario() {
    this.formNovedad = this.fb.group({
      id: [''],
      usuario: [null,Validators.required],
      tipoNovedad: [null,Validators.required],
      observacion: [null,Validators.required],
    });
  }

  public listarTodos() {
    this.idlistaVendedor = Number(this.data);
    this.servicioNovedad.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idAsignarTurnoVendedor.id == this.idlistaVendedor){
          this.listaNovedad = element;
        }
      });
    })
  }

}
