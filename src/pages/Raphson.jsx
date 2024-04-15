import React, { useState } from 'react';
import Geogebra from 'react-geogebra';

export function Raphson() {
    const [equation, setEquation] = useState('');
    const [variable, setVariable] = useState('');
    const [x0, setx0] = useState('');
    const [iterations, setIterations] = useState([]);
    const [raiz, setRaiz] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const header = {
            'Content-Type': 'application/json'
        };
        const body = {
            'equation': equation,
            'variable': variable,
            'x0': parseFloat(x0)
        };

        fetch(`https://metodosnumericos-x5vj.onrender.com/raphson`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setIterations(data[1]);
                    setRaiz(data[0]);
                } else {
                    console.error('La propiedad iterations no está presente en los datos recibidos:', data);
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6 mt-5 px-5'>
                    <form onSubmit={handleSubmit} className='p-4 mx-4 rounded-4 login'>
                        <h3 className='text-center'>Raphson</h3>
                        <h6 className='text-center'>Nomenclatura para las ecuaciones: x**n = x^n</h6>
                        <div className='mb-2'>
                            <label htmlFor='equation' className='form-label'>Ecuación:</label>
                            <input
                                type='text'
                                id='equation'
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='variable' className='form-label'>Variable:</label>
                            <input
                                type='text'
                                id='variable'
                                value={variable}
                                onChange={(e) => setVariable(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='x0' className='form-label'>x0:</label>
                            <input
                                type='number'
                                id='x0'
                                value={x0}
                                onChange={(e) => setx0(e.target.value)}
                                className='form-control'
                            />
                            <button type='submit' className='btn btn-primary text-dark w-100 mt-3'>Calcular</button>
                        </div>
                    </form>
                </div>
                <div className='col-6'>
                    {equation && (
                        <div>
                            <Geogebra appletName='app1' width='400' height='400' settings={{ 'mode': 'expressions', 'border': 'none' }} />
                            <Geogebra script={`f(x) = ${equation}`} />
                        </div>
                    )}
                </div>
            </div>

            {iterations &&
                <div className='m-5'>
                    <table className='table table-warning text-center'>
                        <thead>
                            <tr>
                                <th scope='col'>Iteración</th>
                                <th scope='col'>x</th>
                                <th scope='col'>f(x)</th>
                                <th scope='col'>dx(x)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((resultado, index) => (
                                <tr key={index}>
                                    <th scope='row'>{resultado.iteracion}</th>
                                    <td>{resultado.x}</td>
                                    <td>{resultado['f(x)']}</td>
                                    <td>{resultado['dx(x)']}</td>
                                </tr>
                            ))}
                            {raiz && (
                                <tr>
                                    <th scope='row'>Raíz</th>
                                    <td colSpan={4}>{raiz}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}