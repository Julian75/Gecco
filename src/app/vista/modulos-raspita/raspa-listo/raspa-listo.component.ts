import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RaspasDTOService } from 'src/app/servicios/serviciosSiga/raspasDTO.service';
import { RaspasService } from 'src/app/servicios/raspas.service';

@Component({
  selector: 'app-raspa-listo',
  templateUrl: './raspa-listo.component.html',
  styleUrls: ['./raspa-listo.component.css']
})
export class RaspaListoComponent implements OnInit {
  public formRaspita!: FormGroup;
  public listarEstado: any = [];
  public listaJerarquia: any = [];
  public fecha: Date = new Date();
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public servicioRaspasDTO: RaspasDTOService,
    public servicioRaspaGecco: RaspasService,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formRaspita = this.fb.group({
      id: 0,
      raspita: [null,Validators.required],
    });
  }

  public guardarRaspa(even:Event, key:any){
    if(key == 'Enter'){
      var fechaActual = ""
      const codRaspa = this.formRaspita.controls['raspita'].value;
      if(this.fecha.getMonth()+1<=9){
        fechaActual = this.fecha.getFullYear()+""+("0"+(this.fecha.getMonth()+1))+""+this.fecha.getDate()
      }else{
        fechaActual = this.fecha.getFullYear()+""+(this.fecha.getMonth()+1)+""+this.fecha.getDate()
      }

      this.servicioRaspasDTO.listarPorId(fechaActual, codRaspa).subscribe(resRaspaDTo=>{
        console.log(resRaspaDTo)
      })

    }
  }

  public reporte() {
  }

}
