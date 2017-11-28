using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using CIVY.NEGOCIOS;
using CIVY.MODELOS;

namespace CIVY.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class VehiculoController : ApiController
    {
        private VehiculoNegocio vehiculoNegocio;

        public VehiculoController()
        {
            vehiculoNegocio = new VehiculoNegocio();
        }

        [HttpGet]
        public List<Vehiculo> BuscarVehiculo(int id_empleado, string descripcion)
        {
            return vehiculoNegocio.BuscarVehiculo(id_empleado, descripcion);
        }

        /*[HttpGet]
        public List<Vehiculo> ListarEstado()
        {
            return vehiculoNegocio.ListarEstado();
        }

        [HttpGet]
        public List<Vehiculo> ObtenerVehiculo(int id_vehiculo)
        {
            return vehiculoNegocio.ObtenerVehiculo(id_vehiculo);
        }
        [HttpPost]
        public bool RegistrarVehiculo(Vehiculo cli)
        {
            return vehiculoNegocio.RegistrarVehiculo(cli);
        }

        [HttpPost]
        public bool EditarVehiculo(Vehiculo ve)
        {
            return vehiculoNegocio.EditarVehiculo(ve);
        }

        [HttpPost]
        public bool EliminarCliente(Vehiculo ve)
        {
            return vehiculoNegocio.EliminarVehiculo(ve);
        }


        }*/

    }
}
