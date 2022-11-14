import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Profile.css"


export const EditProfile = () => {
    // TODO: This state object should not be blank
    const [images, setImages] = useState([])
    const [customer, setCustomer] = useState({
        image: "",
        address: '',
        phoneNumber: "",
        fullName: "",
        email: ""

    })


    const navigate = useNavigate()
    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/images`)
                .then((response) => response.json())
                .then((imagesArray) => {
                    setImages(imagesArray)
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

        const customerObj = {
            image: customer.image,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            userId: customer.userId
        }

        const userObj = {
            fullName: customer?.user?.fullName,
            isStaff: customer?.user?.isStaff,
            email: customer?.user?.email
        }

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
            .then(res => res.json())
            .then(() => {
                fetch(`http://localhost:8088/users/${SmokyUserObject.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userObj)
                })
                    .then(res => res.json())
            })
            .then(() => {
                navigate("/profile")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">My Profile</h2>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Profile Image Url:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer.image}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.image = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-images">

                {images.map((image) => {
                    return <div key={image.id} className="radio">

                        <label className="label-img"> <img className="form-profile-img" src={image.image} alt="image"></img></label>
                        <input
                            name="image"
                            type="radio"
                            value={image.image}
                            checked={customer.image === image.image}
                            onChange={
                                (evt) => {
                                    const copy = { ...customer }
                                    copy.image = (evt.target.value)
                                    setCustomer(copy)
                                }
                            }
                        />
                    </div>
                })}
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Full Name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer?.user?.fullName}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.user.fullName = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Email:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer?.user?.email}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.user.email = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Address:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={customer.address}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.address = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <fieldset>

            <div className="form-group">
                <label htmlFor="description">Phone Number:</label>
                <textarea
                    required autoFocus
                    type="nmber"
                    className="form-control"
                    value={customer.phoneNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.phoneNumber = evt.target.value
                            setCustomer(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>

        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}