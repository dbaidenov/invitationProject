import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import useLocalStorage from "./utils/localStorage";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [invitedPersons, setInvitedPersons] = useLocalStorage("invite", []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://reqres.in/api/users");
        if (response.ok !== true)
          throw new Error(`возникла ошибка при запросе!!! ${response.status}`);
        const responseData = await response.json();
        setUsers(responseData.data);
      } catch (error) {
        console.error(error.message);
        console.log("Ошибка при получении пользователя!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {success ? (
        <Success setSuccess={setSuccess} count={invitedPersons.length} />
      ) : (
        <Users
          setSuccess={setSuccess}
          items={users}
          isLoading={isLoading}
          invitedPersons={invitedPersons}
          setInvitedPersons={setInvitedPersons}
        />
      )}
    </div>
  );
}

export default App;
