import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducer'
import { userRegisterReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducer'
import { orderCreateReducer } from './reducers/orderReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
    (localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
    (localStorage.getItem('userInfo')) : {}

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
    (localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))

export default store

