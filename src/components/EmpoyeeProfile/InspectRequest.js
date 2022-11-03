import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const InspectRequest = () => {




    const [request, setRequest] = useState([])
    const [employee, setEmployee] = useState([])
    const [service, setService] = useState([])


    const [userChoices, update] = useState({

        quotePrice: "",
        status: "",

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
                    fetch(`http://localhost:8088/employess?_expand=user&userId=${SmokyUserObject.id}`)
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
            quotePrice: userChoices.quotePrice,
            status: userChoices.status,
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
                        checked={userChoices.status === "Accepted"}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.status = (evt.target.value)
                                update(copy)
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
                        checked={userChoices.status === "Rejected"}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.status = (evt.target.value)
                                update(copy)
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
                        placeholder="Display Quote"
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.quotePrice = Number(evt.target.value)
                                update(copy)
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