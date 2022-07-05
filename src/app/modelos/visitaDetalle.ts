import { OpcionesVisita } from 'src/app/modelos/opcionesVisita';
import { Visitas } from 'src/app/modelos/visitas';
import { ElementosVisita } from 'src/app/modelos/elementosVisita';


export class VisitaDetalle {
    public id: number=0;
    public descripcion: string="";
    idVisitas !: Visitas
    idOpcionesVisita !: OpcionesVisita
    idElementosVisita !: ElementosVisita;
    public ideSitioventa: number=0;
    public nomSitioventa: string="";
}
