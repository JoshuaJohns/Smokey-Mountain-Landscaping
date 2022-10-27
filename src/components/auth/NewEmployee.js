import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const NewEmployee = () => {


    // TODO: This state object should not be blank
    const [customer, setCustomer] = useState({
        image: "",
        startDate: '',
        phoneNumber: "",

    })


    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const customerObj = {
            image: "",
            startDate: customer.startDate,
            phoneNumber: customer.phoneNumber,
            userId: SmokyUserObject.id
        }

        return fetch(`http://localhost:8088/employess`, {
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
                <label htmlFor="description">Start Date:</label>
                <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    value={customer.startDate}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.startDate = evt.target.value
                            setCustomer(copy)
                        }
                    }></input>
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
