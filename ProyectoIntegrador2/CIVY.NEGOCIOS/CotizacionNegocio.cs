using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CIVY.DATOS;
using CIVY.MODELOS;

namespace CIVY.NEGOCIOS
{
    public class CotizacionNegocio
    {

        private CotizacionDatos cotizacionDatos;
        public CotizacionNegocio()
        {
            cotizacionDatos = new CotizacionDatos();
        }

        public List<EstadosDocumento> ListarEstadosDocumento(string TipoDocumento)
        {
            return cotizacionDatos.ListarEstadosDocumento(TipoDocumento);
        }

        public List<Cotizacion> BuscarCotizacion(string fechaInicio, string fechaFin, string cliente, string nro_doc, int estado_documento)
        {
            var nro = (nro_doc == null||nro_doc=="null"||nro_doc== "undefined") ? "" : nro_doc;
            var inicio = (fechaInicio == null) ? "" : fechaInicio;
            var fin = (fechaFin == null) ? "" : fechaFin;
            var cli = (cliente == null) ? "" : cliente;
            return cotizacionDatos.BuscarCotizacion(inicio, fin, cli, nro, estado_documento);
        }

        public bool AprobarCotizacion(Cotizacion modelo)
        {
            return cotizacionDatos.AprobarCotizacion(modelo);
        }

        public List<CotizacionDetalle> ObtenerDetalleCotizacion(int id_cotizacion_venta)
        {
            return cotizacionDatos.ObtenerDetalleCotizacion(id_cotizacion_venta);
        }
    }
}
