import axios from 'axios';
class AuthService {

    async registerUser(user) {
        try {
            const newUser = await axios.post('http://localhost:8000/api/users/new', user, { withCredentials: true })
            console.log("🚀 ~ file: authService.js ~ line 7 ~ AuthService ~ registerUser ~ newUser", user)
            return newUser.data.user;
        } catch(err) {
            return err;
        }
    }

    async loginUser(user) {
        try {
            
            const response = await axios.post('http://localhost:8000/api/users/login', user,  { withCredentials: true });
            console.log("🚀 ~ file: tweetsService.js ~ line 59 ~ TweetService ~ loginUser ~ response", response)
            console.log("🚀 ~ file: authService.js ~ line 24 ~ AuthService ~ loginUser ~ document.cookie", document.cookie)
            
            return response.data;

        } catch(err) {
            return err;
        }
    }

    async logoutUser(email) {
        console.log("🚀 ~ file: authService.js ~ line 29 ~ AuthService ~ logoutUser ~ email", email)
        try {
            const response = await axios.post('http://localhost:8000/api/users/logout', {email: email},  { withCredentials: true });
            console.log("🚀 ~ file: tweetsService.js ~ line 59 ~ TweetService ~ loginUser ~ response", response)
            return response.data;

        } catch(err) {
            return err;
        }
    }
}

export default AuthService;