export interface Comun {

    id_cliente: number;
    filtro_descripcion_cliente: string;

    //COMUN:
    email: string;
    direccion: string;
    referencia: string;
    id_tipo_cliente: number;
    tipo_cliente: string;
    id_estado: number;
    estado_descripcion: string;

    autocomplete: string;
    
    //NATURAL:
    nombre: string;
    ape_paterno: string;
    ape_materno: string;
    dni: string;
    sexo: string;
    telefono: string;
    celular: string;

    //JURIDICO:
    razonSocial: string;
    nComercial: string;
    ruc: string;
    telefono1: string;
    telefono2: string;
}