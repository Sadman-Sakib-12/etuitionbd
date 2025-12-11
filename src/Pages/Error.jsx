import error from '../assets/error-404.png'
import { Link } from 'react-router'
const Error = () => {
    return (
        <div>
            <div className='flex justify-center mt-15'>
                <img src={error} alt="" />
            </div>
            <div className='text-center mb-10'>
                <h1 className='text-2xl font-bold'>Oops, page not found</h1>
                <p>The page you are looking for is not available</p>
                <Link to='/' className='py-3 px-9 text-xl btn text-white bg-purple-600'>Go Back</Link>
            </div>
        </div>
    )
}

export default Error