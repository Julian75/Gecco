import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialService } from 'src/app/servicios/serviciosSiga/historial.service';
import { AgregarNovedadComponent } from '../novedades/agregar-novedad/agregar-novedad.component';
import { MatDialog } from '@angular/material/dialog';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { ModificarNovedadesComponent } from '../novedades/modificar-novedades/modificar-novedades.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit {
  dtOptions: any = {};
  public listaAsignacionesTurnoVendedores: any = [];
  public listaMal: any = [];
  public listaMallas: any = [];
  public usuario: any = [];
  public fecha: Date = new Date();
  public fechaActual:any
  public fechaInicio: any;
  public validar = false;
  public validacionMalla = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns = ['usuarioVendedor', 'oficina', 'sitioVenta', 'sitioVentaAsistencia', 'horaIngreso', 'horaIngresoSiga', 'fecha', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioHistorial: HistorialService,
    private servicioEstado: EstadoService,
    private servicioNovedad: NovedadService,
    private servicioUsuario: UsuarioService,
    private servicioOficina: OficinasService,
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
      var validacion: any = false
      res.forEach(element => {
        var malla1 = {
          listaAsignarTurnoVendedor: {},
          estado: {},
          listaSigaApi: {},
          ideOficina: 0,
          ideZona: 0,
          nombreEstado: '',
          validar: false
        };
        var fechaInicio = new Date(element.fechaInicio);
        var fechaF = new Date(element.fechaFinal);
        const fechaFinal = new Date(fechaF.getFullYear(), fechaF.getMonth(), fechaF.getDate()+1);
        if(new Date(this.fechaActual)>=fechaInicio && new Date(this.fechaActual)<=fechaFinal){
          if(horaActual>=element.idTurno.horaInicio){
            this.servicioHistorial.listarPorId(fechaActual2, element.idVendedor).subscribe(resHistorial=>{
              var primerObjeto  = resHistorial[0]
              if(resHistorial.length < 1  ){
                this.servicioEstado.listarPorId(18).subscribe(resEstado=>{
                  if(element != null && res != null){
                    malla1.listaAsignarTurnoVendedor = element
                    malla1.estado = resEstado
                    malla1.listaSigaApi = {}
                    malla1.ideOficina = element.idOficina
                    this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
                      resOficina.forEach(elementOficinia => {
                        malla1.ideZona = elementOficinia.ideSubzona
                        malla1.nombreEstado = 'No_ingreso'
                        malla1.validar = false
                        this.servicioNovedad.listarTodos().subscribe(resNovedad=>{
                          resNovedad.forEach(elementNovedad => {
                            if(elementNovedad.idAsignarTurnoVendedor.idVendedor == element.idVendedor && elementNovedad.idAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta){
                              malla1.validar = true
                            }
                          });
                        })
                      });
                    })
                  }
                })
              }else{
                if(element.idTurno.horaInicio >= primerObjeto.hora){
                  this.servicioEstado.listarPorId(15).subscribe(resEstado=>{
                    if(element != null && resEstado != null && primerObjeto != null){
                      malla1.listaAsignarTurnoVendedor = element
                      malla1.estado = resEstado
                      malla1.listaSigaApi = primerObjeto
                      malla1.ideOficina = element.idOficina
                      this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
                        resOficina.forEach(elementOficinia => {
                        malla1.ideZona = elementOficinia.ideSubzona
                        malla1.nombreEstado = 'Cumplio'
                        malla1.validar = true
                        })
                      })
                    }
                  })
                }else{
                  this.servicioEstado.listarPorId(16).subscribe(resEstado=>{
                    if(element != null && resEstado != null && primerObjeto != null){
                      malla1.listaAsignarTurnoVendedor = element
                      malla1.estado = resEstado
                      malla1.listaSigaApi = primerObjeto
                      malla1.ideOficina = element.idOficina
                      this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
                        resOficina.forEach(elementOficinia => {
                          malla1.ideZona = elementOficinia.ideSubzona
                          malla1.nombreEstado = 'Incumplio'
                          malla1.validar = false
                          this.servicioNovedad.listarTodos().subscribe(resNovedad=>{
                            resNovedad.forEach(elementNovedad => {
                              if(elementNovedad.idAsignarTurnoVendedor.idVendedor == element.idVendedor && elementNovedad.idAsignarTurnoVendedor.idSitioVenta == element.idSitioVenta){                            malla1.validar = true
                              }
                            });
                          })
                        })
                      })
                    }
                  })
                }
              }

            })
          }else{
            this.servicioEstado.listarPorId(17).subscribe(resEstado=>{
              if(element != null && resEstado != null){
                malla1.listaAsignarTurnoVendedor = element
                malla1.estado = resEstado
                malla1.listaSigaApi = {}
                malla1.ideOficina = element.idOficina
                this.servicioOficina.listarPorId(element.idOficina).subscribe(resOficina=>{
                  resOficina.forEach(elementOficinia => {
                    malla1.ideZona = elementOficinia.ideSubzona
                    malla1.nombreEstado = 'Aun'
                    malla1.validar = false
                  })
                })
              }
            })
          }
          this.listaMallas.push(malla1)
        };
      })
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        if(resUsuario.idRol.idJerarquia.id==2){
          this.dataSource = new MatTableDataSource(this.listaMallas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else if(resUsuario.idRol.idJerarquia.id == 3){
          validacion = false
        }else if(resUsuario.idRol.idJerarquia.id == 4){
          validacion = true
          this.listarPorOficinas(this.listaMallas)

          // localStorage.setItem('validacion', validacion)
          // console.log("olis")
        }
      })
      // if(localStorage.getItem('validacion')=='true'){
      //   this.listarPorOficinas(this.listaMallas)
      // }
      // if(localStorage.getItem('validacion')=='false'){
      //   // this.listarPorZonas(this.listaMallas)
      // }
    })

  }

  // public listarPorZonas(listaMallas:any){
  //   listaMallas.forEach((elementMalla:any) => {
  //     this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
  //       if(elementMalla.ideZona == resUsuario.ideSubzona){
  //         this.listaMalla.push(elementMalla)
  //       }
  //     })
  //     this.listaMallas = this.listaMalla
  //     this.dataSource = new MatTableDataSource(this.listaMallas);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }

  public listarPorOficinas(listaMallas:any){
    console.log(listaMallas)
    for (let index = 0; index < listaMallas.length; index++) {
      const elementMalla = listaMallas[index];
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        if(elementMalla.ideOficina == resUsuario.ideOficina){
          console.log("ki")
          this.listaMal.push(elementMalla)
          // this.listaFinal(this.listaMal)
          // this.dataSource = new MatTableDataSource(this.listaMal);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          // console.log(this.listaMal)
          console.log(this.listaMal)
        }
      })
    }

  }

  public listaFinal(listaOficinasMallas:any){
    // console.log(listaOficinasMallas)
    this.dataSource = new MatTableDataSource(listaOficinasMallas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
