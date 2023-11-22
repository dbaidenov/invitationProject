import React, { useState } from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const Users = ({
  items,
  isLoading,
  setSuccess,
  invitedPersons,
  setInvitedPersons,
}) => {
  const onClickInvite = function (id) {
    if (invitedPersons.includes(id)) {
      setInvitedPersons((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvitedPersons((prev) => [...prev, id]);
    }
  };

  const [findPerson, setFindPerson] = useState("");

  const filterPerson = function (value) {
    const lowerCasedValue = value.toLowerCase().replace(" ", "");
    const updatedItems = items.filter((obj) => {
      const fullName = (obj.first_name + obj.last_name)
        .replace(" ", "")
        .toLowerCase();
      if (
        fullName.includes(lowerCasedValue) ||
        obj.email.toLowerCase().includes(lowerCasedValue)
      )
        return true;
      else return false;
    });

    return updatedItems;
  };

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={findPerson}
          onChange={(e) => {
            setFindPerson(e.target.value);
          }}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {filterPerson(findPerson).map((value, index) => (
            <User
              onClickInvite={onClickInvite}
              isInvited={invitedPersons.includes(value.id)}
              key={index}
              item={value}
            />
          ))}
        </ul>
      )}
      {invitedPersons.length > 0 && (
        <button
          onClick={() => {
            setSuccess(true);
          }}
          className="send-invite-btn"
        >
          Отправить приглашение
        </button>
      )}
    </>
  );
};
