import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lista-actas-bajas',
  templateUrl: './lista-actas-bajas.component.html',
  styleUrls: ['./lista-actas-bajas.component.css']
})
export class ListaActasBajasComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'usuario', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private servicioBajaArticulo: ArticulosBajaService,
    private serviceEstado: EstadoService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioUsuario: UsuarioService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.listarSolicitudesBajas = []
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 82){
          this.listarSolicitudesBajas.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  nombreEmpresa:any;
  nitEmpresa: any;
  abrirPdf(idSolicitudBajaArticulo){
    this.servicioBajaArticulo.listarTodos().subscribe(resActivosBajas=>{
      this.serviceSolicitudBajasArticulos.listarPorId(idSolicitudBajaArticulo).subscribe(resSolicitudBajasActivos=>{
        this.servicioUsuario.listarPorId(Number(resSolicitudBajasActivos.usuarioAutorizacion)).subscribe(resUsuarioAutorizacion=>{
          this.servicioUsuario.listarPorId(Number(resSolicitudBajasActivos.usuarioConfirmacion)).subscribe(resUsuarioConfirmacion=>{
            this.servicioConfiguracion.listarTodos().subscribe(async resConfiguracion=>{
              var body = []
              resActivosBajas.forEach(elementActivoBaja => {
                if(elementActivoBaja.idSolicitudBaja.id == idSolicitudBajaArticulo){
                  var now = new Array
                  now.push(elementActivoBaja.idDetalleArticulo.idArticulo.descripcion)
                  now.push(elementActivoBaja.idDetalleArticulo.serial)
                  now.push(elementActivoBaja.idDetalleArticulo.placa)
                  now.push(elementActivoBaja.idDetalleArticulo.marca)
                  now.push(elementActivoBaja.idOpcionBaja.descripcion)
                  now.push(elementActivoBaja.observacion)
                  body.push(now)
                }
              });
              console.log(body)
              resConfiguracion.forEach(element => {
                if(element.nombre == 'nombre_entidad'){
                  this.nombreEmpresa = element.valor
                }
                if(element.nombre == 'nit_empresa'){
                  this.nitEmpresa = element.valor
                }
              });
              const pdfDefinition: any = {
                content: [
                  {
                    image: await this.getBase64ImageFromURL(
                      'assets/logo/suchance.png'
                    ),
                    relativePosition: {x: 0, y: 0},
                    width: 150,
                  },
                  {
                    text: 'Nombre Empresa: '+this.nombreEmpresa,
                    bold: true,
                    margin: [0, 80, 0, 10]
                  },
                  {
                    text: 'Nit Empresa: '+this.nitEmpresa,
                    margin: [0, 0, 0, 10]
                  },
                  {
                    text: 'Codigo acta: ' ,
                    margin: [0, 0, 0, 10]
                  },
                  {
                    text: 'Fecha: '+resSolicitudBajasActivos.fecha,
                    margin: [0, 0, 0, 10]
                  },
                  {
                    text: 'Solicito: '+resSolicitudBajasActivos.idUsuario.nombre+' '+resSolicitudBajasActivos.idUsuario.apellido,
                    margin: [0, 0, 0, 20]
                  },
                  {
                    text: 'ARTICULOS DE BAJA',
                    bold: true,
                    fontSize: 20,
                    alignment: 'center',
                    margin: [0, 0]
                  },
                  {
                    table: {
                      widths: ['*', '*', '*', '*', '*', 20],
                      body: [
                        [
                          'Activo',
                          'Serial',
                          'Placa',
                          'Marca',
                          'Estado',
                          'Observacion',
                        ],
                      ]
                    },
                    margin: [0, 0],

                  },
                  {
                    table: {
                      widths: ['*', '*', '*', '*', '*', 20],
                      body: body
                    },
                    margin: [0, 0]
                  },
                  {
                    table: {
                      widths: ['*', '*'],
                      heights: 30,
                      body: [
                        [
                          '',
                          ''
                        ],
                      ]
                    },
                    margin: [0, -15, 0, 2],
                  },
                  // {
                  //   text: 'Autorizo',
                  //   margin: [100, 5, 0, 0],
                  //   fontSize: 10
                  // },
                  // {
                  //   text: 'Confirmo',
                  //   margin: [370, -28, 0, 0],
                  //   fontSize: 10
                  // },
                ]
              }
              const pdf = pdfMake.createPdf(pdfDefinition);
              pdf.open();
            })
          })
        })
      })
    })
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  name = 'listaActasBajas.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('actasBajas');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }


}
