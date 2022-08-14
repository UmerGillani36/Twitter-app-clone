import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTwitter } from 'react-icons/fa';
import { RiHome7Fill } from 'react-icons/ri';
import { BiHash } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegEnvelope } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { BiUser } from 'react-icons/bi';
import { CgMoreO } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';
import { Button } from '@mui/material';
import Header from '../components/Header';
import Tweet from '../components/Tweet';
import Tweets from '../components/Tweets';
import { useFirebase } from '../firebase/config';



const Home = () => {

  const [user, setUser] = useState();
  const [tweets, setTweets] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const firebase = useFirebase();
  const navigate = useNavigate();
  console.log(tweets)

  useEffect(() => {
    setUser(firebase.user)
    getTweetsAlways()
  }, [])

  const getTweetsAlways = () => {

    firebase.getTweets().then((tweets) => setTweets(tweets.docs))

  }
  const handleSearch = async (e) => {

    setSearch(e.target.value)
    // if(search){
    // const searchResult= await firebase.search(search);

    // setSearchResult(searchResult)
    // console.log("search Result is",searchResult.data())
    // }
  }




  return (
    <div className='Container d-flex justify-content-start '>
      <div className="SideNav col-3 ">
        <ul >
          <li><FaTwitter style={{ fontSize: '28px', margin: '15px 0px 0px 10px', color: "#1d9bf0" }} /></li>
          <li><span onClick={() => navigate('/home')}><RiHome7Fill /><a >Home</a></span></li>
          <li><span><BiHash /><a >Explore</a></span></li>
          <li><span><IoNotificationsOutline /><a>Notifications</a></span></li>
          <li><span><FaRegEnvelope /><a>Messages</a></span></li>
          <li><span><BsBookmark /><a>Bookmarks</a></span></li>
          <li><span><CgNotes /><a>Lists</a></span></li>
          <li><span onClick={() => navigate('/profile')}><BiUser /><a>Profile</a></span></li>
          <li><span><CgMoreO /><a>More</a></span></li>
          <li><Button variant='contained' sx={{ borderRadius: '25px', width: '200px', height: '50px', backgroundColor: "#1d9bf0", fontSize: '16px', fontWeight: 'bold' }}>Tweet</Button></li>

        </ul>
      </div>

      <div className='MainContainer col-9'>
        <div className='MainContent col-7'>
          <Header />
          <Tweet user={user} getTweetsAlways={getTweetsAlways} />

          <div className='tweets-container'>
            {

              tweets.map((element, index) => (

                <Tweets {...element.data()} key={index} />
              ))
            }


          </div>
        </div>
        <div className='SideContent col-5'>

          <div className='d-flex justify-content-center align-items-center search'>
            <span><BiSearch /></span>
            <input type="text" placeholder='Search Twiter' value={search} onChange={handleSearch} />
          </div>
          <div>

            {
              searchResult.map((element) => {
                <li>{element}</li>
              })

            }
          </div>
        </div>

      </div>


    </div>

  )
}

export default Home