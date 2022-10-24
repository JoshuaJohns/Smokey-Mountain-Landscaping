import { Route, Routes } from "react-router-dom"
import "./Landscaping.css"
import { Authorized } from "./components/views/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { ApplicationViews } from "./components/views/ApplicationViews"


export const Landscaping = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <>

                    <ApplicationViews />
                </>
            </Authorized>

        } />
    </Routes>
}

