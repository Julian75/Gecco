import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { map, Observable, startWith } from 'rxjs';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { VisitasSiga } from 'src/app/modelos/modelosSiga/visitasSiga';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { AsignacionPuntoVenta2 } from 'src/app/modelos/modelos2/asignacionPuntoVenta2';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-modificar-asignar-punto-venta-articulo',
  templateUrl: './modificar-asignar-punto-venta-articulo.component.html',
  styleUrls: ['./modificar-asignar-punto-venta-articulo.component.css']
})
export class ModificarAsignarPuntoVentaArticuloComponent implements OnInit {

  public formAsigancionPuntoVenta!: FormGroup;
  public encontrados: any = [];
  public encontrado = false;
  color = ('primary');
  public listaOficinas: any = [];
  public listarOficinaId: any = [];
  public listaIdOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listarSitioVen: any = [];
  public sitioVentaId: any;
  public listaArticulos: any = [];
  public listaIdSitioVenta: any = [];
  public idAsignacion: any;
  public listaAsignacion: any = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModificarAsignarPuntoVentaArticuloComponent>,
    private servicioAsignarPuntoVenta: AsignacionPuntoVentaService,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioAsignacionArticulo: AsignacionArticulosService,
    private servicioModificar: ModificarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidAsignacion();
    this.listarOficinas();
    this.listarArticulos();
  }

  private crearFormulario() {
    this.formAsigancionPuntoVenta = this.fb.group({
      id: 0,
      articulo: [null,Validators.required],
      cantidad: [null,Validators.required],
      oficina: [null,Validators.required],
      sitioVenta: [null,Validators.required],
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
        this.formAsigancionPuntoVenta.patchValue({sitioVenta:this.listarSitioVentas[0]});
      })
    }
  }

  public listarporidAsignacion() {
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.idAsignacion = this.data;
    this.servicioAsignarPuntoVenta.listarPorId(this.idAsignacion).subscribe(res => {
      this.listaAsignacion = res;
      this.formAsigancionPuntoVenta.controls['id'].setValue(this.listaAsignacion.id);
      this.formAsigancionPuntoVenta.controls['articulo'].setValue(this.listaAsignacion.idAsignacionesArticulos.id);
      this.formAsigancionPuntoVenta.controls['cantidad'].setValue(this.listaAsignacion.cantidad);
      this.servicioOficina.listarTodos().subscribe(res=>{
        res.forEach(element => {
          if(element.ideOficina == this.listaAsignacion.idOficina){
            this.listarOficinaId = element
            this.formAsigancionPuntoVenta.patchValue({oficina:this.listarOficinaId});
            this.servicioSitioVenta.listarTodos().subscribe(res=>{
              for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if(element.ideOficina == this.listarOficinaId.ideOficina){
                  const lista = element
                  this.listarSitioVen.push(lista)
                }
              }
              this.listarSitioVentas = this.listarSitioVen
              res.forEach(element => {
                if(element.ideSitioventa == this.listaAsignacion.idSitioVenta){
                  this.sitioVentaId = element.ideSitioventa
                  this.formAsigancionPuntoVenta.patchValue({sitioVenta:element});
                  document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                }
              });
            })
          }
        });
      })
    })
  }

  public guardar() {
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.encontrados = [];
    let asignacionPuntoVenta : AsignacionPuntoVenta2 = new AsignacionPuntoVenta2();
    var articulo = this.formAsigancionPuntoVenta.controls['articulo'].value;
    var oficina = this.formAsigancionPuntoVenta.controls['oficina'].value;
    var sitioVent = this.formAsigancionPuntoVenta.controls['sitioVenta'].value;
    var cantidad = this.formAsigancionPuntoVenta.controls['cantidad'].value;
    if(this.formAsigancionPuntoVenta.valid){
      this.servicioAsignarPuntoVenta.listarTodos().subscribe(resAsigancionTurnoVendedor => {
        this.servicioAsignarPuntoVenta.listarPorId(this.formAsigancionPuntoVenta.value.id).subscribe(resAsigancionTurno => {
          this.servicioAsignacionArticulo.listarPorId(articulo).subscribe(resAsignacionArticulo=>{
            if(resAsigancionTurno.cantidad == cantidad && resAsigancionTurno.idAsignacionesArticulos.id == articulo && resAsigancionTurno.idOficina == oficina.ideOficina && resAsigancionTurno.idSitioVenta == sitioVent.ideSitioventa && resAsigancionTurno.nombreOficina == oficina.nom_oficina && resAsigancionTurno.nombreSitioVenta == sitioVent.nom_sitioventa){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'No hubieron cambios!',
                showConfirmButton: false,
                timer: 1500
              })
              this.dialogRef.close();
              window.location.reload();
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            }else{
              this.servicioSitioVenta.listarTodos().subscribe(resSitioVenta=>{
                for (let i = 0; i < resSitioVenta.length; i++) {
                  const elementSitio = resSitioVenta[i];
                  if(elementSitio.ideSitioventa == sitioVent.ideSitioventa){
                    resAsigancionTurnoVendedor.forEach(element => {
                      if(element.idAsignacionesArticulos.idDetalleArticulo.idArticulo.id == resAsignacionArticulo.idDetalleArticulo.idArticulo.id && element.idSitioVenta == sitioVent.ideSitioventa){
                        this.encontrado = true;
                      }else{
                        this.encontrado = false;
                      }
                      this.encontrados.push(this.encontrado);
                    })
                    const existe = this.encontrados.includes(true);
                    if(existe == true){
                      if(cantidad != resAsigancionTurno.cantidad){
                        asignacionPuntoVenta.id = resAsigancionTurno.id
                        asignacionPuntoVenta.idAsignacionesArticulos = resAsigancionTurno.idAsignacionesArticulos.id
                        asignacionPuntoVenta.idOficina = resAsigancionTurno.idOficina
                        asignacionPuntoVenta.idSitioVenta = resAsigancionTurno.idSitioVenta
                        asignacionPuntoVenta.cantidad = cantidad
                        asignacionPuntoVenta.nombreOficina = resAsigancionTurno.nombreOficina
                        asignacionPuntoVenta.nombreSitioVenta = resAsigancionTurno.nombreSitioVenta
                        this.registrarAsignacionPuntoVenta(asignacionPuntoVenta);
                      }else{
                        Swal.fire({
                          position: 'center',
                          icon: 'error',
                          title: 'La Asignacion ya existe!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        this.dialogRef.close();
                        window.location.reload();
                        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                      }
                    }else{
                      asignacionPuntoVenta.id = this.formAsigancionPuntoVenta.value.id
                      asignacionPuntoVenta.idAsignacionesArticulos = resAsignacionArticulo.id
                      asignacionPuntoVenta.idOficina = oficina.ideOficina
                      asignacionPuntoVenta.idSitioVenta = sitioVent.ideSitioventa
                      asignacionPuntoVenta.cantidad = cantidad
                      asignacionPuntoVenta.nombreOficina = oficina.nom_oficina
                      asignacionPuntoVenta.nombreSitioVenta = elementSitio.nom_sitioventa
                      this.registrarAsignacionPuntoVenta(asignacionPuntoVenta);
                    }
                    break
                  }
                }
              });
            }
          });
        })
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo está vacio!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    }
  }

  public registrarAsignacionPuntoVenta(asignacionPuntoVenta: AsignacionPuntoVenta2) {
    this.servicioModificar.actualizarAsignacionPuntoVenta(asignacionPuntoVenta).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignacion Modificada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    });
  }

}
