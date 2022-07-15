import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { RolService } from 'src/app/servicios/rol.service';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  dtOptions: any = {};
  public formNovedad!: FormGroup;
  public listarNovedades: any = [];
  public lista: any = [];
  public fecha: Date = new Date();
  public fechaActual:any
  public listaNovedad:any = [];
  public listarExiste : any = [];
  public encontrar = false
  public listaNovedadJerarquia:any = [];
  public listaNovedadCompleta:any = [];
  public content: any;
  color = ('primary');
  displayedColumns = ['id', 'fecha', 'observacion', 'idVendedor', 'tipodeNovedad', 'Usuario'];
  dataSource!:MatTableDataSource<any>;
  constructor(
    private fb: FormBuilder,
    private novedadService: NovedadService,
    private usuarioService: UsuarioService,
    private oficinaService : OficinasService,
    private rolService : RolService,
    private jerarquiaService : JerarquiaService,
    ) { }




  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formNovedad = this.fb.group({
      id: 0,
      fechaInicio: [null,Validators.required],
      fechaFinal: [null,Validators.required],
    });
  }

  public listarTodo(){
    this.listarNovedades=[]
    this.listaNovedadJerarquia=[]
    const fechaI = new Date(this.formNovedad.controls['fechaInicio'].value);
    fechaI.setDate(fechaI.getDate()+1)
    const fechaF = new Date(this.formNovedad.controls['fechaFinal'].value);
    fechaF.setDate(fechaF.getDate()+1)
    this.novedadService.listarTodos().subscribe((data: any) => {
      data.forEach((element:any) => {
        var fechaAlmacenada = new Date(element.fecha)
        fechaAlmacenada.setDate(fechaAlmacenada.getDate()+1)
        if(fechaAlmacenada >= fechaI && fechaAlmacenada <= fechaF){
          this.listarNovedades.push(element);
          this.encontrar = true
        }else if(fechaF < fechaI){
          this.encontrar = false
        }
        this.listarExiste.push(this.encontrar);
      })
      this.listaNovedad = this.listarNovedades
      const existe = this.listarExiste.includes( true );
      if(fechaI>fechaF){
        Swal.fire({
          title: 'Fechas inválidas ',
          text: '',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }else{
        if(existe == true){
          this.usuarioService.listarPorId(Number(sessionStorage.getItem('id'))).subscribe((dataUsuario: any) => {
            this.rolService.listarPorId(dataUsuario.idRol.id).subscribe((dataRol: any) => {
              this.jerarquiaService.listarPorId(dataRol.idJerarquia.id).subscribe((dataJerarquia: any) => {
                if (dataJerarquia.id == 2) {
                  this.listaNovedadCompleta = this.listaNovedad
                }else if(dataJerarquia.id == 3){
                  this.listaNovedad.forEach((element:any) => {
                    if (dataUsuario.ideSubzona == element.idAsignarTurnoVendedor.ideSubzona){
                      this.listaNovedadJerarquia.push(element)
                    }
                  });
                  this.listaNovedadCompleta = this.listaNovedadJerarquia
                }else if(dataJerarquia.id == 4){
                  this.listaNovedad.forEach((element:any) => {
                    if (dataUsuario.ideOficina == element.idAsignarTurnoVendedor.idOficina){
                      this.listaNovedadJerarquia.push(element)
                    }
                  });
                  this.listaNovedadCompleta = this.listaNovedadJerarquia
                }
                this.lista = []
                this.listaNovedadCompleta.forEach((element:any) => {
                  var objeto = {
                    fecha: element.fecha,
                    hora: element.hora,
                    idVendedor: element.idAsignarTurnoVendedor.idVendedor,
                    nombreVendedor: element.idAsignarTurnoVendedor.nombreVendedor,
                    idSitioVentaAsignado: element.idAsignarTurnoVendedor.idSitioVenta,
                    nombreSitioVentaAsignado: element.idAsignarTurnoVendedor.nombreSitioVenta,
                    idOficina: element.idAsignarTurnoVendedor.idOficina,
                    nombreOficina: element.idAsignarTurnoVendedor.nombreOficina,
                    idSubZona: element.idAsignarTurnoVendedor.ideSubzona,
                    documentoGeneroReporte: element.idUsuario.documento,
                    nombresGeneroReporte: element.idUsuario.nombre,
                    apellidosGeneroReporte: element.idUsuario.apellido,
                    estado: element.estado,
                    tipoMalla: element.tipoMalla,
                    observacion: element.observacion
                  }
                  this.lista.push(objeto)
                });
                if (this.lista.length == 0){
                  Swal.fire({
                    title: 'No se encontraron resultados',
                    text: '',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                  })
                }else{
                  this.exportToExcel(this.lista);
                }
              })
            })
          })

        }else if(existe == false){
          Swal.fire({
            title: 'No se encontro registros entre esas fechas',
            text: '',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        }
      }
    })
  }



  name = 'listaNovedades.xlsx';
  public exportToExcel(listaNovedad:any): void {
    if (listaNovedad.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(listaNovedad);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ExportExcel");
      });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
