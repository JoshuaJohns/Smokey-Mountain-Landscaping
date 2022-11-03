import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const AddReview = () => {

    const [customer, setCustomer] = useState([])
    const [services, setServices] = useState([])

    const [userChoices, update] = useState({

        description: "",
        service: "",
        dateOfService: "",
        rate: 0

    })


    const { serviceId } = useParams()
    const navigate = useNavigate()


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

    useEffect(
        () => {
            fetch(`http://localhost:8088/services`)
                .then((response) => response.json())
                .then((servicesArray) => {
                    setServices(servicesArray)
                })
        }, []
    )


    const handleSubmitButton = (event) => {
        event.preventDefault()

        const reviewObj = {
            image: customer.image,
            userId: SmokyUserObject.id,
            service: userChoices.service,
            description: userChoices.description,
            dateOfService: userChoices.dateOfService,
            name: customer?.user?.fullName

        }
        return fetch(`http://localhost:8088/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewObj)
        })
            .then(res => res.json())
            .then((createdObj) => {
                navigate("/reviews")
            })

    }



    return <form className="ticketForm">
        <h2 className="ticketForm__title">Leave A Review</h2>
        <div>
            <b> Name:</b> {customer?.user?.fullName}
        </div>

        <fieldset>
            <div className="form-group">
                <label htmlFor="service-name"><b>What service did you recieve?</b></label>
                {services.map((service) => {
                    return <div key={service.id} className="select">

                        <label>{service.name}</label>
                        <input
                            name="service-name"
                            type="radio"
                            value={service.name}
                            checked={userChoices.service === service.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...userChoices }
                                    copy.service = evt.target.value
                                    update(copy)
                                }
                            }
                        />
                    </div>
                })}
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name"><b>Date Of Service:</b></label>
                <input
                    required autoFocus
                    name="name"
                    type="date"
                    className="form-control"
                    value={userChoices.dateOfService}
                    onChange={
                        (evt) => {
                            const copy = { ...userChoices }
                            copy.dateOfService = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name"><b>Leave a Coment:</b></label>
                <input
                    required autoFocus
                    name="name"
                    type="text"
                    className="form-control"
                    value={userChoices.description}
                    onChange={
                        (evt) => {
                            const copy = { ...userChoices }
                            copy.description = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>


        <button
            onClick={(clickEvent) => handleSubmitButton(clickEvent)}
            className="btn btn-primary">
            Submit Review
        </button>
    </form>

}