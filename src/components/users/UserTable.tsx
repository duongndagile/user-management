import type { User } from "../../types/user.type";
import { Pagination } from "../common/Pagination";
import React from "react";

interface Props {
  users: User[];
  page: number;
  totalPages: number;
  loadingData: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const UserTable = React.memo(
  ({
    users,
    page,
    totalPages,
    loadingData,
    onPageChange,
    onNextPage,
    onPrevPage,
  }: Props) => {
    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
        <table className="w-full min-w-[800px] min-h-[600px] table-fixed">
          <thead className="text-left text-black">
            <tr>
              <th className="p-3 w-32">Avatar</th>
              <th className="p-3 w-48">Full Name</th>
              <th className="p-3 w-64">Email</th>
              <th className="p-3 w-40">Phone</th>
              <th className="p-3 w-64">Location</th>
            </tr>
          </thead>

          <tbody>
            {loadingData ? (
              <tr>
                <td colSpan={5} className="h-64 text-center align-middle">
                  <span className="text-gray-500 text-lg">Loading data...</span>
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user: User) => (
                <tr
                  key={user.login.uuid}
                  className="border-t hover:bg-gray-50 text-black"
                >
                  <td className="p-3">
                    <img
                      src={user.picture.thumbnail}
                      className="w-10 h-10 rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">
                    {user.name.first} {user.name.last}
                  </td>
                  <td className="p-3 text-blue-600">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">
                    {user.location.city}, {user.location.country}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-64 text-center align-middle">
                  <span className="text-gray-500 text-lg">No data</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      </div>
    );
  }
);
