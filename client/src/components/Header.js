import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }



    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'><Navbar.Brand>Cocktails</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart' style={{ padding: '3px' }}></i>Cart</Nav.Link></LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user' style={{ padding: '3px' }}></i>Login
                                </Nav.Link>
                            </LinkContainer>}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header