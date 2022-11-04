import { ModificarService } from 'src/app/servicios/modificar.service';
import { PresupuestoContable } from './../../../../modelos/presupuestoContable';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { PorcentajePresupuesto } from './../../../../modelos/porcentajePresupuesto';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LibroMayorService } from './../../../../servicios/libroMayor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PorcentajePresupuestoService } from 'src/app/servicios/porcentajePresupuesto.service';
import Swal from 'sweetalert2';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LibroMayor } from 'src/app/modelos/libroMayor';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as FileSaver from 'file-saver';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { PresupuestoContableService } from 'src/app/servicios/presupuestoContable.service';
import { PresupuestoContable2 } from 'src/app/modelos/modelos2/presupuestoContable2';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-agregar-porcentaje-presupuesto-contabilidad',
  templateUrl: './agregar-porcentaje-presupuesto-contabilidad.component.html',
  styleUrls: ['./agregar-porcentaje-presupuesto-contabilidad.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
   ]
})
export class AgregarPorcentajePresupuestoContabilidadComponent implements OnInit {

  //solo año
  selectYear:any
  date = new FormControl();
  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;
  //

  dtOptions: any = {};
  public listaCuentas: any = [];
  color = ('primary');
  public formPorcentaje!: FormGroup;
  public fechaActual: Date = new Date();
  chosenYearDate: Date;

  displayedColumns = ['id', 'codigo', 'descripcion', 'porcentaje', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private servicioCuentas: CuentasService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioPorcentajePresupuesto: PorcentajePresupuestoService,
    private servicioPresupuestoContable: PresupuestoContableService,
    private servicioModificar: ModificarService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.crearFormulario();
  }

  chosenYearHandler(ev, input){
    let { _d } = ev;
    this.selectYear = _d;
    this.picker.close()
  }

  public listarTodos () {
    this.servicioCuentas.listarTodos().subscribe( resCuentas =>{
      resCuentas.forEach(elementCuenta => {
        var fechaActual = this.fechaActual.getFullYear()+"-01-01";
        var obj={
          cuenta: elementCuenta,
          porcentaje: false,
          valorPorcentaje: 0
        }
        this.servicioConsultasGenerales.listarPorcentajePresupuesto(elementCuenta.id, fechaActual).subscribe(resConsultaPorcentaje=>{
          console.log(resConsultaPorcentaje)
          if(resConsultaPorcentaje.length > 0 ){
            obj.porcentaje = true
            resConsultaPorcentaje.forEach(elementConsultaPorcen => {
              obj.valorPorcentaje = elementConsultaPorcen.porcentaje
            });
          }
        })
        this.listaCuentas.push(obj)
      });
      console.log(this.listaCuentas)
      this.dataSource = new MatTableDataSource(this.listaCuentas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  private crearFormulario() {
    this.formPorcentaje = this.fb.group({
      id: 0,
      fecha: [null,Validators.required],
    });
  }

  porcentajeTabla: any
  public porcentaje(valor:any, libro:any){
    this.porcentajeTabla = valor.target.value
  }


  public guardarPorcentaje(idCuenta: any){
    if(this.selectYear != undefined && this.porcentajeTabla != null){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      var mes = new Date(this.selectYear.getFullYear(), 0, 1)
      let porcentajePresupuesto : PorcentajePresupuesto = new PorcentajePresupuesto();
      porcentajePresupuesto.fecha = mes
      porcentajePresupuesto.idCuenta = idCuenta
      porcentajePresupuesto.porcentaje = this.porcentajeTabla
      this.registrarPorcentajePresupuesto(porcentajePresupuesto, this.selectYear.getFullYear())
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estár vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarPorcentajePresupuesto(porcentajePresupuesto: PorcentajePresupuesto, año) {
    this.servicioPorcentajePresupuesto.registrar(porcentajePresupuesto).subscribe(res=>{
      let presupuestoContable : PresupuestoContable = new PresupuestoContable();
      var fechaActual = this.fechaActual.getFullYear()+"-01-01";
      console.log(porcentajePresupuesto.idCuenta.id, fechaActual)
      this.servicioConsultasGenerales.listarPorcentajePresupuesto(porcentajePresupuesto.idCuenta.id, fechaActual).subscribe(resPorcentajePresupesto=>{
        console.log(resPorcentajePresupesto)
        resPorcentajePresupesto.forEach(elementPorcentajePresupuesto => {
          this.servicioPorcentajePresupuesto.listarPorId(elementPorcentajePresupuesto.id).subscribe(resPorcentajePre=>{
            this.servicioConsultasGenerales.listarLibrosMayorFechas(porcentajePresupuesto.idCuenta.id, año).subscribe(resLibroMayor=>{
              var i = 0
              resLibroMayor.forEach(elementLibroMayor => {
                this.servicioCuentas.listarPorId(elementLibroMayor.idCuenta).subscribe(resCuentaLibroMayor=>{
                  var presupuestoPorcentaje = Math.round(elementLibroMayor.valor*(elementPorcentajePresupuesto.porcentaje/100))
                  var valorLibroMayor = Math.round(elementLibroMayor.valor)
                  presupuestoContable.presupuesto = valorLibroMayor + presupuestoPorcentaje
                  presupuestoContable.idCuenta = resCuentaLibroMayor
                  var fecha =  new Date(elementLibroMayor.fecha)
                  presupuestoContable.fecha = fecha
                  this.servicioPresupuestoContable.registrar(presupuestoContable).subscribe(resNuevoPresupuesto=>{
                    i++
                    if(i == resLibroMayor.length){
                      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Porcentaje Presupuesto Registrado!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      window.location.reload();
                    }
                  })
                })
                // if(resPresupuestoContable.length>0){
                //   resPresupuestoContable.forEach(elementPresupuestoContable => {
                //     var presupuestoPorcentaje = Math.round(elementLibroMayor.valor*(elementPorcentajePresupuesto.porcentaje/100))
                //     var presupuestoTotal = Math.round(elementLibroMayor.valor) + presupuestoPorcentaje
                //     presupuestoContableActualizar.id = elementPresupuestoContable.id
                //     var fecha = new Date(elementLibroMayor.fecha)
                //     presupuestoContableActualizar.fecha = fecha
                //     presupuestoContableActualizar.idCuenta = elementPresupuestoContable.idCuenta
                //     presupuestoContableActualizar.presupuesto = Number(elementPresupuestoContable.presupuesto)+Number(presupuestoTotal)
                //     console.log(presupuestoContableActualizar, elementPresupuestoContable.presupuesto)
                //     this.servicioModificar.actualizarPresupuestoContable(presupuestoContableActualizar).subscribe(resPresupuestoContableAcutalizado=>{

                //     })
                //   });
                // }else{
                // }
              });
            })
          })
        });
      })
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaCuentas);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: LibroMayor, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  listadoPorcentajes: any = [];
  listaPorcentajeCompletos: any = []
  exportToExcel(): void {
    this.listaPorcentajeCompletos = []
    this.servicioPorcentajePresupuesto.listarTodos().subscribe(resPorcentajePresupuesto=>{
      this.listadoPorcentajes = resPorcentajePresupuesto
      for (let index = 0; index < this.listadoPorcentajes.length; index++) {
        const element = this.listadoPorcentajes[index];
        var obj = {
          "Id": element.id,
          "Fecha": element.fecha,
          "Codigo": element.codigo,
          "Cuenta": element.idCuenta.descripcion,
          "Porcentaje": element.porcentaje+"%"
        }
        this.listaPorcentajeCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaPorcentajeCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaPorcentajes");
      });
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
