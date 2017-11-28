using CIVY.MODELOS;
using CIVY.NEGOCIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CIVY.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductoController : ApiController
    {

        //EMPLEADO MODELO
        private ProductoNegocio productoNegocio;

        // constructor  
        public ProductoController()
        {
            productoNegocio = new ProductoNegocio();
        }

        [HttpGet]
        public List<TipoProducto> ListarTipoProducto()
        {
            return productoNegocio.ListarTipoProducto();
        }

        [HttpGet]
        public List<Producto> ListarEstado()
        {
            return productoNegocio.ListarEstado();
        }

        [HttpGet]
        public List<ProServ> BuscarProducto(string descripcion, int tipoproducto)
        {
            return productoNegocio.BuscarProducto(descripcion, tipoproducto);
        }
        [HttpGet]
        public List<ProServ> BuscarServicio(string descripcion, int tipoproducto)
        {
            return productoNegocio.BuscarServicio(descripcion, tipoproducto);
        }



        [HttpGet]
        public List<Producto> ObtenerProductos(int id_productos)
        {
            return productoNegocio.ObtenerProductos(id_productos);
        }
        [HttpGet]
        public List<Servicio> ObtenerServicios(int id_servicio)
        {
            return productoNegocio.ObtenerServicios(id_servicio);
        }



        [HttpPost]
        public bool RegistrarProducto(Producto modelo)
        {
            return productoNegocio.RegistrarProducto(modelo);
        }
        [HttpPost]
        public bool RegistrarServicio(Servicio modelo)
        {
            return productoNegocio.RegistrarServicio(modelo);
        }



        [HttpPost]
        public bool EditarProducto(Producto modelo)
        {
            return productoNegocio.EditarProducto(modelo);
        }
        [HttpPost]
        public bool EditarServicios(Servicio modelo)
        {
            return productoNegocio.EditarServicios(modelo);
        }

        [HttpPost]
        public bool EliminarProducto(ProServ modelo)
        {
            return productoNegocio.EliminarProductoServicio(modelo);
        }

    }
}