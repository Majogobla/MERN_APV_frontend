import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clientaAxios from '../config/axios.jsx';
import Alerta from '../components/Alerta.jsx';

const ConfirmarCuenta = () => 
{
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();
    const { token } = params;

    useEffect(() =>
    {
        const confirmarCuneta = async () =>
        {
            try 
            {
                const url = `/veterinarios/confirmar/${token}`;
                const { data } = await clientaAxios(url);

                setCuentaConfirmada(true);
                setAlerta(
                    {
                        msg: data.msg
                    }
                )
            } 
            catch (error) 
            {
                setAlerta(
                    {
                        msg: error.response.data.msg,
                        error: true,
                    }
                );
            }

            setCargando(false);
        };

        confirmarCuneta();
    },
    []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administrar <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando && <Alerta alerta={alerta}/>}

                {cuentaConfirmada && <Link to="/" className='block text-center my-5 text-gray-500'><span className='font-bold'>Iniciar Sesión</span></Link>}
            </div>
        </>
    )
};

export default ConfirmarCuenta;