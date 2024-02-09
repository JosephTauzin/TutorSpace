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
  databaseURL: "https://tutorspace-7a7f1-default-rtdb.firebaseio.com",
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
    console.log('finished')
    
 
};
const registerWithEmailAndPassword = async (name, email, password, type, test, studentName, phonenumber, companyCode , IsAdmin = false, IsIndividual = false) => {
  console.log('In register with email and password')
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(type)
    if(companyCode == 'Individual'){
        IsIndividual = true

     }

    if(type == 'Tutor'  ){
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        Type: type,
        ClassNumbersSAT:[],
        ClassNumbersACT:[],
        topics:'',
        ClassDate:new Date(),
        NextMeetingDate: new Date(),
        Notepad:'',
        assignments:'',
        topics:'',
        HistMeetingTimes:[],
        HistMeetingTimesEnd:[],
        ClassACT:[],
        Class:[],
        Students:[],
        ZoomLink:'',
        Admin:IsAdmin,
        PhoneNumber:phonenumber,
        AdditionalPDFUrl:'',
        CompanyCode:companyCode,
        ConnectedAccountCreated:false,
        StartTime:new Date(),
        Availability:[],
        DisableService:true,
        DisableBilling:true,
        IsIndividual:IsIndividual
      });
    }
    else if (type == 'Student' || companyCode == 'Individual' || type == 'Individual'){
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
        Test1ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test2ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test3ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test4ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test5ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test6ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test7ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test8ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test9ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test10ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',

        
        DiagnosticsTestResults:'+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++-+-+-+-',
        assignmentsArc:'',
        assignmentsDone:'',
        QuizResults:'',
        topics:'',
        ClassDate:new Date(),
        NextMeetingDate: new Date(),
        Notepad:'',
        assignments:'Writing SAT 1+false+0%Reading SAT 1+false+1',
        topics:'',
        HistMeetingTimes:[],
        HistMeetingTimesEnd:[],
        Tutor:'',
        Test: test,
        TutorNotes:'',
        Improvement:'',
        PhoneNumber:phonenumber,
        SVG:'',
        CompanyCode:companyCode,
        ConnectedAccountCreated:true,
        StartTime:new Date(),
        DisableService:true,
        IsIndividual:IsIndividual
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
        Test1ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test2ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test3ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test4ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test5ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test6ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test7ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test8ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test9ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test10ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        
        
        
        
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
        HistMeetingTimesEnd:[],
        Tutor:'',
        Test: test,
        Improvement:'',
        PhoneNumber:phonenumber,
        CompanyCode:companyCode,
        ConnectedAccountCreated:true,
        StartTime:new Date(),
        DisableService:true,
        IsIndividual:IsIndividual
      });
    }
  } catch (err) {
    console.log("error")
    console.error(err);
    alert(err);
  }
};

const registerWithEmailAndPasswordAdmin = async (name, email, password, type, test, studentName, phonenumber, companyCode , IsAdmin = false) => {
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
        ClassNumbersSAT:[],
        ClassNumbersACT:[],
        topics:'',
        ClassDate:new Date(),
        NextMeetingDate: new Date(),
        Notepad:'',
        assignments:'',
        topics:'',
        HistMeetingTimes:[],
        HistMeetingTimesEnd:[],
        ClassACT:[],
        Class:[],
        Students:[],
        ZoomLink:'',
        Admin:IsAdmin,
        PhoneNumber:phonenumber,
        AdditionalPDFUrl:'',
        CompanyCode:companyCode,
        ConnectedAccountCreated:false,
        StartTime:new Date(),
        Availability:[],
        DisableService:true,
        DisableBilling:true,
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
        Test1ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test2ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test3ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test4ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test5ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test6ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test7ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test8ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test9ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test10ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        
        
        
        
        
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
        HistMeetingTimesEnd:[],
        Tutor:'',
        Test: test,
        TutorNotes:'',
        Improvement:'',
        PhoneNumber:phonenumber,
        SVG:'',
        CompanyCode:companyCode,
        ConnectedAccountCreated:true,
        StartTime:new Date(),
        DisableService:true,
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
        Test1ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test2ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test3ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test4ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test5ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test6ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test7ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test8ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test9ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        Test10ACT:'Student answer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        
        
        
        
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
        HistMeetingTimesEnd:[],
        Tutor:'',
        Test: test,
        Improvement:'',
        PhoneNumber:phonenumber,
        CompanyCode:companyCode,
        ConnectedAccountCreated:true,
        StartTime:new Date(),
        DisableService:true,
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