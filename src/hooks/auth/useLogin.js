import { createUserWithEmailAndPassword,} from "firebase/auth";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/userSlice";
import { auth } from "../firebase";
import { retrieveUserData } from "../utils/userData";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const login = useCallback(
    (email, password) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = retrieveUserData(userCredential.user);

          setSuccess(true);

          dispatch(
            loginUser({
              user: retrieveUserData(user),
            })
          );
        })
        .finally(() => setLoading(false))
        .catch((error) => {
          const errorMessage = error.message;

          setError(errorMessage);
        });
    },
    [dispatch]
  );

  return { loading, error, data, success, login };
}

export default useLogin;
