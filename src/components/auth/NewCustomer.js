import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const NewCustomer = () => {


    // TODO: This state object should not be blank
    const [locations, setLocations] = useState([])
    const [customer, setCustomer] = useState({
        image: "",
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
            image: "",
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
            Save Edits
        </button>
    </form>
}
