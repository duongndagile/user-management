import React from "react";
import type { User } from "../../types/user.type";

interface Props {
  user: User;
}

export const UserCard = React.memo(({ user }: Props) => {
  return (
    <div className="flex flex-1 gap-4 p-4 rounded-lg shadow-md">
      <img
        src={user.picture.medium}
        alt="avatar"
        className="w-16 h-16 rounded-full"
      />

      <div>
        <h3 className="font-semibold">
          {user.name.first} {user.name.last}
        </h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm">
          {user.phone}
        </p>
      </div>
    </div>
  );
});
