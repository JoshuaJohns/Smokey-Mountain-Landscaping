import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Reviews.css"
export const Reviews = () => {

    const [reviews, setReviews] = useState([])
    const [customer, setCustomer] = useState([])


    const navigate = useNavigate()

    const { reviewsId } = useParams()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${SmokyUserObject.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const customerObj = data[0]
                    setCustomer(customerObj)
                })
        }, []
    )

    const getAllReviews = () => {
        fetch(`http://localhost:8088/reviews`)
            .then((response) => response.json())
            .then((servicesArray) => {
                setReviews(servicesArray)
            })
    }

    useEffect(
        () => {
            getAllReviews()
        }, []
    )

    const deleteButton = (reviewsId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/reviews/${reviewsId}`, {
                method: "DELETE"
            })
                .then(() => {

                    getAllReviews()
                })
        }}
            className="reviews-delete-btn">DELETE</button>

    }

    return <>
        <h2 className="reviews-h2">Customer Reviews</h2>

        <div className="reviews-btns-div">
            {
                SmokyUserObject.staff
                    ? <>


                    </>
                    : <>
                        <button className="add-review" onClick={() => navigate(`/reviews/add`)}>Add Review</button>

                    </>
            }

        </div>
        <section className="reviews-sec" >
            {reviews.map((reviews) => {
                return <div className="reviews-div" key={reviews.id}>
                    <div><img className="reviews-img" src={reviews.image} alt="Image" /></div>

                    <ul className="reviews-ul">
                        <li className="reviews-li-h2"><h2>{reviews.name}</h2></li>
                        <li className="reviews-li"><b>Date Serviced:</b> {reviews.dateOfService}</li>
                        <li className="reviews-li"><b>Service Recieved:</b> {reviews.service}</li>
                        <li className="reviews-li"><b>Review:</b> {reviews.description}</li>
                    </ul>
                    <div className="staff-delete-btn-div">
                        {
                            SmokyUserObject.staff
                                ? <>
                                    {deleteButton(reviews.id)}


                                </>
                                : <>
                                    {/* <button onClick={() => navigate(`/reviews/${reviews.id}`)}>Edit</button> */}

                                </>
                        }
                        {
                            (SmokyUserObject.staff === false & reviews.userId === SmokyUserObject.id)
                                ? <>

                                    <button className="edit-review" onClick={() => navigate(`/reviews/${reviews.id}`)}>Edit</button>


                                </>
                                : <>

                                </>
                        }

                    </div>
                </div>
            })}
        </section>

    </>

}