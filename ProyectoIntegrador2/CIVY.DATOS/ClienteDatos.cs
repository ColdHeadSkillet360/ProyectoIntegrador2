using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using CIVY.MODELOS;
using System.Configuration;

namespace CIVY.DATOS
{
    //aplicar la interfaz ICLIENTEDATOS... edicion del profe:
    public class ClienteDatos : IClienteDatos
    {
        SqlConnection conexion = new SqlConnection();
        //string cadenaConexion = @"server=.;database=DB_A2CC24_CIVY; Integrated Security= true;MultipleActiveResultSets=True";
        //string cadenaConexion = @"Data Source=SQL7001.site4now.net;Initial Catalog=DB_A2CC24_CIVY;User Id=DB_A2CC24_CIVY_admin;Password=Cibertec2017;";
        string cadenaConexion = ConfigurationManager.ConnectionStrings["DB_A2CC24_CIVY"].ConnectionString;
        public ClienteDatos()
        {
            conexion = new SqlConnection(cadenaConexion);
        }

        public List<TipoCliente> ListarTipoCliente()
        {
            //Devolveremos un listado.
            List<TipoCliente> Listado = null;
            TipoCliente Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_tipo_cliente,descripcion FROM Tipo_Cliente";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<TipoCliente>();
                while (lector.Read())
                {
                    Entidad = new TipoCliente();
                    Entidad.id_tipo_cliente = int.Parse(lector["id_tipo_cliente"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Listado.Add(Entidad);
                }
            }
            //Despues, cerramos la conexion!
            conexion.Close();

            //Retorna el listao lleno de datos
            return Listado;
        }

        public List<Natural> AutocompleteCliente()
        {
            List<Natural> Listado = null;
            Natural Entidad = null;
            SqlDataReader lector;
            
            conexion.Open();

            string query = "SELECT CONCAT(nComercial,' - ',ruc) autocomplete FROM Cli_Juridico ";
            query += "UNION ";
            query += "SELECT CONCAT(nombre,' ',apepat,' ',apemat,' - ',dni) autocomplete FROM Cli_Natural ";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Natural>();
                while (lector.Read())
                {
                    Entidad = new Natural();
                    Entidad.autocomplete = lector["autocomplete"].ToString();
                    Listado.Add(Entidad);
                }
            }
            conexion.Close();
            
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


        //Buscar Cliente
        public List<Cliente> BuscarCliente(string descripcion, int tipocliente){
            List<Cliente> Listado = null;
            Cliente Entidad = null;
            SqlDataReader lector;

            conexion.Open();

            string query = "Sp_Buscar_Cliente";

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


            comando.Parameters.AddWithValue("@id_tipocliente", tipocliente);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Cliente>();
                while (lector.Read())
                {
                    Entidad = new Cliente();
                    Entidad.id_cliente = int.Parse(lector["id_cliente"].ToString());
                    Entidad.tipo_cliente = lector["tipo_cliente"].ToString();
                    Entidad.nombre_razon = lector["nombre"].ToString();
                    Entidad.ape_paterno = lector["apepat"].ToString();
                    Entidad.dni_ruc = lector["dni"].ToString();
                    Entidad.ape_materno = lector["apemat"].ToString();
                    Entidad.sexo = lector["sexo"].ToString();
                    Entidad.email = lector["email"].ToString();
                    Entidad.direccion = lector["direccion"].ToString();
                    Entidad.referencia = lector["referencia"].ToString();
                    Entidad.telefono = lector["telefono"].ToString();
                    Entidad.celular = lector["celular"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_cliente = int.Parse(lector["id_tipo_cliente"].ToString());
                    Entidad.estado_descripcion = lector["estado_descripcion"].ToString();

                    Listado.Add(Entidad);
                }
            }

            conexion.Close();
            return Listado;
        }


        //Buscar Cliente Juridico
        public List<Cliente> BuscarClienteJuridico(string descripcion, int tipocliente)
        {
            List<Cliente> Listado = null;
            Cliente Entidad = null;
            SqlDataReader lector;

            conexion.Open();

            string query = "Sp_Buscar_Juridico";

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


            comando.Parameters.AddWithValue("@id_tipocliente", tipocliente);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Cliente>();
                while (lector.Read())
                {
                    Entidad = new Cliente();
                    Entidad.id_cliente = int.Parse(lector["id_juridico"].ToString());
                    Entidad.tipo_cliente = lector["tipo_cliente"].ToString();
                    Entidad.nombre_razon = lector["razonSocial"].ToString();
                    Entidad.nComercial = lector["nComercial"].ToString();
                    Entidad.dni_ruc = lector["ruc"].ToString();
                    Entidad.email = lector["email"].ToString();
                    Entidad.direccion = lector["direccion"].ToString();
                    Entidad.referencia = lector["referencia"].ToString();
                    Entidad.telefono1 = lector["telefono1"].ToString();
                    Entidad.telefono2 = lector["telefono2"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_cliente = int.Parse(lector["id_tipo_cliente"].ToString());
                    Entidad.estado_descripcion = lector["estado_descripcion"].ToString();

                    Listado.Add(Entidad);
                }
            }

            conexion.Close();
            return Listado;
        }

        //Registrar Clientes Naturales
        public bool RegistrarCliente(Natural cliente)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Registrar_Cliente_Natural";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@nombre", cliente.nombre);
            comando.Parameters.AddWithValue("@ape_paterno", cliente.ape_paterno);
            comando.Parameters.AddWithValue("@ape_materno", cliente.ape_materno);
            comando.Parameters.AddWithValue("@dni", cliente.dni);
            comando.Parameters.AddWithValue("@sexo", cliente.sexo);
            comando.Parameters.AddWithValue("@email", cliente.email);
            comando.Parameters.AddWithValue("@direccion", cliente.direccion);
            comando.Parameters.AddWithValue("@referencia", cliente.referencia);
            comando.Parameters.AddWithValue("@telefono", cliente.telefono);
            comando.Parameters.AddWithValue("@celular", cliente.celular);
            comando.Parameters.AddWithValue("@id_tipo_cliente", cliente.id_tipo_cliente);

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


