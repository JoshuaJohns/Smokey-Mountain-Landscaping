import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
    const [customer, setCustomer] = useState([])
    const [requests, setRequest] = useState([])
    const [filteredRequests, setFilteredTickets] = useState([])
    const [accepted, setAccepted] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [pending, setPending] = useState(false)


    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


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
    useEffect(
        () => {
            getAllRequests()
        }, []
    )

    useEffect(
        () => {
            if (accepted) {
                const requestAccepted = requests.filter(request => request.status === "Accepted")
                setFilteredTickets(requestAccepted)
            }
            else if (rejected) {
                const requestRejected = requests.filter(request => request.status === "Rejected")
                setFilteredTickets(requestRejected)
            }
            else if (pending) {
                const requestPending = requests.filter(request => request.status === "Pending")
                setFilteredTickets(requestPending)
            }
            else {
                setFilteredTickets(requests)
            }
        }, [accepted, requests, rejected, pending]
    )

    const getAllRequests = () => {
        fetch(`http://localhost:8088/serviceRequests?_expand=user&userId=${SmokyUserObject.id}`)
            .then((response) => response.json())
            .then((data) => {

                setRequest(data)
            })
    }

    const deleteButton = (requestId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/serviceRequests/${requestId}`, {
                method: "DELETE"
            })
                .then(() => {

                    getAllRequests()
                })
        }}
            className="ticket_finish">DELETE</button>

    }




    return <section>
        <h2 className="profile-h2">My Account</h2>

        <div className="profile-div">
            <img src={customer.image} alt="image"></img>
            <ul className="profile-ul">
                <li className="profile-li">{customer?.user?.fullName}</li>
                <li className="profile-li">{customer?.user?.email}</li>
                <li className="profile-li">{customer?.address}</li>
            </ul>
            <button className="profile-edit-btn" onClick={() => navigate("/profile/edit")}>Edit</button>
        </div>

        <div className="service-btns">
            <button className="all" onClick={() => { setAccepted(false); setRejected(false); setPending(false) }}>All Requests</button>
            <button className="all" onClick={() => { setAccepted(false); setRejected(false); setPending(true) }} >Pending</button>
            <button className="all" onClick={() => { setAccepted(true); setRejected(false); setPending(false) }} >Accepted</button>
            <button className="all" onClick={() => { setAccepted(false); setRejected(true); setPending(false) }} >Rejected</button>


        </div>

        <div className="services-div">
            {filteredRequests.map((request) => {
                return <div className="request-card" key={request.id}>
                    <aside className="card-aside-top">
                        {request.status}
                    </aside>
                    <ul className="card-ul">
                        <li className="card-li">{request?.user?.fullName}</li>
                        <li className="card-li">{request.service}</li>
                        <li className="card-li">{request.address}</li>
                        <li className="card-li">{request.quotePrice}</li>
                        <li className="card-li">{request.description}</li>
                    </ul>
                    <aside className="card-aside-bottom">
                        {request.dateRequested}
                    </aside>
                    {
                        deleteButton(request.id)
                    }
                </div>
            })}
        </div>
    </section>

}