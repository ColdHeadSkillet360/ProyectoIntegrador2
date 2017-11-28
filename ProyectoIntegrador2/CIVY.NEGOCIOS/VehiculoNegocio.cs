using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CIVY.DATOS;
using CIVY.MODELOS;

namespace CIVY.NEGOCIOS
{
    public class VehiculoNegocio
    {
        private VehiculoDatos vehiculoDatos;

        public VehiculoNegocio()
        {

            vehiculoDatos = new VehiculoDatos();

        }
        public List<Vehiculo> BuscarVehiculo(int id_empleado, string descripcion)
        {
            var nueva_descripcion = (descripcion == null || descripcion == "null" || descripcion == "undefined") ? "" : descripcion;
            return vehiculoDatos.BuscarVehiculo(id_empleado, nueva_descripcion);
        }
        /*  public List<Vehiculo> ListarEstado()
          {
              return vehiculoDatos.ListarEstado();
          }
          public List<Vehiculo> ObtenerVehiculo(int id_vehiculo)
          {
              return vehiculoDatos.ObtenerVehiculo(id_vehiculo);
          }
          public bool RegistrarVehiculo(Vehiculo ve)
          {

              var aux = vehiculoDatos.RegistrarVehiculo(ve);
              return aux;


          }

          public bool EliminarVehiculo(Vehiculo ve)
          {
              var user = vehiculoDatos.EliminarVehiculo(ve);
              return user;
          }


          public bool EditarVehiculo(Vehiculo vehi)
          {
              var user = vehiculoDatos.EditarVehiculo(vehi);
              return user;
          }*/
    }


}
