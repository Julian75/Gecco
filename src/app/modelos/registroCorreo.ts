import { Usuario } from './usuario';
export class RegistroCorreo{
    public id: number=0;
    public fecha: Date=new Date();
    public registro: string="";
    public idUsuario !: Usuario;
}
