import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialService } from 'src/app/servicios/serviciosSiga/historial.service';
import { AgregarNovedadComponent } from '../novedades/agregar-novedad/agregar-novedad.component';
import { MatDialog } from '@angular/material/dialog';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { ModificarNovedadesComponent } from '../novedades/modificar-novedades/modificar-novedades.component';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit {
  dtOptions: any = {};
  public listaAsignacionesTurnoVendedores: any = [];
  public listaMallas: any = [];
  public fecha: Date = new Date();
  public fechaActual:any
  public fechaInicio: any;
  public validar = false;


  displayedColumns = ['usuarioVendedor', 'oficina', 'sitioVenta', 'horaIngreso', 'horaIngresoSiga', 'fecha', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioHistorial: HistorialService,
    private servicioEstado: EstadoService,
    private servicioNovedad: NovedadService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
      this.listaAsignacionesTurnoVendedores = res;
      const fechaActual2 = this.fecha.getDate() + "/"+ (this.fecha.getMonth()+1)+ "/" + this.fecha.getFullYear()
      this.fechaActual = this.fecha.getFullYear() + "/"+ (this.fecha.getMonth()+1)+ "/" +this.fecha.getDate();
      var horaActual = this.fecha.getHours() + ":"+ this.fecha.getMinutes();
      res.forEach(element => {
        var malla1 = {
          listaAsignarTurnoVendedor: {},
          estado: {},
          listaSigaApi: {},
          validar: false
        };
        var fechaInicio = new Date(element.fechaInicio);
        var fechaFinal = new Date(element.fechaFinal);
        // console.log(element)
        if(new Date(this.fechaActual)>=fechaInicio && new Date(this.fechaActual)<=fechaFinal ){
          if(horaActual>=element.idTurno.horaInicio){
            this.servicioHistorial.listarPorId(fechaActual2, element.idVendedor).subscribe(resHistorial=>{
              var primerObjeto  = resHistorial[0]
              if(resHistorial.length < 1  ){
                this.servicioEstado.listarPorId(18).subscribe(resEstado=>{
                  if(element != null && res != null){
                    malla1.listaAsignarTurnoVendedor = element
                    malla1.estado = resEstado
                    malla1.listaSigaApi = {}
                    malla1.validar = false
                    this.servicioNovedad.listarTodos().subscribe(resNovedad=>{
                      resNovedad.forEach(elementNovedad => {
                        if(elementNovedad.idAsignarTurnoVendedor.idVendedor == element.idVendedor && elementNovedad.idAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta){
                          console.log("Hola")
                          malla1.validar = true
                          console.log()
                        }
                      });
                    })
                    // document.getElementById("Estado")?.setAttribute('style','background-color: red;');
                  }
                  console.log('no ingreso')
                })
              }else{
                if(element.idTurno.horaInicio >= primerObjeto.hora){
                  this.servicioEstado.listarPorId(15).subscribe(resEstado=>{
                    if(element != null && resEstado != null && primerObjeto != null){
                      malla1.listaAsignarTurnoVendedor = element
                      malla1.estado = resEstado
                      malla1.listaSigaApi = primerObjeto
                      malla1.validar = true
                    }
                    // document.getElementById("Estado")?.setAttribute('style','background-color: red;');
                    console.log("Si cumplio")
                  })
                }else{
                  this.servicioEstado.listarPorId(16).subscribe(resEstado=>{
                    if(element != null && resEstado != null && primerObjeto != null){
                      malla1.listaAsignarTurnoVendedor = element
                      malla1.estado = resEstado
                      malla1.listaSigaApi = primerObjeto
                      malla1.validar = false
                      this.servicioNovedad.listarTodos().subscribe(resNovedad=>{
                        resNovedad.forEach(elementNovedad => {
                          if(elementNovedad.idAsignarTurnoVendedor.idVendedor == element.idVendedor && elementNovedad.idAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta){
                            console.log("Hola2")
                            console.log("Ya tiene novedad")
                            malla1.validar = true
                          }
                        });
                      })
                    }
                    // document.getElementById('No Cumplio')?.setAttribute('style','background-color: #DA161A;;');
                    console.log('no cumplio')
                  })
                }
              }

            })
            console.log(malla1)
          }else{
            this.servicioEstado.listarPorId(17).subscribe(resEstado=>{
              if(element != null && resEstado != null){
                malla1.listaAsignarTurnoVendedor = element
                malla1.estado = resEstado
                malla1.listaSigaApi = {}
                malla1.validar = false
              }
              console.log('Aun no debe ingresar')
            })
          }
          this.listaMallas.push(malla1)
          // if(document.getElementById('Cumplio')){
          //   document.getElementById('Cumplio')?.setAttribute('style','background-color: #6DBE53;');
          // }else if(document.getElementById('No Cumplio')){
          //   document.getElementById('No Cumplio')?.setAttribute('style','background-color: #DA161A;');
          // }
        };
      })
      this.dataSource = new MatTableDataSource(this.listaMallas);
      console.log(this.listaMallas)
    })

  }

  existe(idAsignarTurnoVendedor:Number){
    this.servicioNovedad.listarTodos().subscribe(resNovedades=>{
      resNovedades.forEach(elementNovedades => {
        if(elementNovedades.idAsignarTurnoVendedor.id == idAsignarTurnoVendedor){
          this.validar == true
        }
      });
    })
  }

  public agregarNovedad(idAsignarTurnoV:number, idE:number){
    const dialogRef = this.dialog.open(AgregarNovedadComponent, {
      width: '500px',
      data: {idAsignarTurnoVendedor: idAsignarTurnoV, idEstado:idE},
    });
  }

  visualizarNovedad(id: number): void {
    const dialogRef = this.dialog.open(ModificarNovedadesComponent, {
      width: '500px',
      data: id
    });
    console.log(id)
  }

   // Filtrado
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
