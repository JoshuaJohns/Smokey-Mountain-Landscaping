import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AddService = () => {
    //     const [locations, setLocations] = useState()
    const [service, setService] = useState({
        image: "",
        name: '',
        quotedBy: "",
        scale: "",
        basePrice: ""


    })



    const navigate = useNavigate()







    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const serviceObj = {
            image: service.image,
            name: service.name,
            quotedBy: service.quotedBy,
            scale: service.scale,
            basePrice: service.basePrice,
            description: service.description,

        }


        return fetch(`http://localhost:8088/services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceObj)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/services")
            })
    }



    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Service:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    // value={service.name}
                    onChange={
                        (evt) => {
                            const copy = { ...service }
                            copy.name = evt.target.value
                            setService(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Image:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    // value={service.image}
                    onChange={
                        (evt) => {
                            const copy = { ...service }
                            copy.image = evt.target.value
                            setService(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Quoted By:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    // value={service.quotedBy}
                    onChange={
                        (evt) => {
                            const copy = { ...service }
                            copy.quotedBy = evt.target.value
                            setService(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Scale:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    // value={service.scale}
                    onChange={
                        (evt) => {
                            const copy = { ...service }
                            copy.scale = evt.target.value
                            setService(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Base Price:</label>
                <textarea
                    required autoFocus
                    type="number"
                    className="form-control"
                    // value={service.basePrice}
                    onChange={
                        (evt) => {
                            const copy = { ...service }
                            copy.basePrice = Number(evt.target.value)
                            setService(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    // value={service.description}
                    onChange={
                        (evt) => {
                            const copy = { ...service }
                            copy.description = evt.target.value
                            setService(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>


        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Submmit New Service
        </button>
    </form>
}