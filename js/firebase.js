import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  increment,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { firebaseConfig } from "./config.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  app,
  auth,
  database,
  storage,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  ref,
  set,
  push,
  onValue,
  storageRef,
  uploadBytes,
  getDownloadURL,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  increment,
};

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function saveProductData(pageId, product) {
  const productRef = push(ref(database, `products/${pageId}`));

  return set(productRef, product).then(() => productRef.key);
}

export function getAllProducts(pageId, callback) {
  if (!pageId || typeof pageId !== "string") {
    console.error("Invalid pageId:", pageId);
    return;
  }

  const productsRef = ref(database, `products/${pageId}`);

  onValue(
    productsRef,
    (snapshot) => {
      const data = snapshot.val();
      const products = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];

      if (typeof callback === "function") {
        callback(products);
      }
    },
    (error) => {
      console.error("Error loading products:", error);
    }
  );
}

export async function updateUserPoints(userId, newPoints) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { points: newPoints });
}
