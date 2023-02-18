import React, { useState, useEffect } from 'react'
import DayColumn from './DayColumn'
import LabelColumn from './LabelColumn'
import "./timeSelect.css"
import { doc, onSnapshot, collection, query, where,updateDoc, arrayUnion, arrayRemove, setDoc , deleteDoc} from "firebase/firestore";
import { auth, getNames, db, storage} from "../../../firebase.js";


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
      //Write a function that combines two arrays together in javascript
      //https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

      useEffect(()=>{
        try{

          const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));

          const unsub = onSnapshot(x, (querySnapshot) => {

            setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));
            setUID( querySnapshot.docs.map(d => d.id)[0]);
            setAvailability( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Availability.arrayValue.values.map(x => x.stringValue)));
          })
        }catch(e){

        }
      },[auth.currentUser])


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

      const handleMouseLeave = (event) => {
        var selectedTimes = []
        console.log(document.querySelectorAll(".tdSelected").forEach((td) => {selectedTimes.push(td.getAttribute("time") +'-' +td.getAttribute("day"))}))
        console.log(selectedTimes)
        
        setSelectedTimesGlobal(selectedTimes)
        UpdateAvailability(selectedTimes)
        
      }

    return (
        <div className='timeSelect' onMouseLeave={handleMouseLeave}>
            <LabelColumn />
            <DayColumn day={'Sunday'} isMouseDown={isMouseDown} />
            <DayColumn day={'Monday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Tuesday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Wednesday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Thursday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Friday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Saturday'} isMouseDown={isMouseDown}/>
        </div>
    )
}

export default TimeSelect