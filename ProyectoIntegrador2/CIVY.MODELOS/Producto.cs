using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
   public class Producto
    {

        public int id_proserv { get; set; }
        public int    id_productos { get; set; }
        public string descripcion { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public string stock { get; set; }
        public string unidad_medida { get; set; }
        public double precio { get; set; }
        public string codigo { get; set; }
        public int    id_estado { get; set; }
        public int    id_tipo_producto { get; set; }
        public string estado_descripcion { get; set; }
        public string tipo_producto { get; set; }



    }
}
