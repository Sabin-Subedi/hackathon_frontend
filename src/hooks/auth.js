import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser, logOutUser } from "../redux/reducers/userSlice";
import store from "../redux/store";
import { addToDatabse, getItem } from "./db";
import { auth, fbOauthProvider, googleOauthProvider } from "./firebase";
import { retrieveUserData } from "./utils/userData";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = retrieveUserData(user);

    store.dispatch(
      loginUser({
        user: userData,
      })
    );

    const { data } = getItem("user", "userId", "==", user.uid);

    console.log(data);
    if (data) {
      store.dispatch(
        loginUser({
          user: data,
        })
      );
    }

    // ...
  } else {
  }
});

export function SignUpWithEmailAndPassword(email, password, displayName) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = retrieveUserData(userCredential.user);

      addToDatabse("user", {
        ...user,
        displayName: displayName,
      });

      store.dispatch(
        loginUser({
          user,
        })
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function signInEmailAndPassword(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = retrieveUserData(userCredential.user);

      store.dispatch(
        loginUser({
          user: retrieveUserData(user),
        })
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return errorMessage;
    });
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      // Signed in

      store.dispatch(logOutUser());
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return errorMessage;
    });
}

export function GoogleAuthUser() {
  signInWithPopup(auth, googleOauthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = retrieveUserData(result.user);

      store.dispatch(
        loginUser({
          user: user,
        })
      );

      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage);
      // ...
    });
}

export function FbAuthUser() {
  signInWithPopup(auth, fbOauthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      store.dispatch(
        loginUser({
          user: user,
        })
      );

      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage);
      // ...
    });
}
