import Header from '../components/Header'
import '../styles/home-page.css'
import { Link } from 'react-router-dom'

function HomePage() {
    return(
        <>
            <div className='home'>
                <h2>welcome</h2>
                <p>Please create an account or login to view and create notes</p>
                <div>
                    <Link to='/signup'>Sign Up</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </>
    )
}

export default HomePage