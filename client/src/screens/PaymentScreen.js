import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, ListGroup, Image, Card, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutStep from '../components/CheckOutStep'
import { createOrder } from '../actions/orderActions'
import Axios from 'axios'

const PlaceOrderScreen = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate



    const placeOrderHandler = () => {
        handleShow();
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            payment: cart.payment
        }))


    }

    const totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    return (
        <>
            <CheckOutStep step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>Address : {cart.shippingAddress.address} , {cart.shippingAddress.city}, {cart.shippingAddress.postalCode} , {cart.shippingAddress.phone} </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method : Credit Card</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>My Products</h2>
                            {cart.cartItems.length === 0 ? <h1>Your cart is empty</h1> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`} />
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summery</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <Button type='submit' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>place order</Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Order Submited ... </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default PlaceOrderScreen