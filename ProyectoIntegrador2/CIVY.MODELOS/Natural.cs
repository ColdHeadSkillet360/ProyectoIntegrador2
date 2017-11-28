using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
    public class Natural
    {
        public int id_cliente { get; set; }
        public int id_natural { get; set; }
        public string nombre { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string dni { get; set; }
        public string sexo { get; set; }
        public string email { get; set; }
        public string direccion { get; set; }
        public string referencia { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public int id_estado { get; set; }
        public int id_tipo_cliente { get; set; }
        public string estado_descripcion { get; set; }
        public string tipo_cliente { get; set; }
        public string autocomplete { get; set; }
    }

}
