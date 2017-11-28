export interface Empleado {
    id_empleado: number;
    filtro_descripcion: string;
    nombres: string;
    ape_paterno: string;
    ape_materno: string;
    dni: string;
    sexo: string;

    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;

    direccion_completa: string;

    email: string;
    estado_civil: string;
    telefono: string;
    celular: string;
    fecha_nacimiento: string;
    foto: ImageData;
    id_estado: number;
    id_tipo_empleado: number;

    tipo_empleado: string;
    estado_descripcion: string;

}
