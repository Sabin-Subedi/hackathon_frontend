export const retrieveUserData = (user) => {
  return {
    displayName: user.displayName,
    userId: user.uid,
    image: user.photoURL,
    phoneNumber: user.phoneNumber,
    email: user.email,
    emailVerified: user.emailVerified,
    id: user.uid,
  };
};
