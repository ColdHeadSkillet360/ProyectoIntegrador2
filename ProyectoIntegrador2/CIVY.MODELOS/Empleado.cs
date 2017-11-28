using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
    public class Empleado
    {
        public int id_empleado { get; set; }
        public string nombres { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string dni { get; set; }
        public string sexo { get; set; }
        public string departamento { get; set; }
        public string provincia { get; set; }
        public string distrito { get; set; }
        public string direccion { get; set; }
        public string email { get; set; }
        public string estado_civil { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string fecha_nacimiento { get; set; }
        public Byte[] foto { get; set; }
        public int id_estado { get; set; }
        public int id_tipo_empleado { get; set; }
        public string tipo_empleado { get; set; }
        public string estado_descripcion { get; set; }

    }
}
