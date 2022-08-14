import React ,{useState , useEffect}from 'react'
import {useFirebase} from '../firebase/config';
import './tweet.css'
import {BiMessageRounded} from 'react-icons/bi'
import {AiOutlineRetweet} from 'react-icons/ai'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
// import {} from '../../public/images/'

const Tweets = (props) => {
  
  const [url , setURL]=useState('');
  const [like , setLike]=useState(false)
  const [countLikes , setCountLikes]=useState(0);
  const firebase =useFirebase();
  const user=firebase.user;
  useEffect(() => {
    if(props.imageURL){

      firebase.getImageURL(props.imageURL).then((url) => setURL(url));
    }
  }, []);
  
const handleLike=()=>{

  setLike(true);
  setCountLikes(countLikes+1);
}
const handleUnlike=()=>{
  setLike(false);
  setCountLikes(countLikes-1);

}
  
  return (
    <div className='SingleTweet d-flex px-4 py-3'>
      <div>
        {user&&(

          <img src={user.photoURL}  alt="User Picture"className='Avatar' />
        )}
              
      </div>
      <div className=" d-flex flex-column">
            <div className="d-flex">
              <span style={{fontSize:'15px',marginLeft:'8px', fontWeight:'700' , fontFamily:' TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>
                {user.displayName}</span>
              <span style={{marginLeft:'4px' , color:'gray', }}>{`@${user.displayName.replace(/\s/g, '')}`}</span>

            </div>
            <div className='d-flex flex-column ' style={{width:'500px'}}>
              
            <div className='px-2'>
                <p>{props.text}</p>
            </div>
            {url&&(
            <div className='px-3 py-3 PostImage'>
              <img src={url} alt={url}></img>
            </div>

            )}
            </div>

            <div className='d-flex justify-content-around align-items-center ReactTweetIcons'>
              <div><span><BiMessageRounded/></span></div>
              <div><span><AiOutlineRetweet/> </span></div>
              <div>
                {!like?
                (<div className='d-flex align-items-center'><span className='Like ' onClick={handleLike}><AiOutlineHeart/></span> <span style={{ marginLeft:'8px'}}>{countLikes!=0 &&(countLikes)}</span> </div>):
                (<div className='d-flex align-items-center'><span className='Unlike ' onClick={handleUnlike}><AiFillHeart/></span><span style={{ marginLeft:'8px'}}>{countLikes}</span></div>)
                }
               
                </div>
                
            </div>
      </div>

    </div>
  )
}

export default Tweets