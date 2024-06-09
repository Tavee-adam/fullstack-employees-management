import React, { useState } from 'react'
import Form from './components/form/Form'
import './style/style.css'
import { Paper } from '@mui/material';
import Alerts from '../../../components/Alert';
const Update = () => {
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
        <div className='updateMain'>

            <Paper elevation={3}>

                <Form setOpenSuccessNotify={() => handleUpdateSuccess()} setOpenFailedNotify={() => handleUpdateError()} />
            </Paper>
            <Alerts isOpen={openSuccessNotify} text={successText} type='success' />
            <Alerts isOpen={openErrorNotify} text={ErrorText} type='error' />
        </div>
    )
}

export default Update