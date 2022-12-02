import { collection, query, where, getDocs } from "firebase/firestore";

import database from "./Fbdatabase";

const q = query(
  collection(database, "expenses"),
  where("category", "==", "Food")
);

const docsSnap = await getDocs(q);

docsSnap.forEach((doc) => {
  console.log(doc.data());
});
