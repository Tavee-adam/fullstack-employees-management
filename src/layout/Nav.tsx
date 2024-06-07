import './styles/nav.css'
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className='mainNav'>
      <div className='logo'>EMPLOYEE</div>
      <div className='linklist'>

        <Link className='link' to={"/list"}>รายชื่อ</Link>

        <Link className='link' to={"/create"}>สร้างรายการ</Link>

        <Link className='link' to={"/update"}>แก้ไขข้อมูล</Link>

      </div>
    </nav>
  )
}

export default Nav