import { UsuariosVendedores } from 'src/app/modelos/modelosSiga/usuariosVendedores';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AsignarTurnoService } from 'src/app/servicios/asignarTurno.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { UsuarioVendedoresService } from 'src/app/servicios/serviciosSiga/usuariosVendedores.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import Swal from 'sweetalert2';
import { AsignarTurnoVendedor } from 'src/app/modelos/asignarTurnoVendedor';
import { map, Observable, startWith } from 'rxjs';
import { VisitasSiga } from 'src/app/modelos/modelosSiga/visitasSiga';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { TurnoVendedorDTOSevice } from 'src/app/servicios/turnoVendedorDTO.service';

@Component({
  selector: 'app-agregar-asignar-turno-vendedor',
  templateUrl: './agregar-asignar-turno-vendedor.component.html',
  styleUrls: ['./agregar-asignar-turno-vendedor.component.css']
})
export class AgregarAsignarTurnoVendedorComponent implements OnInit {
  myControl = new FormControl<string | UsuariosVendedores>("");
  options: VisitasSiga[] = []
  filteredOptions!: Observable<UsuariosVendedores[]>;

  control = new FormControl<string | SitioVenta>("");
  opciones: SitioVenta[] = []
  opcionesFiltradas!: Observable<SitioVenta[]>;

  dtOptions: any = {};
  public formAsignarTurno!: FormGroup;
  public listarVendedores: any = [];
  public listarSitioVenta:any=[];
  public listarEstado: any = [];
  public listaOficinas: any = [];
  public listarTurnos: any = [];
  public listaTurno: any = [];
  public listaIdSitioVenta: any = [];
  public listarSitioVentas: any = [];
  public estadosDisponibles: any = [];
  public listaIdOficinas: any = [];

  public listaVendedores:any =[];
  public listaIdVendedor:any=[];

  public listaSitioVentaTabla:any=[];
  public listaSitioVentasTabla:any=[]

  public encontrado = false;
  public listarExiste: any = [];
  public identificacion:any;

  public listaGuardado: any = [];

