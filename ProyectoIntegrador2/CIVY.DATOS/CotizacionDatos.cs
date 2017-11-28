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
    public class CotizacionDatos
    {
        SqlConnection conexion = new SqlConnection();
        //string cadenaConexion = @"server=.;database=DB_A2CC24_CIVY; Integrated Security= true;MultipleActiveResultSets=True";
        //string cadenaConexion = @"Data Source=SQL7001.site4now.net;Initial Catalog=DB_A2CC24_CIVY;User Id=DB_A2CC24_CIVY_admin;Password=Cibertec2017;";
        string cadenaConexion = ConfigurationManager.ConnectionStrings["DB_A2CC24_CIVY"].ConnectionString;
        public CotizacionDatos()
        {
            conexion = new SqlConnection(cadenaConexion);
        }

        public List<EstadosDocumento> ListarEstadosDocumento(string TipoDocumento)
        {
            List<EstadosDocumento> Listado = null;
            EstadosDocumento Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Lista_Estado_Documento";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@tipoDocumento", TipoDocumento);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<EstadosDocumento>();
                while (lector.Read())
                {
                    Entidad = new EstadosDocumento();
                    Entidad.id_estado_documento = int.Parse(lector["id_estado_documento"].ToString());
                    Entidad.descripcion = lector["descripcion"].ToString();
                    Listado.Add(Entidad);
                }
            }

            conexion.Close();
            
            return Listado;
        }

        public List<CotizacionDetalle> ObtenerDetalleCotizacion(int id_cotizacion_venta)
        {
            List<CotizacionDetalle> Listado = null;
            CotizacionDetalle Entidad = null;
            SqlDataReader lector;

            conexion.Open();

            string query = "Sp_Obtener_Detalle_Cotizacion_Venta";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@id_cotizacion_venta", id_cotizacion_venta);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<CotizacionDetalle>();
                while (lector.Read())
                {
                    Entidad = new CotizacionDetalle();
                    Entidad.descripcion_pro_ser = lector["descripcion_pro_ser"].ToString();
                    Entidad.codigo = lector["codigo"].ToString();
                    Entidad.precio = lector["precio"].ToString();
                    Entidad.unidad_medida = lector["unidad_medida"].ToString();
                    Entidad.cantidad = lector["n_cantidad"].ToString();
                    Listado.Add(Entidad);
                }
            }
            //Despues, cerramos la conexion!
            conexion.Close();

            //Retorna el listao lleno de datos
            return Listado;
        }

        public bool AprobarCotizacion(Cotizacion cotizacion)
        {
            bool bol_resultado_operacion = false;
            int int_numero_registro = 0;

            conexion.Open();

            string query = "Sp_Aprobar_Cotizacion_Venta";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@ID_Ordenes", cotizacion.ID_Ordenes);

            int_numero_registro = int.Parse(comando.ExecuteScalar().ToString());

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

        public List<Cotizacion> BuscarCotizacion(string fechaInicio, string fechaFin, string cliente, string nro_doc, int estado_documento)
        {
            List<Cotizacion> Listado = null;
            Cotizacion Entidad = null;
            SqlDataReader lector;

            //Abrimos conexión
            conexion.Open();

            //Creamos un sqlCommand junto con el query para poder consultar a la bd.
            string query = "Sp_Buscar_Cotizacion_Venta";

            SqlCommand comando = new SqlCommand(query, conexion);
            comando.CommandType = CommandType.StoredProcedure;

            comando.Parameters.AddWithValue("@fechaInicio", fechaInicio);
            comando.Parameters.AddWithValue("@fechaFin", fechaFin);
            comando.Parameters.AddWithValue("@cliente", cliente);
            comando.Parameters.AddWithValue("@nro_doc", nro_doc);
            comando.Parameters.AddWithValue("@estado_documento", estado_documento);
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                Listado = new List<Cotizacion>();
                while (lector.Read())
                {
                    Entidad = new Cotizacion();
                    Entidad.id_cotizacion_venta = int.Parse(lector["id_cotizacion_venta"].ToString());
                    Entidad.f_fecha_emision = lector["f_fecha_emision"].ToString();
                    Entidad.n_nro_serie = lector["n_nro_serie"].ToString();
                    Entidad.t_nro_documento = lector["t_nro_documento"].ToString();
                    Entidad.f_fecha_vencimiento = lector["f_fecha_vencimiento"].ToString();
                    Entidad.t_observacion = lector["t_observacion"].ToString();
                    Entidad.t_condicion = lector["t_condicion"].ToString();
                    Entidad.id_juridico = int.Parse(lector["id_juridico"].ToString());
                    Entidad.descripcion_registro = lector["descripcion_registro"].ToString();
                    Entidad.dni_ruc = lector["dni_ruc"].ToString();
                    Entidad.id_natural = int.Parse(lector["id_natural"].ToString());

                    Entidad.t_moneda = lector["t_moneda"].ToString();
                    Entidad.id_formapago = int.Parse(lector["id_formapago"].ToString());
                    Entidad.descripcion_formapago = lector["descripcion_formapago"].ToString();
                    Entidad.n_tasas = decimal.Parse(lector["n_tasas"].ToString());
                    Entidad.n_IGV = decimal.Parse(lector["n_IGV"].ToString());
                    Entidad.n_SubTotal = decimal.Parse(lector["n_SubTotal"].ToString());
                    Entidad.n_Total = decimal.Parse(lector["n_Total"].ToString());
                    Entidad.id_estado_documento = int.Parse(lector["id_estado_documento"].ToString());
                    Entidad.descripcion_estadodocumento = lector["descripcion_estadodocumento"].ToString();
                    Listado.Add(Entidad);
                }
            }

            conexion.Close();

            return Listado;
        }
    }
}
