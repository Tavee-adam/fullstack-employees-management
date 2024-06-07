import React from 'react'
import './style/style.css'
import { Paper } from '@mui/material';

import Form from './components/form/Form'
const Create = () => {
    return (
        <div className='createMain'>

            <Paper elevation={3}>

                <Form />
            </Paper>

        </div>
    )
}

export default Create