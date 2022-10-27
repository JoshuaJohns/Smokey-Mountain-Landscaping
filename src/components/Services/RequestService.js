import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const RequestService = () => {

    const [locations, setLocations] = useState([])
    const [service, setService] = useState([])
    const [customer, setCustomer] = useState([])

    const [userChoices, update] = useState({

        description: "",
        locationId: 0,
        dateRequested: ""

    })

    const { serviceId } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then((response) => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        }, []
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/services?id=${serviceId}`)
                .then((response) => response.json())
                .then((data) => {
                    const productObj = data[0]
                    setService(productObj)
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

        const locationServiceIdObj = {
            locationId: userChoices.locationId,
            serviceId: service.id
        }

        const serviceRequestsObj = {
            userId: SmokyUserObject.id,
            locationServiceId: 0,
            service: service.name,
            scale: service.scale,
            description: userChoices.description,
            quotePrice: "Pending",
            status: "Pending",
            address: customer.address,
            dateRequested: userChoices.dateRequested,

        }
        return fetch(`http://localhost:8088/locationServices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationServiceIdObj)
        })
            .then(res => res.json())
            .then((locationServiceObj) => {
                serviceRequestsObj.locationServiceId = locationServiceObj.id
            })
            .then(() => {
                fetch(`http://localhost:8088/serviceRequests`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(serviceRequestsObj)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate("/services")
                    })
            })
    }


    return (
        <form className="productForm">
            <h2 className="productForm__title">Requesting {service.name} Service</h2>
            <div>{<b>Quoted By:</b>} {`${service.quotedBy}`}</div>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="price"><b>Description of what you want:</b><br></br>{service.scale}:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Your Description"
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId"><b>What Location are you closest to:</b></label>
                    {locations.map((location) => {
                        return <div key={location.id} className="radio">

                            <label>{location.name}</label>
                            <input
                                name="locationId"
                                type="radio"
                                value={location.id}
                                checked={userChoices.locationId === location.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...userChoices }
                                        copy.locationId = parseInt(evt.target.value)
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
                    <label htmlFor="name">Request Your Service On:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="date"
                        className="form-control"
                        value={userChoices.dateRequested}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.dateRequested = evt.target.value
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
