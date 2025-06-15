import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserState from "./contexts/user/userState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserState>
    <App />
  </UserState>
);
