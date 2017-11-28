using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CIVY.DATOS;
using CIVY.MODELOS;

namespace CIVY.NEGOCIOS
{
    public class ClienteNegocio{


        private ClienteDatos clienteDatos;

        public ClienteNegocio()
        {

            clienteDatos = new ClienteDatos();

        }

        public List<TipoCliente> ListarTipoCliente()
        {
            return clienteDatos.ListarTipoCliente();

        }

        public List<Cliente> BuscarCliente(string descripcion,int tipocliente)
        {

            return clienteDatos.BuscarCliente(descripcion, tipocliente);
        }

    
        public bool RegistrarCliente(Natural cli)
        {
            //AQUI ELK PROFE APLICO LA MANIPULACION DE TRY CATCH!, APLICAR A TODO DE LA CAP NEGOCIO
            try
            {

                var aux = clienteDatos.RegistrarCliente(cli);
                return true;
            }
            catch (Exception)
            {
                return false;
            } 

          
        }

        public List<Natural> ListarEstado()
        {
            return clienteDatos.ListarEstado();
        }

        public bool EliminarCliente(Cliente modelo)
        {
            return clienteDatos.EliminarCliente(modelo);
        }


      

        public List<Natural> ObtenerCliente(int id_cliente)
        {
            return clienteDatos.ObtenerCliente(id_cliente);
        }

    


        public bool EditarCliente(Natural modelo)
        {
            var user = clienteDatos.EditarCliente(modelo);
            return user;
        }


     



        public List<Natural> AutocompleteCliente()
        {
            return clienteDatos.AutocompleteCliente();
        }


        public bool RegistrarJuridico(Juridico jur)
        {
            //AQUI ELK PROFE APLICO LA MANIPULACION DE TRY CATCH!, APLICAR A TODO DE LA CAP NEGOCIO
            try
            {

                var aux = clienteDatos.RegistrarClienteJuridico(jur);
                return true;
            }
            catch (Exception)
            {
                return false;
            }


        }

        public List<Cliente> BuscarClienteJuridico(string descripcion, int tipocliente)
        {

            return clienteDatos.BuscarClienteJuridico(descripcion, tipocliente);
        }

        public bool EliminarClienteJuridico(Juridico modelo)
        {
            var user = clienteDatos.EliminarClienteJuridico(modelo);
            return user;
        }

        public List<Juridico> ObtenerClienteJuridico(int id_juridico)
        {
            return clienteDatos.ObtenerClienteJuridico(id_juridico);
        }


        public bool EditarClienteJuridico(Juridico modelo)
        {
            var user = clienteDatos.EditarClienteJuridico(modelo);
            return user;
        }
    }
}
