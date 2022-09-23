import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';
import { AsignacionPuntoVenta } from 'src/app/modelos/asignacionPuntoVenta';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { map, Observable, startWith } from 'rxjs';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { VisitasSiga } from 'src/app/modelos/modelosSiga/visitasSiga';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';

@Component({
  selector: 'app-agregar-asignar-punto-venta-articulo',
  templateUrl: './agregar-asignar-punto-venta-articulo.component.html',
  styleUrls: ['./agregar-asignar-punto-venta-articulo.component.css']
})
export class AgregarAsignarPuntoVentaArticuloComponent implements OnInit {

  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;

  public formAsigancionPuntoVenta!: FormGroup;
  public encontrados: any = [];
  public encontrado = false;
  color = ('primary');
  public listaOficinas: any = [];
  public listaIdOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaArticulos: any = [];
  public listaIdSitioVenta: any = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarAsignarPuntoVentaArticuloComponent>,
    private servicioAsignarPuntoVenta: AsignacionPuntoVentaService,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioAsignacionArticulo: AsignacionArticulosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
    this.listarArticulos();
  }

  private crearFormulario() {
    this.formAsigancionPuntoVenta = this.fb.group({
      id: 0,
      articulo: [null,Validators.required],
      cantidad: [null,Validators.required],
      oficina: [null,Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  public listarArticulos() {
    this.servicioAsignacionArticulo.listarTodos().subscribe(res => {
      this.listaArticulos = res
    });
  }

  id: any // Id de la oficina capturado - 18

  idOficina(){
    const listaOficina = this.id
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

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idSitiosVentas(event.option.value)
  }

  public idSitiosVentas(idSitioventa:any){
    const listaSitioVenta = idSitioventa
    this.listaIdSitioVenta.push(listaSitioVenta.ideSitioventa)
    let ultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 1]
    localStorage.setItem("v", ultimo)
    let penultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 2]
  }

  public guardar() {
    this.encontrados = [];
    let asignacionPuntoVenta : AsignacionPuntoVenta = new AsignacionPuntoVenta();
    var articulo = this.formAsigancionPuntoVenta.controls['articulo'].value;
    var oficina = this.formAsigancionPuntoVenta.controls['oficina'].value;
    var sitioVent = Number(localStorage.getItem("v"));
    var cantidad = this.formAsigancionPuntoVenta.controls['cantidad'].value;
    if(oficina != undefined && articulo != null && sitioVent != 0 && cantidad != 0){
      this.servicioAsignarPuntoVenta.listarTodos().subscribe(resAsigancionTurnoVendedor => {
        this.servicioAsignacionArticulo.listarPorId(articulo).subscribe(resAsignacionArticulo=>{
          this.servicioSitioVenta.listarTodos().subscribe(resSitioVenta=>{
            for (let i = 0; i < resSitioVenta.length; i++) {
              const elementSitio = resSitioVenta[i];
              if(elementSitio.ideSitioventa == sitioVent){
                resAsigancionTurnoVendedor.forEach(element => {
                  if(element.idAsignacionesArticulos.idDetalleArticulo.idArticulos == resAsignacionArticulo.idDetalleArticulo.idArticulos && element.idSitioVenta == sitioVent){
                    this.encontrado = true;
                  }else{
                    this.encontrado = false;
                  }
                  this.encontrados.push(this.encontrado);
                })
                const existe = this.encontrados.includes(true);
                if(existe == true){
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'La Asignacion ya existe!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }else{
                  asignacionPuntoVenta.idAsignacionesArticulos = resAsignacionArticulo
                  asignacionPuntoVenta.idOficina = oficina.ideOficina
                  asignacionPuntoVenta.idSitioVenta = sitioVent
                  asignacionPuntoVenta.cantidad = cantidad
                  asignacionPuntoVenta.nombreOficina = oficina.nom_oficina
                  asignacionPuntoVenta.nombreSitioVenta = elementSitio.nom_sitioventa
                  this.registrarAsignacionPuntoVenta(asignacionPuntoVenta);
                }
                break
              }
            }
          });
        });
      });
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

  public registrarAsignacionPuntoVenta(asignacionPuntoVenta: AsignacionPuntoVenta) {
    this.servicioAsignarPuntoVenta.registrar(asignacionPuntoVenta).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignacion Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem("v")
      this.dialogRef.close();
      window.location.reload();
    }, error => {
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
