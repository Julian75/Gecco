import { AsignarTurno2 } from './../../../../modelos/asignarTurno2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Router } from '@angular/router';
import { AsignarTurno } from './../../../../modelos/asignarTurno';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/servicios/estado.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { SitioVentaService} from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { AsignarTurnoService } from 'src/app/servicios/asignarTurno.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { VisitasSiga } from 'src/app/modelos/modelosSiga/visitasSiga';

@Component({
  selector: 'app-agregar-asignar-turno',
  templateUrl: './agregar-asignar-turno.component.html',
  styleUrls: ['./agregar-asignar-turno.component.css']
})
export class AgregarAsignarTurnoComponent implements OnInit {
  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;

  dtOptions: any = {};
  public formAsignarTurno!: FormGroup;
  public listarEstado: any = [];
  public listaOficinas: any = [];
  public listarTurnos: any = [];
  public listaTurno: any = [];
  public listaIdSitioVenta: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public estadosDisponibles: any = [];
  public listaIdOficinas: any = [];
  public encontrado = false;
  public listarExiste: any = [];
  public oficinaselect: any = [];
  public oficina: any = [];

  public listaSitioVentaTabla:any=[];
  public listaSitioVentasTabla:any=[]
  public contador: number = 0;


  displayedColumns = ['id', 'descripcion', 'horaFinal', 'horaInicio', 'Estado', 'Tipo Turno', 'Porcentaje', 'Opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurno : AsignarTurnoService,
    private servicioEstado : EstadoService,
    private servicioOficina : OficinasService,
    private servicioTurnos : TurnosService,
    private servicioSitioVenta : SitioVentaService,
    private servicioModificar : ModificarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
    this.listarTurno();
  }
  private crearFormulario() {
    this.formAsignarTurno = this.fb.group({
      id: 0,
      sitioVenta: [null,Validators.required],
      turno: [null,Validators.required],
      oficina: [null,Validators.required],
      porcentajito: [null, Validators.required]
    });
  }

