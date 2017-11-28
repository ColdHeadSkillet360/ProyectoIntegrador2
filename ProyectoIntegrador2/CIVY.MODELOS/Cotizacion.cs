using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
    public class Cotizacion
    {
        public int id_cotizacion_venta { get; set; }
        public string f_fecha_emision { get; set; }
        public string n_nro_serie { get; set; }
        public string t_nro_documento { get; set; }
        public string f_fecha_vencimiento { get; set; }
        public string t_observacion { get; set; }
        public string t_condicion { get; set; }
        public int id_juridico { get; set; }
        public int id_natural { get; set; }
        public string t_moneda { get; set; }
        public int id_formapago { get; set; }
        public decimal n_tasas { get; set; }
        public decimal n_IGV { get; set; }
        public decimal n_SubTotal { get; set; }
        public decimal n_Total { get; set; }
        public int id_estado_documento { get; set; }
        public string descripcion_registro { get; set; }
        public string dni_ruc { get; set; }
        public string descripcion_estadodocumento { get; set; }
        public string descripcion_formapago { get; set; }
        public string ID_Ordenes { get; set; }
    }
}
