import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {
  public formComentario!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  public guardar(){

  }

}
