import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const addToDatabse = (collectionName, data, method) => {
  let success = false;
  let loading = false;
  let error = null;

  loading = true;

  addDoc(collection(db, collectionName), data)
    .then((val) => {
      console.log(val);

      method && method();
    })
    .finally(() => (loading = false))
    .catch((err) => {});
};

export const getItem = (collectionName, field, queryOperator, value) => {
  let success = false;
  let loading = true;
  let error = null;
  let data;
  loading = true;

  const q = query(
    collection(db, collectionName),
    where(field, queryOperator, value)
  );

  getDocs(q)
    .then((val) => {
      val.forEach((doc) => {
        data = doc.data();
      });
    })
    .finally(() => (loading = false))
    .catch((err) => {
      error = err;
      console.log(err);
    });

  return { success, loading, error, data };
};
