import {
  IUser,
  IUserAddress,
  IUserContact,
  IUserProfile,
  User,
} from "../models/user.model";

const fetchUsers = async () => {
  try {
    return await User.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: 0 },
      { $limit: 10 },
    ]);
  } catch (error) {
    console.log("failed to fetch users; services: ", error);
    throw error;
  }
};

const fetchUserById = async (_id: string) => {
  try {
    return await User.findById(_id);
  } catch (error) {
    console.log("failed to fetch user by Id; services: ", error);
    throw error;
  }
};

const createUser = async (user: IUser) => {
  try {
    const user = await User.create({});

    return user;
  } catch (error) {
    console.log("failed to create user record; service:", error);
    throw error;
  }
};

const udpateUserProfile = (_id: string, userProfile: IUserProfile) => {};
const udpateUserContact = (_id: string, userContact: IUserContact) => {};
const udpateUserAddress = (_id: string, userAddress: IUserAddress) => {};
const suspendUserAccount = (_id: string) => {};

// soft-delete user account
const removeUserAccount = (_id: string) => {};

// restore account within 7 days otherwise account details will removed from database.
const restoreUserAccount = (_id: string) => {};

export {
  createUser,
  fetchUsers,
  fetchUserById,
  udpateUserProfile,
  udpateUserContact,
  udpateUserAddress,
  suspendUserAccount,
  removeUserAccount,
  restoreUserAccount,
};
