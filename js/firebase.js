import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkzp6EvypKOxPLG6Y95b58MF80iwnKPfc",
  authDomain: "oasis-783c1.firebaseapp.com",
  projectId: "oasis-783c1",
  storageBucket: "gs://oasis-783c1.appspot.com",
  messagingSenderId: "36960403673",
  appId: "1:36960403673:web:db3367a4d3dc1f8a7dfec8",
  measurementId: "G-80936TQC87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage, ref, set, push, onValue, storageRef, uploadBytes, getDownloadURL };

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

// 상품 데이터 등록 함수
export function saveProductData(pageId, product) {
  const productRef = push(ref(database, `products/${pageId}`)); // 각 페이지에 해당하는 경로에 새 데이터 추가
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

export function getAllProducts(pageId, callback) {

  if (!pageId || typeof pageId !== 'string') {
    console.error('Invalid pageId:', pageId);
    return;
}

  const productsRef = ref(database, `products/${pageId}`);
  
  onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    const products = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
    })) : [];
    
    // callback 함수로 결과 전달
    if (typeof callback === 'function') {
      callback(products);
  }
}, (error) => {
    console.error('Error loading products:', error);
});
}

    


