import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditReview = () => {
    // TODO: This state object should not be blank.
    const [user, setUser] = useState([])
    const [services, setServices] = useState([])

    const [customer, setCustomer] = useState({
        description: "",
        service: "",
        dateOfService: "",
        rate: 0

    })

    const { reviewsId } = useParams()

    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${SmokyUserObject.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const customerObj = data[0]
                    setUser(customerObj)
                })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews?id=${reviewsId}`)
                .then((response) => response.json())
                .then((data) => {
                    const reviewObj = data[0]
                    setCustomer(reviewObj)
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
            id: customer.id,
            userId: SmokyUserObject.id,
            service: customer.service,
            description: customer.description,
            dateOfService: customer.dateOfService,

        }
        return fetch(`http://localhost:8088/reviews/${reviewsId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewObj)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/reviews")
            })

    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <div>
            Name: {user?.user?.fullName}
        </div>

        <fieldset>
            <div className="form-group">
                <label htmlFor="service-name">What service did you recieve?</label>
                {services.map((service) => {
                    return <div key={service.id} className="select">

                        <label>{service.name}</label>
                        <input
                            name="service-name"
                            type="radio"
                            value={service.name}
                            checked={customer.service === service.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...customer }
                                    copy.service = evt.target.value
                                    setCustomer(copy)
                                }
                            }
                        />
                    </div>
                })}
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Date Of Service:</label>
                <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    value={customer.dateOfService}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.dateOfService = evt.target.value
                            setCustomer(copy)
                        }
                    }></input>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Leave a Comment</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer.description}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.description = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>


        <button
            onClick={(clickEvent) => handleSubmitButton(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}