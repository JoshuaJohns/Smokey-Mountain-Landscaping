import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Services.css"


export const ServiceList = () => {
    const [services, setServices] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const navigate = useNavigate()


    const localSmokyUser = localStorage.getItem("smokey_user")
    const SmokyUserObject = JSON.parse(localSmokyUser)


    useEffect(
        () => {
            getAllServices()
        }, []
    )

    const getAllServices = () => {
        fetch(`http://localhost:8088/services`)
            .then((response) => response.json())
            .then((servicesArray) => {
                setServices(servicesArray)
            })
    }

    const deleteButton = (serviceId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/services/${serviceId}`, {
                method: "DELETE"
            })
                .then(() => {

                    getAllServices()
                })
        }}
            className="service-delete-btn">DELETE</button>

    }



    return <>
        <h2 className="services-h2">Services We Provide</h2>
        <p className="info-p">Below you will see a large variety of services provided by Smoky Mountain Landscaping. We strive to meet
            all of our customers needs and expectations.</p>

        {
            SmokyUserObject.staff
                ? <>
                    <button className="add-ercice-btn" onClick={() => navigate(`/service/add`)}>Add Service</button>

                </>
                : <>
                </>
        }
        <section className="services-sec" >
            {services.map((service) => {
                return <div className="services-div" key={service.id}>
                    <div><img className="services-img" src={service.image} alt="Image" /></div>
                    <ul className="services-ul">
                        <li className="services-name">{service.name}</li>
                        <li className="services-li">{service.description}</li>
                    </ul>
                    {
                        SmokyUserObject.staff
                            ? <>
                                <section className="services-btn-section">
                                    <button className="services-edit-btn" onClick={() => navigate(`/service/edit/${service.id}`)}>Edit</button>
                                    {
                                        deleteButton(service.id)
                                    }

                                </section>
                            </>
                            : <>
                                <button className="request-btn" onClick={() => navigate(`/service/${service.id}`)}>Request Service</button>

                            </>
                    }
                </div>
            })}
        </section>

    </>

}