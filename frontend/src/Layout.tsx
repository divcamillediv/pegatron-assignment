import Display from "./components/Display"
import Footer from "./components/Footer"
import ToolBar from "./components/ToolBar"
import TabBar from "./components/TabBar"
import DisplayContextProvider from "./contexts/DisplayContextProvider"
import { PaginationContextProvider } from "./contexts/PaginationContextProvider"
import FormVisibilityProvider from "./contexts/FormVisibilityContextProvider"
import UserForm from "./components/UserForm"

const Layout = () => {
  return (
    <PaginationContextProvider>
      <FormVisibilityProvider>
        <DisplayContextProvider>
          <div className="max-h-max max-w-3/4 mx-auto mt-4 flex flex-col gap-2">
            <TabBar/>
            <ToolBar/>
            <Display/>
            <Footer/>
          </div>
        </DisplayContextProvider>
      </FormVisibilityProvider>
    </PaginationContextProvider>
  )
}

export default Layout