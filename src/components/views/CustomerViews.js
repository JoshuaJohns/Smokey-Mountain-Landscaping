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


            </Route>
        </Routes>

    )
}
