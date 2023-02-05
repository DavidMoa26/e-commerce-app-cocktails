import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin


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
                    <h1>sign in</h1>
                    {error && <span style={{ backgroundColor: 'red', color: 'white', padding: ' 0 1%' }}>Invalid email or password</span>}
                    {loading && <Loader />}
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>

                    <Button variant="primary" type="submit" className='m-2' onClick={submitHandler}>
                        SIGN IN
                    </Button>

                    <Row >
                        <Col>
                            New User ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} > Register </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen