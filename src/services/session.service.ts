interface PayloadI {
  _id: string;
  username: string;
  firstName: string;
  email: string;
  avatar: string;
}

const createSession = (payload: PayloadI) => {};
const getSession = () => {};
const restoreSession = () => {};
const removeSession = () => {};

export { createSession, getSession, removeSession, restoreSession };
