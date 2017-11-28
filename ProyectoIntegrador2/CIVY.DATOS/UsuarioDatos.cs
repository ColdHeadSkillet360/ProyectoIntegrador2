using CIVY.MODELOS;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System;

namespace CIVY.DATOS
{
    public class UsuarioDatos
    {
        SqlConnection conexion = new SqlConnection();
        //string cadenaConexion = @"server=.;database=DB_A2CC24_CIVY; Integrated Security= true;MultipleActiveResultSets=True";
        //string cadenaConexion = @"Data Source=SQL7001.site4now.net;Initial Catalog=DB_A2CC24_CIVY;User Id=DB_A2CC24_CIVY_admin;Password=Cibertec2017;";
        string cadenaConexion = ConfigurationManager.ConnectionStrings["DB_A2CC24_CIVY"].ConnectionString;
        public UsuarioDatos()
        {
            conexion = new SqlConnection(cadenaConexion);
        }

        public List<Usuario> ListarUsuarios() {
            //Devolveremos un listado.
            List<Usuario> Listado = null;

            SqlDataReader lector;

            //Conexion!
            //conexion.ConnectionString = ConfigurationManager.ConnectionStrings["DB_CIVY"].ConnectionString;
            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand y declaramos el nombre del STORE PROCEDURE
            SqlCommand sql_comando = new SqlCommand();
            sql_comando.Connection = conexion;
            sql_comando.CommandType = CommandType.StoredProcedure;
            sql_comando.CommandText = "sp_lista_usuario";

            lector = sql_comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Usuario>();
                while (lector.Read())
                {
                    Usuario Entidad = new Usuario();
                    Entidad.usuario = lector["usuario"].ToString();
                    Entidad.bloqueo = bool.Parse(lector["bloqueo"].ToString());
                    Entidad.numero_intentos = int.Parse(lector["numero_intentos"].ToString());
                    Listado.Add(Entidad);
                }
            }
            //Despues, cerramos la conexion!
            conexion.Close();

            //Retorna el listao lleno de datos
            return Listado;
        }

        public Usuario Login(string usuario , string contrasena )
        {

            Usuario Entidad = null;
            SqlDataReader lector;

            //abrir conexion
            conexion.Open();

            SqlCommand comando = new SqlCommand();
            comando.Connection = conexion;
            comando.CommandType = CommandType.StoredProcedure;
            comando.CommandText = "Sp_Validar_Logeo";
            comando.Parameters.AddWithValue("@usuario", usuario);

            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Entidad = new Usuario();
                while (lector.Read())
                {
                    Entidad.id_usuario = int.Parse(lector["ID_Usuario"].ToString());
                    Entidad.usuario = lector["usuario"].ToString();
                    Entidad.contrasena = lector["contrasena"].ToString();
                    Entidad.bloqueo = bool.Parse(lector["bloqueo"].ToString());
                    Entidad.numero_intentos = int.Parse(lector["numero_intentos"].ToString());
                    Entidad.id_rol = int.Parse(lector["ID_Rol"].ToString());
                    Entidad.descripcion_rol = lector["descripcion_rol"].ToString();
                }
            }

            //cerrando conexion
            conexion.Close();
            return Entidad;
        }

        public void AumentarIntentosDeBloqueo(string usuario, out int instentos)
        {
            SqlParameter sql_parametros = null;

            conexion.Open();
            
            SqlCommand comando = new SqlCommand();
            comando.Connection = conexion;
            comando.CommandType = CommandType.StoredProcedure;
            comando.CommandText = "Sp_Aumento_Intento_Bloqueo";

            comando.Parameters.Add("@usuario", SqlDbType.VarChar,20).Value = usuario;
            sql_parametros = new SqlParameter("@intentos", SqlDbType.Int);
            sql_parametros.Direction = ParameterDirection.Output;
            comando.Parameters.Add(sql_parametros);
            
            comando.ExecuteNonQuery();

            instentos = Convert.ToInt32(comando.Parameters["@intentos"].Value);

            conexion.Close();
        }

    }
}
