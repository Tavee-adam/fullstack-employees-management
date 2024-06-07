import './style/form.css'
import { TextField, Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; const Form = () => {
    return (
        <> <h2>สร้างรายชื่อผนักงาน</h2>
            <Box
                className='formBox'
                component="form"
                // sx={{
                //     '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
            >
                {/* <label>ชื่อ</label> */}
                <TextField className='eachInput' id="firstname" label="ชื่อ" variant="outlined" />
                <TextField className='eachInput' id="lastname" label="นามสกุล" variant="outlined" />
                <TextField className='eachInput' id="sex" label="เพศ" variant="outlined" />
                <TextField className='eachInput' id="birth" label="ว/ด/ป เกิด" variant="outlined" />
                <TextField className='eachInput' id="address" label="ที่อยู่" variant="outlined" />
                <TextField className='eachInput' id="subDistrict" label="ตำบล" variant="outlined" />
                <TextField className='eachInput' id="district" label="อำเภอ" variant="outlined" />
                <TextField className='eachInput' id="province" label="จังหวัด" variant="outlined" />
                <TextField className='eachInput' id="idCardExp" label="วันหมดอายุบัตรประชาชน" variant="outlined" />
                <Button className='submitButton' variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </Box></>
    )
}

export default Form