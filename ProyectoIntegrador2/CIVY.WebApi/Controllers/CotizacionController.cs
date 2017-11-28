using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using CIVY.MODELOS;
using CIVY.NEGOCIOS;
using System.Web.Http.Cors;

namespace CIVY.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CotizacionController : ApiController
    {

        private CotizacionNegocio cotizacionNegocio;
        
        public CotizacionController()
        {
            cotizacionNegocio = new CotizacionNegocio();
        }

        [HttpGet]
        public List<EstadosDocumento> ListarEstadosDocumento(string TipoDocumento)
        {
            return cotizacionNegocio.ListarEstadosDocumento(TipoDocumento);
        }

        [HttpGet]
        public List<Cotizacion> BuscarCotizacion(string fechaInicio,string fechaFin, string cliente, string nro_doc, int estado_documento)
        {
            return cotizacionNegocio.BuscarCotizacion(fechaInicio, fechaFin, cliente, nro_doc,estado_documento);
        }

        [HttpPost]
        public bool AprobarCotizacion(Cotizacion modelo)
        {
            return cotizacionNegocio.AprobarCotizacion(modelo);
        }

        [HttpGet]
        public List<CotizacionDetalle> ObtenerDetalleCotizacion(int id_cotizacion_venta)
        {
            return cotizacionNegocio.ObtenerDetalleCotizacion(id_cotizacion_venta);
        }


    }
}
