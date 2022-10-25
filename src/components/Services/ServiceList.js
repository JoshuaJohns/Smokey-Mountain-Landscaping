import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Services.css"


export const ServiceList = () => {
    const [services, setServices] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const navigate = useNavigate()




    useEffect(
        () => {
            fetch(`http://localhost:8088/services`)
                .then((response) => response.json())
                .then((servicesArray) => {
                    setServices(servicesArray)
                })
        }, []
    )
    // useEffect(
    //     () => {
    //         const searchedTickets = services.filter(product => {
    //             return product.name.toLowerCase().startsWith(seachTermState.toLowerCase())
    //         })
    //         setFilteredProducts(searchedTickets)
    //     }, [seachTermState, services]
    // )



    return <>
        <h2 className="gerneral-info">General Information</h2>
        <p className="info-p"></p>

        <h2>Services</h2>
        <section className="services-sec" >
            {services.map((product) => {
                return <div className="services-div" key={product.id}>
                    <div><img className="services-img" src={product.image} alt="Image" /></div>
                    <ul className="services-ul">
                        <li className="services-li">{product.name}</li>
                        <li className="services-li">Description</li>
                        <button onClick={() => navigate(`/service/${product.id}`)}>Request Service</button>
                    </ul>
                </div>
            })}
        </section>

    </>

}