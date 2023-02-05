import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [match, setMatch] = useState(true)

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMatch(false)
            return
        }
        else {
            dispatch(register(name, email, password))
        }
    }

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userRegister


    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={6} xs={12}>
                    <h1>sign up</h1>
                    {!match && <span style={{ backgroundColor: 'red', color: 'white', padding: ' 0 1%' }}>passwords not match</span>}
                    {loading && <Loader />}
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicPasswordName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                    </Form>

                    <Button variant="primary" type="submit" className='m-2' onClick={submitHandler}>
                        REGISTER
                    </Button>

                    <Row >
                        <Col>
                            Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} > Login </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen