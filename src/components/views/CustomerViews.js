import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../homePage/Home"
import { NavBar } from "../nav/NavBar"
import { EditProfile } from "../Profile/EditProfile"
import { Profile } from "../Profile/Profile"
import { RequestService } from "../Services/RequestService"
import { ServiceList } from "../Services/ServiceList"
import "./Views.css"


export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Smoky Mountain Landscaping</h1>
                    <div><NavBar /></div>
                    <hr></hr>

                    <Outlet />
                </>
            }>

                <Route path="home" element={< Home />} />
                <Route path="services" element={< ServiceList />} />
                <Route path="service/:serviceId" element={< RequestService />} />
                <Route path="profile" element={< Profile />} />
                <Route path="profile/edit" element={< EditProfile />} />
                <Route path="profile/:serviceRequestId" element={< Profile />} />
                <Route path="reviews" element={<></>} />
                {/* <Route path="ticket/create" element={<></>} />
                <Route path="tickets/:ticketId/edit" element={<></>} /> */}
            </Route>
        </Routes>
    )
}
