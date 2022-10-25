import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const RequestService = () => {
    /* http://localhost:8088/serviceRequests
        {
    "id": 1,
    "userId": 1,
    "locationServiceId": 1,
    "scale": "Per Acre",
    "quotePrice": 40,
    "dateRequested": ""
  }

    */





    const [locations, setLocations] = useState([])
    const { serviceId } = useParams()
    const [userChoices, update] = useState({

        quantity: 0,
        image: "",
        totalPrice: 0

    })
    const [products, setProducts] = useState([])

    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then((response) => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        }, []
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/services?id=${serviceId}`)
                .then((response) => response.json())
                .then((data) => {
                    const productObj = data[0]
                    setProducts(productObj)
                })
        }, []
    )

    const totalPrice = `${products.price * userChoices.quantity}`

    const localKandyUser = localStorage.getItem("smokey_user")
    const KandyUserObject = JSON.parse(localKandyUser)

    const handleSubmitButton = (event) => {
        event.preventDefault()
        const productToSendToAPI = {
            userId: KandyUserObject.id,
            productLocationId: products?.productLocations[0].id,
            totalPrice: parseFloat(totalPrice, 2),
            datePurchased: new Date(),
            quantity: userChoices.quantity,
        }
        return fetch(`http://localhost:8088/servicesRequests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/services")
            })
    }



    return (
        <form className="productForm">
            <h2 className="productForm__title">Requesting {products.name} Service</h2>
            <div>{`${products.name}`}</div>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">{products.scale}:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="How many"
                        value={userChoices.quantity}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.quantity = Number(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Store Location:</label>
                    {locations.map((location) => {
                        return <div key={location.id} className="radio">

                            <label>{location.name}</label>
                            <input
                                name="locationId"
                                type="radio"
                                value={location.id}
                                checked={userChoices.locationId === location.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...userChoices }
                                        copy.locationId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                }
                            />
                        </div>
                    })}
                </div>
            </fieldset>



            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Your address:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="address"
                        className="form-control"
                        value={userChoices.address}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.address = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Request Your Service On:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="date"
                        className="form-control"
                        value={userChoices.date}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Add to Cart
            </button>


        </form>
    )


}
