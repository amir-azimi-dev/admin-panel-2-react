import "./App.scss"

// components
import Sidebar from "./Components/Sidebar/Sidebar"
import Topbar from "./Components/Topbar/Topbar"

function App() {
  return (
    <>
      <Sidebar />
      <main className="main">
        <Topbar />
      </main>
    </>
  )
}

export default App