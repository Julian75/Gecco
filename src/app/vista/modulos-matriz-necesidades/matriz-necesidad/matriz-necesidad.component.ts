import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { TipoNecesidadService } from 'src/app/servicios/tipoNecesidad.service';

@Component({
  selector: 'app-matriz-necesidad',
  templateUrl: './matriz-necesidad.component.html',
  styleUrls: ['./matriz-necesidad.component.css']
})
export class MatrizNecesidadComponent implements OnInit {

  public formMatrizNecesidad!: FormGroup;
  color = ('primary');
  public listaSubprocesos: any = [];
  public listaNecesidades: any = [];

  constructor(
    private servicioSubProceso: SubProcesoService,
    private servicioTipoNecesidades: TipoNecesidadService,
  ) { }

  ngOnInit(): void {
    this.listarSubProcesos();
    this.listarTipoNecesidades();
  }

  public listarSubProcesos() {
    this.servicioSubProceso.listarTodos().subscribe(resSubProceso => {
      this.listaSubprocesos = resSubProceso
    });
  }

  public listarTipoNecesidades() {
    this.servicioTipoNecesidades.listarTodos().subscribe(resTipoNecesidades => {
      this.listaNecesidades = resTipoNecesidades
    });
  }

  compareFunction(o1: any, o2: any) {
    return o1.id === o2.id;
  }

}
