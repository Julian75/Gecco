import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { VisitasSiga } from './../../../modelos/modelosSiga/visitasSiga';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { SitioVenta } from './../../../modelos/modelosSiga/sitioVenta';
import { Component, OnInit } from '@angular/core';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { AsignacionPuntoVenta } from 'src/app/modelos/asignacionPuntoVenta';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';

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
  public listaIdSitioVenta: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaIdOficinas: any = [];
  public oficinaselect: any = [];
  public oficina: any = [];
  public idSitioVenta: any;

  public listaSitioVentaTabla:any=[];
  public listaSitioVentasTabla:any=[]
  public contador: number = 0;

  displayedColumns = ['id', 'articulo', 'codigoContable', 'marca', 'placa', 'serial', 'usuarioAsignado', 'Opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioAsignacionActivo : AsignacionArticulosService,
    private servicioAsignacionPuntoVentaActivos : AsignacionPuntoVentaService,
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
    console.log(this.formAuditoria.controls['oficina'].value, this.idSitioVenta)
    // this.servicioAsignacionPuntoVentaActivos.listarTodos().subscribe(resAsignacionesPuntosVentasActivos=>{
      // resAsignacionesPuntosVentasActivos.forEach(elementAsignacionPuntoVentaActivo => {
      //   if(elementAsignacionPuntoVentaActivo.idAsignacionesArticulos.idEstado.id == 76 && elementAsignacionPuntoVentaActivo.idOficina == )

      // });
    // })
  }

  aprobado(asignacionActivo: any){

  }

  noAprobado(asignacionActivo: any){

  }

}
