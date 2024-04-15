import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center min-vh-100 login-fondo'>
            <div className='col-xl-4'>
                <h3 className='text-center'>Escoja un método numérico</h3>
                <div className='mb-2'>
                    <Link to='/biseccion' className='btn btn-primary text-dark w-100 mt-2'>Bisección</Link>
                </div>
                <div className='mb-2'>
                    <Link to='/falsaposicion' className='btn btn-primary text-dark w-100 mt-2'>Falsa posición</Link>
                </div>
                <div className='mb-2'>
                    <Link to='/raphson' className='btn btn-primary text-dark w-100 mt-2'>Raphson</Link>
                </div>
                <div className='mb-2'>
                    <Link to='/secante' className='btn btn-primary text-dark w-100 mt-2'>Secante</Link>
                </div>
            </div>
        </div>
    );
}