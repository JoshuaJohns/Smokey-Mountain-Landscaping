import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EmployeeProfile = () => {
    const [employee, setEmployee] = useState([])
    const [requests, setRequests] = useState([])
    const [request, setRequest] = useState([])
    const [filteredRequests, setFilteredTickets] = useState([])
    const [accepted, setAccepted] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [pending, setPending] = useState(false)
    const [myTickets, setMyTickets] = useState(false)


    const { requestId } = useParams()
    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/employess?_expand=user&userId=${SmokyUserObject.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const employeeObj = data[0]
                    setEmployee(employeeObj)
                })
        }, []
    )
    useEffect(
        () => {
            getAllRequests()

            fetch(`http://localhost:8088/serviceRequests?_expand=user&id=${requestId}`)
                .then((response) => response.json())
                .then((data) => {

                    setRequest(data)

                })
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
            else if (myTickets) {
                const userTickets = requests.filter(request => request.inspectedBy === employee?.user?.fullName)
                setFilteredTickets(userTickets)
            }
            else {
                setFilteredTickets(requests)
            }
        }, [accepted, requests, rejected, pending, myTickets]
    )

    const getAllRequests = () => {
        fetch(`http://localhost:8088/serviceRequests?_expand=user`)
            .then((response) => response.json())
            .then((data) => {

                setRequests(data)
            })
    }



    return <section>
        <h2 className="profile-h2">My Account</h2>

        <div className="profile-div">
            <img src={employee.image} alt="image"></img>
            <ul className="profile-ul">
                <li className="profile-li">{employee?.user?.fullName}</li>
                <li className="profile-li">{employee?.user?.email}</li>
                <li className="profile-li">{employee?.startDate}</li>
                <li className="profile-li">{employee?.phoneNumber}</li>
            </ul>
            <button className="profile-edit-btn" onClick={() => navigate("/employee/edit")}>Edit</button>
        </div>

        <div className="service-btns">
            <button className="all" onClick={() => { setAccepted(false); setRejected(false); setPending(false); setMyTickets(false) }}>All Requests</button>
            <button className="all" onClick={() => { setAccepted(false); setRejected(false); setPending(true); setMyTickets(false) }} >Pending</button>
            <button className="all" onClick={() => { setAccepted(true); setRejected(false); setPending(false); setMyTickets(false) }} >Accepted</button>
            <button className="all" onClick={() => { setAccepted(false); setRejected(true); setPending(false); setMyTickets(false) }} >Rejected</button>
            <button className="all" onClick={() => { setAccepted(false); setRejected(false); setPending(false); setMyTickets(true) }} >My Tickets</button>


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
                        myTickets
                            ? <>
                                {
                                    <button>delete</button>
                                }
                            </>
                            : <>

                            </>
                    }
                    <button onClick={() => navigate(`/inspect/${request.id}`)}>inspect Request</button>

                </div>
            })}
        </div>
    </section>

}