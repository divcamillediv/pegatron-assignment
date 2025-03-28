import { UserListHandler } from "../contexts/UserListContextProvider";
import { Gender, Occupation } from "../types/types";
import { UserListState } from "./userList";

interface UserState {
  id: number;
  name: string;
  gender: Gender;
  birthday: number;
  occupation: Occupation;
  phoneNumber: number;
  profilePic: string;
}

function getUser(userList: UserListState, UserId: number): UserState {
  const user = userList.users.find(user => user.id === UserId);
  if (user === undefined) {
    throw `No User ${UserId} found in the database.`;
  }

  return user;
}
/*
function insertUser(handler: UserListHandler): UserState {
  const User : UserState = {
    id: handler.userList.autoIncrement,
    name: `User-${handler.userList.autoIncrement}`,
    gender: "Other",
    birthday: 1,
    occupation: "Unemployed",
    phoneNumber: 1234567890,
    profilePic: "default",
  };

  const userList = {
    ...handler.userList,
    autoIncrement: handler.userList.autoIncrement + 1,
    users: [...handler.userList.users, User],
  };

  handler.setUserList(userList);
  return User;
}

function updateUser(handler: UserListHandler, updatedUser: UserState) {
  const userList = {
    ...handler.userList,
    users: handler.userList.users.map(user => user.id === updatedUser.id ? updatedUser : user),
  };

  handler.setUserList(userList);
}

function deleteUser(handler: UserListHandler, UserId: number) {
  const userList = {
    ...handler.userList,
    users: handler.userList.users.filter(user => user.id !== UserId),
  };

  handler.setUserList(userList);
}

export type { UserState };
export { getUser, insertUser, updateUser, deleteUser }; */