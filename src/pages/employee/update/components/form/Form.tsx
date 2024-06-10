import './style/form.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

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
import { namePattern, addressPattern } from './constants/const'
import { Props, FormInput } from './constants/type'


const Form = ({ setOpenSuccessNotify, setOpenFailedNotify }: Props) => {
    const [isDisable, setIsDisable] = useState<boolean>(true)
    const [dates, setDates] = useState<Dayjs | null>(dayjs())
    const [expDate, setExpDate] = useState<Dayjs | null>(dayjs())
    dayjs.extend(utc)
    dayjs.extend(timezone);

    const params = useParams()
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

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = form
    const onSubmit = async (data: FormInput) => {
        try {
            data.birth = dates!.locale('th').format('YYYY-MM-DD')
            data.idCardExp = expDate!.locale('th').format('YYYY-MM-DD')
            const endpoint = import.meta.env.VITE_API;
            const res = await axios.patch(`${endpoint}${params.id}`, data)

            console.log(res)
            setIsDisable(true)
            setOpenSuccessNotify()
        } catch (error) {
            console.log(error)
            setOpenFailedNotify()
        }



    }
    useForm({
        defaultValues: async () => {
            const endpoint = import.meta.env.VITE_API;
            const res = await axios.get(`${endpoint}${params.id}`)
           


            if (res.data) {
                setValue('firstname', res.data.firstname)
                setValue('lastname', res.data.lastname)
                setValue('sex', res.data.sex)
                setValue('birth', res.data.birth)
                setValue('address', res.data.address)
                setValue('subDistrict', res.data.subDistrict)
                setValue('district', res.data.district)
                setValue('province', res.data.province)
                setValue('idCardExp', res.data.idCardExp)
            }

        }
    })



    return (
        <>
            <h2 className='headerCreationForm'>แก้ไขข้อมูลผนักงาน</h2>
            <Box
                className='formBox'
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                <TextField
                    disabled={isDisable}
                    error={!!errors.firstname}
                    helperText={errors.firstname ? "Please insert firstname" : null}
                    required
                    placeholder='ชื่อ'
                    {...register('firstname', {
                        required: true,
                        pattern: namePattern
                    })}
                    onChange={(e) => setValue('firstname', e.target.value)}
                    className='eachInput'
                    id="firstname"
                    label="ชื่อ"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    disabled={isDisable}
                    error={!!errors.lastname}
                    placeholder='นามสกุล'
                    helperText={errors.lastname ? "Please insert lastname" : null}
                    required
                    {...register('lastname', { required: true, pattern: namePattern })}
                    onChange={(e) => setValue('lastname', e.target.value)}

                    className='eachInput'
                    id="lastname"
                    label="นามสกุล"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <FormControl
                    className='eachInput'
                    error={!!errors.sex}
                    disabled={isDisable}
                >
                    <InputLabel
                        id="demo-simple-select-label">เพศ</InputLabel>
                    <Select
                        required
                        value={getValues('sex')}
                        {...register('sex', { required: "Sex is required" })}
                        labelId="demo-simple-select-label"
                        id="sex"
                        label="เพศ"
                        onChange={(e: SelectChangeEvent) => { setValue('sex', e.target.value as string) }} >
                        <MenuItem value={'select'} disabled>โปรเลือก</MenuItem>
                        <MenuItem value={'male'} selected={getValues('sex') === 'male' ? true : false} >ชาย</MenuItem>
                        <MenuItem value={'female'} selected={getValues('sex') === 'female' ? true : false}>หญิง</MenuItem>

                    </Select>
                    {!!errors.sex && <FormHelperText>Please select</FormHelperText>}
                </FormControl>


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disabled={isDisable}
                        className='eachInput'
                        defaultValue={dayjs(getValues('birth'))}
                        disableFuture
                        label="วันเกิด"
                        views={['year', 'month', 'day']}
                        format='YYYY-MM-DD'
                        timezone='Asia/Bangkok'
                        required
                        {...register(`birth`, {
                            required: true
                        })}
                        value={dayjs(getValues('birth'))}
                        onChange={e => setDates(e)}
                    />

                </LocalizationProvider>


                <TextField
                    disabled={isDisable}
                    required
                    className='eachInput'
                    id="address"
                    placeholder='ที่อยู่'
                    label="ที่อยู่"
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address ? "Please insert your address" : null}
                    {...register('address', { required: true, pattern: addressPattern })}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    required
                    disabled={isDisable}
                    className='eachInput'
                    id="subDistrict"
                    label="ตำบล"
                    variant="outlined"
                    placeholder='ตำบล'
                    error={!!errors.subDistrict}
                    helperText={errors.subDistrict ? "Please insert your sub-district" : null}
                    {...register('subDistrict', { required: true, pattern: addressPattern })}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    required
                    disabled={isDisable}
                    className='eachInput'
                    id="district"
                    label="อำเภอ"
                    variant="outlined"
                    placeholder='อำเภอ'
                    error={!!errors.district}
                    helperText={errors.district ? "Please insert your district" : null}
                    {...register('district', { required: true, pattern: addressPattern })}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField required
                    disabled={isDisable}
                    className='eachInput'
                    id="province"
                    label="จังหวัด"
                    variant="outlined"
                    placeholder='จังหวัด'
                    error={!!errors.province}
                    helperText={errors.province ? "Please insert your province" : null}
                    {...register('province', { required: true, pattern: addressPattern })}
                    InputLabelProps={{ shrink: true }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disabled={isDisable}
                        className='eachInput'
                        defaultValue={dayjs(getValues('idCardExp'))}
                        label="บัตรประชาชนหมดอายุ"
                        views={['year', 'month', 'day']}
                        format='YYYY-MM-DD'
                        timezone='Asia/Bangkok'
                        {...register('idCardExp', {
                            required: true
                        })}
                        value={dayjs(getValues('idCardExp'))}
                        onChange={e => setExpDate(e)}
                    />
                </LocalizationProvider>
                {!isDisable &&
                    <Button type="submit" className='submitButton' variant="contained" endIcon={<SendIcon />}>
                        Submit
                    </Button>

                }

                {isDisable &&
                    <Button onClick={() => setIsDisable(false)} color="warning" type="submit" className='submitButton' variant="contained" endIcon={<SendIcon />}>
                        Update
                    </Button>}



            </Box></>
    )
}

export default Form