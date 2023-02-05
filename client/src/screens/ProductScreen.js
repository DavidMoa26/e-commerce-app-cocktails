import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {

    const [quantity, setQuantity] = useState(1)

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])


    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            {loading ? <Loader>Loading..</Loader> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating color='#FDCC0D' value={product.rating} text={`${product.numReviews} reviews `} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price : ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description : ${product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price : </Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status : </Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col> Quantity </Col>
                                                <Col>
                                                    <Form.Control as='select' value={quantity} onChange={(e) =>
                                                        setQuantity(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(q => (
                                                                <option key={q + 1} value={q + 1} > {q + 1} </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}

                                    <Button className='btn-block'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >Add To Cart
                                    </Button>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )}

        </>
    )
}

export default ProductScreen