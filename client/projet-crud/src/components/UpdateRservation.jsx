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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdateReservation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current reservation details
        const fetchReservation = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/${id}`);
                const reservation = response.data;
                setName(reservation.Name);
                setEmail(reservation.Email);
            } catch (err) {
                console.error('Error fetching reservation:', err);
                setError('Erreur lors de la récupération des détails de la réservation.');
            }
        };

        fetchReservation();
    }, [id]);

    const validateForm = () => {
        if (!name.trim() || !email.trim()) {
            setError('Le prénom et l\'email sont requis.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('L\'email est invalide.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Réinitialiser l'erreur

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            await axios.put(`http://localhost:8081/update/${id}`, { name, email });
            alert("Vos modifications ont été bien enregistrées");
            navigate('/');
        } catch (err) {
            console.error('Error updating reservation:', err);
            setError('Erreur lors de la mise à jour de la réservation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3 position-relative'>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/' className='btn btn-primary'>Retour</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Mettre à jour une Réservation</h2>


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

                    <button type='submit' className='btn btn-success' disabled={loading}>
                        {loading ? 'Envoi en cours...' : 'Confirmer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateReservation;

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


