import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
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
import { HistorialArticulos } from 'src/app/modelos/historialArticulos';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { HistorialArticuloService } from 'src/app/servicios/historialArticulo.service';

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
  public fecha: Date = new Date();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarAsignarPuntoVentaArticuloComponent>,
    private servicioAsignarPuntoVenta: AsignacionPuntoVentaService,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioAsignacionArticulo: AsignacionArticulosService,
    private servicioHistorial: HistorialArticuloService,
    private servicioUsuario: UsuarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
  }

  private crearFormulario() {
    this.formAsigancionPuntoVenta = this.fb.group({
      id: 0,
      oficina: [null,Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  id: any // Id de la oficina capturado - 18

  idOficina(seleccion: any){
    const listaOficina = seleccion.value
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
    // var articulo = this.formAsigancionPuntoVenta.controls['articulo'].value;
    var oficina = this.formAsigancionPuntoVenta.controls['oficina'].value;
    var sitioVent = Number(localStorage.getItem("v"));
    // if(oficina != undefined && sitioVent != 0){
    //   document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    //   this.servicioAsignarPuntoVenta.listarTodos().subscribe(resAsigancionTurnoVendedor => {
    //     this.servicioAsignacionArticulo.listarPorId(Number(this.data)).subscribe(resAsignacionArticulo=>{
    //       this.servicioSitioVenta.listarPorId(oficina.ideOficina).subscribe(resSitioVenta=>{
    //         for (let i = 0; i < resSitioVenta.length; i++) {
    //           const elementSitio = resSitioVenta[i];
    //           if(elementSitio.ideSitioventa == sitioVent){
    //             resAsigancionTurnoVendedor.forEach(element => {
    //               if(element.idAsignacionesArticulos.idDetalleArticulo.id == resAsignacionArticulo.idDetalleArticulo.id && element.idSitioVenta == sitioVent && element.idOficina == Number(oficina)){
    //                 this.encontrado = true;
    //               }else{
    //                 this.encontrado = false;
    //               }
    //               this.encontrados.push(this.encontrado);
    //             })
    //             const existe = this.encontrados.includes(true);
    //             if(existe == true){
    //               Swal.fire({
    //                 position: 'center',
    //                 icon: 'error',
    //                 title: 'La asignación de ese articulo ya existe en ese sitio de venta!',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               })
    //               localStorage.removeItem("v")
    //               this.dialogRef.close();
    //               window.location.reload();
    //               document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    //             }else{
    //               asignacionPuntoVenta.idAsignacionesArticulos = resAsignacionArticulo
    //               asignacionPuntoVenta.idOficina = oficina.ideOficina
    //               asignacionPuntoVenta.idSitioVenta = sitioVent
    //               asignacionPuntoVenta.cantidad = 1
    //               asignacionPuntoVenta.nombreOficina = oficina.nom_oficina
    //               asignacionPuntoVenta.nombreSitioVenta = elementSitio.nom_sitioventa
    //               this.registrarAsignacionPuntoVenta(asignacionPuntoVenta);
    //             }
    //             break
    //           }
    //         }
    //       });
    //     });
    //   });
    // }else{
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'El campo está vacio!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // }
  }

  public registrarAsignacionPuntoVenta(asignacionPuntoVenta: AsignacionPuntoVenta) {
    this.servicioAsignarPuntoVenta.registrar(asignacionPuntoVenta).subscribe(res=>{
      let historialArticulo : HistorialArticulos = new HistorialArticulos();
      historialArticulo.fecha = this.fecha
      historialArticulo.idDetalleArticulo = asignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        historialArticulo.idUsuario = resUsuario
        historialArticulo.observacion = "Se realizo una nueva asignación del articulo "+asignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion.toLowerCase()+" a la oficina "+asignacionPuntoVenta.nombreOficina.toLowerCase()+" del sitio de venta "+asignacionPuntoVenta.nombreSitioVenta.toLowerCase()+"."
        this.agregarHistorial(historialArticulo);
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar la Asignacion!',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem("v")
      this.dialogRef.close();
      window.location.reload();
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    });
  }

  public agregarHistorial(historialArticulo: HistorialArticulos){
    this.servicioHistorial.registrar(historialArticulo).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignación registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem("v")
      this.dialogRef.close();
      window.location.reload();
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar el historial!',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem("v")
      this.dialogRef.close();
      window.location.reload();
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    });
  }

}
