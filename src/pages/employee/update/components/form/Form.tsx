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
type FormInput = {
    firstname: string;
    lastname: string;
    sex: string;
    birth: string | null;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
    idCardExp: Dayjs | string;
}


interface Props {
    setOpenSuccessNotify: () => void;
    setOpenFailedNotify: () => void;
}
export const namePattern = /^[a-zA-Zก-ฮ]+$/;
export const addressPattern = /^[a-zA-Zก-ฮ0-9\s,.-@]+$/;


const Form = ({ setOpenSuccessNotify, setOpenFailedNotify }: Props) => {
    // const [sex, setSex] = useState('');
    const [isDisable, setIsDisable] = useState<boolean>(true)
    const [dates, setDates] = useState<Dayjs | null>(dayjs())
    const [expDate, setExpDate] = useState<Dayjs | null>(dayjs())
    // const [values, setValues] = useState<FormInput>({
    //     firstname: "",
    //     lastname: "",
    //     sex: "",
    //     birth: "",
    //     address: "",
    //     subDistrict: "",
    //     district: "",
    //     province: "",
    //     idCardExp: ""
    // })
    // const today = dayjs();
    dayjs.extend(utc)
    dayjs.extend(timezone);
    // const { register, handleSubmit } = useForm();

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
            console.log(data, ",,,,,")
            const res = await axios.patch(`http://localhost:3000/api/v1/employee/${params.id}`, data)

            console.log(res)
            // setValues({
            //     firstname: res.data.firstname,
            //     lastname: res.data.lastname,
            //     sex: res.data.sex,
            //     birth: res.data.birth,
            //     address: res.data.address,
            //     subDistrict: res.data.subDistrict,
            //     district: res.data.district,
            //     province: res.data.province,
            //     idCardExp: res.data.idCardExp
            // })
            setIsDisable(true)
            setOpenSuccessNotify()
        } catch (error) {
            console.log(error)
            setOpenFailedNotify()
        }



    }
    useForm({
        defaultValues: async () => {
            const res = await axios.get(`http://localhost:3000/api/v1/employee/${params.id}`)
            console.log(res.data, '<<<< 82')


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
                    // value={getValues("firstname")}
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
                    // value={getValues('lastname')}
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

                {/* <TextField required className='eachInput' id="sex" label="เพศ" variant="outlined" /> */}
                <FormControl
                    className='eachInput'
                    error={!!errors.sex}
                    // defaultValue={getValues('sex')}
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
                            required: false
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
                    {...register('address', { required: "Address is required", pattern: addressPattern })}
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
                    {...register('subDistrict', { required: "Sub-district is required", pattern: addressPattern })}
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
                    {...register('district', { required: "District is required", pattern: addressPattern })}
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
                    {...register('province', { required: "Province is required", pattern: addressPattern })}
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
                            required: false
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