  public listarTurno() {
    this.servicioTurnos.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.idEstado.id== 3  ) {
          this.listaTurno.push(element) ;
        }
      })
      this.listarTurnos = this.listaTurno
    })
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  public agregarPorcentaje(item){
    var porcentaje = <HTMLInputElement>document.getElementById('porcentaje'+item.id)
    this.contador = 0
    if(porcentaje.value == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe asignar un porcentaje a la asignacion de turno al punto de venta!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      if(Number(porcentaje.value) >= 1 && Number(porcentaje.value) <= 100){
        let asignarTurnoPuntoVenta : AsignarTurno2 = new AsignarTurno2();
        this.servicioAsignarTurno.listarPorId(item.id).subscribe(res=>{
          asignarTurnoPuntoVenta.id = res.id
          asignarTurnoPuntoVenta.idEstado = res.idEstado.id
          asignarTurnoPuntoVenta.idOficina = res.idOficina
          asignarTurnoPuntoVenta.idSitioVenta = res.idSitioVenta
          asignarTurnoPuntoVenta.idTurnos = res.idTurnos.id
          asignarTurnoPuntoVenta.nombreOficina = res.nombreOficina
          asignarTurnoPuntoVenta.nombreSitioVenta = res.nombreSitioVenta
          this.servicioAsignarTurno.listarTodos().subscribe(resTurnos=>{
            resTurnos.forEach(elementTurnos => {
              if(elementTurnos.idSitioVenta == res.idSitioVenta){
                console.log(elementTurnos)
                this.contador += elementTurnos.porcentaje
              }
            });
            var restante = 100 - this.contador
            console.log(restante, this.contador)
            if(Number(porcentaje.value) <= restante){
              asignarTurnoPuntoVenta.porcentaje = Number(porcentaje.value)
              this.servicioModificar.actualizarAsignarTurnoPuntoVenta(asignarTurnoPuntoVenta).subscribe(resPuntoVentaActual=>{
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Se actualizo con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Este porcentaje que desea asignar al punto de venta supera el 100%, ya que solo le queda el '+restante+'%.',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        })

      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No debe pasar del 100% un porcentaje, ni ser menor a 1!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
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
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioAsignarTurno.listarTodos().subscribe(res=>{
        this.listaSitioVentaTabla =[]
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if (element.idSitioVenta == ultimo){
            this.listaSitioVentaTabla.push(element)
          }
        }
        this.listaSitioVentasTabla = this.listaSitioVentaTabla
        this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
      })
    }
  }

  public guardar() {
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.listarExiste = []
    var idOficina = this.formAsignarTurno.controls['oficina'].value
    var idSitioV = Number(localStorage.getItem("v"))
    var idTurn = this.formAsignarTurno.controls['turno'].value
    var porcentaje = this.formAsignarTurno.controls['porcentajito'].value
    this.contador = 0
    if(idOficina != undefined && idTurn != null && idSitioV != 0 && porcentaje != null){
      if(Number(porcentaje) >= 1 && Number(porcentaje) <= 100){
        let asignarTurno : AsignarTurno = new AsignarTurno();
        this.servicioEstado.listarPorId(13).subscribe(resEstado=>{
          asignarTurno.idEstado = resEstado;
          const idOficina = this.formAsignarTurno.controls['oficina'].value
          this.servicioOficina.listarTodos().subscribe(res => {
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              if(element.ideOficina == idOficina.ideOficina){
                asignarTurno.idOficina = element.ideOficina
                asignarTurno.nombreOficina = element.nom_oficina
                const idSitioVenta = Number(localStorage.getItem("v"))
                this.servicioSitioVenta.listarTodos().subscribe(res => {
                  for (let index = 0; index < res.length; index++) {
                    const element = res[index];
                    if(element.ideSitioventa == idSitioVenta){
                      asignarTurno.idSitioVenta = element.ideSitioventa
                      asignarTurno.nombreSitioVenta = element.nom_sitioventa
                      const idTurno = this.formAsignarTurno.controls['turno'].value
                      this.servicioTurnos.listarPorId(idTurno).subscribe(res => {
                        asignarTurno.idTurnos = res
                        this.servicioAsignarTurno.listarTodos().subscribe(res=>{
                          res.forEach(element => {
                            if(element.idSitioVenta == asignarTurno.idSitioVenta){
                              this.contador += element.porcentaje
                              if(element.idTurnos.id == asignarTurno.idTurnos.id){
                                this.encontrado = true
                              }else{
                                this.encontrado = false
                              }
                              this.listarExiste.push(this.encontrado)
                            }
                          });
                          const existe = this.listarExiste.includes( true )
                          if(existe == false){
                            var restante = 100 - this.contador
                            if(Number(porcentaje) <= restante){
                              asignarTurno.porcentaje = Number(porcentaje)
                              this.registrarAsignacionTurno(asignarTurno)
                            }else{
                              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                              Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Este porcentaje que desea asignar al punto de venta supera el 100%, ya que solo le queda el '+restante+'%.',
                                showConfirmButton: false,
                                timer: 1500
                              })
                            }
                          }
                          if(existe == true){
                            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                            console.log(this.contador)
                            Swal.fire({
                              position: 'center',
                              icon: 'error',
                              title: 'Ya existe un punto de venta asignado con este turno!',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          }
                        })
                      })
                    }
                  }
                })
              }
            }
          })
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No debe pasar del 100% un porcentaje, ni ser menor a 1!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }else{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos Vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarAsignacionTurno(asignarTurno: AsignarTurno) {
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    this.servicioAsignarTurno.registrar(asignarTurno).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignación de turno registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.listaSitioVentasTabla = []
      this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
      this.router.navigate(['/asignarTurno']);
      localStorage.removeItem("v")
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

  public eliminarAsignarTurno(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-5'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioAsignarTurno.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el usuario.',
            'success'
          )
          this.listaSitioVentasTabla = []
          this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
          this.router.navigate(['/agregarAsignarTurno']);
          this.crearFormulario()
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          '',
          'error'
        )
      }
    })
  }


}
