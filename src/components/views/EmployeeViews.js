import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Smoky Mountain Landscaping</h1>
                    <div><NavBar /></div>
                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<></>} />
                <Route path="profile" element={<></>} />
                <Route path="employees" element={<></>} />
                <Route path="employees/:employeeId" element={<></>} />

            </Route>
        </Routes>
    )
}
