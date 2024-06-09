import './styles/nav.css'
import { Link, useLocation } from "react-router-dom";
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDrawerOpen } from "../contexts/slicers/drawerSlicer";
import { useDispatch } from "react-redux";

const Nav = () => {
  const location = useLocation();
  const isSm = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  return (
    <nav className='mainNav'>
      <div className='logo'>EMPLOYEE</div>
      <div className='linklist'>

        <IconButton sx={{ display: isSm ? 'block' : 'none', marginRight: '10%' }} className='burgerIcon' onClick={() => dispatch(setDrawerOpen())}>
          <MenuIcon sx={{ color: 'var(--light-cold-1)' }} />
        </IconButton>
        <Link className={location.pathname === '/list' ? 'thisLink' : 'link'} to={"/list"}>รายชื่อ</Link>

        <Link className={location.pathname === '/create' ? 'thisLink' : 'link'} to={"/create"}>เพิ่ม</Link>

        {/* <Link className={location.pathname === '/list' ? 'link' : 'thisLink'} to={"/update/2"}>แก้ไขข้อมูล</Link> */}



      </div>
    </nav>
  )
}

export default Nav