import React, { useState } from 'react'
import './style/style.css'
import { Paper } from '@mui/material';
import Alerts from '../../../components/Alert';

import Form from './components/form/Form'
const Create = () => {
    const [openSuccessNotify, setOpenSuccessNotify] = useState(false)
    const [successText, setSuccessText] = useState('')

    const [openErrorNotify, setOpenErrorNotify] = useState(false)
    const [ErrorText, setErrorText] = useState('')

    const handleUpdateSuccess = () => {
        setOpenSuccessNotify(true);
        setSuccessText("Update Employee infomation Success")

    };

    const handleUpdateError = () => {
        setOpenErrorNotify(true);
        setErrorText("Looks like there is something goes wrong")
    };
    return (
        <div className='createMain'>

            <Paper data-testid="paper" elevation={3}>

                <Form data-testid="form" setOpenSuccessNotify={() => handleUpdateSuccess()} setOpenFailedNotify={() => handleUpdateError()} />
            </Paper>
            <Alerts isOpen={openSuccessNotify} text={successText} type='success' />
            <Alerts isOpen={openErrorNotify} text={ErrorText} type='error' />
        </div>
    )
}

export default Create