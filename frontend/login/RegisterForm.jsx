import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const RegisterForm = ({name, last_name, email, password, setName, setLastName, setEmail, setPassword, submitRegister, setPageState, clear}) => {
  return (
    <div className='component loginForm p-4'>
            <h3>Login</h3>
            <br />
            <Form onSubmit={submitRegister}>

                  <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Password" value={name} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Password" value={last_name} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} required/>
                  </Form.Group>

                  <Button variant="dark" type="submit">
                  Register
                  </Button>

                  <Button onClick={() => setPageState("login")} variant="dark" type="button" className='ms-3'>
                  Login
                  </Button>

                  <Button onClick={clear} variant="dark" type="button" className='ms-3'>
                  Clear
                  </Button>

            </Form>

    </div>
  )
}
