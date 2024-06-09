import React, { useEffect, useState } from 'react'
import './style/style.css'
import { Paper } from '@mui/material';

import { DataGrid, GridColDef, GridToolbar, GridLogicOperator, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import axios from 'axios';
import { FormInput } from '../types/employeeType'
import { useNavigate } from "react-router-dom";

const List = () => {

  const [rows, setRows] = useState<FormInput[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const handleDeleteClick = (id: string | number) => () => {
    setIsLoading(true);
    axios.delete(`http://localhost:3000/api/v1/employee/${id}`).then(res => {
      console.log(res.data);
      if (!res.data.id) {
        console.log(res.data)
        setIsLoading(false);
        setRows(rows.filter((row) => row.id !== id));
      } else {
        setIsLoading(false);
      }
    }
    )
  };

  const redirectId = (id: string | number) => () => {
    if (typeof id === 'string') {
      return navigate(`/update/${id}`)
    } else {
      const strId = id.toString()

      return navigate(`/update/${strId}`)
    }

  }


  const options = [{ label: 'มกราคม', value: 'มกราคม' }, { label: 'กุมภาพันธ์', value: 'กุมภาพันธ์' }, { label: 'มีนาคม', value: 'มีนาคม' },
  { label: 'เมษายน', value: 'เมษายน' }, { label: 'พฤษภาคม', value: 'พฤษภาคม' }, { label: 'มิถุนายน', value: 'มิถุนายน' },
  { label: 'กรกฎาคม', value: 'กรกฎาคม' }, { label: 'สิงหาคม', value: 'สิงหาคม' }, { label: 'กันยายน', value: 'กันยายน' },
  { label: 'ตุลาคม', value: 'ตุลาคม' }, { label: 'พฤศจิกายน', value: 'พฤศจิกายน' }, { label: 'ธันวาคม', value: 'ธันวาคม' }]

  const birthDateConvertToBirthMonth = (value: string) => {
    const day = dayjs(value);
    const date = day.date()
    const monthIndex: number = day.month()
    const year = day.year()

    const newValue = `${date} ${options[monthIndex].label} ${year}`

    // console.log(newValue)
    return newValue

  }


  const sexInterpreter = (value: string): string => {
    let result: string | undefined;
    switch (value) {

      case 'male':
        result = 'เพศชาย';
        break;
      case 'female':
        result = 'เพศหญิง';
    }

    return result!;
  }


  const isIdCardExpiredChecker = (date: string): [boolean, string, number] => {

    dayjs.extend(isSameOrBefore)
    const isPass = dayjs().isSameOrBefore(dayjs(date), 'date');
    const returnBoolean = isPass ? 'ปกติ' : 'หมดอายุ';
    const today = dayjs().format("YYYY-MM-DD");

    if (isPass) {
      // ยังไม่หมดอายุ
      const differ = dayjs(date).diff(today, 'day');
      console.log('<<<< 34', isPass, returnBoolean, differ)
      return [isPass, returnBoolean, differ];

    } else {
      // บัตรหมดแล้ว
      const differ = dayjs(today).diff(date, 'day');
      console.log('<<<< 40', isPass, returnBoolean, differ)

      return [isPass, returnBoolean, differ];

    }

  }





  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ลำดับ', filterable: false, width: 70 },
    { field: 'firstname', headerName: 'ชื่อ', filterable: false, width: 130 },
    { field: 'lastname', headerName: 'นามสกุล', filterable: false, width: 130 },
    {
      field: 'sex',
      filterable: false,
      headerName: 'เพศ',
      type: 'string',
      width: 90,
      valueGetter: (value, row) => sexInterpreter(row.sex),

    },
    {
      field: 'birth',
      filterable: true,
      headerName: 'วันเดือนปีเกิด',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      valueGetter: (value, row) => birthDateConvertToBirthMonth(row.birth),
      type: "string",
    },
    {
      field: 'idCardExp',
      headerName: 'วันบัตรหมดอายุ',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      filterable: false,
      width: 160,

    },
    {
      field: 'cardStatus',
      filterable: true,
      headerName: 'สถานะบัตร',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      type: 'singleSelect',//'ปกติ' : 'หมดอายุ';
      valueOptions: [{ label: 'ปกติ', value: 'ปกติ' }, { label: 'หมดอายุ', value: 'หมดอายุ' }],
      valueGetter: (value, row) => isIdCardExpiredChecker(row.idCardExp)[1]


    },
    {
      field: 'address',
      filterable: true,
      headerName: 'ที่อยู่',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      type: 'string',//'ปกติ' : 'หมดอายุ';

      valueGetter: (value, row) => `${row.address} ${row.subDistrict} ${row.district}  ${row.province}`


    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={redirectId(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(params.id)}
        // showInMenu
        />,
      ],
    },
  ];

  const rowss = [
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "1", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "2", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "3", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "4", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "5", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "6", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "7", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "8", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "9", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "10", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "11", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "12", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "13", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "14", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "15", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "16", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "17", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "18", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "19", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "20", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },
    { address: "sdfg", birth: "2024-06-09", district: "sdfg", firstname: "dszf", id: "21", idCardExp: "2024-06-09", lastname: "dsfg", province: "sdfg", sex: "male", subDistrict: "dsfg" },

  ];





  useEffect(() => {
    const getAllEmployee = async () => {
      setIsLoading(true)
      const res = await axios.get('http://localhost:3000/api/v1/employee/')


      console.log(res.data)
      if (res.data) {
        setRows(res.data)
        setIsLoading(false)
      }

    }
    getAllEmployee()
  }, [])
  return (
    <div className='listMain'><Paper elevation={3}>
      <h2 className='headerCreationForm'>ข้อมูลผนักงาน</h2>
      <div className='listGridDataWrap'>
        <DataGrid
          sx={{ width: '90%', marginBottom: '5%' }}
          autoHeight
          rows={rows}
          loading={isLoading}
          columns={columns}
          filterMode="client"
          slots={{ toolbar: GridToolbar }}
          disableColumnSelector={true}
          disableDensitySelector={true}
          slotProps={{
            toolbar: {
              showQuickFilter: false,
            },
            filterPanel: { logicOperators: [GridLogicOperator.And], filterFormProps: {} }
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Paper></div>
  )
}

export default List

/* ลำดับ ,ชื่อ,สกุล,เพศ ที่อยู่ คำนวนอายุ วันเดือนปีเกิด วันบัตรหมดอายุ สถานะบัตร การจัดการ  */