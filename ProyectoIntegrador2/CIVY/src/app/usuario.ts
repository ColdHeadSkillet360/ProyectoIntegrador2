export interface Usuario {
    usuario: string;
    contrasena: string;
    bloqueo: boolean;
    numero_intentos: number;
    id_rol: number;
    descripcion_rol: string;
    
}
