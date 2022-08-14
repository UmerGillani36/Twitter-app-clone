import { easing, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import classNames from "classnames";
import { collection, addDoc } from "firebase/firestore"; 
import {useFirebase} from '../firebase/config';
import './tweet.css'
import {IoImageSharp} from 'react-icons/io5'
import {AiOutlineFileGif} from 'react-icons/ai'
import {BiPoll} from 'react-icons/bi'
import {BsFillEmojiSmileFill} from 'react-icons/bs'
import {MdSchedule} from 'react-icons/md'
import {IoLocationOutline} from 'react-icons/io5'

// import {} from "../../public/images/camp1.jpg"
const Tweet = ({user , getTweetsAlways}) => {
// console.log(user)
  const [tweetText , setTweetText]=useState('');
  const [isPublishingTweet , setIsPublishingTweet]=useState(false);
  const [pic , setPic]=useState()
  const [preview, setPreview] = useState()
  const firebase =useFirebase();
useEffect(() => {
  if (!pic) {
      setPic(undefined)
      return
  }

  const objectUrl = URL.createObjectURL(pic)
  setPreview(objectUrl)

  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [pic])


  const sendTweet= async(e)=>{
     e.preventDefault();
    console.log("clicking")
     setIsPublishingTweet(true);

  if(tweetText.length > 0 || pic){
    //  const id=user.uid
    await firebase.AddTweet(tweetText , pic);
  }
  
  getTweetsAlways();
   setPreview(null);
   setTweetText('');
   setPic(null);
   setIsPublishingTweet(false);


  }
  const handleImage=(e)=>{
    if (!e.target.files || e.target.files.length === 0) {
      setPic(undefined)
      return
  }

  

      setPic(e.target.files[0])
      
    
  }



  return (
    <div className='px-4 py-3 ' style={{borderBottom:' 1px solid rgb(240, 240, 240)'}}>
      <div className='d-flex'>

        <div>
          {user && (
            <img src={user.photoURL} alt='Profile Picture' className='Avatar' />

          )}
        </div>

        <div className='ms-3 ' >
          <textarea
            placeholder="What's happening?"
            maxLength={802}
            className="TweetTextArea"
            value={tweetText}
            onChange={(e)=>setTweetText(e.target.value)}
          />
        </div>
       
      </div>
      <div className='TweetImage d-flex justify-content-center'>
        {pic&&(
        <img src={preview} ></img>

        )} 
        </div>

      <div className="d-flex align-items-center  mt-1">
        <div className="d-flex align-items-center justify-content-evenly mx-5" >
     <label for='file' className="TweetIcon" ><IoImageSharp/></label>
     <input type='file' id="file" style={{display:'none'}} onChange={handleImage}></input>
     <label  className="TweetIcon" ><AiOutlineFileGif/></label>
     <label  className="TweetIcon" ><BiPoll/></label>
     <label  className="TweetIcon" ><BsFillEmojiSmileFill/></label>
     <label  className="TweetIcon" ><MdSchedule/></label>
     <label  className="TweetIcon" ><IoLocationOutline/></label>
        </div>
        <button
          className={classNames("btn btn-primary ms-auto tweet-button", {
            inactive: ((!pic) &&(tweetText.length === 0)) ,
          })}
          type="button"
          onClick={(e) => sendTweet(e)}
        >
          {isPublishingTweet ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <span>Tweet</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Tweet