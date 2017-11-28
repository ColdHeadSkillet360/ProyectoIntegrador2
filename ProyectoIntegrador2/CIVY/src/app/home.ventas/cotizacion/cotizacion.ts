export interface Cotizacion {
    id_cotizacion_venta: number;
    f_fecha_emision: string;
    n_nro_serie: string;
    t_nro_documento: string;
    f_fecha_vencimiento: string;
    t_observacion: string;
    t_condicion: string;
    id_juridico: number;

    id_cliente: number;

    id_natural: number;
    t_direccion_cliente: string;
    t_moneda: string;
    id_formapago: number;
    n_tasas: number;
    n_IGV: number;
    n_SubTotal: number;
    n_Total: number;
    id_estado_documento: number;
}