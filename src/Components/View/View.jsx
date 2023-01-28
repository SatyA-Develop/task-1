import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './View.css'

const View = () => {

    const[user,setuser] = useState([])
    const[loading, setIsloading] = useState(false)

  
    useEffect(() => {
      setIsloading(true);
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
     .then((res)=>{
      setIsloading(false)
      setuser(res.data);
     })
    }, [])

    const {id}= useParams()
  return (
  <div>
    {
      loading ? <Loading/> : 
      (
        <div className='view'>
        <Link to={'/'}><button style={{height:"3rem", borderRadius:"2rem"}} className='btn'> Go back</button></Link>
      {
        user && (
           <div className='view-line'>
             <h1>Name: {user.name}</h1>
            <p> Eamil: {user.email}</p>
            <p>Mobile Number:  {user.phone}</p>
           </div>
            )
      }

    </div>
      )
    }
  </div>
  )
}

export default View


