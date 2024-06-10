import { useEffect, useState } from 'react'
import './style/style.css'
import { Paper } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridLogicOperator, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";
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
      if (!res.data.id) {
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




  const birthDateStringForm = (value: string) => {
    dayjs.extend(buddhistEra);
    dayjs.locale("th");
    const day = dayjs(value).format("DD MMMM BBBB");
    // const date = day.date()
    // const monthIndex: number = day.month()
    // const year = day.year()

    // const newValue = `${date} ${options[monthIndex].label} ${year}`

    return day

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
      return [isPass, returnBoolean, differ];

    } else {
      // บัตรหมดแล้ว
      const differ = dayjs(today).diff(date, 'day');

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
      valueGetter: (value, row) => birthDateStringForm(row.birth),
      type: "string",
    },
    {
      field: 'idCardExp',
      headerName: 'วันบัตรหมดอายุ',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      filterable: false,
      width: 160,//birthDateStringForm
      valueGetter: (value, row) => birthDateStringForm(row.idCardExp),

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
        />,
      ],
    },
  ];







  useEffect(() => {
    const getAllEmployee = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get('http://localhost:3000/api/v1/employee/')


        if (res.data) {
          setRows(res.data)
          setIsLoading(false)
        }
        if (!res) {
          setRows([])
          setIsLoading(false)
        }
      } catch (error) {
        setRows([])
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
