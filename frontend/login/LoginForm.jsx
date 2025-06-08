import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const LoginForm = ({email, password, setEmail, setPassword, submitLogin, setPageState}) => {
      return (
      <div className='component loginForm p-4'>
            <h3>Login</h3>
            <br />
            <Form onSubmit={submitLogin}>

                  <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
                  </Form.Group>

                  <Button variant="dark" type="submit">
                  Login
                  </Button>

                  <Button onClick={() => setPageState("register")} variant="dark" type="button" className='ms-3'>
                  Register
                  </Button>

            </Form>

    </div>
  )
}
