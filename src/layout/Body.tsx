import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material';
import './styles/body.css'
const Body = () => {
    return (
        <main className='mainBody'>
            <Container  maxWidth="xl">
                <Outlet />
            </Container>

        </main>
    )
}

export default Body