  displayedColumns = ['id', 'nombreVendedor', 'nombreOficina', 'nombreSitioVenta', 'fechaInicio', 'fechaFinal', 'turno', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurno : AsignarTurnoService,
    private servicioEstado : EstadoService,
    private servicioOficina : OficinasService,
    private servicioTurnos : TurnosService,
    private servicioSitioVenta : SitioVentaService,
    private servicioUsuarioVendedor: UsuarioVendedoresService,
    private servicioAsigarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioTurnoVendedorDTO: TurnoVendedorDTOSevice,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
    this.listarOficinas();
  }
  private crearFormulario() {
    this.formAsignarTurno = this.fb.group({
      id: 0,
      oficina: [null,Validators.required],
      sitioVenta: [null,Validators.required],
      turno: [null,Validators.required],
      vendedor: [null,Validators.required],
      fechaInicio: [null,Validators.required],
      fechaFinal: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.idModulo.id == 6) {
          this.estadosDisponibles.push(element);
        }
        this.listarEstado = this.estadosDisponibles
      })

    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  id: any // Id de la oficina capturado - 18
  idOficina(){
    this.listarSitioVenta = []
    const listaOficina = this.id
    this.listaIdOficinas.push(listaOficina.ideOficina)
    let ultimo = this.listaIdOficinas[this.listaIdOficinas.length - 1]
    let penultimo = this.listaIdOficinas[this.listaIdOficinas.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioSitioVenta.listarPorId(ultimo).subscribe(res=>{
        this.listarSitioVentas = res
        this.opcionesFiltradas = this.control.valueChanges.pipe(
          startWith(""),
          map(value => {
            const nombre = typeof value == 'string' ? value : value?.nom_sitioventa;
            return nombre ? this.filtrado(nombre as string, res) : res.slice();
          }),
          );
      })
      this.servicioUsuarioVendedor.listarPorId(ultimo).subscribe(res=>{
        this.listarVendedores = res
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(""),
          map(value => {
            const num_identificacion = typeof value == 'string' ? value : value?.num_identificacion;
            const nombres = typeof value == 'string' ? value : value?.nombres;
            const apellido = typeof value == 'string' ? value : value?.apellido1;
            return num_identificacion ? this._filter(num_identificacion as string, nombres as string, apellido as string, this.listarVendedores) : this.listarVendedores.slice();
          }),
        );
      })
    }
  }

  textoSitioVenta:any
  displaySf(sitioVent: SitioVenta): any {
    this.textoSitioVenta = sitioVent
    if(this.textoSitioVenta == ""){
      this.textoSitioVenta = " "
    }else{
      this.textoSitioVenta = sitioVent.nom_sitioventa

      return this.textoSitioVenta;
    }
  }

  public filtrado(nombres: string, sitioVent:any): SitioVenta[] {
    const filterNo2 = nombres.toLowerCase();

    return sitioVent.filter((sitioVen:any) => (sitioVen.nom_sitioventa.toLowerCase().includes(filterNo2)));
  }

  onSelectionChanged2(event: MatAutocompleteSelectedEvent) {
    this.idSitiosVentas(event.option.value)
  }

  textoUsuarioVendedor:any
  displayFn(usuariosVendedores: UsuariosVendedores): any {
    this.textoUsuarioVendedor = usuariosVendedores
    if(this.textoUsuarioVendedor == ""){
      this.textoUsuarioVendedor = " "
    }else{
      this.textoUsuarioVendedor = usuariosVendedores.num_identificacion+" | "+usuariosVendedores.nombres+" "+usuariosVendedores.apellido1

      return this.textoUsuarioVendedor;
    }
  }

  public _filter(numIdentificacion: string, nombres: string, apellidos: string, vendedores:any): VisitasSiga[] {

    const filterValue = numIdentificacion;
    const filterNom = nombres.toLowerCase();
    const filterApellidos = apellidos.toLowerCase();

    return vendedores.filter((vendedores:any) => (vendedores.num_identificacion.includes(filterValue) || vendedores.nombres.toLowerCase().includes(filterNom) || vendedores.apellido1.toLowerCase().includes(filterApellidos)));
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idVendedortabla(event.option.value)
  }

  public idSitiosVentas(idSitio:any){
    this.listaTurno = [];
    this.listarTurnos = [];
    const listaSitioVenta = idSitio
    this.listaIdSitioVenta.push(listaSitioVenta.ideSitioventa)
    let ultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 1]
    localStorage.setItem("s", ultimo)
    let penultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioAsignarTurno.listarTodos().subscribe(res=>{
      this.listaSitioVentaTabla =[]
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if (element.idSitioVenta == ultimo){
            this.servicioTurnos.listarTodos().subscribe(res=>{
              res.forEach(turnos => {
                if(turnos.id == element.idTurnos.id && turnos.idEstado.id == 3){
                  this.listaTurno.push(element);
                }
              });
              this.listarTurnos = this.listaTurno
            })
          }
        }
      })
    }
  }

  public idVendedortabla(idVendedor:any){
    const listaVendedores = idVendedor.ideUsuario
    this.listaIdVendedor.push(listaVendedores)
    let ultimo = this.listaIdVendedor[this.listaIdVendedor.length - 1]
    localStorage.setItem("v", ultimo)
    let penultimo = this.listaIdVendedor[this.listaIdVendedor.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioAsigarTurnoVendedor.listarTodos().subscribe(res=>{
        this.listaSitioVentaTabla =[]
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if(element.idVendedor == ultimo){
            this.listaSitioVentaTabla.push(element)
          }
        }
        this.listaSitioVentasTabla = this.listaSitioVentaTabla
        this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
      })
    }
  }

  public guardar() {
    this.listaGuardado = []
    let asignarTurnoVendedor : AsignarTurnoVendedor = new AsignarTurnoVendedor();
    const idOficina = this.formAsignarTurno.controls['oficina'].value
    this.servicioOficina.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.ideOficina == idOficina.ideOficina){
          asignarTurnoVendedor.idOficina = Number(element.ideOficina)
          asignarTurnoVendedor.nombreOficina = element.nom_oficina
          asignarTurnoVendedor.ideSubzona = element.ideSubzona
          this.servicioSitioVenta.listarPorId(element.ideOficina).subscribe(resSitioVenta=>{
            const idSitioVenta = Number(localStorage.getItem("s"))
            resSitioVenta.forEach(elementSitioVenta => {
              if(elementSitioVenta.ideSitioventa == idSitioVenta){
                asignarTurnoVendedor.idSitioVenta = Number(elementSitioVenta.ideSitioventa)
                asignarTurnoVendedor.nombreSitioVenta = elementSitioVenta.nom_sitioventa
                this.servicioUsuarioVendedor.listarPorId(element.ideOficina).subscribe(resUsuarioVendedor=>{
                  const idUsuarioVendedor = Number(localStorage.getItem("v"))
                  resUsuarioVendedor.forEach(elementUsuarioVendedor => {
                    if(elementUsuarioVendedor.ideUsuario == idUsuarioVendedor){
                      asignarTurnoVendedor.idVendedor = elementUsuarioVendedor.ideUsuario
                      asignarTurnoVendedor.nombreVendedor = elementUsuarioVendedor.nombres+" "+elementUsuarioVendedor.apellido1
                      const idTurno = this.formAsignarTurno.controls['turno'].value
                      this.servicioTurnos.listarPorId(idTurno).subscribe(resTurno=>{
                        asignarTurnoVendedor.idTurno = resTurno
                        const fechaI = new Date(this.formAsignarTurno.controls['fechaInicio'].value);
                        const fechaInicio = new Date(fechaI.getFullYear(), fechaI.getMonth(), fechaI.getDate()+1);
                        const fechaF = new Date(this.formAsignarTurno.controls['fechaFinal'].value);
                        const fechaFinal = new Date(fechaF.getFullYear(), fechaF.getMonth(), fechaF.getDate()+1);
                        const fechaIn = new Date(fechaInicio.getFullYear()+"-"+(fechaInicio.getMonth()+1)+"-"+fechaInicio.getDate()); // Fecha inicio que asignaran
                        const fechaFn = new Date(fechaFinal.getFullYear()+"-"+(fechaFinal.getMonth()+1)+"-"+fechaFinal.getDate());// Fecha final que asignaran
                        this.servicioAsigarTurnoVendedor.listarTodos().subscribe(resTurnoVendedor=>{
                          this.listarExiste = []
                          resTurnoVendedor.forEach(elementTurnoVendedor => {
                            if(elementTurnoVendedor.idVendedor == asignarTurnoVendedor.idVendedor){
                              const fechaInicios = new Date(elementTurnoVendedor.fechaInicio)
                              const fechaIGuardado = new Date(fechaInicios.getFullYear(), fechaInicios.getMonth(), fechaInicios.getDate()+1); // Fechas guardado
                              const fechaFinals = new Date(elementTurnoVendedor.fechaFinal)
                              const fechaFGuardado = new Date(fechaFinals.getFullYear(), fechaFinals.getMonth(), fechaFinals.getDate()+1);
                              if(fechaIn >= fechaIGuardado && fechaFn<=fechaFGuardado){
                                this.encontrado = true
                              }else if(fechaIn <= fechaFGuardado){
                                this.encontrado = true
                              }else if(fechaFn == fechaIGuardado){
                                this.encontrado = true
                              }else{
                                this.encontrado = false
                              }
                              this.listarExiste.push(this.encontrado)
                            }
                          });
                          const existe = this.listarExiste.includes( true )
                          if(existe == true){
                            console.log("wenas 3")
                            this.servicioTurnoVendedorDTO.listarPorId(asignarTurnoVendedor.idVendedor).subscribe(resTurnosVendedores=>{
                              resTurnosVendedores.forEach(elementTurnoVendedor => {
                                this.listaGuardado.push(elementTurnoVendedor)
                              })
                              if(this.listaGuardado.length>1){

                              }else{
                                this.listaGuardado.forEach((elementGuardadouno:any) => {
                                  var fechaInicioAlmacenada = new Date(elementGuardadouno.fecha_inicio)
                                  var fechaInicioAlmacenada1 = new Date(fechaInicioAlmacenada.getFullYear(), fechaInicioAlmacenada.getMonth(), fechaInicioAlmacenada.getDate()+1)
                                  var fechaFinalAlmacenada = new Date(elementGuardadouno.fecha_final)
                                  var fechaFinalAlmacenada1 = new Date(fechaFinalAlmacenada.getFullYear(), fechaFinalAlmacenada.getMonth(), fechaFinalAlmacenada.getDate()+1)
                                  if(fechaIn >= fechaInicioAlmacenada1  && fechaFn>= fechaFinalAlmacenada1){
                                    if(elementGuardadouno.id_turno == asignarTurnoVendedor.idTurno.id){
                                      Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'Ya tiene asignado ese turno!',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                    }else{
                                      // this.servicioTurnos.listarPorId(elementTurnoVendedor.id_turno).subscribe(resTurno=>{
                                      //   var horaIsplit = resTurno.horaInicio.split(':')
                                      //   var horaFsplit = resTurno.horaFinal.split(':')
                                      //   var hora = new Date(1982,6,20,Number(horaIsplit[0]), Number(horaIsplit[1]))
                                      // })
                                    }
                                  }
                                });
                                // if(fechaIn >= fechaInicioAlmacenada1  && fechaFn>= fechaFinalAlmacenada1){
                                //   if(elementTurnoVendedor.id_turno == asignarTurnoVendedor.idTurno.id){
                                //     Swal.fire({
                                //       position: 'center',
                                //       icon: 'error',
                                //       title: 'Ya tiene asignado ese turno!',
                                //       showConfirmButton: false,
                                //       timer: 1500
                                //     })
                                //   }else{
                                //     this.servicioTurnos.listarPorId(elementTurnoVendedor.id_turno).subscribe(resTurno=>{
                                //       var horaIsplit = resTurno.horaInicio.split(':')
                                //       var horaFsplit = resTurno.horaFinal.split(':')
                                //       var hora = new Date(1982,6,20,Number(horaIsplit[0]), Number(horaIsplit[1]))
                                //       console.log(hora)
                                //       hora.setHours(Number(horaFsplit[0])-Number(horaIsplit[0]),Number(horaFsplit[1])-Number(horaIsplit[1])) //hora asiganada-resta
                                //       var horaDiferencia = new Date(1982,6,20,8,0) //tiempo de 8 horas

                                //       // var horaInicioNueva = new Date(1982,6,20,Number(fechaInicio.getHours()), Number(fechaInicio.getMinutes())) //hora inicio nueva
                                //       // var horaFinalNueva = new Date(1982,6,20,Number(fechaFinal.getHours()), Number(fechaFinal.getMinutes())) //hora final nueva
                                //       // var horaNuevasplitI = asignarTurnoVendedor.idTurno.horaInicio.split(':')
                                //       // var horaNuevasplitF = asignarTurnoVendedor.idTurno.horaFinal.split(':')
                                //       // var horaNuevaI = new Date(1982,6,20,Number(horaNuevasplitI[0]), Number(horaNuevasplitI[1])) //hora inicio asignada
                                //       // var horaNuevaF = new Date(1982,6,20,Number(horaNuevasplitF[0]), Number(horaNuevasplitF[1])) //hora inicio asignada
                                //       // var horaNueva = new Date(1982,6,20,Number(horaNuevasplitF[0]), Number(horaNuevasplitF[1])) //hora inicio asignada
                                //       // horaNueva.setHours(Number(horaNuevaF.getHours())-Number(horaNuevaI.getHours()),Number(horaNuevaF.getMinutes())-Number(horaNuevaI.getMinutes()))

                                //       // var horaDiferenciaNueva = new Date(1982,6,20,Number(horaNuevasplitF[0]), Number(horaNuevasplitF[1])) //resta de horas con la que ingreso y con la 8 horas que debe cumplir
                                //       // if(hora<horaDiferencia){
                                //       //   if(fechaInicio <= fechaFinal){
                                //       //     if(fechaInicio){
                                //       //       this.listaGuardado.push(elementTurnoVendedor)
                                //       //     }
                                //       //     // if(this.listaGuardado.length>1){
                                //       //     //   console.log("aqui etre")
                                //       //     // }else{
                                //       //     //   horaDiferencia.setHours(Number(horaDiferencia.getHours())-Number(horaDiferenciaNueva.getHours()),Number(horaDiferencia.getMinutes())-Number(horaDiferenciaNueva.getMinutes()))
                                //       //     //   console.log(horaNueva, horaDiferencia)
                                //       //     //   if(horaNueva>=horaDiferencia && horaNueva<=horaDiferencia){

                                //       //     //   }
                                //       //     //   asignarTurnoVendedor.fechaInicio = new Date(fechaInicio)
                                //       //     //   asignarTurnoVendedor.fechaFinal = new Date(fechaFinal)
                                //       //     //   // this.registrarAsignacionTurnoVendedor(asignarTurnoVendedor)
                                //       //     // }
                                //       //   }else{
                                //       //     Swal.fire({
                                //       //       position: 'center',
                                //       //       icon: 'error',
                                //       //       title: 'Selecciono una fecha menor a la inicial!',
                                //       //       showConfirmButton: false,
                                //       //       timer: 1500
                                //       //     })
                                //       //   }
                                //       // }else{
                                //       //   Swal.fire({
                                //       //     position: 'center',
                                //       //     icon: 'error',
                                //       //     title: 'Durante esas fechas tiene ya asignado un turno completo',
                                //       //     showConfirmButton: false,
                                //       //     timer: 1500
                                //       //   })
                                //       // }
                                //     })
                                //   }
                                // }
                              }
                            })
                          }
                          if(existe == false){
                            if(fechaInicio <= fechaFinal){
                              asignarTurnoVendedor.fechaInicio = fechaInicio
                              asignarTurnoVendedor.fechaFinal = fechaFinal
                              // this.registrarAsignacionTurnoVendedor(asignarTurnoVendedor)
                            }else{
                              Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Selecciono una fecha menor a la inicial!',
                                showConfirmButton: false,
                                timer: 1500
                              })
                            }
                          }
                        })
                      })
                    }
                  });
                })
              }
            });
          })
        }
      });
    })
  }

  public registrarAsignacionTurnoVendedor(asignarTurnoVendedor: AsignarTurnoVendedor) {
    this.servicioAsigarTurnoVendedor.registrar(asignarTurnoVendedor).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha asignado ese turno a un vendedor!',
        showConfirmButton: false,
        timer: 1500
      })
      this.listaSitioVentasTabla = []
      this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
      sessionStorage.removeItem("s")
      sessionStorage.removeItem("v")
      this.router.navigate(['/asignarTurnoVendedor']);
      this.crearFormulario()
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

  public eliminarAsignarTurnoVendedor(id:number){
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
        this.servicioAsigarTurnoVendedor.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la asignación de turno.',
            'success'
          )
          this.listaSitioVentasTabla = []
          this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
          this.router.navigate(['/agregarTurnoVendedor']);
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
