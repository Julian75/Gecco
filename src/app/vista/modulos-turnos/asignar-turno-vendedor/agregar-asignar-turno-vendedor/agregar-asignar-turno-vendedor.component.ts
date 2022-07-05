import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AsignarTurno } from 'src/app/modelos/asignarTurno';
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

@Component({
  selector: 'app-agregar-asignar-turno-vendedor',
  templateUrl: './agregar-asignar-turno-vendedor.component.html',
  styleUrls: ['./agregar-asignar-turno-vendedor.component.css']
})
export class AgregarAsignarTurnoVendedorComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

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
      })
      this.servicioUsuarioVendedor.listarPorId(ultimo).subscribe(res=>{
        this.listarVendedores = res

        // this.filteredOptions = this.myControl.valueChanges.pipe(
        //   startWith(''),
        //   map(value => {
        //     this.identificacion = typeof value == 'string' ? value : value?.num_identificacion;
        //     return this.identificacion ? this.identificacion as string : this.listarVendedores.slice();
        //   }),
        // );
        // const filterValue = this.identificacion;
        // console.log(filterValue)
        // return this.listarVendedores.filter((vendedores:any) => vendedores.num_identificacion.toowerCase().includes(filterValue));
      })
    }
  }

  displayFn(visitasSigas: VisitasSiga): string {
    return visitasSigas && visitasSigas.num_identificacion ? visitasSigas.num_identificacion : '';
  }

  // private _filter(numIdentificacion: string, vendedores:any): VisitasSiga[] {
  //   console.log("wenas")
  //   const filterValue = numIdentificacion.toLowerCase();

  //   return vendedores.filter((vendedores:any) => vendedores.num_identificacion.toLowerCase().includes(filterValue));
  // }

  idSitioVenta: any // Id de la oficina capturado - 18

  public idSitiosVentas(){
    this.listaTurno = [];
    this.listarTurnos = [];
    const listaSitioVenta = this.idSitioVenta
    this.listaIdSitioVenta.push(listaSitioVenta.ideSitioventa)
    let ultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 1]
    let penultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioAsignarTurno.listarTodos().subscribe(res=>{
      this.listaSitioVentaTabla =[]
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if (element.idSitioVenta == ultimo){
            this.servicioTurnos.listarTodos().subscribe(res=>{
              res.forEach(turnos => {
                if(turnos.id == element.idTurnos.id){
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

  idVendedor: any
  public idVendedortabla(){
    const listaVendedores = this.idVendedor
    this.listaIdVendedor.push(listaVendedores.ideUsuario)
    let ultimo = this.listaIdVendedor[this.listaIdVendedor.length - 1]
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
    let asignarTurnoVendedor : AsignarTurnoVendedor = new AsignarTurnoVendedor();
    const idOficina = this.formAsignarTurno.controls['oficina'].value
    this.servicioOficina.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.ideOficina == idOficina.ideOficina){
          asignarTurnoVendedor.idOficina = Number(element.ideOficina)
          asignarTurnoVendedor.nombreOficina = element.nom_oficina
          asignarTurnoVendedor.ideSubzona = element.ideSubzona
          this.servicioSitioVenta.listarPorId(element.ideOficina).subscribe(resSitioVenta=>{
            const idSitioVenta = this.formAsignarTurno.controls['sitioVenta'].value
            resSitioVenta.forEach(elementSitioVenta => {
              if(elementSitioVenta.ideSitioventa == idSitioVenta.ideSitioventa){
                asignarTurnoVendedor.idSitioVenta = Number(elementSitioVenta.ideSitioventa)
                asignarTurnoVendedor.nombreSitioVenta = elementSitioVenta.nom_sitioventa
                this.servicioUsuarioVendedor.listarPorId(element.ideOficina).subscribe(resUsuarioVendedor=>{
                  const idUsuarioVendedor = this.formAsignarTurno.controls['vendedor'].value
                  resUsuarioVendedor.forEach(elementUsuarioVendedor => {
                    if(elementUsuarioVendedor.ideUsuario == idUsuarioVendedor.ideUsuario){
                      asignarTurnoVendedor.idVendedor = elementUsuarioVendedor.ideUsuario
                      asignarTurnoVendedor.nombreVendedor = elementUsuarioVendedor.nombres+" "+elementUsuarioVendedor.apellido1
                      const idTurno = this.formAsignarTurno.controls['turno'].value
                      this.servicioTurnos.listarPorId(idTurno).subscribe(resTurno=>{
                        asignarTurnoVendedor.idTurno = resTurno
                        const fechaI = new Date(this.formAsignarTurno.controls['fechaInicio'].value);
                        const fechaInicio = new Date(fechaI.getFullYear(), fechaI.getMonth(), fechaI.getDate()+1);
                        const fechaF = new Date(this.formAsignarTurno.controls['fechaFinal'].value);
                        const fechaFinal = new Date(fechaF.getFullYear(), fechaF.getMonth(), fechaF.getDate()+1);
                        const fechaIn = new Date(fechaInicio.getFullYear()+"-"+(fechaInicio.getMonth()+1)+"-"+fechaInicio.getDate());
                        const fechaFn = new Date(fechaFinal.getFullYear()+"-"+(fechaFinal.getMonth()+1)+"-"+fechaFinal.getDate());
                        this.servicioAsigarTurnoVendedor.listarTodos().subscribe(resTurnoVendedor=>{
                          this.listarExiste = []
                          resTurnoVendedor.forEach(elementTurnoVendedor => {
                            if(elementTurnoVendedor.idVendedor == asignarTurnoVendedor.idVendedor){
                              const fechaInicios = new Date(elementTurnoVendedor.fechaInicio)
                              const fechaIGuardado = new Date(fechaInicios.getFullYear(), fechaInicios.getMonth(), fechaInicios.getDate()+1);
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
                            Swal.fire({
                              position: 'center',
                              icon: 'error',
                              title: 'Ese vendedor ya tiene un turno asignado en esas fechas!',
                              showConfirmButton: false,
                              timer: 1500
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
            'Se elimino el Tipo de turno.',
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
