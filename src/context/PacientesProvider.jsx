import { createContext, useState, useEffect } from "react";
import clientaAxios from "../config/axios.jsx";
import useAuth from "../hook/useAuth.jsx";

const PacientesContext = createContext();

const PacientesProvider = ({children}) =>
{
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const { auth  } = useAuth();

    useEffect(() =>
    {
        const obtenerPacientes = async () =>
        {
            try 
            {
                const token = localStorage.getItem('token');

                if(!token) return;

                const config =
                {
                    headers:
                    {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await clientaAxios('/pacientes', config);

                setPacientes(data);
            } 
            catch (error) 
            {
                console.log(error);
            }
        };

        obtenerPacientes();
    },
    [auth]);

    const guardarPaciente = async paciente =>
    {
        const token = localStorage.getItem('token');

        const config =
        {
            headers:
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if(paciente.id)
        {
            try 
            {
                const { data } = await clientaAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);

                setPacientes(pacientesActualizado);
            } 
            catch (error) 
            {
                console.log(error);
            }
        }
        else
        {
            try 
            {
                const { data } = await clientaAxios.post('/pacientes', paciente, config);

                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes]);
            } 
            catch (error) 
            {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdicion = paciente =>
    {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id =>
    {
        const confirmar = confirm('¿Confirmas que deseas eliminar?');
        
        if(confirmar)
        {
            try 
            {
                const token = localStorage.getItem('token');

                const config =
                {
                    headers:
                    {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                
                const { data } = await clientaAxios.delete(`/pacientes/${id}`, config);

                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

                setPacientes(pacientesActualizado);
            } 
            catch (error) 
            {
                console.log(error);
            }
        }
        else
        {

        }
    }

    return(
        <PacientesContext.Provider
            value={
                {
                    pacientes,
                    guardarPaciente,
                    setEdicion,
                    paciente,
                    eliminarPaciente
                }
            }
        >
            {children}
        </PacientesContext.Provider>
    )
}

export
{
    PacientesProvider
}

export default PacientesContext;