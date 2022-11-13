import { Outlet, Route, Routes } from "react-router-dom"
import { NewEmployee } from "../auth/NewEmployee"
import { EmployeeMessages } from "../EmployeeMessages/EmployeeMessages"
import { EmployeeNewMessage } from "../EmployeeMessages/EmployeeNewMessage"
import { EditEmployee } from "../EmpoyeeProfile/EditEmployee"
import { EmployeeProfile } from "../EmpoyeeProfile/EmployeeProfile"
import { InspectRequest } from "../EmpoyeeProfile/InspectRequest"
import { Home } from "../homePage/Home"
import { NavBar } from "../nav/NavBar"
import { Reviews } from "../Reviews/Reviews"
import { AddService } from "../Services/AddService"
import { EditService } from "../Services/EditService"
import { ServiceList } from "../Services/ServiceList"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Smoky Mountain Landscaping</h1>
                    <div><NavBar /></div>
                    <Outlet />
                    <section className="footer-section">
                        <h3 className="footer-h3">Contact Us at the Store Closest to You</h3>
                        <div className="footer-div">
                            <ul className="footer-ul">
                                <li className="footer-li-1">The Knoxville Store:</li>
                                <li className="footer-li">#615-823-8295</li>
                                <li className="footer-li">Volunteer dr, Knoxville</li>
                            </ul>
                            <ul className="footer-ul">
                                <li className="footer-li-1">The Nashville Store:</li>
                                <li className="footer-li">#615-417-6987</li>
                                <li className="footer-li">Trinity Ln, Nashville</li>
                            </ul>
                            <ul className="footer-ul">
                                <li className="footer-li-1">The Springfield Store:</li>
                                <li className="footer-li">#615-766-9125</li>
                                <li className="footer-li">7518 Highway 49E, Springfield</li>
                            </ul>
                        </div>
                        <h4 className="footer-h4">Smoky Mountain Landscaping LLC 2020.</h4>
                        <h5 className="footer-h5">All Rights Reserved</h5>

                    </section>
                </>
            }>

                <Route path="newEmployee" element={< NewEmployee />} />
                <Route path="home" element={< Home />} />
                <Route path="services" element={< ServiceList />} />
                <Route path="service/add" element={< AddService />} />
                <Route path="service/edit/:serviceId" element={< EditService />} />
                <Route path="profile" element={< EmployeeProfile />} />
                <Route path="messages" element={< EmployeeMessages />} />
                <Route path="message/new/:customerId" element={< EmployeeNewMessage />} />
                <Route path="messages/:customerId" element={< EmployeeMessages />} />
                <Route path="employee/edit" element={< EditEmployee />} />
                <Route path="inspect/:requestId" element={< InspectRequest />} />
                <Route path="employees" element={<></>} />
                <Route path="employees/:employeeId" element={<></>} />
                <Route path="reviews" element={< Reviews />} />

            </Route>
        </Routes>
    )
}
