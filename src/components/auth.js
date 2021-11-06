import React,  {useState, useEffect} from 'react'
import API from '../api-service'
import { useCookies } from 'react-cookie';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Auth() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoginView, setIsLoginView ] = useState(true);

    const [token, setToken] = useCookies(['ts-token']);

    useEffect( () => {
        if(token['ts-token']) window.location.href = '/tickets';
      }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
          .then( resp => setToken('ts-token', resp.token))
          .catch( error => console.log(error))
      }

      const registerClicked = () => {
        API.registerUser({username, password})
          .then( () => loginClicked())
          .catch( error => console.log(error))
      }
      const isDisabled = username.length === 0 || password.length === 0;

    return (
        <div className="App">
        <header className="App-header">
        {isLoginView ? <h1>Ticket System Login</h1> : <h1>Register</h1>}
        </header>
        <div className="login-container">
      <div className="login-container-inner">
      <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control  type="user" placeholder="Enter username" onChange={ evt=> setUsername(evt.target.value)} maxlength="20"/>
              <Form.Text className="text-muted">                
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={ evt=> setPassword(evt.target.value)} maxlength="20" />
            </Form.Group>

            { isLoginView ?
                <Button onClick={loginClicked} disabled={isDisabled}>Login</Button> : 
                 <Button onClick={registerClicked} disabled={isDisabled}>Register</Button>
              }
          
          { isLoginView ?
            <Button onClick={()=> setIsLoginView(false)}>Don't have an account? Register</Button> : 
            <Button onClick={()=> setIsLoginView(true)}>You already have an account? Login here</Button>
          }            
          </Form>

      </div>

        </div>
      </div>
    )
}
