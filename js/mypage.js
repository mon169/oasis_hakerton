import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log('User data:', userData);

        // HTML 요소에 사용자 정보 표시
        const userNameElement = document.getElementById('user-name');
        const userEmailElement = document.getElementById('user-email');
        const userPointsElement1 = document.getElementById('user-points1');
        const userPointsElement2 = document.getElementById('user-points2');


        if (userNameElement) userNameElement.textContent = `${userData.username}`;
        if (userEmailElement) userEmailElement.textContent = `Email: ${userData.email}`;
        if (userPointsElement1) userPointsElement1.textContent = `마일리지: ${userData.points}`;
        if (userPointsElement2) userPointsElement2.textContent = `보유: ${userData.points}`;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("No user is signed in.");
  }
});
