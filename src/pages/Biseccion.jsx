import React, { useState } from 'react';
import Geogebra from 'react-geogebra';

export function Biseccion() {
    const [ecuacion, setEcuacion] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [datos, setDatos] = useState(null);
    const [raiz, setRaiz] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const header = {
            'Content-Type': 'application/json'
        }
        const body = {
            'ecuacion': ecuacion,
            'a': a,
            'b': b
        }

        fetch(`https://metodosnumericos-x5vj.onrender.com/biseccion`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                setDatos(data.iteraciones);
                setRaiz(data.raiz);
                console.log(data);
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6 mt-5 px-5'>
                    <form onSubmit={handleSubmit} className='p-4 mx-4 rounded-4 login'>
                        <h3 className='text-center'>Bisección</h3>
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
                            <label htmlFor='a' className='form-label'>a:</label>
                            <input
                                type='number'
                                id='a'
                                value={a}
                                onChange={(e) => setA(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='b' className='form-label'>b:</label>
                            <input
                                type='number'
                                id='b'
                                value={b}
                                onChange={(e) => setB(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary text-dark mt-2'>Calcular</button>
                    </form>
                </div>
                <div className='col-6'>
                    {ecuacion && (
                        <div>
                            <Geogebra />
                            <Geogebra script={`f(x) = ${ecuacion}`} />
                        </div>
                    )}
                </div>
            </div>

            {datos &&
                <div className='m-5'>
                    <table className='table table-warning text-center'>
                        <thead>
                            <tr>
                                <th scope='col'>Iteración</th>
                                <th scope='col'>xa</th>
                                <th scope='col'>xb</th>
                                <th scope='col'>x</th>
                                <th scope='col'>fxp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((iteration, index) => (
                                <tr key={index}>
                                    <th scope='row'>{iteration.iteracion}</th>
                                    <td>{iteration.xa}</td>
                                    <td>{iteration.xb}</td>
                                    <td>{iteration.x}</td>
                                    <td>{iteration.fxp}</td>
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