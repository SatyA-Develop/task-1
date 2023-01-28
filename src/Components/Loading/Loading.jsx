import './Loading.css'
import spinner from '../../img/spinner.svg'

const Loading = () => {
  return (
    <div className='loader'> 
        <div className="spinner">
            <img src={spinner} alt="" />
        </div>
    </div>
  )
}

export default Loading