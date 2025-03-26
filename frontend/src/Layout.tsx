import Display from "./components/Display"
import Footer from "./components/Footer"
import ToolBar from "./components/ToolBar"
import TabBar from "./components/TabBar"
import DisplayContextProvider from "./contexts/DisplayContextProvider"
import { PaginationContextProvider } from "./contexts/PaginationContextProvider"

const Layout = () => {
  return (
    <PaginationContextProvider>
      <DisplayContextProvider>
        <div className="grid flex-col h-screen p-4">
          <div className="w-3/4 mx-auto flex flex-col gap-2 flex-1">
            <TabBar/>
            <ToolBar/>
            <Display/>
            <Footer/>
          </div>
        </div>
      </DisplayContextProvider>
    </PaginationContextProvider>
  )
}

export default Layout