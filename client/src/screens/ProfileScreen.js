import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { updateUserDetails } from '../actions/userActions'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [match, setMatch] = useState(true)
    const [success, setSuccess] = useState(false)


    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setName(user.email)
            }
        }
    }, [history, userInfo, dispatch, user])

    const submitHandler = (e) => {
        if (password === confirmPassword) {
            setMatch(true)
            setSuccess(true)
            dispatch(updateUserDetails({ id: userInfo._id, name: name, email, password }))
            e.preventDefault();
        }
        else {
            setSuccess(false)
            setMatch(false)
        }
    }


    return (
        <Row className='justify-content-md-center'>
            <Col md={6} xs={12}>
                <h1>update profile</h1>
                {loading && <Loader />}
                {!match && <span style={{ backgroundColor: 'red', color: 'white', padding: '0 1%' }}>Passwords not match</span>}
                {success && <span style={{ backgroundColor: 'green', color: 'white', padding: '0 1%' }}>Details updated</span>}
                <Form  >
                    <Form.Group className="mb-3" controlId="formBasicPasswordName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Your name" onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                </Form>

                <Button variant="primary" type='submit' className='m-2' onClick={submitHandler}>
                    update
                </Button>
            </Col>

        </Row>
    )
}

export default ProfileScreen