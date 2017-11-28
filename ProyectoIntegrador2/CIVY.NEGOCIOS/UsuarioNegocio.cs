using CIVY.DATOS;
using CIVY.MODELOS;
using System.Collections.Generic;


namespace CIVY.NEGOCIOS
{
    public class UsuarioNegocio
    {
        private UsuarioDatos usuarioDatos;

        public UsuarioNegocio()
        {
            usuarioDatos = new UsuarioDatos();

        }

        public List<Usuario> ListarUsuarios()
        {
            return usuarioDatos.ListarUsuarios();
        }

        public Usuario Login(string usuario, string contrasena)
        {
            var user = usuarioDatos.Login(usuario, contrasena);
            int intentos = 0;
            //if (user.existe == true)
            //{
            if(user != null)
            {
                if (user.contrasena != contrasena)
                {
                    //user = null;
                    usuarioDatos.AumentarIntentosDeBloqueo(usuario, out intentos);
                    user.numero_intentos = intentos;
                }
            }
           
            //}

            return user;
        }

    }
}
