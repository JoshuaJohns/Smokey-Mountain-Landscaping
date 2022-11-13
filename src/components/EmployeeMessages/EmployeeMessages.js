import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Messages.css"


export const EmployeeMessages = () => {

    const [customers, setCustomers] = useState([])
    const [employeeId, setEmployeeId] = useState([])
    const [employees, setEmployess] = useState([])
    const [messsages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState([])



    const navigate = useNavigate()
    const { customerId } = useParams()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)

    const getAllMessages = () => {
        fetch(`http://localhost:8088/messages?employeeId=${employeeId}&customerId=${customerId}`)
            .then((response) => response.json())
            .then((data) => {
                setMessages(data)
            })

    }
    useEffect(
        () => {
            getAllMessages()
        }, [customerId, employeeId]
    )

    const getAllNewMessages = () => {
        fetch(`http://localhost:8088/newMessages`)
            .then((response) => response.json())
            .then((data) => {
                setNewMessages(data)

            })

    }

    useEffect(
        () => {
            getAllNewMessages()
        }, []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then((response) => response.json())
                .then((data) => {
                    setCustomers(data)
                })
        }, []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then((response) => response.json())
                .then((data) => {
                    setEmployess(data)

                })
        }, []
    )
    useEffect(
        () => {
            const currentEmployee = employees.filter((employee) => {
                if (employee.userId === SmokyUserObject.id) {
                    setEmployeeId(employee.id)
                }
            })
        }, [employees]
    )
    const deleteButton = (newMessageId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/newMessages/${newMessageId}`, {
                method: "DELETE"
            })
                .then(() => {

                    getAllNewMessages()
                })
        }}
            className="service-delete">Confirm</button>

    }
    const deleteMyMessage = (newMessageId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/messages/${newMessageId}`, {
                method: "DELETE"
            })
                .then(() => {

                    getAllMessages()
                })
        }}
            className="service-delete">Delete</button>

    }


    return <>

        <h1>Contacts</h1>

        <aside className="newmes-aside">
            <div className="newmes-div">
                {newMessages.map((newMessage) => {
                    if (newMessage.employeeId === parseInt(employeeId) & newMessage.employeeSent === false) {
                        return <ul className="newmes-ul" key={newMessage.id}>
                            <li className="newmes-li-delete">{deleteButton(newMessage.id)}</li>
                            <li className="newmes-li">New Message from {newMessage.name}</li>
                        </ul>
                    }
                })}
            </div>
        </aside>

        <div className="div-aside-mes">


            {customers.map((customer) => {
                return <section className="service-btns" key={customer.id}>



                    <button className="all" onClick={() => navigate(`/messages/${customer.id}`)}>

                        {customer?.user?.fullName}

                    </button>

                    {
                        <button className="send-mes" onClick={() => navigate(`/message/new/${customer.id}`)}>Send a Message</button>
                    }

                </section>
            })}
        </div>
        <div className="mes-div">
            <h1>Messages</h1>
            {messsages.map((message) => {
                return <div className="message-div-1" key={message.id}>
                    <div className="from-div">
                        {
                            message.customerWrote === ""
                                ? <>

                                </>
                                : <>



                                    <ul className="message-div-e">

                                        <li className="meassages-li">{message.customerWrote}</li>

                                    </ul>


                                </>
                        }

                    </div>
                    <div className="message-div-2">
                        {
                            message.employeeWrote === ""
                                ? <>



                                </>
                                : <>
                                    <ul className="message-div-c">

                                        <li className="meassages-li">{message.employeeWrote}</li>
                                        <li className="meassages-li-delete">  {deleteMyMessage(message.id)}</li>
                                    </ul>

                                </>
                        }
                    </div>

                </div>
            })}
        </div>


    </>


}