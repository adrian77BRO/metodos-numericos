import React, { useState } from 'react';
import Geogebra from 'react-geogebra';

export function FalsaPosicion() {
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

        fetch(`https://metodosnumericos-x5vj.onrender.com/falsePosition`, {
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
                        <h3 className='text-center'>Falsa posición</h3>
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
                        <button type='submit' className='btn btn-primary text-dark mt-2'>Enviar</button>
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

            {datos &&
                <div className='m-5'>
                    <table className='table table-warning text-center'>
                        <thead>
                            <tr>
                                <th scope='col'>Iteración</th>
                                <th scope='col'>a</th>
                                <th scope='col'>b</th>
                                <th scope='col'>x</th>
                                <th scope='col'>fx</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((iteration, index) => (
                                <tr key={index}>
                                    <th scope='row'>{iteration.iteracion}</th>
                                    <td>{iteration.a}</td>
                                    <td>{iteration.b}</td>
                                    <td>{iteration.x}</td>
                                    <td>{iteration.fx}</td>
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