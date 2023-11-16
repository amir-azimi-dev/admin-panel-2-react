import "./App.scss"

// spa
import { useRoutes } from "react-router-dom"
import routes from "./routes"

// components
import Sidebar from "./Components/Sidebar/Sidebar"
import Topbar from "./Components/Topbar/Topbar"


function App() {
  const router = useRoutes(routes)

  return (
    <>
      <Sidebar />
      <main className="main">
        <Topbar />
        {router}
      </main>
    </>
  )
}

export default App