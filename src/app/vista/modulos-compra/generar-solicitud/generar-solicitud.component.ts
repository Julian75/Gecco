import { MatTableDataSource } from '@angular/material/table';
import { Observable, startWith, map } from 'rxjs';
import { Articulo } from '../../../modelos/articulo';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-generar-solicitud',
  templateUrl: './generar-solicitud.component.html',
  styleUrls: ['./generar-solicitud.component.css']
})
export class GenerarSolicitudComponent implements OnInit {
  public formSolicitud!: FormGroup;
  public articulos = new FormControl<string | Articulo>("");
  options: Articulo[] = []
  filteredOptions!: Observable<Articulo[]>;
  public seleccionadas!: FormGroup;
  public listaArticulos: any = [];
  public listaArticulo: any = [];
  public articulosDisponibles:any = [];
  public listadoArtSel: any = [];
  public listaRow: any = [];
  public listaR: any = [];
  public listaRo: any = [];
  public listaRow2: any = [];
  public listaRow3: any = [];

  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private servicioArticulo: ArticuloService
  ){}


  ngOnInit(): void {
    this.listarArticulos();
    this.crearFormulario()
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      cantidad: [null,Validators.required],
      observacion: [null,Validators.required],
    });
  }

  public listarArticulos() {
    this.servicioArticulo.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 26){
          this.articulosDisponibles.push(element)
        }
      });
      this.listaArticulos = this.articulosDisponibles
      this.filteredOptions = this.articulos.valueChanges.pipe(
        startWith(""),
        map(value => {
          const descripcion = typeof value == 'string' ? value : value?.descripcion;
          return descripcion ? this._filter(descripcion as string, this.listaArticulos) : this.listaArticulos.slice();
        }),
      );
    });
  }
  public guardar() {
    console.log(this.articulo)
    var encontrado = false
    const listaEncontrado: any = []
    const cantidad = this.formSolicitud.controls['cantidad'].value
    const observacion = this.formSolicitud.controls['observacion'].value
    if(this.articulo == undefined || cantidad == null || observacion == null){
      console.log('nou')
    }else{
      console.log(cantidad, observacion)
      var obj = {
        articulo: this.articulo,
        cantidad: cantidad,
        observacion: observacion
      }
      if(this.listadoArtSel.length<1){
        this.listadoArtSel.push(obj)
      }else if(this.listadoArtSel.length>=1){
        this.listadoArtSel.forEach((element:any) => {
          if(element.articulo.id == obj.articulo.id){
            encontrado = true
          }
          else if(element.articulo.id != obj.articulo.id){
            encontrado = false
          }
          listaEncontrado.push(encontrado)
        });
        const existe = listaEncontrado.includes( true )
        console.log(existe)
        if(existe == false){
          this.listadoArtSel.push(obj)
        }else if(existe == true){
          console.log("ya exuste")
        }
      }
      console.log(this.listadoArtSel)
      this.dataSource = new MatTableDataSource( this.listadoArtSel);
    }
    // let articulo : Articulo = new Articulo();
    // articulo.descripcion=this.formArticulo.controls['descripcion'].value;
    // const idEstado = this.formArticulo.controls['estado'].value;
    // this.servicioEstado.listarPorId(idEstado).subscribe(res => {
    //   articulo.idEstado = res
    //   if(articulo.descripcion==null || articulo.descripcion==""){
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'El campo esta vacio!',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }else{
    //     this.registrarArticulo(articulo);
    //   }
    // })

  }

  // public registrarArticulo(articulo: Articulo) {
    // this.servicioArticulos.registrar(articulo).subscribe(res=>{
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Articulo Registrado!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   this.dialogRef.close();
    //   window.location.reload();

    // }, error => {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Hubo un error al agregar!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
  // });
  // validacion:true;

  // public id!: any;
  textoArticulo:any
  displayFn(articulo: Articulo): any {
    this.textoArticulo = articulo
    if(this.textoArticulo == ""){
      this.textoArticulo = " "
    }else{
      this.textoArticulo = articulo.descripcion
      return this.textoArticulo;
    }
  }

  public _filter(descripcion: string, listaArticulos: any): Articulo[] {

    const filterValue = descripcion.toLowerCase();

    return listaArticulos.filter((listaArticulos:any) => (listaArticulos.descripcion.toLowerCase().includes(filterValue)));
  }

  articulo:any
  capturarArticulo(event:MatAutocompleteSelectedEvent){
    this.articulo = event.option.value
  }
  //   var encontrado = false
  //   const listaEncontrado: any = []
  //   var obj = {
  //     articulo: articulo,
  //     seleccion: event.checked
  //   }
  //   if(this.listaArticulo.length<1){
  //     this.listaArticulo.push(obj)
  //   }else if(this.listaArticulos.length>=1){
  //     this.listaArticulo.forEach((element:any) => {
  //       if(element.articulo.id == obj.articulo.id){
  //         if(element.seleccion == true && obj.seleccion == false){
  //           encontrado = true
  //         }
  //         encontrado = true
  //       }else if(element.articulo.id != obj.articulo.id){
  //         encontrado = false
  //       }
  //       listaEncontrado.push(encontrado)
  //     });
  //     console.log(listaEncontrado)
  //     const existe = listaEncontrado.includes( true )
  //     console.log(existe)
  //     if(existe == false){
  //       this.listaArticulo.push(obj)
  //     }if(existe == true){
  //       this.listaArticulo.splice(this.listaArticulo.indexOf(obj.articulo),1)
  //     }
  //   }
  // }
  displayedColumns: string[] = ['select', 'articulo', 'cantidad', 'observacion'];
  dataSource = new MatTableDataSource<Articulo>();
  selection = new SelectionModel<Articulo>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Articulo): string {
    var encontrado = false
    const listaEncontrado: any = []
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    this.servicioArticulo.listarTodos().subscribe(res=>{
      res.forEach(element => {
        if(element.id == row.id && this.selection.isSelected(row) == true){
          this.listaRo.push(element)
        }
      });
      this.listaR = this.listaRo
    })
    if(this.listaRow.length<1){
      if(this.selection.isSelected(row) == true){
        this.listaR.forEach((element:any) => {
          this.listaRow.push(element)
        });
      }
      this.listaRow2 = this.listaRow
    }else if(this.listaRow.length>=1){
      this.listaRow.forEach((element:any) => {
        this.listaR.forEach((elementR:any) => {
          if(element.articulo.id == elementR.id){
            if(element.seleccion==true && this.selection.isSelected(elementR) == false){
              encontrado = true
            }
            encontrado = true
          }else if(element.articulo.id != elementR.id){
            encontrado = false
          }
        });
        listaEncontrado.push(encontrado)
      });
      const existe = listaEncontrado.includes( true )
      if(existe == false){
        this.listaR.forEach((elementR:any) => {
          this.listaRow.push(elementR)
        });
      }if(existe == true){
        this.listaRow.splice(this.listaArticulo.indexOf(row),1)
      }
      this.listaRow2 = this.listaRow
    }
    this.listaRow3 = this.listaRow2

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1},`+this.selection.isSelected(row)+` estas son: `+row;
  }

  public eliminarArticulo(){
    console.log(this.listaRow3)
  }

  public limpiar(){
    this.listadoArtSel = []
  }

}
