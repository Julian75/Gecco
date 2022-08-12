import { PresupuestoVentaMensualService } from './../../../../servicios/presupuestoVentaMensual.service';
import { PresupuestoVentaMensual } from './../../../../modelos/presupuestoVentaMensual';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { VisitasSiga } from './../../../../modelos/modelosSiga/visitasSiga';
import { Observable, startWith, map } from 'rxjs';
import { SitioVenta } from './../../../../modelos/modelosSiga/sitioVenta';
import { Router } from '@angular/router';
import { SitioVentaService } from './../../../../servicios/serviciosSiga/sitioVenta.service';
import { OficinasService } from './../../../../servicios/serviciosSiga/oficinas.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-presupuesto-venta-mensual',
  templateUrl: './agregar-presupuesto-venta-mensual.component.html',
  styleUrls: ['./agregar-presupuesto-venta-mensual.component.css']
})
export class AgregarPresupuestoVentaMensualComponent implements OnInit {

  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;

  dtOptions: any = {};
  public formPresupuestoVentaMensual!: FormGroup;
  public listaIdOficinas: any = [];
  public listaOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaExiste: any = [];
  public idSitioVenta: any;
  public encontrado: any;

  constructor(
    private fb: FormBuilder,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioPresupuestoVentaMensual : PresupuestoVentaMensualService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
  }

  private crearFormulario() {
    this.formPresupuestoVentaMensual = this.fb.group({
      id: 0,
      oficina: [null,Validators.required],
      sitioVenta: [null,Validators.required],
      valorPresupuesto: [null,Validators.required],
      mes: [null,Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }


  public guardar(){
    this.listaExiste = []
    if(this.idSitioVenta == undefined || this.id == undefined || this.formPresupuestoVentaMensual.controls['valorPresupuesto'].value == null || this.formPresupuestoVentaMensual.controls['mes'].value == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Algunos campos se encuentran vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(this.formPresupuestoVentaMensual.controls['valorPresupuesto'].value < 1){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El presupuesto debe ser mayor a 0!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      let presupuestoVentaMensual : PresupuestoVentaMensual = new PresupuestoVentaMensual();
      var mes = this.formPresupuestoVentaMensual.controls['mes'].value.split('-');
      presupuestoVentaMensual.mes = new Date(mes[0], (mes[1]-1), 11)
      this.servicioPresupuestoVentaMensual.listarTodos().subscribe(resPresupuestos=>{
        resPresupuestos.forEach(elementPresupuesto => {
          var fechaAlmacenada = new Date(elementPresupuesto.mes)
          if(elementPresupuesto.idSitioVenta == this.idSitioVenta.ideSitioventa && fechaAlmacenada.getMonth() == presupuestoVentaMensual.mes.getMonth() && fechaAlmacenada.getFullYear() == presupuestoVentaMensual.mes.getFullYear()){
            this.encontrado = true
          }else{
            this.encontrado = false
          }
          this.listaExiste.push(this.encontrado)
        });
        const existe = this.listaExiste.includes( true )
        if(existe == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'En ese mes, ese punto de venta ya cuenta con un presupuesto!',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(existe == false){
          presupuestoVentaMensual.idSitioVenta = this.idSitioVenta.ideSitioventa
          presupuestoVentaMensual.nombreSitioVenta = this.idSitioVenta.nom_sitioventa
          presupuestoVentaMensual.valorPresupuesto = this.formPresupuestoVentaMensual.controls['valorPresupuesto'].value
          console.log(presupuestoVentaMensual)
          this.registrarPresupuestoVentaMensual(presupuestoVentaMensual)
        }
      })
    }
  }

  public registrarPresupuestoVentaMensual(presupuestoVentaMensual: PresupuestoVentaMensual){
    this.servicioPresupuestoVentaMensual.registrar(presupuestoVentaMensual).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Presupuesto asignado al punto de venta en ese mes!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/presupuestoVentaMensual']);
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

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idSitioVenta = event.option.value
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

}
