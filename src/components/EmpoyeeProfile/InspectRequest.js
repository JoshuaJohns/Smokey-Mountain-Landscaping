import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const InspectRequest = () => {




    const [reqest, setReqt] = useState([])
    const [employee, setEmployee] = useState([])
    const [service, setService] = useState([])


    const [request, setRequest] = useState({

        quotePrice: "",
        status: "",
        dateRequested: "",

    })

    const { requestId } = useParams()
    const { serviceId } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests?_expand=user&_expand=locationService&id=${requestId}`)
                .then((response) => response.json())
                .then((data) => {
                    const object = data[0]
                    setRequest(object)

                }).then(() => {
                    fetch(`http://localhost:8088/employees?_expand=user&userId=${SmokyUserObject.id}`)
                        .then((response) => response.json())
                        .then((data) => {
                            const employeeObj = data[0]
                            setEmployee(employeeObj)
                        })

                })
        }, []
    )




    useEffect(() => {
        fetch(`http://localhost:8088/services?id=${request?.locationService?.serviceId}`)
            .then((response) => response.json())
            .then((data) => {
                const serviceOnj = data[0]
                setService(serviceOnj)
            })

    }, [request]
    )








    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)

    const handleSubmitButton = (event) => {
        event.preventDefault()

        const serviceRequestObj = {
            userId: request.userId,
            locationServiceId: request.locationServiceId,
            service: request.service,
            scale: request.scale,
            description: request.description,
            quotePrice: request.quotePrice,
            status: request.status,
            address: request.address,
            dateRequested: request.dateRequested,
            inspectedBy: employee?.user?.fullName,
            id: request.id

        }


        fetch(`http://localhost:8088/serviceRequests/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceRequestObj)
        })
            .then(res => res.json())

            .then(() => {
                navigate("/profile")
            })
    }


    return (
        <form className="productForm">
            <h2 className="ticketForm__title">Inspecting Request</h2>
            <div className="request-div">
                <ul>
                    <li className="request-li"><b>Customer:</b> {request?.user?.fullName}</li>
                    <li className="request-li"><b>Address:</b> {request.address}</li>
                    <li className="request-li"><b>Service:</b> {request.service}</li>
                    <li className="request-li"><b>Scale For Service:</b>{service?.quotedBy}</li>
                    <li className="request-li"><b>Description:</b> {request.description}</li>
                    <li className="request-li"><b>Date Requested:</b> {request.dateRequested}</li>
                    <li className="request-li"><b>Status:</b> {request.status}</li>
                </ul>
            </div>



            <fieldset>
                <div className="form-group">

                    <label>Accepted</label>
                    <input
                        name="status"
                        type="radio"
                        value="Accepted"
                        checked={request.status === "Accepted"}
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.status = (evt.target.value)
                                setRequest(copy)
                            }
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Pending</label>
                    <input
                        name="status"
                        type="radio"
                        value="Pending"
                        checked={request.status === "Pending"}
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.status = (evt.target.value)
                                setRequest(copy)
                            }
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Rejected</label>
                    <input
                        name="status"
                        type="radio"
                        value="Rejected"
                        checked={request.status === "Rejected"}
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.status = (evt.target.value)
                                setRequest(copy)
                            }
                        }
                    />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        value={request.quotePrice}
                        placeholder="Display Quote"
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.quotePrice = Number(evt.target.value)
                                setRequest(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={request.dateRequested}
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.dateRequested = evt.target.value
                                setRequest(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Submit Response
            </button>


        </form>
    )

}