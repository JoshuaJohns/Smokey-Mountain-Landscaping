import { Outlet, Route, Routes } from "react-router-dom"
import { NewEmployee } from "../auth/NewEmployee"
import { EditEmployee } from "../EmpoyeeProfile/EditEmployee"
import { EmployeeProfile } from "../EmpoyeeProfile/EmployeeProfile"
import { InspectRequest } from "../EmpoyeeProfile/InspectRequest"
import { Home } from "../homePage/Home"
import { NavBar } from "../nav/NavBar"
import { ServiceList } from "../Services/ServiceList"

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

                <Route path="newEmployee" element={< NewEmployee />} />
                <Route path="home" element={< Home />} />
                <Route path="services" element={< ServiceList />} />
                <Route path="profile" element={< EmployeeProfile />} />
                <Route path="employee/edit" element={< EditEmployee />} />
                <Route path="inspect/:requestId" element={< InspectRequest />} />
                <Route path="employees" element={<></>} />
                <Route path="employees/:employeeId" element={<></>} />

            </Route>
        </Routes>
    )
}
