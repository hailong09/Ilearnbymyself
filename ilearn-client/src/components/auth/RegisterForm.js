import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {

    // Auth Context
    const {registerUser} = useContext(AuthContext);
    // Local State
    const [registerForm, setRegisterForm] = useState({
        username:'', 
        password: '',
        confirmPassword:''
    });

    const [alert, setAlert] = useState(null);

    const {username, password, confirmPassword} = registerForm;

    const onChangeRegisterForm = e => setRegisterForm({...registerForm, [e.target.name]: e.target.value})

    const register = async e => {
        e.preventDefault()
        if(password !== confirmPassword){
            setAlert({type: 'danger', message: "Password does not match!"})
            setTimeout(()=> setAlert(null), 3000);
            return;
        }
        try {

            const registerData = await registerUser(registerForm);

            // console.log(loginData);
            if(!registerData.success) {
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(()=> setAlert(null), 3000);
            }
            
            // setLoginForm({username:'', password: ''});
        } catch (error) {
            console.log(error);
        }
        
    }



    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm Password' 
                        name='confirmPassword' 
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>Sign Up</Button>
            </Form>
            <p>Already have an account?
                <Link to='/signin'><Button variant='info' size='sm' className='ml-2'>Sign In</Button></Link>
            </p>
        </>
    )
}

export default RegisterForm
