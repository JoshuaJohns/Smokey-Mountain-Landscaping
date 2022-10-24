import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../homePage/Home"
import { NavBar } from "../nav/NavBar"
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
                <Route path="locations" element={<></>} />
                <Route path="services" element={<></>} />
                <Route path="profile" element={<></>} />
                <Route path="reviews" element={<></>} />
                {/* <Route path="ticket/create" element={<></>} />
                <Route path="tickets/:ticketId/edit" element={<></>} /> */}
            </Route>
        </Routes>
    )
}
