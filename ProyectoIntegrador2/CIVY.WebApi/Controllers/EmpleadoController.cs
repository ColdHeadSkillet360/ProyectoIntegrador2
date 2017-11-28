using CIVY.MODELOS;
using CIVY.NEGOCIOS;
using CIVY.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CIVY.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpleadoController : ApiController
    {
        //EMPLEADO MODELO
        private EmpleadoNegocio empleadoNegocio;
        
        // constructor  
        public EmpleadoController()
        {
            empleadoNegocio = new EmpleadoNegocio(); 
        }

        [HttpGet]
        public List<TipoEmpleado> ListarTipoEmpleado()
        {
            return empleadoNegocio.ListarTipoEmpleado();
        }

        [HttpGet]
        public List<Empleado> ListarEstado()
        {
            return empleadoNegocio.ListarEstado();
        }

        [HttpGet]
        public List<Empleado> BuscarEmpleado(string descripcion, int tipoempleado)
        {
            return empleadoNegocio.BuscarEmpleado(descripcion, tipoempleado);
        }

        [HttpPost]
        public bool RegistrarEmpleado(Empleado modelo)
        {
            return empleadoNegocio.RegistrarEmpleado(modelo);
        }

        [HttpGet]
        public List<Empleado> ObtenerEmpleado(int id_empleado)
        {
            return empleadoNegocio.ObtenerEmpleado(id_empleado);
        }

        [HttpPost]
        public bool EditarEmpleado(Empleado modelo)
        {
            return empleadoNegocio.EditarEmpleado(modelo);
        }

        [HttpPost]
        public bool EliminarEmpleado(Empleado modelo)
        {
            return empleadoNegocio.EliminarEmpleado(modelo);
        }

    }
}
