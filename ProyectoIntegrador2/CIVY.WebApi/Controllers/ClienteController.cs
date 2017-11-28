using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using CIVY.MODELOS;
using CIVY.NEGOCIOS;
using System.Web.Http.Cors;

namespace CIVY.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClienteController : ApiController
    {

        //EMPLEADO MODELO
        private ClienteNegocio clienteNegocio;

        // constructor  
        public ClienteController()
        {
            clienteNegocio = new ClienteNegocio();
        }

        [HttpGet]
        public List<TipoCliente> ListarTipoCliente()
        {
            return clienteNegocio.ListarTipoCliente();
        }

        [HttpGet]
        public List<Cliente> BuscarCliente(string descripcion,int tipocliente)
        {
            return clienteNegocio.BuscarCliente(descripcion, tipocliente);
        }

        [HttpPost]
        public bool RegistrarCliente(Natural cli)
        {
            return clienteNegocio.RegistrarCliente(cli);
        }

        [HttpGet]
        public List<Natural> ObtenerCliente(int id_cliente)
        {
            return clienteNegocio.ObtenerCliente(id_cliente);
        }

        [HttpPost]
        public bool EditarCliente(Natural modelo)
        {
            return clienteNegocio.EditarCliente(modelo);
        }

        [HttpPost]
        public bool EliminarCliente(Cliente modelo)
        {
            return clienteNegocio.EliminarCliente(modelo);
        }



        [HttpGet]
        public List<Natural> ListarEstado()
        {
            return clienteNegocio.ListarEstado();
        }

        [HttpGet]
        public List<Natural> AutocompleteCliente()
        {
            return clienteNegocio.AutocompleteCliente();
        }




        [HttpPost]
        public bool RegistrarJuridico(Juridico jur)
        {
            return clienteNegocio.RegistrarJuridico(jur);
        }

        [HttpGet]
        public List<Cliente> BuscarClienteJuridico(string descripcion, int tipocliente)
        {
            return clienteNegocio.BuscarClienteJuridico(descripcion, tipocliente);
        }

        [HttpGet]
        public List<Juridico> ObtenerClienteJuridico(int id_juridico)
        {
            return clienteNegocio.ObtenerClienteJuridico(id_juridico);
        }

        [HttpPost]
        public bool EditarClienteJuridico(Juridico modelo)
        {
            return clienteNegocio.EditarClienteJuridico(modelo);
        }

        [HttpPost]
        public bool EliminarClienteJuridico(Juridico modelo)
        {
            return clienteNegocio.EliminarClienteJuridico(modelo);
        }


    }
}
