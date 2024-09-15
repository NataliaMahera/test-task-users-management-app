import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllUsers } from '../../redux/users/usersApi';
import {
  filteredUsersSelector,
  selectError,
  selectIsLoading,
} from '../../redux/users/userSelectors';
import { Loader } from '../Loader/Loader';
import { TABLE_HEADERS } from '../../constants/constants';

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredUsers = useSelector(filteredUsersSelector);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const hasResults = filteredUsers.length > 0;

  return (
    <section>
    {isLoading && <Loader />}
    {error !== null && <p>Sorry, something went wrong: {error.message}</p>}
    {!hasResults && !isLoading && !error && (
      <h2 className="text-red-500 mb-4 font-medium text-lg">No results found</h2>
    )}
    {hasResults && (
      <div className="rounded-lg selection:py-10 px-2 sm:px-10 bg-gray-100 mb-11">
        <table className="hidden sm:table py-3 table-auto w-full border-separate border-spacing-x-2 border-spacing-y-3">
          <thead>
            <tr className="text-m font-light text-gray-900">
              {TABLE_HEADERS.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                className="h-14 text-center text-gray-900 bg-white"
                key={user.id}
              >
                <td className="text-xs font-medium text-blue-700 rounded-l border-l-4 border-blue-700">
                  {user.name}
                </td>
                <td className="text-xs font-medium text-green-700 rounded-l border-l-4 border-green-700">
                  {user.username}
                </td>
                <td className="text-xs font-medium text-orange-500 rounded-l border-l-4 border-orange-500">
                  {user.email}
                </td>
                <td className="text-xs font-medium text-purple-500 rounded-l border-l-4 border-purple-500">
                  {user.phone.split(' ')[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile view */}
        <div className="sm:hidden space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Name:</span>
                <span className="text-xs font-medium text-blue-700">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Username:</span>
                <span className="text-xs font-medium text-green-700">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Email:</span>
                <span className="text-xs font-medium text-orange-500">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-700">Phone:</span>
                <span className="text-xs font-medium text-purple-500">{user.phone.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
  );
};

export default UserTable;
