using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
    public class CotizacionDetalle
    {
        public int id_cotizacion_venta_detalle { get; set; }
        public int id_cotizacion_venta { get; set; }
        public int id_productos { get; set; }
        public string descripcion_pro { get; set; }
        public int id_servicios { get; set; }
        public string descripcion_ser { get; set; }
        public string unidad_medida { get; set; }
        public string cantidad { get; set; }


        public string descripcion_pro_ser { get; set; }
        public string codigo { get; set; }
        public string precio { get; set; }
    }
}
