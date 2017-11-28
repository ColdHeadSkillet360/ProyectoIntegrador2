using CIVY.DATOS;
using CIVY.MODELOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.NEGOCIOS
{
    public class ProductoNegocio
    {

        private ProductoDatos productoDatos;

        public ProductoNegocio()
        {
            productoDatos = new ProductoDatos();
        }

        public List<TipoProducto> ListarTipoProducto()
        {
            return productoDatos.ListarTipoProducto();
        }

        public List<Producto> ListarEstado()
        {
            return productoDatos.ListarEstado();
        }

        public List<ProServ> BuscarProducto(string descripcion, int tipoproducto)
        {


            return productoDatos.BuscarProducto(descripcion, tipoproducto);
        }
        public List<ProServ> BuscarServicio(string descripcion, int tipoproducto)
        {

            return productoDatos.BuscarServicio(descripcion, tipoproducto);
        }


        public List<Servicio> ObtenerServicios(int id_servicio)
        {
            return productoDatos.ObtenerServicios(id_servicio);
        }
        public List<Producto> ObtenerProductos(int id_productos)
        {
            return productoDatos.ObtenerProductos(id_productos);
        }


        public bool RegistrarProducto(Producto modelo)
        {
            var user = productoDatos.RegistrarProducto(modelo);
            return user;
        }
        public bool RegistrarServicio(Servicio modelo)
        {
            var user = productoDatos.RegistrarServicio(modelo);
            return user;
        }


        public bool EditarProducto(Producto modelo)
        {
            var user = productoDatos.EditarProducto(modelo);
            return user;
        }
        public bool EditarServicios(Servicio modelo)
        {
            var user = productoDatos.EditarServicios(modelo);
            return user;
        }



        public bool EliminarProductoServicio(ProServ modelo)
        {
            return productoDatos.EliminarProductoServicio(modelo);
        }
        public bool EliminarProducto(Producto modelo)
        {
            var user = productoDatos.EliminarProducto(modelo);
            return user;
        }


       

      

     





    }
}
