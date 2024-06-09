import React, { useState, SyntheticEvent, useEffect } from 'react'
import { Alert, Snackbar } from '@mui/material';


interface Props {
    isOpen: boolean;
    text: string;
    type: string
}


const Alerts = ({ isOpen, text, type }: Props) => {
    const [Open, setOpen] = useState(false);

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        isOpen ? setOpen(true) : setOpen(false)
        console.log(isOpen)
    }, [isOpen])

    useEffect(() => { }, [])

    if (type === 'success') {
        return (

            <Snackbar open={Open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {text}
                </Alert>
            </Snackbar>

        )
    } else if (type === 'error') {
        return (

            <Snackbar open={Open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {text}
                </Alert>
            </Snackbar>

        )
    } else if (type === 'info') {
        return (

            <Snackbar open={Open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%', height: '150%' }}
                >
                    {text}
                </Alert>
            </Snackbar>

        )
    } else if (type === 'warning') {
        return (

            <Snackbar open={Open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {text}
                </Alert>
            </Snackbar>

        )
    }

}

export default Alerts