import React, { useState } from 'react';
import Geogebra from 'react-geogebra';

export function Secante() {
    const [ecuacion, setEcuacion] = useState('');
    const [variable, setVariable] = useState('');
    const [x0, setX0] = useState('');
    const [x1, setX1] = useState('');
    const [iterations, setIterations] = useState([]);
    const [raiz, setRaiz] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const header = {
            'Content-Type': 'application/json'
        };
        const body = {
            'ecuacion': ecuacion,
            'variable': variable,
            'x0': parseFloat(x0),
            'x1': parseFloat(x1)
        };

        fetch(`https://metodosnumericos-x5vj.onrender.com/secantMethod`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.iterations) {
                    setIterations(data.iterations);
                    setRaiz(data.result);
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
                        <h3 className='text-center'>Secante</h3>
                        <h6 className='text-center'>Nomenclatura para las ecuaciones: x**n = x^n</h6>
                        <div className='mb-2'>
                            <label htmlFor='ecuacion' className='form-label'>Ecuación:</label>
                            <input
                                type='text'
                                id='ecuacion'
                                value={ecuacion}
                                onChange={(e) => setEcuacion(e.target.value)}
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
                                onChange={(e) => setX0(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='x1' className='form-label'>x1:</label>
                            <input
                                type='number'
                                id='x1'
                                value={x1}
                                onChange={(e) => setX1(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary text-dark w-100 mt-3'>Calcular</button>
                    </form>
                </div>
                <div className='col-6'>
                    {ecuacion && (
                        <div>
                            <Geogebra appletName='app1' width='400' height='400' settings={{ 'mode': 'expressions', 'border': 'none' }} />
                            <Geogebra script={`f(x) = ${ecuacion}`} />
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
                                <th scope='col'>x0</th>
                                <th scope='col'>x1</th>
                                <th scope='col'>f(x0)</th>
                                <th scope='col'>f(x1)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((iteration, index) => (
                                <tr key={index}>
                                    <th scope='row'>{iteration.iteracion}</th>
                                    <td>{iteration.x0}</td>
                                    <td>{iteration.x1}</td>
                                    <td>{iteration['f(x0)']}</td>
                                    <td>{iteration['f(x1)']}</td>
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