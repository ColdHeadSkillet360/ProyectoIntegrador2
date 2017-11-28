using CIVY.MODELOS;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIVY.DATOS
{
    public class ProductoDatos
    {

        SqlConnection conexion = new SqlConnection();
        //string cadenaConexion = @"server=.;database=DB_A2CC24_CIVY; Integrated Security= true;MultipleActiveResultSets=True";
        //string cadenaConexion = @"Data Source=SQL7001.site4now.net;Initial Catalog=DB_A2CC24_CIVY;User Id=DB_A2CC24_CIVY_admin;Password=Cibertec2017;";
        string cadenaConexion = ConfigurationManager.ConnectionStrings["DB_A2CC24_CIVY"].ConnectionString;

        public ProductoDatos()
        {
            conexion = new SqlConnection(cadenaConexion);
        }

        public List<TipoProducto> ListarTipoProducto()
        {
            //Devolveremos un listado.
            List<TipoProducto> Listado = null;
            TipoProducto Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_tipo_producto,descripcion FROM Tipo_Producto";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<TipoProducto>();
                while (lector.Read())
                {
                    Entidad = new TipoProducto();
                    Entidad.id_tipo_producto = int.Parse(lector["id_tipo_producto"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Listado.Add(Entidad);
                }
            }
            //Despues, cerramos la conexion!
            conexion.Close();

            //Retorna el listao lleno de datos
            return Listado;
        }



        public List<Producto> ListarEstado()
        {
            List<Producto> Listado = null;
            Producto Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_estado, estado FROM Estados";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Producto>();
                while (lector.Read())
                {
                    Entidad = new Producto();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.estado_descripcion = lector["estado"].ToString();
                    Listado.Add(Entidad);
                }
            }
            //Despues, cerramos la conexion!
            conexion.Close();

            //Retorna el listao lleno de datos
            return Listado;
        }
        /*   public List<Producto> BuscarProducto(string descripcion, int tipoproducto)
           {
               List<Producto> Listado = null;
               Producto Entidad = null;
               SqlDataReader lector;

               conexion.Open();

               string query = "Sp_Buscar_Producto";

               SqlCommand comando = new SqlCommand(query, conexion);
               comando.CommandType = CommandType.StoredProcedure;
               if (descripcion == null || descripcion == "")
               {
                   comando.Parameters.AddWithValue("@descripcion", DBNull.Value);
               }
               else
               {
                   comando.Parameters.AddWithValue("@descripcion", descripcion);
               }


               comando.Parameters.AddWithValue("@id_tipoproducto", tipoproducto);
               lector = comando.ExecuteReader();

               if (lector.HasRows)
               {
                   Listado = new List<Producto>();
                   while (lector.Read())
                   {
                       Entidad = new Producto();
                       Entidad.id_productos = int.Parse(lector["id_productos"].ToString());
                       Entidad.descripcion = lector["descripcion"].ToString();
                       Entidad.marca = lector["marca"].ToString();
                       Entidad.modelo = lector["modelo"].ToString();
                       Entidad.stock = lector["stock"].ToString();
                       Entidad.unidad_medida = lector["unidad_medida"].ToString();
                       Entidad.precio = double.Parse(lector["precio"].ToString());
                       Entidad.codigo = lector["codigo"].ToString();
                       Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                       Entidad.id_tipo_producto = int.Parse(lector["id_tipo_producto"].ToString());

                       Entidad.tipo_producto = lector["tipo_producto"].ToString();
                       Entidad.estado_descripcion = lector["estado_descripcion"].ToString();
                       Listado.Add(Entidad);
                   }
               }

               conexion.Close();
               return Listado;
           }*/

          public List<ProServ> BuscarProducto(string descripcion, int tipoproducto)
  {
      List<ProServ> Listado = null;
            ProServ Entidad = null;
      SqlDataReader lector;

      conexion.Open();

      string query = "Sp_Buscar_Producto";

      SqlCommand comando = new SqlCommand(query, conexion);
      comando.CommandType = CommandType.StoredProcedure;
      if (descripcion == null || descripcion == "")
      {
          comando.Parameters.AddWithValue("@descripcion", DBNull.Value);
      }
      else
      {
          comando.Parameters.AddWithValue("@descripcion", descripcion);
      }


      comando.Parameters.AddWithValue("@id_tipoproducto", tipoproducto);
      lector = comando.ExecuteReader();

      if (lector.HasRows)
      {
          Listado = new List<ProServ>();
          while (lector.Read())
          {
              Entidad = new ProServ();
              Entidad.id_proserv = int.Parse(lector["id_productos"].ToString());
              Entidad.descripcion = lector["descripcion"].ToString();
              Entidad.marca = lector["marca"].ToString();
              Entidad.modelo = lector["modelo"].ToString();
              Entidad.stock = lector["stock"].ToString();
              Entidad.unidad_medida = lector["unidad_medida"].ToString();
              Entidad.precio = double.Parse(lector["precio"].ToString());
              Entidad.codigo = lector["codigo"].ToString();
              Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
              Entidad.id_tipo_producto = int.Parse(lector["id_tipo_producto"].ToString());

              Entidad.tipo_producto = lector["tipo_producto"].ToString();
              Entidad.estado_descripcion = lector["estado_descripcion"].ToString();
              Listado.Add(Entidad);
          }
      }

      conexion.Close();
      return Listado;
  }

        public List<ProServ> BuscarServicio(string descripcion, int tipoproducto)
        {
            List<ProServ> Listado = null;
            ProServ Entidad = null;
            SqlDataReader lector;

            conexion.Open();

            string query = "Sp_Buscar_Servicio";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            if (descripcion == null || descripcion == "")
            {
                comando.Parameters.AddWithValue("@descripcion", DBNull.Value);
            }
            else
            {
                comando.Parameters.AddWithValue("@descripcion", descripcion);
            }


            comando.Parameters.AddWithValue("@id_tipoproducto", tipoproducto);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<ProServ>();
                while (lector.Read())
                {
                    Entidad = new ProServ();
                    Entidad.id_proserv = int.Parse(lector["ID_Servicios"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Entidad.precio = double.Parse(lector["precio"].ToString());
                    Entidad.codigo = lector["codigo"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_producto = int.Parse(lector["id_tipo_producto"].ToString());

                    Entidad.tipo_producto = lector["tipo_producto"].ToString();
                    Entidad.estado_descripcion = lector["estado_descripcion"].ToString();
                    Listado.Add(Entidad);
                }
            }

            conexion.Close();
            return Listado;
        }

        public bool RegistrarProducto(Producto producto)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Registrar_Producto";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@descripcion", producto.descripcion);
            comando.Parameters.AddWithValue("@marca", producto.marca);
            comando.Parameters.AddWithValue("@modelo", producto.modelo);
            comando.Parameters.AddWithValue("@stock", producto.stock);
            comando.Parameters.AddWithValue("@unidad_medida", producto.unidad_medida);
            comando.Parameters.AddWithValue("@id_tipo_producto", producto.id_tipo_producto);
            comando.Parameters.AddWithValue("@precio", producto.precio);
            comando.Parameters.AddWithValue("@codigo", producto.codigo);

            int_numero_registro = comando.ExecuteNonQuery();

            if (int_numero_registro > 0)
            {
                bol_resultado_operacion = true;
            }
            else
            {
                bol_resultado_operacion = false;
            }

            conexion.Close();
            return bol_resultado_operacion;
        }

        public bool RegistrarServicio(Servicio servicio)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Registrar_Servicio";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@descripcion", servicio.descripcion);
            comando.Parameters.AddWithValue("@id_tipo_producto", servicio.id_tipo_producto);
            comando.Parameters.AddWithValue("@precio", servicio.precio);
            comando.Parameters.AddWithValue("@codigo", servicio.codigo);

            int_numero_registro = comando.ExecuteNonQuery();

            if (int_numero_registro > 0)
            {
                bol_resultado_operacion = true;
            }
            else
            {
                bol_resultado_operacion = false;
            }

            conexion.Close();
            return bol_resultado_operacion;
        }








        public List<Producto> ObtenerProductos(int id_productos)
        {
            List<Producto> Listado = null;
            Producto Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Obtener_Producto";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@id_productos", id_productos);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Producto>();
                while (lector.Read())
                {
                    Entidad = new Producto();
                    Entidad.id_productos = int.Parse(lector["id_productos"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Entidad.marca = lector["marca"].ToString();
                    Entidad.modelo = lector["modelo"].ToString();
                    Entidad.stock = lector["stock"].ToString();
                    Entidad.unidad_medida = lector["unidad_medida"].ToString();
                    Entidad.id_tipo_producto = int.Parse(lector["id_tipo_producto"].ToString());
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.precio = double.Parse(lector["precio"].ToString());
                    Entidad.codigo = lector["codigo"].ToString();
                

                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }


        public List<Servicio> ObtenerServicios(int id_Servicio)
        {
            List<Servicio> Listado = null;
            Servicio Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Obtener_Servicios";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@ID_Servicios", id_Servicio);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Servicio>();
                while (lector.Read())
                {
                    Entidad = new Servicio();
                    Entidad.id_proserv = int.Parse(lector["ID_Servicios"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Entidad.id_tipo_producto = int.Parse(lector["id_tipo_producto"].ToString());
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.precio = double.Parse(lector["precio"].ToString());
                    Entidad.codigo = lector["codigo"].ToString();


                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }

        public bool EditarProducto(Producto producto)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Editar_Producto";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_productos", producto.id_proserv);
            comando.Parameters.AddWithValue("@descripcion", producto.descripcion);
            comando.Parameters.AddWithValue("@marca", producto.marca);
            comando.Parameters.AddWithValue("@modelo", producto.modelo);
            comando.Parameters.AddWithValue("@stock", producto.stock);
            comando.Parameters.AddWithValue("@unidad_medida", producto.unidad_medida);
            comando.Parameters.AddWithValue("@precio", producto.precio);
            comando.Parameters.AddWithValue("@id_tipo_producto", producto.id_tipo_producto);
            comando.Parameters.AddWithValue("@codigo", producto.codigo);



            int_numero_registro = comando.ExecuteNonQuery();

            if (int_numero_registro > 0)
            {
                bol_resultado_operacion = true;
            }
            else
            {
                bol_resultado_operacion = false;
            }

            conexion.Close();
            return bol_resultado_operacion;
        }

        public bool EditarServicios(Servicio servicio)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Editar_Servicio";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@ID_Servicios", servicio.id_proserv);
            comando.Parameters.AddWithValue("@descripcion", servicio.descripcion);
            comando.Parameters.AddWithValue("@precio", servicio.precio);
            comando.Parameters.AddWithValue("@id_tipo_producto", servicio.id_tipo_producto);
            comando.Parameters.AddWithValue("@codigo", servicio.codigo);



            int_numero_registro = comando.ExecuteNonQuery();

            if (int_numero_registro > 0)
            {
                bol_resultado_operacion = true;
            }
            else
            {
                bol_resultado_operacion = false;
            }

            conexion.Close();
            return bol_resultado_operacion;
        }

        public bool EliminarProducto(Producto producto)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Eliminar_Producto";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_productos", producto.id_productos);

            int_numero_registro = comando.ExecuteNonQuery();

            if (int_numero_registro > 0)
            {
                bol_resultado_operacion = true;
            }
            else
            {
                bol_resultado_operacion = false;
            }

            conexion.Close();
            return bol_resultado_operacion;
        }

        public bool EliminarProductoServicio(ProServ producto)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Eliminar_ProductoServicio";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_productos", producto.id_proserv);
            comando.Parameters.AddWithValue("@tipo_producto", producto.tipo_producto);

            int_numero_registro = comando.ExecuteNonQuery();

            if (int_numero_registro > 0)
            {
                bol_resultado_operacion = true;
            }
            else
            {
                bol_resultado_operacion = false;
            }

            conexion.Close();
            return bol_resultado_operacion;
        }


    }


}
