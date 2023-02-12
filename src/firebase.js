import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  getDocFromCache 
 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJWGclqoyj9uhajyzaDV9qQEPji4k7q4E",
  authDomain: "tutorspace-7a7f1.firebaseapp.com",
  projectId: "tutorspace-7a7f1",
  storageBucket: "tutorspace-7a7f1.appspot.com",
  messagingSenderId: "1047210562854",
  appId: "1:1047210562854:web:118116e113fb382c285de7",
  measurementId: "G-FDCFF0WLSW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
 
    await signInWithEmailAndPassword(auth, email, password);
    
 
};
const registerWithEmailAndPassword = async (name, email, password, type, test, studentName, phonenumber) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if(type == 'Tutor'){
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        Type: type,
      
        topics:'',
        ClassDate:new Date(),
        NextMeetingDate: new Date(),
        Notepad:'',
        assignments:'',
        topics:'',
        HistMeetingTimes:[],
        ClassACT:[],
        Class:[],
        Students:[],
        ZoomLink:'',
        Admin:false,
        PhoneNumber:phonenumber,
        AdditionalPDFUrl:'',
        CompanyCode:'',
      });
    }
    else if (type == 'Student'){
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        Type: type,
        Test1:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test2:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test3:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test4:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test5:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test6:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test7:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test8:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test9:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test10:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        DiagnosticsTestResults:'+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++-+-+-+-',
        assignmentsArc:'',
        assignmentsDone:'',
        QuizResults:'',
        topics:'',
        ClassDate:new Date(),
        NextMeetingDate: new Date(),
        Notepad:'',
        assignments:'',
        topics:'',
        HistMeetingTimes:[],
        Tutor:'Joseph Tauzin',
        Test: test,
        TutorNotes:'',
        Improvement:'',
        PhoneNumber:phonenumber,
        SVG:'',
        CompanyCode:'',
      });
    }
    else{
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        ParentName:name,
        name:studentName,
        authProvider: "local",
        email,
        Type: type,
        Test1:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test2:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test3:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test4:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test5:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test6:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test7:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test8:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test9:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test10:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        DiagnosticsTestResults:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        assignmentsArc:'',
        assignmentsDone:'',
        QuizResults:'',
        topics:'',
        ClassDate:new Date(),
        NextMeetingDate: new Date(),
        Notepad:'',
        assignments:'',
        topics:'',
        HistMeetingTimes:[],
        Tutor:'Joseph Tauzin',
        Test: test,
        Improvement:'',
        PhoneNumber:phonenumber,
        CompanyCode:'',
      });
    }
  } catch (err) {
    console.log("error")
    console.error(err);
    alert(err);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

async function getNames(db) {
    
    const citiesCol = collection(db, 'users');
    
    const citySnapshot =  await getDocs(citiesCol);

    const cityList = citySnapshot.docs.map(doc => doc.data());
    return(["hey"])
    return cityList;
  }

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getNames,
  updateDoc,

  getDocFromCache
};