        //Registrar Clientes Juridico
        public bool RegistrarClienteJuridico(Juridico juridico)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Registrar_Cliente_Juridico";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@razonSocial", juridico.razonSocial);
            comando.Parameters.AddWithValue("@nComercial", juridico.nComercial);
            comando.Parameters.AddWithValue("@ruc", juridico.ruc);
            comando.Parameters.AddWithValue("@email", juridico.email);
            comando.Parameters.AddWithValue("@direccion", juridico.direccion);
            comando.Parameters.AddWithValue("@referencia", juridico.referencia);
            comando.Parameters.AddWithValue("@telefono1", juridico.telefono1);
            comando.Parameters.AddWithValue("@telefono2", juridico.telefono2);
            comando.Parameters.AddWithValue("@id_tipo_cliente", juridico.id_tipo_cliente);

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


        public List<Natural> ListarEstado()
        {
            List<Natural> Listado = null;
            Natural Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "SELECT id_estado, estado FROM Estados";

            SqlCommand comando_val = new SqlCommand(query, conexion);
            lector = comando_val.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Natural>();
                while (lector.Read())
                {
                    Entidad = new Natural();
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


        public List<Natural> ObtenerCliente(int id_natural)
        {
            List<Natural> Listado = null;
            Natural Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Obtener_ClienteNatural";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@id_natural", id_natural);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Natural>();
                while (lector.Read())
                {
                    Entidad = new Natural();
                    Entidad.id_natural = int.Parse(lector["id_natural"].ToString());
                    Entidad.nombre = lector["nombre"].ToString();
                    Entidad.ape_paterno = lector["apepat"].ToString();
                    Entidad.ape_materno = lector["apemat"].ToString();
                    Entidad.dni = lector["dni"].ToString();
                    Entidad.sexo = lector["sexo"].ToString();
                    Entidad.email = lector["email"].ToString();
                    Entidad.direccion = lector["direccion"].ToString();
                    Entidad.referencia = lector["referencia"].ToString();
                    Entidad.telefono = lector["telefono"].ToString();
                    Entidad.celular = lector["celular"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_cliente = int.Parse(lector["id_tipo_cliente"].ToString());

                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }


        //obtener cliente juridico
        public List<Juridico> ObtenerClienteJuridico(int id_juridico)
        {
            List<Juridico> Listado = null;
            Juridico Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Obtener_ClienteJuridico";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@id_juridico", id_juridico);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Juridico>();
                while (lector.Read())
                {
                   
                    Entidad = new Juridico();
                    Entidad.id_cliente = int.Parse(lector["id_juridico"].ToString());
                    Entidad.razonSocial = lector["razonSocial"].ToString();
                    Entidad.nComercial = lector["nComercial"].ToString();
                    Entidad.ruc = lector["ruc"].ToString();
                    Entidad.email = lector["email"].ToString();
                    Entidad.direccion = lector["direccion"].ToString();
                    Entidad.referencia = lector["referencia"].ToString();
                    Entidad.telefono1 = lector["telefono1"].ToString();
                    Entidad.telefono2 = lector["telefono2"].ToString();
                    Entidad.id_estado = int.Parse(lector["id_estado"].ToString());
                    Entidad.id_tipo_cliente = int.Parse(lector["id_tipo_cliente"].ToString());
            

                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }

        public bool EditarCliente(Natural cliente)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Editar_ClienteNatural";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_natural", cliente.id_cliente);
            comando.Parameters.AddWithValue("@nombre", cliente.nombre);
            comando.Parameters.AddWithValue("@ape_paterno", cliente.ape_paterno);
            comando.Parameters.AddWithValue("@ape_materno", cliente.ape_materno);
            comando.Parameters.AddWithValue("@dni", cliente.dni);
            comando.Parameters.AddWithValue("@sexo", cliente.sexo);
            comando.Parameters.AddWithValue("@email", cliente.email);
            comando.Parameters.AddWithValue("@direccion", cliente.direccion);
            comando.Parameters.AddWithValue("@referencia", cliente.referencia);
            comando.Parameters.AddWithValue("@telefono", cliente.telefono);
            comando.Parameters.AddWithValue("@celular", cliente.celular);
            comando.Parameters.AddWithValue("@id_tipo_cliente", cliente.id_tipo_cliente);
           

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

        //Editar cliente juridico
        public bool EditarClienteJuridico(Juridico juridico)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Editar_ClienteJuridico";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_juridico", juridico.id_cliente);
            comando.Parameters.AddWithValue("@razonSocial", juridico.razonSocial);
            comando.Parameters.AddWithValue("@nComercial", juridico.nComercial);
            comando.Parameters.AddWithValue("@ruc", juridico.ruc);
            comando.Parameters.AddWithValue("@email", juridico.email);
            comando.Parameters.AddWithValue("@direccion", juridico.direccion);
            comando.Parameters.AddWithValue("@referencia", juridico.referencia);
            comando.Parameters.AddWithValue("@telefono1", juridico.telefono1);
            comando.Parameters.AddWithValue("@telefono2", juridico.telefono2);
            comando.Parameters.AddWithValue("@id_tipo_cliente", juridico.id_tipo_cliente);


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


        public bool EliminarCliente(Cliente cliente)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            //string query = "Sp_Eliminar_ClienteNatural";
            string query = "Sp_Eliminar_Cliente";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_cliente", cliente.id_cliente);
            comando.Parameters.AddWithValue("@tipo_cliente", cliente.tipo_cliente);

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

        //Eliminar cliente juridico
        public bool EliminarClienteJuridico(Juridico juridico)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Eliminar_ClienteJuridico";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@id_juridico", juridico.id_cliente);

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
