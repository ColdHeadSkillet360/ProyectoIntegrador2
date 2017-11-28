using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
    public class Usuario
    {
        public int id_usuario { get; set; }
        public string usuario { get; set; }
        public string contrasena { get; set; }
        public bool bloqueo { get; set; }
        public int numero_intentos { get; set; }
        public int id_rol { get; set; }
        public string descripcion_rol { get; set; }
    }
}
