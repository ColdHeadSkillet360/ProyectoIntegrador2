using CIVY.MODELOS;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System;

namespace CIVY.DATOS
{
    public class EmpleadoDatos
    {
        SqlConnection conexion = new SqlConnection();
        //string cadenaConexion = @"server=.;database=DB_A2CC24_CIVY; Integrated Security= true;MultipleActiveResultSets=True";
        //string cadenaConexion = @"Data Source=SQL7001.site4now.net;Initial Catalog=DB_A2CC24_CIVY;User Id=DB_A2CC24_CIVY_admin;Password=Cibertec2017;";
        string cadenaConexion = ConfigurationManager.ConnectionStrings["DB_A2CC24_CIVY"].ConnectionString;
        public EmpleadoDatos()
        {
            conexion = new SqlConnection(cadenaConexion);
        }

        public List<TipoEmpleado> ListarTipoEmpleado()
        {
            //Devolveremos un listado.
            List<TipoEmpleado> Listado = null;
            TipoEmpleado Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_tipo_empleado,descripcion FROM Tipo_Empleado";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();
            
            if (lector.HasRows)
            {
                Listado = new List<TipoEmpleado>();
                while (lector.Read())
                {
                    Entidad = new TipoEmpleado();
                    Entidad.id_tipo_empleado = int.Parse(lector["id_tipo_empleado"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Listado.Add(Entidad);
                }
            }
            //Despues, cerramos la conexion!
            conexion.Close();

            //Retorna el listao lleno de datos
            return Listado;
        }

        public List<Empleado> ObtenerEmpleado(int id_empleado)
        {
            List<Empleado> Listado = null;
            Empleado Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Obtener_Empleado";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@id_empleado", id_empleado);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Empleado>();
                while (lector.Read())
                {
                    Entidad = new Empleado();
                    Entidad.id_empleado = int.Parse(lector["id_empleado"].ToString());
                    Entidad.nombres = lector["nombres"].ToString();
                    Entidad.ape_paterno = lector["ape_paterno"].ToString();
                    Entidad.ape_materno = lector["ape_materno"].ToString();
                    Entidad.dni = lector["dni"].ToString();
                    Entidad.sexo = lector["sexo"].ToString();
                    Entidad.departamento = lector["departamento"].ToString();
                    Entidad.provincia = lector["provincia"].ToString();
                    Entidad.distrito = lector["distrito"].ToString();
                    Entidad.direccion = lector["direccion"].ToString();
                    Entidad.email = lector["email"].ToString();
                    Entidad.estado_civil = lector["estado_civil"].ToString();
                    Entidad.telefono = lector["telefono"].ToString();
                    Entidad.celular = lector["celular"].ToString();
                    Entidad.fecha_nacimiento = lector["fecha_nacimiento"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_empleado = int.Parse(lector["id_tipo_empleado"].ToString());
                    
                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }

        public List<Empleado> ListarEstado()
        {
            List<Empleado> Listado = null;
            Empleado Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_estado, estado FROM Estados";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Empleado>();
                while (lector.Read())
                {
                    Entidad = new Empleado();
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
        public List<Empleado> BuscarEmpleado(string descripcion, int tipoempleado)
        {
            List<Empleado> Listado = null;
            Empleado Entidad = null;
            SqlDataReader lector;

            conexion.Open();

            string query = "Sp_Buscar_Empleado";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            if (descripcion== null || descripcion =="")
            {
                comando.Parameters.AddWithValue("@descripcion", DBNull.Value);
            }
            else
            {
                comando.Parameters.AddWithValue("@descripcion", descripcion);
            }


            comando.Parameters.AddWithValue("@id_tipoempleado", tipoempleado);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Empleado>();
                while (lector.Read())
                {
                    Entidad = new Empleado();
                    Entidad.id_empleado = int.Parse(lector["id_empleado"].ToString());
                    Entidad.nombres = lector["nombres"].ToString();
                    Entidad.ape_paterno = lector["ape_paterno"].ToString();
                    Entidad.ape_materno = lector["ape_materno"].ToString();
                    Entidad.dni = lector["dni"].ToString();
                    Entidad.sexo = lector["sexo"].ToString();
                    Entidad.departamento = lector["departamento"].ToString();
                    Entidad.provincia = lector["provincia"].ToString();
                    Entidad.distrito = lector["distrito"].ToString();
                    Entidad.direccion = lector["direccion"].ToString();

                    Entidad.email = lector["email"].ToString();
                    Entidad.estado_civil = lector["estado_civil"].ToString();
                    Entidad.telefono = lector["telefono"].ToString();
                    Entidad.celular = lector["celular"].ToString();
                    Entidad.fecha_nacimiento = lector["fecha_nacimiento"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_empleado = int.Parse(lector["id_tipo_empleado"].ToString());

                    Entidad.tipo_empleado = lector["tipo_empleado"].ToString();
                    Entidad.estado_descripcion = lector["estado_descripcion"].ToString();
                    Listado.Add(Entidad);
                }
            }

            conexion.Close();
            return Listado;
        }
        public bool RegistrarEmpleado(Empleado empleado)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Registrar_Empleado";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@nombres", empleado.nombres);
            comando.Parameters.AddWithValue("@ape_paterno", empleado.ape_paterno);
            comando.Parameters.AddWithValue("@ape_materno", empleado.ape_materno);
            comando.Parameters.AddWithValue("@dni", empleado.dni);
            comando.Parameters.AddWithValue("@sexo", empleado.sexo);
            comando.Parameters.AddWithValue("@departamento", empleado.departamento);
            comando.Parameters.AddWithValue("@provincia", empleado.provincia);
            comando.Parameters.AddWithValue("@distrito", empleado.distrito);
            comando.Parameters.AddWithValue("@direccion", empleado.direccion);
            comando.Parameters.AddWithValue("@email", empleado.email);
            comando.Parameters.AddWithValue("@estado_civil", empleado.estado_civil);
            comando.Parameters.AddWithValue("@telefono", empleado.telefono);
            comando.Parameters.AddWithValue("@celular", empleado.celular);
            comando.Parameters.AddWithValue("@fecha_nacimiento", Convert.ToDateTime(empleado.fecha_nacimiento));
            comando.Parameters.AddWithValue("@id_tipo_empleado", empleado.id_tipo_empleado);

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
        public bool EditarEmpleado(Empleado empleado)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Editar_Empleado";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_empleado", empleado.id_empleado);
            comando.Parameters.AddWithValue("@nombres", empleado.nombres);
            comando.Parameters.AddWithValue("@ape_paterno", empleado.ape_paterno);
            comando.Parameters.AddWithValue("@ape_materno", empleado.ape_materno);
            comando.Parameters.AddWithValue("@dni", empleado.dni);
            comando.Parameters.AddWithValue("@sexo", empleado.sexo);
            comando.Parameters.AddWithValue("@departamento", empleado.departamento);
            comando.Parameters.AddWithValue("@provincia", empleado.provincia);
            comando.Parameters.AddWithValue("@distrito", empleado.distrito);
            comando.Parameters.AddWithValue("@direccion", empleado.direccion);
            comando.Parameters.AddWithValue("@email", empleado.email);
            comando.Parameters.AddWithValue("@estado_civil", empleado.estado_civil);
            comando.Parameters.AddWithValue("@telefono", empleado.telefono);
            comando.Parameters.AddWithValue("@celular", empleado.celular);
            comando.Parameters.AddWithValue("@fecha_nacimiento", Convert.ToDateTime(empleado.fecha_nacimiento));
            comando.Parameters.AddWithValue("@id_tipo_empleado", empleado.id_tipo_empleado);

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
        public bool EliminarEmpleado(Empleado empleado)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Elimina_Empleado";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_empleado", empleado.id_empleado);

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
