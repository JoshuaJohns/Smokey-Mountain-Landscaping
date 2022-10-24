import "./home.css"
export const Home = () => {
    return <>

        <div className="welcome-div">

            {/* <aside className="welcome-aside">
                <img className="welcome-img" src="../images/welcome.jpeg"></img>
            </aside> */}
            <p className="welcome-p">
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
                maintenance or trends.</p>
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
                to provide an excellent customer eperience as well as emplyee experience.
            </p>
        </div>
        <hr className="promo-hr"></hr>
        <div className="promo-div">
            <img className="promo-img" src="../images/pool.jpeg"></img>
            <p className="promo-p">
                During our companies period of “Summer Perks”,
                we partner with local pool cleaning companies
                to bring you the best of both worlds by
                providing a cleanpool atmosphere as well as a
                well kept yard. Bundle deals are available upon
                request for a pool cleaning experience as well as
                landscaping/mowing desires.
            </p>
        </div>
    </>
}