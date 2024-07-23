// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const CreateReservation = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8081/create', { name, email })
//             .then((res) => {
//                 console.log(res);
//                 navigate('/');
//             })
//             .catch((err) => console.log(err));
//     };

//     return (
//         <div className='d-flex flex-column vh-100 bg-dark justify-content-center align-items-center'>
//             <div className='w-50 bg-white rounded p-3'>
//                 <div className='d-flex justify-content-end mb-3'>
//                     <Link to='/' className='btn btn-primary'>Retour</Link>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <h2>Ajouter réservation</h2>
//                     <div className='mb-2'>
//                         <label htmlFor='name'>Prénom</label>
//                         <input
//                             type='text'
//                             id='name'
//                             placeholder='Entrez votre nom'
//                             className='form-control'
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                         />
//                     </div>

//                     <div className='mb-2'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             type='email'
//                             id='email'
//                             placeholder='Entrez votre email'
//                             className='form-control'
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                         />
//                     </div>
//                     <button type='submit' className='btn btn-success'>Soumettre</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateReservation;

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateReservation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            await axios.post('http://localhost:8081/create', { name, email });
            alert("La réservation a été bien enregistrée");
            navigate('/');
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Erreur lors de l\'ajout de la réservation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='d-flex flex-column vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/' className='btn btn-primary'>Retour</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Ajouter réservation</h2>

                    {error && <div className='alert alert-danger'>{error}</div>}
                    
                    <div className='mb-2'>
                        <label htmlFor='name'>Prénom</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Entrez votre prénom'
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

                    <button type='submit' className='btn btn-success' disabled={loading}>
                        {loading ? 'Envoi en cours...' : 'Soumettre'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReservation;

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const CreateReservation = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8081/create', { name, email })
//             .then((res) => {
//                 console.log(res);
//                 navigate('/');
//             })
//             .catch((err) => console.log(err));
//     };

//     return (
//         <div className='d-flex flex-column vh-100 bg-dark justify-content-center align-items-center'>
//             <div className='w-50 bg-white rounded p-3'>
//                 <div className='d-flex justify-content-end mb-3'>
//                     <Link to='/' className='btn btn-primary'>Retour</Link>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <h2>Ajouter réservation</h2>
//                     <div className='mb-2'>
//                         <label htmlFor='name'>Prénom</label>
//                         <input
//                             type='text'
//                             id='name'
//                             placeholder='Entrez votre nom'
//                             className='form-control'
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                         />
//                     </div>

//                     <div className='mb-2'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             type='email'
//                             id='email'
//                             placeholder='Entrez votre email'
//                             className='form-control'
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                         />
//                     </div>
//                     <button type='submit' className='btn btn-success'>Soumettre</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateReservation;

