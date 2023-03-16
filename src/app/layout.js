import Home  from "./page"
import "../../styles/globals.css";
import {ToDoListProvider} from "../../context/ToDoListapp";
const RootLayout = () => (
  <html>
    <body>
      <ToDoListProvider>
        <Home />
      </ToDoListProvider>
    </body>
  </html>
)
export default RootLayout;