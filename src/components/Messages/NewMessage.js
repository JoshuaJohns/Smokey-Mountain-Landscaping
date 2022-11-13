import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const NewMessage = () => {
    const [message, setMessage] = useState({
        customerWrote: "",
    })
    const [employees, setEmployees] = useState([])
    const [customer, setCustomer] = useState([])


    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)
    const { employeeId } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?id=${employeeId}`)
                .then((response) => response.json())
                .then((data) => {
                    const customerObj = data[0]
                    setEmployees(customerObj)
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




    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const messageObj = {
            customerId: customer.id,
            employeeId: parseInt(employeeId),
            customerWrote: message.customerWrote,
            employeeWrote: "",
            date: Date.now(),
            customerRead: true,
            employeeRead: false

        }

        const newMessageObj = {
            customerId: customer.id,
            employeeId: parseInt(employeeId),
            name: customer?.user?.fullName,
            date: Date.now(),
            employeeSent: false

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
                        navigate(`/messages/${employeeId}`)

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
                            copy.customerWrote = evt.target.value
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