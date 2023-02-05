import React, { useEffect } from 'react'
import { Row, Col, Image, Tabs, Tab, ListGroup } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import x from '../JIGGERS1.jpg'
import { Link } from 'react-router-dom'
import Categories from '../components/Categories'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])



    return (
        <>
            <h1>Home Screen</h1>
            {loading ? <Loader>Loading...</Loader> : error ? <Message variant='danger'>{error}</Message> :
                <Row>
                    {products.map(product =>
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    )}
                </Row>
            }
        </>
    )
}

export default HomeScreen