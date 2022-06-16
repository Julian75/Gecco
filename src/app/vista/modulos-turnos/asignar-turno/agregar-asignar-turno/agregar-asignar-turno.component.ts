import { Router } from '@angular/router';
import { AsignarTurno } from './../../../../modelos/asignarTurno';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/servicios/estado.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { SitioVentaService} from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { AsignarTurnoService } from 'src/app/servicios/asignarTurno.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agregar-asignar-turno',
  templateUrl: './agregar-asignar-turno.component.html',
  styleUrls: ['./agregar-asignar-turno.component.css']
})
export class AgregarAsignarTurnoComponent implements OnInit {
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


  displayedColumns = ['id', 'descripcion', 'horaFinal', 'horaInicio', 'Estado', 'Tipo Turno'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurno : AsignarTurnoService,
    private servicioEstado : EstadoService,
    private servicioOficina : OficinasService,
    private servicioTurnos : TurnosService,
    private servicioSitioVenta : SitioVentaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
    this.listarOficinas();
    this.listarTurno();
  }
  private crearFormulario() {
    this.formAsignarTurno = this.fb.group({
      id: 0,
      estado: [null,Validators.required],
      sitioVenta: [null,Validators.required],
      turno: [null,Validators.required],
      oficina: [null,Validators.required],
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

  // public asignarTurnos(){
  //   this.servicioAsignarTurno.listarTodos().subscribe(res=>{
  //     this.dataSource = new MatTableDataSource(res);
  //   })
  // }

  id: any // Id de la oficina capturado - 18

  idOficina(){
    const listaOficina = this.id
    this.listaIdOficinas.push(listaOficina.ideOficina)

    let ultimo = this.listaIdOficinas[this.listaIdOficinas.length - 1]
    let penultimo = this.listaIdOficinas[this.listaIdOficinas.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.listaSitioVenta = []
      this.servicioSitioVenta.listarTodos().subscribe(res=>{
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if(element.ideOficina == listaOficina.ideOficina){
            const lista = element
            this.listaSitioVenta.push(lista)
          }
        }
        this.listarSitioVentas = this.listaSitioVenta

      })
    }else{
      console.log("todo igual")
    }
  }

  idSitioVenta: any // Id de la oficina capturado - 18

  idSitiosVentas(){
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
            this.listaSitioVentaTabla.push(element)
          }
        }
        this.listaSitioVentasTabla = this.listaSitioVentaTabla
        this.dataSource = new MatTableDataSource(this.listaSitioVentasTabla);
      })
    }else{
      console.log("todo igual")
    }
  }

  public guardar() {
    let asignarTurno : AsignarTurno = new AsignarTurno();
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.id == 13) {
          asignarTurno.idEstado = element;
          const idOficina = this.formAsignarTurno.controls['oficina'].value
          this.servicioOficina.listarTodos().subscribe(res => {
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              if(element.ideOficina == idOficina.ideOficina){
                asignarTurno.idOficina = element.ideOficina
                asignarTurno.nombreOficina = element.nom_oficina
                const idSitioVenta = this.formAsignarTurno.controls['sitioVenta'].value
                this.servicioSitioVenta.listarTodos().subscribe(res => {
                  for (let index = 0; index < res.length; index++) {
                    const element = res[index];
                    if(element.ideSitioventa == idSitioVenta.ideSitioventa){
                      asignarTurno.idSitioVenta = element.ideSitioventa
                      asignarTurno.nombreSitioVenta = element.nom_sitioventa
                      const idTurno = this.formAsignarTurno.controls['turno'].value
                      this.servicioTurnos.listarPorId(idTurno).subscribe(res => {
                        asignarTurno.idTurnos = res
                        this.servicioAsignarTurno.listarTodos().subscribe(res=>{
                          res.forEach(element => {
                            if(element.idSitioVenta == asignarTurno.idSitioVenta){
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
                            this.registrarAsignacionTurno(asignarTurno)
                          }
                          if(existe == true){
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
        }
      })
    });
  }

  public registrarAsignacionTurno(asignarTurno: AsignarTurno) {
    this.servicioAsignarTurno.registrar(asignarTurno).subscribe(res=>{
      console.log(asignarTurno)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignación de turno registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/asignarTurno']);
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
