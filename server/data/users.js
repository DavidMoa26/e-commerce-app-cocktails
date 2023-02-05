import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'Admin@test.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John',
        email: 'John@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane',
        email: 'Jane@test.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users