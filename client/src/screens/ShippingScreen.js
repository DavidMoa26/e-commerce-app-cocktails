import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutStep from '../components/CheckOutStep'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart


    const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }))
        history.push('/payment')
    }


    return <Container>
        <CheckOutStep step1 step2 />
        <h1>Shipping</h1>
        <Row className='justify-content-md-center'>
            <Col md={6} xs={12}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicPasswordName">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="name" placeholder="Your address" onChange={(e) => setAddress(e.target.value)} required />
                        <Form.Text className="text-muted">
                            We'll never share your details with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="city" placeholder="Your phone number" onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="city" placeholder="Your city" onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Postal code</Form.Label>
                        <Form.Control type="text" placeholder="Your postal code" onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" className='m-2' >
                            continue to payment
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>

}

export default ShippingScreen