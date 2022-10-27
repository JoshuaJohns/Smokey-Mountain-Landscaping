import { Outlet, Route, Routes } from "react-router-dom"
import { NewCustomer } from "../auth/NewCustomer"
import { Home } from "../homePage/Home"
import { NavBar } from "../nav/NavBar"
import { EditProfile } from "../Profile/EditProfile"
import { Profile } from "../Profile/Profile"
import { AddReview } from "../Reviews/AddReview"
import { Reviews } from "../Reviews/Reviews"
import { EditReview } from "../Reviews/ReviewsEdit"
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
                <Route path="newCustomer" element={< NewCustomer />} />
                <Route path="services" element={< ServiceList />} />
                <Route path="service/:serviceId" element={< RequestService />} />
                <Route path="profile" element={< Profile />} />
                <Route path="profile/edit" element={< EditProfile />} />
                <Route path="profile/:serviceRequestId" element={< Profile />} />
                <Route path="reviews" element={< Reviews />} />
                <Route path="reviews/add" element={< AddReview />} />
                <Route path="reviews/:reviewsId" element={< EditReview />} />
                {/* <Route path="ticket/create" element={<></>} />
                <Route path="tickets/:ticketId/edit" element={<></>} /> */}
            </Route>
        </Routes>
    )
}
