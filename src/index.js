
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Landscaping } from "./Landscaping"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Landscaping />
  </BrowserRouter>
)

