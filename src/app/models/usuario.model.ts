export class UsuarioModel {
    id?: number;
    nombres: string;
	apellidos: string;
	cedula: string; 
	correo: string;
	telefono: string;
}

export interface ResponseMessageModel {
    status: number,
    descripcion: string,
    usuario?: UsuarioModel
}