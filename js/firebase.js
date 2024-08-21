import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database"; //

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkzp6EvypKOxPLG6Y95b58MF80iwnKPfc",
  authDomain: "oasis-783c1.firebaseapp.com",
  projectId: "oasis-783c1",
  storageBucket: "oasis-783c1.appspot.com",
  messagingSenderId: "36960403673",
  appId: "1:36960403673:web:db3367a4d3dc1f8a7dfec8",
  measurementId: "G-80936TQC87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

const database = getDatabase(app);

// Function to sign up a new user
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed up
      const user = userCredential.user;
      console.log('User signed up:', user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during sign-up:', errorCode, errorMessage);
      throw error;
    });
  }


// Function to sign in an existing user
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      console.log('User signed in:', user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during sign-in:', errorCode, errorMessage);
      throw error;
    });
}

export function saveProductData(product) {
  const productRef = push(ref(database, 'products')); // 'products' 경로에 새 데이터 추가
  return set(productRef, product)
    .then(() => {
      console.log('Product data saved successfully.');
      return productRef.key; // 저장된 데이터의 고유 키 반환
    })
    .catch((error) => {
      console.error('Error saving product data:', error);
      throw error;
    });
}

export function getAllProducts() {
  const productsRef = ref(database, 'products');
  return new Promise((resolve, reject) => {
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const products = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        resolve(products);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
}
