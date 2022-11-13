import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditEmployee = () => {
    // TODO: This state object should not be blank
    const [employee, setEmployee] = useState({
        image: "",
        startDate: '',
        phoneNumber: "",
        fullName: "",
        email: ""

    })


    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&userId=${SmokyUserObject.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const customerObj = data[0]
                    setEmployee(customerObj)
                })
        }, []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const customerObj = {
            image: employee.image,
            startDate: employee.startDate,
            phoneNumber: employee.phoneNumber,
            userId: employee.userId
        }

        const userObj = {
            fullName: employee?.user?.fullName,
            isStaff: employee?.user?.isStaff,
            email: employee?.user?.email

        }

        return fetch(`http://localhost:8088/employees/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8088/users/${SmokyUserObject.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userObj)
                })
                    .then(res => res.json())
            })
            .then(() => {
                navigate("/profile")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">My Profile</h2>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Profile Image Url:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={employee.image}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.image = evt.target.value
                            setEmployee(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Full Name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={employee?.user?.fullName}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.user.fullName = evt.target.value
                            setEmployee(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Email:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={employee?.user?.email}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.user.email = evt.target.value
                            setEmployee(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Start Date:</label>
                <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    value={employee.startDate}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.startDate = evt.target.value
                            setEmployee(copy)
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
                    value={employee.phoneNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.phoneNumber = evt.target.value
                            setEmployee(copy)
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