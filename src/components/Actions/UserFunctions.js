import axios from 'axios'

export const register = newUser => {
    return axios
        .post('https://travellog-7th-backend.herokuapp.com/users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log('Registered')
        })
}

export const login = user => {
    return axios
        .post('https://travellog-7th-backend.herokuapp.com/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            if (res.data.error === "User does not exist") {
                alert("User does not exist")
            }
            else if (res.data.error === "Wrong password") {
                alert("Wrong password")
            }
            else {
                localStorage.setItem('usertoken', res.data)
                return res.data
            }
        })
        .catch(err => {
            console.log(err)
        })
}

//Not use
// export const getProfile = token => {
//     return axios
//         .get('http://localhost:4000/users/profile', {
//             headers: { Authorization: ` ${token}` }
//         })
//         .then(response => {
//             console.log(response)
//             return response.data
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }