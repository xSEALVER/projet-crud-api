// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';

// const UpdateReservation = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const { id } = useParams();
//     const navigate = useNavigate();

//     function handleSubmit(event) {
//         event.preventDefault();
//         axios.put(`http://localhost:8081/update/${id}`, { name, email })
//             .then(res => {
//                 console.log(res);
//                 alert("Vos modifications ont été bien enregistrées");
//                 navigate('/');
//             }).catch(err => console.log(err));
//     }

//     const handleBack = () => {
//         navigate('/');
//     };

//     return (
//         <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
//             <div className='w-50 bg-white rounded p-3 position-relative'>
//             <div className='d-flex justify-content-end mb-3'>
//                     <Link to='/' className='btn btn-primary'>Retour</Link>
//             </div>
//                 <form onSubmit={handleSubmit}>
//                     <h2>Mettre à jour une Réservation</h2>
//                     <div className='mb-2'>
//                         <label htmlFor="name">Prénom</label>
//                         <input type="text" id="name" placeholder='Entrez le prénom' className='form-control'
//                             value={name}
//                             onChange={e => setName(e.target.value)}
//                         />
//                     </div>

//                     <div className='mb-2'>
//                         <label htmlFor="email">Email</label>
//                         <input type="email" id="email" placeholder="Entrez l'email" className='form-control'
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <button type='submit' className='btn btn-success'>Confirmer</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateReservation;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const UpdateReservation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/${id}`)
            .then((res) => {
                setName(res.data.name);
                setEmail(res.data.email);
            })
            .catch((err) => {
                console.log(err);
                setError('Erreur lors du chargement des données de la réservation');
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation simple côté client
        if (!name || !email) {
            setError('Tous les champs sont obligatoires');
            return;
        }

        // Assainissement des données
        const sanitizedData = {
            name: DOMPurify.sanitize(name),
            email: DOMPurify.sanitize(email)
        };

        axios.put(`http://localhost:8081/update/${id}`, sanitizedData)
            .then(res => {
                console.log(res);
                alert("Vos modifications ont été bien enregistrées");
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setError('Erreur lors de la mise à jour de la réservation');
            });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3 position-relative'>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/' className='btn btn-primary'>Retour</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Mettre à jour une Réservation</h2>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <div className='mb-2'>
                        <label htmlFor="name">Prénom</label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Entrez le prénom'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Entrez l'email"
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Confirmer</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateReservation;
