import './style/form.css'
import { useState } from 'react'
import { TextField, Box, Button, FormControl, FormHelperText, Select, SelectChangeEvent, MenuItem, InputLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import buddhistEra from "dayjs/plugin/buddhistEra";
import axios from 'axios';
import { FormInput } from './constants/type'
import { namePattern, addressPattern } from './constants/const'
import { Props } from './constants/type';
import { useNavigate } from 'react-router-dom';

const Form = ({ setOpenSuccessNotify, setOpenFailedNotify }: Props) => {
    const [sex, setSex] = useState('');
    const [dates, setDates] = useState<Dayjs | null>(dayjs())
    const [expDate, setExpDate] = useState<Dayjs | null>(dayjs())
    const today = dayjs();
    const navigation = useNavigate()
    dayjs.extend(utc)
    dayjs.extend(timezone);
    dayjs.extend(buddhistEra);
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
            const endpoint = import.meta.env.VITE_API
            const res = await axios.post(endpoint, data)
            setOpenSuccessNotify()
            console.log(res)
            setTimeout(() => {
                navigation('/list')
            }, 1200)

        } catch (error) {
            console.log(error)
            setOpenFailedNotify
        }



    }

    return (
        <>
            <h2 data-testId className='headerCreationForm'>เพิ่มข้อมูลผนักงานใหม่</h2>
            <Box
                className='formBox'
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                <TextField
                    // data-testid="firstname"
                    inputProps={{ "data-testid": "firstname" }}
                    error={!!errors.firstname}
                    helperText={errors.firstname ? "Please insert firstname" : null}
                    required {...register('firstname', { required: true, pattern: namePattern })} className='eachInput' id="firstname" label="ชื่อ" variant="outlined" />
                <TextField error={!!errors.lastname}

                    inputProps={{ "data-testid": "lastname" }}
                    helperText={errors.lastname ? "Please insert lastname" : null}
                    required {...register('lastname', { required: true, pattern: namePattern })}
                    className='eachInput' id="lastname" label="นามสกุล" variant="outlined" />

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
                        inputProps={{ "data-testid": "sex" }}
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


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className='eachInput'
                        defaultValue={today}
                        // inputProps={{ "data-testid": "testbirth" }}

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
                    inputProps={{ "data-testid": "address" }}
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address ? "Please insert your address" : null}
                    {...register('address', { required: true, pattern: addressPattern })} />
                <TextField required
                    className='eachInput'
                    id="subDistrict"
                    label="ตำบล"
                    inputProps={{ "data-testid": "subdistrict" }}
                    variant="outlined"
                    error={!!errors.subDistrict}
                    helperText={errors.subDistrict ? "Please insert your sub-district" : null}
                    {...register('subDistrict', { required: true, pattern: addressPattern })}
                />
                <TextField required
                    className='eachInput'
                    id="district"
                    inputProps={{ "data-testid": "districts" }}
                    label="อำเภอ"
                    variant="outlined"
                    error={!!errors.district}
                    helperText={errors.district ? "Please insert your district" : null}
                    {...register('district', { required: true, pattern: addressPattern })}
                />
                <TextField required
                    className='eachInput'
                    id="province"
                    inputProps={{ "data-testid": "province" }}
                    label="จังหวัด"
                    variant="outlined"
                    error={!!errors.province}
                    helperText={errors.province ? "Please insert your province" : null}
                    {...register('province', { required: true, pattern: addressPattern })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker

                        className='eachInput'
                        defaultValue={today}
                        // inputProps={{  }}
                        // slots={{
                        //     "data-testid": "exp"
                        // }}
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
                <Button data-testid="btn" type="submit" className='submitButton' variant="contained" endIcon={<SendIcon />}>
                    Submit
                </Button>
            </Box >
            </>
    )
}

export default Form