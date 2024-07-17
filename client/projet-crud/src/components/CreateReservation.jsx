import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateReservation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { name, email })
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='d-flex flex-column vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/' className='btn btn-primary'>Retour</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Ajouter réservation</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Prénom</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Entrez votre nom'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Entrez votre email'
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Soumettre</button>
                </form>
            </div>
        </div>
    );
};

export default CreateReservation;