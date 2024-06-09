import './style/form.css'
import React, { useEffect, useState } from 'react'
import { TextField, Box, Button, FormControl, FormHelperText, Select, SelectChangeEvent, MenuItem, InputLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axios from 'axios';
type FormInput = {
    firstname: string;
    lastname: string;
    sex: string;
    birth: string | null;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
    idCardExp: string;
}

export const namePattern = /^[a-zA-Zก-ฮ]+$/;
export const addressPattern = /^[a-zA-Zก-ฮ0-9\s,.-@]+$/;

const Form = () => {
    const [sex, setSex] = useState('');
    const [dates, setDates] = useState<Dayjs | null>(dayjs())
    const [expDate, setExpDate] = useState<Dayjs | null>(dayjs())
    const today = dayjs();
    dayjs.extend(utc)
    dayjs.extend(timezone);
    // const { register, handleSubmit } = useForm();
    const form = useForm<FormInput>(
        {
            defaultValues: {
                firstname: "",
                lastname: "",
                sex: "",
                birth: "",
                address: "",
                subDistrict: "",
                district: "",
                province: "",
                idCardExp: ""
            }
        }
    )

    const { register, handleSubmit, formState: { errors }, } = form
    const onSubmit = async (data: FormInput) => {
        try {
            data.birth = dates!.locale('th').format('YYYY-MM-DD')
            data.idCardExp = expDate!.locale('th').format('YYYY-MM-DD')
            console.log(data, ",,,,,")
            const res = await axios.post('http://localhost:3000/api/v1/employee/', data)

            console.log(res)
        } catch (error) {
            console.log(error)
        }



    }

    useEffect(() => { console.log(dates) }, [dates])
    return (
        <>
            <h2 className='headerCreationForm'>เพิ่มข้อมูลผนักงานใหม่</h2>
            <Box
                className='formBox'
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                <TextField
                    error={!!errors.firstname}
                    helperText={errors.firstname ? "Please insert firstname" : null}
                    required {...register('firstname', { required: "Firstname is required", pattern: namePattern })} className='eachInput' id="firstname" label="ชื่อ" variant="outlined" />
                <TextField error={!!errors.lastname}
                    helperText={errors.lastname ? "Please insert lastname" : null}
                    required {...register('lastname', { required: "Lastname is required", pattern: namePattern })}
                    className='eachInput' id="lastname" label="นามสกุล" variant="outlined" />

                {/* <TextField required className='eachInput' id="sex" label="เพศ" variant="outlined" /> */}
                <FormControl
                    className='eachInput'
                    error={!!errors.sex}
                >
                    <InputLabel
                        id="demo-simple-select-label">เพศ</InputLabel>
                    <Select
                        required
                        {...register('sex', { required: "Sex is required" })}
                        labelId="demo-simple-select-label"
                        id="sex"
                        value={sex}
                        label="เพศ"
                        onChange={(e: SelectChangeEvent) => setSex(e.target.value as string)}
                    >
                        <MenuItem value={'select'} disabled selected>โปรเลือก</MenuItem>
                        <MenuItem value={'male'}>ชาย</MenuItem>
                        <MenuItem value={'female'}>หญิง</MenuItem>

                    </Select>
                    {!!errors.sex && <FormHelperText>Please select</FormHelperText>}
                </FormControl>

                {/* <TextField required className='eachInput' id="birth" label="ว/ด/ป เกิด" variant="outlined" /> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className='eachInput'
                        defaultValue={today}
                        disableFuture
                        label="วันเกิด"
                        views={['year', 'month', 'day']}
                        format='YYYY-MM-DD'
                        timezone='Asia/Bangkok'
                        value={dates}
                        required
                        {...register(`birth`, {
                            required: false
                        })}
                        onChange={e => setDates(e)}





                    />

                </LocalizationProvider>


                <TextField required
                    className='eachInput'
                    id="address"
                    label="ที่อยู่"
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address ? "Please insert your address" : null}
                    {...register('address', { required: "Address is required", pattern: addressPattern })} />
                <TextField required
                    className='eachInput'
                    id="subDistrict"
                    label="ตำบล"
                    variant="outlined"
                    error={!!errors.subDistrict}
                    helperText={errors.subDistrict ? "Please insert your sub-district" : null}
                    {...register('subDistrict', { required: "Sub-district is required", pattern: addressPattern })}
                />
                <TextField required
                    className='eachInput'
                    id="district"
                    label="อำเภอ"
                    variant="outlined"
                    error={!!errors.district}
                    helperText={errors.district ? "Please insert your district" : null}
                    {...register('district', { required: "District is required", pattern: addressPattern })}
                />
                <TextField required
                    className='eachInput'
                    id="province"
                    label="จังหวัด"
                    variant="outlined"
                    error={!!errors.province}
                    helperText={errors.province ? "Please insert your province" : null}
                    {...register('province', { required: "Province is required", pattern: addressPattern })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className='eachInput'
                        defaultValue={today}
                        label="บัตรประชาชนหมดอายุ"
                        views={['year', 'month', 'day']}
                        format='YYYY-MM-DD'
                        timezone='Asia/Bangkok'
                        value={expDate}
                        {...register('idCardExp', {
                            required: false
                        })}
                        onChange={e => setExpDate(e)}
                    />
                </LocalizationProvider>
                <Button type="submit" className='submitButton' variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </Box ></>
    )
}

export default Form