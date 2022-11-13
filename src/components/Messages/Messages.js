import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Messages.css"


export const Messages = () => {

    const [employees, setEmployees] = useState([])
    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState([])
    const [messsages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState([])



    const navigate = useNavigate()
    const { employeeId } = useParams()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)




    useEffect(
        () => {
            const currentCustomer = customers.filter((customer) => {
                if (customer.userId === SmokyUserObject.id) {
                    setCustomerId(customer)
                }
            })
        }, [customers]
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
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then((response) => response.json())
                .then((data) => {
                    setEmployees(data)
                })
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
    const getAllMessages = () => {

        fetch(`http://localhost:8088/messages?employeeId=${employeeId}&customerId=${customerId.id}`)
            .then((response) => response.json())
            .then((data) => {

                setMessages(data)
            })
    }

    useEffect(
        () => {
            getAllMessages()
        }, [employeeId, customerId]
    )
    const confirmButton = (id) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/newMessages/${id}`, {
                method: "DELETE"
            })
                .then(() => {

                    getAllNewMessages()
                })
        }}
            className="confirm-btn">Confirm</button>

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
                    if (newMessage.customerId === parseInt(customerId.id) & newMessage.employeeSent === true) {
                        return <ul className="newmes-ul" key={newMessage.id}>
                            <li className="newmes-li-delete">{confirmButton(newMessage.id)}</li>
                            <li className="newmes-li">New Message from {newMessage.name}</li>
                        </ul>
                    }
                })}
            </div>
        </aside>
        <div className="div-aside-mes">
            {employees.map((employee) => {
                return <div className="service-btns" key={employee.id}>
                    <button className="all" onClick={() => navigate(`/messages/${employee.id}`)} >{employee?.user?.fullName}</button>
                    {
                        <button className="profile-edit-btn" onClick={() => navigate(`/message/new/${employee.id}`)}>Send a Message</button>
                    }
                </div>
            })}
        </div>
        <div className="mes-div">
            <h1>Messages</h1>
            {messsages.map((message) => {

                return <div className="message-div-1" key={message.id}>
                    {
                        message.customerWrote === ""
                            ? <>

                            </>
                            : <>


                                <ul className="message-div-c">

                                    <li className="meassages-li">{message.customerWrote}</li>
                                    <li className="meassages-li-delete">  {deleteMyMessage(message.id)}</li>

                                </ul>


                            </>
                    }


                    <div className="message-div-2">
                        {
                            message.employeeWrote === ""
                                ? <>



                                </>
                                : <>
                                    <ul className="message-div-e">

                                        <li className="meassages-li">{message.employeeWrote}</li>

                                    </ul>
                                </>
                        }
                    </div>



                </div>
            })}
        </div>


    </>

}