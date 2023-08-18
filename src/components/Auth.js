import axios from 'axios'
import {useState, useContext} from 'react'
import AuthContext from '../store/authContext'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const [message, setMessage] = useState('')
   const [display, setDisplay] = useState('none')

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()

       setDisplay('none')
 
       const body = {
        username,
        password
       }

       const URL = 'https://socialmtn.devmountain.com'

       axios.post(register ? `${URL}/register` : `${URL}/login`, body)
        .then(({data}) => {
            console.log('After Auth', data)
            authCtx.login(data.token, data.exp, data.userID)
        })
        .catch(err => {
            setMessage(err.response.data)
            setDisplay('block')
            setPassword("")
            setUsername("")
        })
   }

   
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   type='text'
                   placeholder='username'
                   value={username}
                   onChange={e => setUsername(e.target.value)}
                   className='form-input'/>
               <input
                   type='password'
                   placeholder='password'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className='form-input'/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <p style={{display: display}} className='auth-msg'>{message}</p>
           <button className='form-btn' onClick={() => setRegister(!register)}>
            Need to {register ? 'Login' : 'Sign Up'}?
            </button>
       </main>
   )
}
 
export default Auth