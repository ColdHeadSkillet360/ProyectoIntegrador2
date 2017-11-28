using CIVY.MODELOS;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System;

namespace CIVY.DATOS
{
    public class VehiculoDatos
    {
        SqlConnection conexion = new SqlConnection();
        //string cadenaConexion = @"server=.;database=BD_CIVY; Integrated Security= true;MultipleActiveResultSets=True";
        //string cadenaConexion = @"Data Source=SQL7001.site4now.net;Initial Catalog=DB_A2CC24_CIVY;User Id=DB_A2CC24_CIVY_admin;Password=Cibertec2017;";
        string cadenaConexion = ConfigurationManager.ConnectionStrings["DB_A2CC24_CIVY"].ConnectionString;
        public VehiculoDatos()
        {
            conexion = new SqlConnection(cadenaConexion);
        }

        public List<Vehiculo> BuscarVehiculo(int id_empleado, string descripcion)
        {
            List<Vehiculo> Listado = null;
            Vehiculo Entidad = null;
            SqlDataReader lector;

            conexion.Open();

            string query = "SP_BUSCAR_VEHICULO";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            if (id_empleado == 0 && descripcion =="")
            {
                comando.Parameters.AddWithValue("@id_transportista", DBNull.Value);
                comando.Parameters.AddWithValue("@descripcion", DBNull.Value);
            }
            else if(id_empleado != 0 && descripcion == "")
            {
                comando.Parameters.AddWithValue("@id_transportista", id_empleado);
                comando.Parameters.AddWithValue("@descripcion", DBNull.Value);
            }
            else if (id_empleado == 0 && descripcion != "")
            {
                comando.Parameters.AddWithValue("@id_transportista", DBNull.Value);
                comando.Parameters.AddWithValue("@descripcion", descripcion);
            }else
            {
                comando.Parameters.AddWithValue("@id_transportista", id_empleado);
                comando.Parameters.AddWithValue("@descripcion", descripcion);
            }

            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Vehiculo>();
                while (lector.Read())
                {
                    Entidad = new Vehiculo();
                    
                    Entidad.id_vehiculo = int.Parse(lector["id_vehiculo"].ToString());
                    Entidad.placa_vehi = lector["placa_vehi"].ToString();
                    Entidad.marca_vehiculo = lector["marca_vehiculo"].ToString();
                    Entidad.capaMaxima_vehi = int.Parse(lector["capaMaxima_vehi"].ToString());
                    Entidad.vencSoat = lector["vencSoat"].ToString();
                    Entidad.modelo_vehi = lector["modelo_vehi"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.estado_descripcion = lector["estado_descripcion"].ToString();
                    Entidad.id_empleado = int.Parse(lector["id_empleado"].ToString());
                    Listado.Add(Entidad);
                }
            }

            conexion.Close();
            return Listado;
        }

        /*public List<Vehiculo> ObtenerVehiculo(int id_vehiculo)
        {
            List<Vehiculo> Listado = null;
            Vehiculo Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Obtener_Vehiculo";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@id_vehiculo", id_vehiculo);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Vehiculo>();
                while (lector.Read())
                {
                    Entidad = new Vehiculo();
                    Entidad.id_vehiculo = int.Parse(lector["id_vehiculo"].ToString());
                    Entidad.placa_vehi = lector["placa_vehi"].ToString();
                    Entidad.marca_vehiculo = lector["marca_vehiculo"].ToString();
                    Entidad.capaMaxima_vehi = int.Parse(lector["capaMaxima_vehi"].ToString());
                    Entidad.vencSoat = lector["vencSoat"].ToString();
                    Entidad.modelo_vehi = lector["modelo_vehi"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.estado_descripcion = lector["estado_descripcion"].ToString();
                    Entidad.id_empleado = int.Parse(lector["id_empleado"].ToString());

                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }*/
       /* public List<Vehiculo> ListarEstado()
        {
            List<Vehiculo> Listado = null;
            Vehiculo Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_estado, estado FROM Estados";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Vehiculo>();
                while (lector.Read())
                {
                    Entidad = new Vehiculo();
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

       public bool RegistrarVehiculo(Vehiculo vehiculo)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Registrar_Vehiculo";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@placa_vehiculo", vehiculo.placa);
            comando.Parameters.AddWithValue("@marca_vehiculo", vehiculo.marca);
            comando.Parameters.AddWithValue("@capaMaxima_vehi", vehiculo.capa_maxima);
            comando.Parameters.AddWithValue("@vencSoat", vehiculo.Venc_SOAT);
            comando.Parameters.AddWithValue("@modelo_vehi", vehiculo.modelo);
        

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

        public bool EditarVehiculo(Vehiculo vehiculo)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Editar_Vehiculo";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_natural", vehiculo.id_vehiculo);
            comando.Parameters.AddWithValue("@placa_vehiculo", vehiculo.placa);
            comando.Parameters.AddWithValue("@marca_vehiculo", vehiculo.marca);
            comando.Parameters.AddWithValue("@capaMaxima_vehi", vehiculo.capa_maxima);
            comando.Parameters.AddWithValue("@vencSoat", vehiculo.Venc_SOAT);
            comando.Parameters.AddWithValue("@modelo_vehi", vehiculo.modelo);


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
        public bool EliminarVehiculo(Vehiculo vehiculo)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Elimina_Vehiculo";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_vehiculo", vehiculo.id_vehiculo);

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
        }*/


    }
}
