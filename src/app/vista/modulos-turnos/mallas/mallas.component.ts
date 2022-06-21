import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialService } from 'src/app/servicios/serviciosSiga/historial.service';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit {
  dtOptions: any = {};
  public listaAsignacionesTurnoVendedores: any = [];
  public listaMallas: any = [];
  public listaMallas2: any = {};
  public fecha: Date = new Date();
  public fechaActual:any
  public fechaInicio: any;

  displayedColumns = ['usuarioVendedor', 'estado', 'oficina', 'sitioVenta', 'horaIngreso', 'horaIngresoSiga', 'fecha'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioHistorial: HistorialService,
    private servicioEstado: EstadoService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true,
      buttons: [
        {
          extend: 'excel',
          text: '<i class="fa-solid fa-file-excel text-success btnexcel" style="background-color:#6DBE53;"></i>',
        },
        {
          extend: 'pdf',
          text: '<i class="fa-solid fa-file-pdf" style="background-color: #DA161A;"></i>',
        },
         {
          extend: 'print',
          text: '<i class="fa-solid fa-print " style="color:#959595" ></i>',
         }
      ]
    };
  }



  public listarTodos () {
    this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
      this.listaAsignacionesTurnoVendedores = res;
      const fechaActual2 = this.fecha.getDate() + "/"+ (this.fecha.getMonth()+1)+ "/" + this.fecha.getFullYear()
      this.fechaActual = this.fecha.getFullYear() + "/"+ (this.fecha.getMonth()+1)+ "/" +this.fecha.getDate();
      var horaActual = this.fecha.getHours() + ":"+ this.fecha.getMinutes();
      res.forEach(element => {
        var fechaInicio = new Date(element.fechaInicio);
        var fechaFinal = new Date(element.fechaFinal);
        // console.log(element)
        if(new Date(this.fechaActual)>=fechaInicio && new Date(this.fechaActual)<=fechaFinal ){
          this.servicioEstado.listarTodos().subscribe(resEstados=>{
            resEstados.forEach(elementEstados => {
              if(elementEstados.idModulo.id == 7){
                if(horaActual>=element.idTurno.horaInicio){
                  this.servicioHistorial.listarPorId(fechaActual2, element.idVendedor).subscribe(resHistorial=>{
                    const primerObjeto = resHistorial[0]
                    if(resHistorial.length < 1  ){
                      if(elementEstados.id == 18){
                        var malla = {
                          listaAsignarTurnoVendedor: element,
                          estado: elementEstados,
                          listaSigaApi: primerObjeto
                        };
                        this.listaMallas.push(malla)
                        console.log('no ingreso')
                      }
                    }else{
                      if(element.idTurno.horaInicio >= primerObjeto.hora){
                        if(elementEstados.id == 15){
                          var malla = {
                            listaAsignarTurnoVendedor: element,
                            estado: elementEstados,
                            listaSigaApi: primerObjeto
                          };
                          this.listaMallas.push(malla)
                          console.log("Si cumplio")
                        }
                      }else{
                        if(elementEstados.id == 16){
                          var malla = {
                            listaAsignarTurnoVendedor: element,
                            estado: elementEstados,
                            listaSigaApi: primerObjeto
                          };
                          this.listaMallas.push(malla)
                          console.log('no cumplio')
                        }
                      }
                    }
                  })
                }else{
                  if(elementEstados.id == 17){
                    var malla = {
                      listaAsignarTurnoVendedor: element,
                      estado: elementEstados,
                      listaSigaApi: []
                    };
                    this.listaMallas.push(malla)
                    console.log('Aun no debe ingresar')
                  }
                }
              }
            });
          })
        }
      });
      // for (let i = 0; i < this.listaMallas.length; i++) {
      //   console.log(i)
      //   this.listaMallas2 = this.listaMallas[0]
      //   this.dataSource = new MatTableDataSource( this.listaMallas2);
      // }
      console.log(this.listaMallas)
    })
  }

}
