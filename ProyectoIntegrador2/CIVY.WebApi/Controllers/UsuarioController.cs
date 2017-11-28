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
   [EnableCors(origins:"*", headers:"*",methods:"*")]
    public class UsuarioController : ApiController
    {
        private UsuarioNegocio usuarioNegocio;

        public UsuarioController()
        {
            usuarioNegocio = new UsuarioNegocio();
        }

        [HttpGet]
        public string UsuarioEndPoint()
        {
            return "Soy el nuevo endpoint";
        }

        [HttpGet]
        public List<Usuario> ListarUsuario() {
            return usuarioNegocio.ListarUsuarios();
        }

        [HttpPost]
        public Usuario Login(UsuarioViewModel modelo)
        {
            Usuario user = usuarioNegocio.Login(modelo.usuario, modelo.contrasena);
            return user;
        }
    }
}
