import { MatDialog } from '@angular/material/dialog';
import { SolicitudEliminarTurnoVendedorComponent } from './../solicitud-eliminar-turno-vendedor/solicitud-eliminar-turno-vendedor.component';
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
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AccesoService } from 'src/app/servicios/Acceso.service';

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
  public listaOf: any = [];
  public listaOficinas: any = [];
  public listarTurnos: any = [];
  public listaTurno: any = [];
  public listaIdSitioVenta: any = [];
  public listarSitioVentas: any = [];
  public estadosDisponibles: any = [];
  public listaIdOficinas: any = [];
  public listaAcceso:any = [];
  public acceso:any = 0;

  public listaVendedores:any =[];
  public listaIdVendedor:any=[];

  public listaSitioVentaTabla:any=[];
  public listaSitioVentasTabla:any=[]

  public encontrado = false;
  public listarExiste: any = [];
  public identificacion:any;

  public listaGuardado: any = [];
  public listadoVendedorFecha: any = [];
  public elementGuardadouno1: any = [];
  public listaTurnosAsigVen: any = [];



  displayedColumns = ['id', 'nombreVendedor', 'nombreOficina', 'nombreSitioVenta', 'fechaInicio', 'fechaFinal', 'turno', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurno : AsignarTurnoService,
    private servicioEstado : EstadoService,
    private servicioOficina : OficinasService,
    private servicioTurnos : TurnosService,
    private servicioUsuario : UsuarioService,
    private servicioSitioVenta : SitioVentaService,
    private servicioUsuarioVendedor: UsuarioVendedoresService,
    private servicioAsigarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioTurnoVendedorDTO: TurnoVendedorDTOSevice,
    private servicioAcceso: AccesoService,
    private router: Router,
    public dialog: MatDialog,
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
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        if(resUsuario.idRol.idJerarquia.id == 2){
          this.listaOficinas = res
        }else if(resUsuario.idRol.idJerarquia.id == 3){
          res.forEach(element => {
            if(element.ideSubzona == resUsuario.ideSubzona){
              this.listaOf.push(element)
            }
          });
          this.listaOficinas = this.listaOf
        }else if(resUsuario.idRol.idJerarquia.id == 4){
          res.forEach(element => {
            if(element.ideOficina == resUsuario.ideOficina){
              this.listaOf.push(element)
            }
          });
          this.listaOficinas = this.listaOf
        }
      })
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
          if(element.idVendedor == ultimo && element.estado != "Eliminado"){
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
    this.listadoVendedorFecha=[]
    let asignarTurnoVendedor : AsignarTurnoVendedor = new AsignarTurnoVendedor();
    const idOficina = this.formAsignarTurno.controls['oficina'].value
    this.servicioOficina.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.ideOficina == idOficina.ideOficina){
          asignarTurnoVendedor.idOficina = Number(element.ideOficina)
          asignarTurnoVendedor.estado = "Disponible"
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
                            this.servicioTurnoVendedorDTO.listarPorId(asignarTurnoVendedor.idVendedor).subscribe(resTurnosVendedores=>{
                              resTurnosVendedores.forEach(elementTurnoVendedor => {
                                this.listaGuardado.push(elementTurnoVendedor)
                              })
                              this.listaGuardado.forEach((elementGuardadouno:any) => {
                                var fechaInicioAlmacenada = new Date(elementGuardadouno.fecha_inicio)
                                var fechaInicioAlmacenada1 = new Date(fechaInicioAlmacenada.getFullYear(), fechaInicioAlmacenada.getMonth(), fechaInicioAlmacenada.getDate()+1)
                                var fechaFinalAlmacenada = new Date(elementGuardadouno.fecha_final)
                                var fechaFinalAlmacenada1 = new Date(fechaFinalAlmacenada.getFullYear(), fechaFinalAlmacenada.getMonth(), fechaFinalAlmacenada.getDate()+1)
                                if(fechaInicio >= fechaInicioAlmacenada1  && fechaFinal<= fechaFinalAlmacenada1){
                                  console.log(elementGuardadouno)
                                  if(elementGuardadouno.id_turno == asignarTurnoVendedor.idTurno.id){
                                    Swal.fire({
                                      position: 'center',
                                      icon: 'error',
                                      title: 'Ya tiene asignado ese turno!',
                                      showConfirmButton: false,
                                      timer: 1500
                                    })
                                  }else{
                                    if(this.listaGuardado){
                                      this.listadoVendedorFecha.push(elementGuardadouno)
                                    }
                                  }
                                }
                              })
                              console.log(this.listadoVendedorFecha)
                              if(this.listadoVendedorFecha.length==2){
                                this.listaTurnosAsigVen=[]
                                this.listadoVendedorFecha.forEach((elementGuardadouno:any) => {
                                  this.elementGuardadouno1.push(elementGuardadouno)
                                })
                                if(this.elementGuardadouno1[0] == asignarTurnoVendedor.idTurno.id || this.elementGuardadouno1[1] == asignarTurnoVendedor.idTurno.id){
                                  Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'Ya tiene asignado ese turno!',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                }else{
                                  console.log(this.elementGuardadouno1[0])
                                  this.servicioTurnos.listarTodos().subscribe(resTurnoVarios=>{
                                    resTurnoVarios.forEach(elementTurnoVarios => {
                                      if(elementTurnoVarios.id == this.elementGuardadouno1[0].id_turno || elementTurnoVarios.id == this.elementGuardadouno1[1].id_turno){
                                        this.listaTurnosAsigVen.push(elementTurnoVarios)
                                      }
                                    });
                                    console.log(this.listaTurnosAsigVen)
                                    var horaIsplit1 = this.listaTurnosAsigVen[0].horaInicio.split(':') //Split de Hora inicio almacenada 1
                                    var horaFsplit1 = this.listaTurnosAsigVen[0].horaFinal.split(':') //Split de Hora final almacenada 1
                                    var horaIsplit2 = this.listaTurnosAsigVen[1].horaInicio.split(':') //Split de Hora inicio almacenada 2
                                    var horaFsplit2 = this.listaTurnosAsigVen[1].horaFinal.split(':') //Split de Hora final almacenada 2

                                    var horaAlmanecanada1 = new Date(1982,6,20,Number(horaIsplit1[0]), Number(horaIsplit1[1]))
                                    horaAlmanecanada1.setHours(Number(horaFsplit1[0])-Number(horaIsplit1[0]), Number(horaFsplit1[1])-Number(horaIsplit1[1]))
                                    var horaAlmanecanada2 = new Date(1982,6,20,Number(horaIsplit2[0]), Number(horaIsplit2[1]))
                                    horaAlmanecanada2.setHours(Number(horaFsplit2[0])-Number(horaIsplit2[0]), Number(horaFsplit2[1])-Number(horaIsplit2[1]))

                                    var horaAlmanecanadaSuma = new Date(1982,6,20,Number(horaIsplit1[0]), Number(horaIsplit1[1]))
                                    horaAlmanecanadaSuma.setHours(Number(horaAlmanecanada1.getHours())+Number(horaAlmanecanada2.getHours()), Number(horaAlmanecanada1.getMinutes())+Number(horaAlmanecanada2.getMinutes()))

                                    var horaOchoHoras = new Date(1982,6,20,8,0) //tiempo de 8 horas
                                    var tiempoFaltante = new Date(1982,6,20,8,0)
                                    tiempoFaltante.setHours(Number(horaOchoHoras.getHours())-Number(horaAlmanecanadaSuma.getHours()),Number(horaOchoHoras.getMinutes())-Number(horaAlmanecanadaSuma.getMinutes())) //tiempo faltante para ingresar nuevo turno

                                    if(tiempoFaltante.getHours() <= 0 ){
                                      Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'No se podra asignar un nuevo turno porque ya en esas fecha cumple las 8 horas exactas.',
                                        showConfirmButton: false,
                                        timer: 2000
                                      })
                                    }else{
                                      this.servicioTurnos.listarPorId(asignarTurnoVendedor.idTurno.id).subscribe(resTurnoNuevo=>{
                                        var horaIsplitNueva = resTurnoNuevo.horaInicio.split(':') //Split de Hora inicio nueva
                                        var horaFsplitNueva = resTurnoNuevo.horaFinal.split(':') //Split de Hora final nueva
                                        var horaInicioNueva = new Date(1982,6,20,Number(horaIsplitNueva[0]), Number(horaIsplitNueva[1])) //hora inicio nueva
                                        var horaFinalNueva = new Date(1982,6,20,Number(horaFsplitNueva[0]), Number(horaFsplitNueva[1])) //hora final nueva
                                        var horaNueva = new Date(1982,6,20,Number(horaIsplitNueva[0]), Number(horaIsplitNueva[1]))
                                        horaNueva.setHours(Number(horaFsplitNueva[0])-Number(horaIsplitNueva[0]),Number(horaFsplitNueva[1])-Number(horaIsplitNueva[1])) //hora Nueva
                                        if(horaNueva>=tiempoFaltante && horaNueva<=tiempoFaltante){
                                          if(horaInicioNueva<=horaFinalNueva){
                                            asignarTurnoVendedor.fechaInicio = new Date(fechaInicio)
                                            asignarTurnoVendedor.fechaFinal = new Date(fechaFinal)
                                            this.registrarAsignacionTurnoVendedor(asignarTurnoVendedor)
                                          }
                                        }else if(horaAlmanecanadaSuma>=horaOchoHoras){
                                          Swal.fire({
                                            position: 'center',
                                            icon: 'error',
                                            title: 'Durante esas fechas tiene ya asignado turnos completo',
                                            showConfirmButton: false,
                                            timer: 2000
                                          })
                                        }else{
                                          Swal.fire({
                                              position: 'center',
                                              icon: 'error',
                                              title: 'No sera posible asignar ese turno porque excede las 8 horas!',
                                              showConfirmButton: false,
                                              timer: 2000
                                          })
                                        }
                                      })
                                    }
                                  })
                                }
                              }else if(this.listadoVendedorFecha.length>=3){
                                Swal.fire({
                                  position: 'center',
                                  icon: 'error',
                                  title: 'No se podra asignar un cuarto turno durante esas fechas.',
                                  showConfirmButton: false,
                                  timer: 1500
                                })
                              }else{
                                this.listadoVendedorFecha.forEach((elementGuardadouno:any) => {
                                  if(elementGuardadouno.id_turno == asignarTurnoVendedor.idTurno.id){
                                    Swal.fire({
                                      position: 'center',
                                      icon: 'error',
                                      title: 'Ya tiene asignado ese turno!',
                                      showConfirmButton: false,
                                      timer: 1500
                                    })
                                  }else{
                                    this.servicioTurnos.listarPorId(elementGuardadouno.id_turno).subscribe(resTurno=>{
                                      var horaIsplit = resTurno.horaInicio.split(':') //Split de Hora inicio almacenada
                                      var horaFsplit = resTurno.horaFinal.split(':') //Split de Hora final almacenada
                                      var hora = new Date(1982,6,20,Number(horaIsplit[0]), Number(horaIsplit[1]))
                                      console.log(hora)
                                      hora.setHours(Number(horaFsplit[0])-Number(horaIsplit[0]),Number(horaFsplit[1])-Number(horaIsplit[1])) //hora almacenada
                                      var horaOchoHoras = new Date(1982,6,20,8,0) //tiempo de 8 horas
                                      var tiempoFaltante = new Date(1982,6,20,Number(horaIsplit[0]), Number(horaIsplit[1]))
                                      tiempoFaltante.setHours(Number(horaOchoHoras.getHours())-Number(hora.getHours()),Number(horaOchoHoras.getMinutes())-Number(hora.getMinutes())) //tiempo faltante para ingresar nuevo turno
                                      this.servicioTurnos.listarPorId(asignarTurnoVendedor.idTurno.id).subscribe(resTurnoNuevo=>{
                                        var horaIsplitNueva = resTurnoNuevo.horaInicio.split(':') //Split de Hora inicio nueva
                                        var horaFsplitNueva = resTurnoNuevo.horaFinal.split(':') //Split de Hora final nueva
                                        var horaInicioNueva = new Date(1982,6,20,Number(horaIsplitNueva[0]), Number(horaIsplitNueva[1])) //hora inicio nueva
                                        var horaFinalNueva = new Date(1982,6,20,Number(horaFsplitNueva[0]), Number(horaFsplitNueva[1])) //hora final nueva
                                        var horaNueva = new Date(1982,6,20,Number(horaIsplit[0]), Number(horaIsplit[1]))
                                        horaNueva.setHours(Number(horaFsplitNueva[0])-Number(horaIsplitNueva[0]),Number(horaFsplitNueva[1])-Number(horaIsplitNueva[1])) //hora Nueva
                                        if(horaNueva>=tiempoFaltante && horaNueva<=tiempoFaltante){
                                          if(horaInicioNueva<=horaFinalNueva){
                                            asignarTurnoVendedor.fechaInicio = new Date(fechaInicio)
                                            asignarTurnoVendedor.fechaFinal = new Date(fechaFinal)
                                            this.registrarAsignacionTurnoVendedor(asignarTurnoVendedor)
                                          }
                                        }else if(hora>=horaOchoHoras){
                                          Swal.fire({
                                            position: 'center',
                                            icon: 'error',
                                            title: 'Durante esas fechas tiene ya asignado un turno completo',
                                            showConfirmButton: false,
                                            timer: 2000
                                          })
                                        }else{
                                          Swal.fire({
                                              position: 'center',
                                              icon: 'error',
                                              title: 'No sera posible asignar ese turno porque excede las 8 horas!',
                                              showConfirmButton: false,
                                              timer: 2000
                                          })
                                        }
                                      })
                                    })
                                  }
                                });
                              }
                            })
                          }
                          if(existe == false){
                            if(fechaInicio <= fechaFinal){
                              asignarTurnoVendedor.fechaInicio = fechaInicio
                              asignarTurnoVendedor.fechaFinal = fechaFinal
                              this.registrarAsignacionTurnoVendedor(asignarTurnoVendedor)
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
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAcceso.listarTodos().subscribe(resAcceso=>{
        resAcceso.forEach(element => {
          if(element.idRol = resUsuario.idRol){
            this.listaAcceso.push(element)
          }
        });
        this.listaAcceso.forEach((elementAcceso:any) => {
          if(elementAcceso.idModulo.id == 21){
            this.acceso = elementAcceso.idModulo.id
          }
        });
        if(this.acceso == 21){
          let asignarTurno : AsignarTurnoVendedor = new AsignarTurnoVendedor();
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
              this.servicioAsigarTurnoVendedor.listarPorId(id).subscribe(res=>{
                asignarTurno.id = res.id
                asignarTurno.fechaFinal = res.fechaFinal
                asignarTurno.fechaInicio = res.fechaInicio
                asignarTurno.idOficina = res.idOficina
                asignarTurno.idSitioVenta = res.idSitioVenta
                asignarTurno.idTurno = res.idTurno
                asignarTurno.idVendedor = res.idVendedor
                asignarTurno.ideSubzona = res.ideSubzona
                asignarTurno.nombreOficina = res.nombreOficina
                asignarTurno.nombreSitioVenta = res.nombreSitioVenta
                asignarTurno.nombreVendedor = res.nombreVendedor
                asignarTurno.estado = "Eliminado"
                this.modificarAsignarTurnoVendedor(asignarTurno)
                swalWithBootstrapButtons.fire(
                  'Eliminado!',
                  'Se eliminó la asignación de turno a ese vendedor.',
                  'success'
                )
              })
              this.router.navigate(['/asignarTurnoVendedor']);
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
        }else{
          const dialogRef = this.dialog.open(SolicitudEliminarTurnoVendedorComponent, {
            width: '500px',
            data: id
          });
        }
      })
    })
  }

  public modificarAsignarTurnoVendedor(asignarTurnoVendedor:AsignarTurnoVendedor){
    this.servicioAsigarTurnoVendedor.actualizar(asignarTurnoVendedor).subscribe(res => {

    })
  }

}
