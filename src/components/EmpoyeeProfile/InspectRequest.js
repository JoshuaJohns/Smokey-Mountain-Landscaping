import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const InspectRequest = () => {



    const [locations, setLocations] = useState([])
    const [request, setRequest] = useState([])
    const [customer, setCustomer] = useState([])

    const [userChoices, update] = useState({

        quotePrice: "",
        status: "",

    })

    const { requestId } = useParams()
    const { serviceId } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests?_expand=user&id=${requestId}`)
                .then((response) => response.json())
                .then((data) => {
                    const object = data[0]
                    setRequest(object)

                })
        }, []
    )



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



    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)

    const handleSubmitButton = (event) => {
        event.preventDefault()

        const serviceRequestObj = {
            userId: request.userId,
            locationServiceId: request.locationServiceId,
            service: request.service,
            scale: request.scale,
            description: request.description,
            quotePrice: userChoices.quotePrice,
            status: userChoices.status,
            address: request.address,
            dateRequested: request.dateRequested,
            id: request.id
        }
        const employeeTicketObj = {
            userId: SmokyUserObject.id,
            serviceRequestId: request.id
        }

        fetch(`http://localhost:8088/serviceRequests/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceRequestObj)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeTicketObj)
                })
                    .then(res => res.json())
            })
            .then(() => {
                navigate("/profile")
            })
    }


    return (
        <form className="productForm">

            <div className="request-div">
                <ul>
                    <li className="request-li">{request?.user?.fullName}</li>
                    <li className="request-li">{request.address}</li>
                    <li className="request-li">{request.service}</li>
                    <li className="request-li">{request.dateRequested}</li>
                    <li className="request-li">{request.description}</li>
                    <li className="request-li">{request.status}</li>
                    <li className="request-li">{request.quotePrice}</li>
                </ul>
            </div>



            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Choose Status"

                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.status = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Display Quote"
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.quotePrice = Number(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Add to Cart
            </button>


        </form>
    )

}