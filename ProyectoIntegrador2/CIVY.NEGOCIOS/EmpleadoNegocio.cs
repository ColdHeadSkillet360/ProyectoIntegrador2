using CIVY.DATOS;
using CIVY.MODELOS;
using System.Collections.Generic;
using System;

namespace CIVY.NEGOCIOS
{
    public class EmpleadoNegocio
    {
        private EmpleadoDatos empleadoDatos;

        public EmpleadoNegocio()
        {
            empleadoDatos = new EmpleadoDatos();
        }

        public List<TipoEmpleado> ListarTipoEmpleado()
        {
            return empleadoDatos.ListarTipoEmpleado();
        }

        public List<Empleado> ListarEstado()
        {
            return empleadoDatos.ListarEstado();
        }

        public List<Empleado> BuscarEmpleado(string descripcion, int tipoempleado)
        {
            //if(descripcion == null)
            //{
            //    descripcion = "";
            //}

            if(tipoempleado < 1)
            {
                tipoempleado = 0;
            }
            return empleadoDatos.BuscarEmpleado(descripcion, tipoempleado);
        }
        public List<Empleado> ObtenerEmpleado(int id_empleado)
        {
            return empleadoDatos.ObtenerEmpleado(id_empleado);
        }
        public bool RegistrarEmpleado(Empleado modelo)
        {
            var user = empleadoDatos.RegistrarEmpleado(modelo);
            return user;
        }

        public bool EliminarEmpleado(Empleado modelo)
        {
            var user = empleadoDatos.EliminarEmpleado(modelo);
            return user;
        }

        public bool EditarEmpleado(Empleado modelo)
        {
            var user = empleadoDatos.EditarEmpleado(modelo);
            return user;
        }

       
    }
}
