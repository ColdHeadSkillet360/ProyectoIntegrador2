using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.MODELOS
{
    public class Vehiculo
    {
        public int id_vehiculo { get; set; }
        public string placa_vehi { get; set; }
        public string marca_vehiculo { get; set; }
        public int capaMaxima_vehi { get; set; }
        public string vencSoat { get; set; }
        public string modelo_vehi { get; set; }
        public int id_estado { get; set; }
        public string estado_descripcion { get; set; }    
        public int id_empleado { get; set; }
}
}
