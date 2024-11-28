import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import  { Registr }  from './Registr.css';


const validationSchema = yup.object({
    name: yup.string().required('Введите Имя'),
    email: yup.string().email('Неверная почта').required('Введите Email'),
    password: yup.string()
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .matches(/[A-Z]/, 'Пароль должен содержать одну Заглавную букву')
        .matches(/[0-9]/, 'Пароль должен содержрать одну цифру')
        .required('Введите пароль'),
});

const Register = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register', values);
                console.log('Server response:', response.data);
                alert('Registration successful!');
            } catch (error) {
                console.error('Server error:', error.response?.data || error.message);
                alert('Error during registration');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className='formRegistr'>
            <div>
                <label>Name</label>
                <input
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && <div>{formik.errors.name}</div>}
            </div>
            <div>
                <label>Email</label>
                <input
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email && <div>{formik.errors.email}</div>}
            </div>
            <div>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password && <div>{formik.errors.password}</div>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
