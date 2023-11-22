import { useEffect, useState } from "react";

const getFromLocalStorage = function (invite, defaultValue) {
  const data = localStorage.getItem(invite);
  const parsedData = JSON.parse(data);
  return parsedData || defaultValue;
};

const useLocalStorage = function (invite, defaultValue) {
  const [invitedPersons, setInvitedPersons] = useState(() => {
    return getFromLocalStorage(invite, defaultValue);
  });
  useEffect(() => {
    localStorage.setItem(invite, JSON.stringify(invitedPersons));
  }, [invitedPersons, invite]);

  return [invitedPersons, setInvitedPersons];
};

export default useLocalStorage;
