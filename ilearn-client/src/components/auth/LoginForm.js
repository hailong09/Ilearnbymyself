import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const LoginForm = () => {
    // Auth Context
    const {loginUser} = useContext(AuthContext);
    // Local State
    const [loginForm, setLoginForm] = useState({username:'', password: ''});

    const [alert, setAlert] = useState(null);
  
    const {username, password} = loginForm;

    const onChangeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value})

    const login = async e => {
        e.preventDefault()
        try {

            const loginData = await loginUser(loginForm);

            // console.log(loginData);
            if(!loginData.success) {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(()=> setAlert(null), 3000);
            }
           
            // setLoginForm({username:'', password: ''});
        } catch (error) {
            console.log(error);
        }
       
    }
    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        required 
                        value={username} 
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        required 
                        value={password} 
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>Don't have an account
                <Link to='/signup'><Button variant='info' size='sm' className='ml-2'>Sign Up</Button></Link>
            </p>
        </>
    )
}

export default LoginForm

