import React, { useState, useEffect } from 'react'
import DayColumn from './DayColumn'
import LabelColumn from './LabelColumn'
import "./timeSelect.css"
import { doc, onSnapshot, collection, query, where,updateDoc, arrayUnion, arrayRemove, setDoc , deleteDoc} from "firebase/firestore";
import { auth, getNames, db, storage} from "../../../firebase.client.js";



const TimeSelect = () => {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const usersRef = collection(db, "users");
   
    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
          document.removeEventListener("mousedown", handleMouseDown)
          document.removeEventListener("mouseup", handleMouseUp)
        }
      }, [])

      const handleMouseDown = (event) => {
        event.preventDefault()
        setIsMouseDown(true)
      }
      const handleMouseUp = (event) => {
        setIsMouseDown(false)
      }    
      const [selectedTimesGlobal, setSelectedTimesGlobal] = useState([])
      const [UserName, setUserName] = useState('')
      const [UID, setUID] = useState('')
      const [Availability, setAvailability] = useState([])
      const [Type, setType] = useState('')
      const [isEditable, setIsEditable] = useState(true); // new state
      const [CompanyCode, setCompanyCode] = useState('')
      const [NameId, setNameId] = useState([])
      //Write a function that combines two arrays together in javascript
      //https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

      useEffect(() => {
        try{
          const z = query(usersRef);
      
         //const q = query(collection(db, "users"))
         var NewwerArr  = []
         var NewArr = NameId
        const unsub = onSnapshot(z, (querySnapshot) => {
          
          
      
          if(NameId){
          
            
            querySnapshot.docs.map(d => NewArr[NewArr.length] = ([d._document.data.value.mapValue.fields.name.stringValue, d.id,d._document.data.value.mapValue.fields.uid.stringValue,d._document.data.value.mapValue.fields.Type.stringValue]) )
        
           
            for(var t = 0; t<NewArr.length; t++){
              if(NewArr[t][3] !== 'Parent'){
                NewwerArr.push(NewArr[t])
              }
            }
       
            setNameId(NewwerArr)
           
           
          }
          
          
          
          
      });
      
     
    }
         
         //setErrorMessage(unsub())
        // return cleanup function
        //return () => subscriber();
        catch(err){
       
        
        }
      }, []); // empty dependencies array => useEffect only called once



      useEffect(()=>{
        try{

          const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));

          const unsub = onSnapshot(x, (querySnapshot) => {

            setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));
            setUID( querySnapshot.docs.map(d => d.id)[0]);
            setAvailability( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Availability.arrayValue.values.map(x => x.stringValue)));
            setType( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Type.stringValue));
            setCompanyCode( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CompanyCode.stringValue));
          })
        }catch(e){

        }
      },[auth.currentUser])

      /*
      useEffect(() => {
        if(Type == 'Student'){
          function FindMatchingUid(){
            //NameId
            //CurrentStudent
            
              for(var i = 0; i< NameId.length; i++){
              
                if(s == NameId[i][0]){
                  return(NameId[i][2])
                }
              }
            }
        }
      }, [Type])
      */
      useEffect(() => {
        console.log('jlkfsdkjfgsngsfjfjksfgpk')
        console.log(Type[0])
        if(Type != undefined){
          if(Type[0] == 'Tutor'){
            console.log('setIsEditable to true')
            setIsEditable(true);
          }
          if(Type[0] != 'Tutor'){
            console.log('setIsEditable to false')
            setIsEditable(false);
          }
        }
      }, [Type])

  
      function UpdateAvailability(t){
        // d could just feed in date
     
        if(auth.currentUser){
        
          const studentDef = doc(db, "users", UID);
      
          updateDoc(studentDef, {
            Availability: t
                
                  });
                }
      }
    
      function reverseSelection(selectedTimes) {
        
        const selectedElements = selectedTimes.map((time) => {
        
          const [t, d] = time.split("-");
          return document.querySelector(`[time="${t}"][day="${d}"]`);
        });
        console.log(selectedElements)
        selectedElements.forEach((element) => {
         
          element.classList.add("tdSelected");
        });
        
      }

      useEffect(() => {
        if(Availability.length != 0){
          
          reverseSelection(Availability[0])
        
        
          }
         
            //reverseSelection(Availability[0])
         

      }, [Availability])

      

      // Function to toggle editability
      const toggleEditability = () => {
          setIsEditable(!isEditable);
      }
  
      const handleMouseLeave = (event) => {
          // Check if isEditable is true before updating times
          if(isEditable){
              var selectedTimes = [];
              console.log(document.querySelectorAll(".tdSelected").forEach((td) => {selectedTimes.push(td.getAttribute("time") +'-' +td.getAttribute("day"))}));
              console.log(selectedTimes);
              
              setSelectedTimesGlobal(selectedTimes);
              UpdateAvailability(selectedTimes);
          }
      };

    return (
        <div className='timeSelect' onMouseLeave={handleMouseLeave}>
            <LabelColumn />
            <DayColumn day={'Sunday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
            <DayColumn day={'Monday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
            <DayColumn day={'Tuesday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
            <DayColumn day={'Wednesday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
            <DayColumn day={'Thursday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
            <DayColumn day={'Friday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
            <DayColumn day={'Saturday'} isMouseDown={isMouseDown} isEditable={isEditable}/>
        </div>
    )
}

export default TimeSelect