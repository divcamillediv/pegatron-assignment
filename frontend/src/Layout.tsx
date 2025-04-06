import Display from "./components/Display"
import ToolBar from "./components/ToolBar"
import TabBar from "./components/TabBar"
import Pagination from "./components/Pagination"
import DisplayContextProvider from "./contexts/DisplayContextProvider"
import { PaginationContextProvider } from "./contexts/PaginationContextProvider"
import FormVisibilityProvider from "./contexts/FormVisibilityContextProvider"
import { UserContextProvider } from "./contexts/UserContextProvider"
import UserListContextProvider from "./contexts/UserListContextProvider"

const Layout = () => {
  return (
    <PaginationContextProvider>
      <DisplayContextProvider>
        <FormVisibilityProvider>
          <UserListContextProvider>
            <UserContextProvider>
              <div className="max-h-max max-w-3/4 mx-auto mt-4 flex flex-col gap-2">
              <TabBar/>
              <ToolBar/>
              <Display/>
              <Pagination/>
            </div>
          </UserContextProvider>
        </UserListContextProvider>
      </FormVisibilityProvider>
    </DisplayContextProvider>
  </PaginationContextProvider>
  )
}

export default Layout