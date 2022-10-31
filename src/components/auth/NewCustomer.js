import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const NewCustomer = () => {


    // TODO: This state object should not be blank
    const [locations, setLocations] = useState([])
    const [customer, setCustomer] = useState({
        image: "data:image/png;,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",
        address: '',
        phoneNumber: "",
        locationId: 0

    })


    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then((response) => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        }, []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const customerObj = {
            image: customer.image,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            locationId: customer.locationId,
            userId: SmokyUserObject.id
        }

        return fetch(`http://localhost:8088/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/home")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">New Customer</h2>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Profile Image Url:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer.image}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.image = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>


            <div className="form-group">
                <label htmlFor="description">Address:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer.address}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.address = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
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
                            checked={customer.locationId === location.id}
                            onChange={
                                (evt) => {
                                    const copy = { ...customer }
                                    copy.locationId = parseInt(evt.target.value)
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
                <label htmlFor="description">Phone Number:</label>
                <textarea
                    required autoFocus
                    type="nmber"
                    className="form-control"
                    value={customer.phoneNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.phoneNumber = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>

        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Create Account
        </button>
    </form>
}
