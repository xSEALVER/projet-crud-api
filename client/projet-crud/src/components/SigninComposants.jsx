import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const SigninComposant = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data to be submitted:', formData); // Debugging
        try {
            const response = await axios.get('http://localhost:8081/signin', formData); // Assurez-vous que le port est correct
            console.log('Form data submitted successfully:', response.data);
            setFormData({ email: '', name: '' });
            navigate('/reservation');
        } catch (err) {
            console.error('Error submitting form data:', err);
        }
    };

    return (
        <Container className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-4">
                <h2 className="mb-4">Connexion</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Entrez votre nom" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Entrez votre email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Connexion
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default SigninComposant;
