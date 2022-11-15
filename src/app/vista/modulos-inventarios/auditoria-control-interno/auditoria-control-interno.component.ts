import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { VisitasSiga } from './../../../modelos/modelosSiga/visitasSiga';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { SitioVenta } from './../../../modelos/modelosSiga/sitioVenta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { AuditoriaActivo } from 'src/app/modelos/auditoriaActivo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuditoriaActivoService } from 'src/app/servicios/auditoriaActivo.service';
import { CorreoAuditoria } from 'src/app/modelos/correoAuditoria';
import { CorreoAuditoriaService } from 'src/app/servicios/correoAuditoria.service';

export interface Task {
  name: {};
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-auditoria-control-interno',
  templateUrl: './auditoria-control-interno.component.html',
  styleUrls: ['./auditoria-control-interno.component.css']
})
export class AuditoriaControlInternoComponent implements OnInit {
  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;

  //Seleccionar items
  //name, completed y color
  // {name: 'Warn', completed: false, color: 'warn'},
  activos: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
    ],
  };

  dtOptions: any = {};
  public formAuditoria!: FormGroup;
  public listaOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaIdOficinas: any = [];
  public idSitioVenta: any;
  public listaAsignacionesPuntoVenta: any = [];
  public activosVisualizar:boolean = false;
  public activosSeleccionados: any = [];

  displayedColumns = ['id', 'articulo', 'codigoContable', 'marca', 'placa', 'serial', 'usuarioAsignado', 'Opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioAsignacionActivo : AsignacionArticulosService,
    private servicioAsignacionPuntoVentaActivos : AsignacionPuntoVentaService,
    private servicioAuditoriaActivo : AuditoriaActivoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreoAuditoria: CorreoAuditoriaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
  }
  private crearFormulario() {
    this.formAuditoria = this.fb.group({
      id: 0,
      sitioVenta: [null,Validators.required],
      oficina: [null,Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  id: any // Id de la oficina capturado - 18

  idOficina(event: any){
    const listaOficina = event.value
    this.listaIdOficinas.push(listaOficina.ideOficina)

    let ultimo = this.listaIdOficinas[this.listaIdOficinas.length - 1]
    let penultimo = this.listaIdOficinas[this.listaIdOficinas.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.listaSitioVenta = []
      this.servicioSitioVenta.listarPorId(ultimo).subscribe(res=>{
        this.listarSitioVentas = res
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(""),
          map(value => {
            // const num_identificacion = typeof value == 'string' ? value : value?.ideSitioventa;
            const nombres = typeof value == 'string' ? value : value?.nom_sitioventa;
            return nombres ? this._filter(nombres as string, this.listarSitioVentas) : this.listarSitioVentas.slice();
          }),
        );
      })
    }
  }

  textoUsuarioVendedor:any
  displayFn(sitioVenta: SitioVenta): any {
    this.textoUsuarioVendedor = sitioVenta
    if(this.textoUsuarioVendedor == ""){
      this.textoUsuarioVendedor = " "
    }else{
      this.textoUsuarioVendedor = sitioVenta.nom_sitioventa

      return this.textoUsuarioVendedor;
    }
  }

  public _filter(nombres: string, vendedores:any): VisitasSiga[] {

    const filterNom = nombres.toLowerCase();

    return vendedores.filter((vendedores:any) => (vendedores.nom_sitioventa.toLowerCase().includes(filterNom)));
  }

  //capturaraIdSitioVenta
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idSitioVenta = event.option.value
  }

  public guardar(){
    this.activosVisualizar = false
    if(this.formAuditoria.controls['oficina'].value == undefined || this.idSitioVenta == undefined){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe seleccionar la oficina y sitio de venta!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.listaAsignacionesPuntoVenta = []
      this.activosSeleccionados = []
      this.servicioAsignacionPuntoVentaActivos.listarTodos().subscribe(resAsignacionesPuntosVentasActivos=>{
        resAsignacionesPuntosVentasActivos.forEach(elementAsignacionPuntoVentaActivo => {
          if(elementAsignacionPuntoVentaActivo.idAsignacionesArticulos.idEstado.id == 76 && elementAsignacionPuntoVentaActivo.idOficina == this.formAuditoria.controls['oficina'].value.ideOficina && elementAsignacionPuntoVentaActivo.idSitioVenta == this.idSitioVenta.ideSitioventa){
            this.listaAsignacionesPuntoVenta.push(elementAsignacionPuntoVentaActivo)
          }
        });
        if(this.listaAsignacionesPuntoVenta.length <= 0){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay ningun activo asignado a ese punto de venta!',
            showConfirmButton: false,
            timer: 3500
          })
        }else{
          this.dataSource = new MatTableDataSource(this.listaAsignacionesPuntoVenta);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.activosVisualizar = true
        }
      })
    }
  }

  existe: boolean = false;
  listaExiste = []
  idPosicionActivo: any
  capturarActivos(checked: any, activoSeleccionado){
    this.listaExiste = []
    this.idPosicionActivo
    var obj = {
      activo: {},
      seleccion: checked.checked
    }
    if(this.activosSeleccionados.length <= 0){
      obj.activo = activoSeleccionado
      this.activosSeleccionados.push(obj)
    }else{
      for (let index = 0; index < this.activosSeleccionados.length; index++) {
        const element = this.activosSeleccionados[index];
        if(element.activo.idAsignacionesArticulos.idDetalleArticulo.id == activoSeleccionado.idAsignacionesArticulos.idDetalleArticulo.id){
          this.existe = true
          this.idPosicionActivo = index
        }else{
          this.existe = false
        }
        this.listaExiste.push(this.existe)
      }
      const existeActivoLista = this.listaExiste.includes(true)
      if(existeActivoLista == true){
        var obj2 = {
          activo: activoSeleccionado,
          seleccion: checked.checked
        }
        this.activosSeleccionados.splice(this.idPosicionActivo, 1, obj2)
      }else{
        obj.activo = activoSeleccionado
        this.activosSeleccionados.push(obj)
      }
    }
  }

  generarAuditoria(){
    if(this.activosSeleccionados.length == this.listaAsignacionesPuntoVenta.length){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.registrarAuditorias()
    }else{
      if(this.activosSeleccionados.length <= 0){
        this.listaAsignacionesPuntoVenta.forEach(elementActivo => {
          var obj = {
            activo: elementActivo,
            seleccion: true
          }
          this.activosSeleccionados.push(obj)
        })
      }else{
        this.listaAsignacionesPuntoVenta.forEach(elementActivo => {
          for (let index = 0; index < this.activosSeleccionados.length; index++) {
            const element = this.activosSeleccionados[index];
            if(element.activo.idAsignacionesArticulos.idDetalleArticulo.id != elementActivo.idAsignacionesArticulos.idDetalleArticulo.id){
              var obj = {
                activo: elementActivo,
                seleccion: true
              }
              this.activosSeleccionados.push(obj)
            }
          }
        });
      }
    }
    if(this.activosSeleccionados.length == this.listaAsignacionesPuntoVenta.length){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.registrarAuditorias()
    }
  }

  fechaActual: Date = new Date();
  registrarAuditorias(){
    for (let index = 0; index < this.activosSeleccionados.length; index++) {
      const elementActivoSeleccionado = this.activosSeleccionados[index];
      let auditoriaActivo : AuditoriaActivo = new AuditoriaActivo();
      if(elementActivoSeleccionado.seleccion == true){
        auditoriaActivo.estado = "Validado"
        auditoriaActivo.fecha = this.fechaActual
        auditoriaActivo.idDetalleArticulo = elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
          auditoriaActivo.idUsuario = resUsuarioLogueado
          // this.servicioAuditoriaActivo.registrar(auditoriaActivo).subscribe(resAuditoriaActivo=>{

          // })
        })
      }else{
        auditoriaActivo.estado = "No Validado"
        auditoriaActivo.fecha = this.fechaActual
        auditoriaActivo.idDetalleArticulo = elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
          auditoriaActivo.idUsuario = resUsuarioLogueado
          this.servicioAuditoriaActivo.registrar(auditoriaActivo).subscribe(resAuditoriaActivo=>{
            let correoAuditoria : CorreoAuditoria = new CorreoAuditoria();
            correoAuditoria.asunto = "Auditoria Activos"
            console.log(elementActivoSeleccionado.activo)
            correoAuditoria.mensaje = "Según la respectiva auditoria a la oficina "+elementActivoSeleccionado.activo.nombreOficina+" del punto de venta "+elementActivoSeleccionado.activo.nombreSitioVenta+", el activo "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion+" con marca "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.marca+", serial "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.serial+" y placa "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.placa+" asignado al usuario "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido+", no se encuentra en ese punto de venta."
            correoAuditoria.idUsuarioEnvia = resUsuarioLogueado
            this.servicioUsuario.listarPorId(Number(elementActivoSeleccionado.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id)).subscribe(resUsuarioCorreo=>{
              correoAuditoria.idUsuarioRecibe = resUsuarioCorreo
              this.servicioCorreoAuditoria.registrar(correoAuditoria).subscribe(correoAuditoriaRegistrado=>{{

              }})
            })
          })
        })
      }
      if((index+1) == this.activosSeleccionados.length){
      }
    }
  }

}
