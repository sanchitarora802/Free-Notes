import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const [userDetails, setUserDetails] = useState("");

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
