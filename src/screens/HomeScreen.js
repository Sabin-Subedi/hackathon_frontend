import axios from "axios";
import React, { useCallback, useEffect } from "react";
import DefaultLayout from "../layout/defaultLayout";

function HomeScreen() {
  const call = useCallback(() => {
    axios
      .get("http://localhost:4000/")
      .then((res) => {})
      .catch((err) => {});
  }, []);

  return <DefaultLayout>
      <button onClick={call}>hejak</button>
  </DefaultLayout>;
}

export default HomeScreen;
