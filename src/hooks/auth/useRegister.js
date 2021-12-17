import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { registerAPI } from "../../constant/endpoints";

import { loginUser, updateUserProfile } from "../../redux/reducers/userSlice";
import { auth } from "../firebase";
import { retrieveUserData } from "../utils/userData";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const register = useCallback(
    (email, password, displayName) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      axios
        .post(registerAPI, {
          email,
          password,
        })
        .then((res) => {
          
        })
        .finally(() => setLoading(false))
        .catch((err) => {});
    },
    []
  );

  return { loading, error, data, success, register };
}

export default useRegister;
