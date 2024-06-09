import { Drawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectIsDrawerOpen,
    setDrawerClose,
} from "../contexts/slicers/drawerSlicer";
import './styles/myDrawer.css'
const MyDrawer = () => {
    const isOpen = useSelector(selectIsDrawerOpen);
    const dispatch = useDispatch();
    const location = useLocation();
    return (
        <Drawer
            sx={{ width: "250px" }}
            open={isOpen}
            onClose={() => dispatch(setDrawerClose())}
        >
            <section className="drawerBody">

                <Link className={location.pathname === '/list' ? "drawerThisLink" : "drawerLink"} to={"/list"}>รายชื่อ</Link>

                <Link className={location.pathname === '/create' ? "drawerThisLink" : "drawerLink"} to={"/create"}>เพิ่ม</Link>

            </section>
        </Drawer>
    )
}

export default MyDrawer