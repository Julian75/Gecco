import { OpcionesVisita } from 'src/app/modelos/opcionesVisita';
import { Visitas } from 'src/app/modelos/visitas';
import { ElementosVisita } from 'src/app/modelos/elementosVisita';


export class VisitaDetalle {
    public id: number=0;
    idVisitas !: Visitas
    idOpciones !: OpcionesVisita
    idElementosVisita !: ElementosVisita;

}
