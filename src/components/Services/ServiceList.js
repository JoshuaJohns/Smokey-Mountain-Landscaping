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
    // useEffect(
    //     () => {
    //         const searchedTickets = services.filter(service => {
    //             return service.name.toLowerCase().startsWith(seachTermState.toLowerCase())
    //         })
    //         setFilteredProducts(searchedTickets)
    //     }, [seachTermState, services]
    // )
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
            className="ticket_finish">DELETE</button>

    }



    return <>
        <h2 className="services-h2">Services We Provide</h2>
        {/* <h2 className="gerneral-info">General Information</h2> */}
        <p className="info-p">Below you will see a large variety of services procided by The Mowing Company. We strive to meet
            all of our customers needs and expectations.</p>

        {
            SmokyUserObject.staff
                ? <>
                    <button onClick={() => navigate(`/service/add`)}>Add Service</button>

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
                        <li className="services-li">Description</li>
                    </ul>
                    <div className="btn-div">
                        {
                            SmokyUserObject.staff
                                ? <>
                                    <button onClick={() => navigate(`/service/edit/${service.id}`)}>Edit</button>
                                    {
                                        deleteButton(service.id)
                                    }

                                </>
                                : <>
                                    <button className="request-btn" onClick={() => navigate(`/service/${service.id}`)}>Request Service</button>

                                </>
                        }
                    </div>
                </div>
            })}
        </section>

    </>

}