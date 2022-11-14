import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./home.css"
export const Home = () => {


    const [locations, setLocations] = useState([])

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








    return <>

        <div className="welcome-div">

            {/* <aside className="welcome-aside">
                <img className="welcome-img" src="../images/welcome.jpeg"></img>
            </aside> */}
            <div className="welcome-p">
                <h2 className="welcome-h2">Welcome</h2>
                Welcome to Smoky Mountain Landscaping! We
                strive to put our best foot forward when
                completing all of your yard maintenance
                needs. We offer a large variety of services
                that are designed to satisfy our customers
                both financially and visually. Our perfessonal
                team strives to understand each customers
                desires and ambitions for future yard
                architecture as well as current yard
                maintenance or trends.</div>
        </div>
        <hr className="jobs-hr"></hr>
        <h2 className="jobs-h2">Previous Jobs</h2>
        <div className="jobs-div">
            <div className="jobs-img-div">
                <img className="jobs-img" src="../images/wall.jpeg"></img>
                <img className="jobs-img" src="../images/circle.jpeg"></img>
                <img className="jobs-img" src="../images/rock.jpeg"></img>
            </div>
            <p className="jobs-p">
                Backed by the Better Business Bureau, our professional landscaping demonstartions have landed us
                on the path for success. Our collective team of professionals can work around your schedule in order
                to provide an excellent customer experience as well as emplyee experience.
            </p>
        </div>
        <hr className="locations-hr"></hr>
        <h2 className="locations-h2">Locations</h2>
        <section className="locations-sec">
            {locations.map((location) => {
                return <div className="locations-div" key={location.id}>
                    <img className="locations-img" src={location.image}></img>
                    <ul className="locations-ul">
                        <li className="locations-li">{location.name}</li>
                        <li className="locations-li">{location.address}</li>
                        <li className="locations-li">{location.number}</li>
                    </ul>
                </div>
            })}
        </section>
        <div className="to-services-div">
            <button className="to-services" onClick={() => navigate(`/services`)}>To Services</button>

        </div>
    </>
}