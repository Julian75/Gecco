import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AsignarTurnoService } from 'src/app/servicios/asignarTurno.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-modificar-asignar-turno',
  templateUrl: './modificar-asignar-turno.component.html',
  styleUrls: ['./modificar-asignar-turno.component.css']
})
export class ModificarAsignarTurnoComponent implements OnInit {

  dtOptions: any = {};
  public formAsignarTurno!: FormGroup;
  public listarEstado: any = [];
  public estadosDisponibles: any = [];
  public listarTurnos: any = [];
  public listaTurno: any = [];
  public listaOficinas: any = [];
  public listaIdOficinas: any = [];
  public listaSitioVenta: any = [];
  public listarSitioVentas: any = [];
  public listaIdSitioVenta: any = [];
  public idAsignarTurno : any;
  public listarAsignarTurno : any = [];

  public listaSitioVentaTabla:any=[];
  public listaSitioVentasTabla:any=[]


  displayedColumns = ['id', 'descripcion', 'horaFinal', 'horaInicio', 'Estado', 'Tipo Turno'];
  dataSource!:MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurno : AsignarTurnoService,
    private servicioEstado : EstadoService,
    private servicioTurnos : TurnosService,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidAsignarTurno();
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

  public listarporidAsignarTurno() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idAsignarTurno = params.get('id');
      this.servicioAsignarTurno.listarPorId(this.idAsignarTurno).subscribe(res => {
        this.listarAsignarTurno = res;
        console.log(this.listarAsignarTurno)
        this.formAsignarTurno.controls['id'].setValue(this.listarAsignarTurno.id);
        this.formAsignarTurno.controls['estado'].setValue(this.listarAsignarTurno.idEstado.id);
        this.servicioOficina.listarTodos().subscribe(res=>{
          console.log(res)
          res.forEach(element => {
            if(element.ideOficina == this.listarAsignarTurno.idOficina){
              const oficina = this.formAsignarTurno.controls['oficina'].setValue(this.listarAsignarTurno.nombreOficina);
              console.log(element.nom_oficina)
            }
          });
        })
        this.formAsignarTurno.controls['sitioVenta'].setValue(this.listarAsignarTurno.idEstado.id);
        this.formAsignarTurno.controls['turno'].setValue(this.listarAsignarTurno.idEstado.id);
      })
    })
  }

  public guardar(){

  }

}
