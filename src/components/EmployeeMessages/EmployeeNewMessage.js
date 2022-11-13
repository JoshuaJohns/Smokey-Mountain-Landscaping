import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EmployeeNewMessage = () => {
    const [message, setMessage] = useState({
        employeeWrote: "",
    })
    const [employee, setEmployees] = useState([])
    const [customer, setCustomer] = useState([])


    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)
    const navigate = useNavigate()

    const { customerId } = useParams()


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?id=${customerId}`)
                .then((response) => response.json())
                .then((data) => {
                    const customerObj = data[0]
                    setCustomer(customerObj)
                })
        }, []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&userId=${SmokyUserObject.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const customerObj = data[0]
                    setEmployees(customerObj)
                })
        }, []
    )




    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const messageObj = {
            customerId: customer.id,
            employeeId: employee.id,
            customerWrote: "",
            employeeWrote: message.employeeWrote,
            customerRead: false,
            employeeRead: true,
            date: Date.now()


        }
        const newMessageObj = {
            customerId: parseInt(customerId),
            employeeId: employee.id,
            name: employee?.user?.fullName,
            employeeSent: true,
            date: Date.now(),

        }

        return fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8088/newMessages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newMessageObj)
                })
                    .then(res => res.json())
                    .then((data) => {
                        navigate(`/messages/${customerId}`)


                    })
            })
    }



    return <form className="ticketForm">
        <h2 className="ticketForm__title">Send A Message</h2>

        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Message:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    // value={message.description}
                    onChange={
                        (evt) => {
                            const copy = { ...message }
                            copy.employeeWrote = evt.target.value
                            setMessage(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>


        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Send Message
        </button>
    </form>
}