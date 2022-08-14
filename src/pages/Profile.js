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
import { BiArrowBack } from 'react-icons/bi';
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineCameraEnhance } from 'react-icons/md';
import { Box, Button, TextField } from '@mui/material';
import { useFirebase } from '../firebase/config';
import Tweets from '../components/Tweets';
import { Paper } from '@mui/material'

const Profile = () => {

    const [user, setUser] = useState();
    const [tweets, setTweets] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showTweets, setShowTweets] = useState(true);
    const [showLikes, setShowLikes] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const firebase = useFirebase();
    const navigate = useNavigate();
    const currentUser = firebase.user;
    console.log("user", currentUser)
    useEffect(() => {
        setUser(currentUser)
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

    const handleShowTweets = () => {
        setShowTweets(true);
        setShowLikes(false);

    }
    const handleLikeTweets = () => {
        setShowLikes(true);
        setShowTweets(false);

    }
    const handleEdit = () => {
        setEditMode(true);
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
                    <div className='d-flex align-content-center mx-2 my-2'>
                        <div className=' d-flex align-items-center'>

                            <span className='Back ' onClick={() => navigate('/home')}><BiArrowBack /></span>
                        </div>
                        <div className='mx-4'>
                            {user && (

                                <h5 style={{ fontWeight: 'bold' }}>{user.displayName}</h5>
                            )}
                            <span>{`${tweets.length} Tweets`}</span>
                        </div>
                    </div>
                    <div className='WallPaper'>

                        <div className='ProfilePicture'>
                            {user && (

                                <img src={user.photoURL}></img>
                            )}
                        </div>
                    </div>
                    <div className='ProfileInfo d-flex flex-column my-3 mx-3'>
                        <div className='d-flex justify-content-end EditButton'>
                            <button onClick={handleEdit}>Edit Profile</button>
                        </div>
                        {user && (

                            <h5 style={{ fontWeight: 'bold', margin: '10px 0px 0px 0px' }}>{user.displayName}</h5>
                        )}
                        {user && (

                            <span style={{ color: 'gray', }}>{`@${user.displayName.replace(/\s/g, '')}`}</span>
                        )}
                        {user && (
                            <span className='d-flex align-items-center mt-2' style={{ color: 'gray' }}><BiCalendar style={{ fontSize: '22px', marginRight: '2px' }} />{` Joined  ${user.metadata.creationTime.substring(4, 16)}`}</span>
                        )}
                        <div className=' my-2'>
                            <span style={{ color: 'gray', }}>2 Following</span>
                            <span style={{ color: 'gray', marginLeft: '20px' }}>3 Followers</span>

                        </div>
                    </div>

                    <div className='d-flex align-items-center justify-content-around ProfileNav'>
                        {
                            showTweets ? (

                                <div className='ProfileNavItem d-flex justify-content-center align-items-center' style={{ width: '100px', height: '60px' }} onClick={handleShowTweets}> <span style={{ fontWeight: 'bold' }}>Tweets</span></div>
                            ) : (

                                <div className='ProfileNavItem d-flex justify-content-center align-items-center' style={{ width: '100px', height: '60px' }} onClick={handleShowTweets}> <span style={{ color: 'gray' }}>Tweets</span></div>
                            )
                        }
                        <div className='ProfileNavItem d-flex justify-content-center align-items-center' style={{ width: '200px', height: '60px' }}> <span style={{ color: 'gray' }}>{`Tweets & replies`}</span></div>
                        <div className='ProfileNavItem d-flex justify-content-center align-items-center' style={{ width: '100px', height: '60px' }}> <span style={{ color: 'gray' }}>Media</span></div>
                        {
                            showLikes ? (

                                <div className='ProfileNavItem d-flex justify-content-center align-items-center' style={{ width: '100px', height: '60px' }} onClick={handleLikeTweets}> <span style={{ fontWeight: 'bold' }}>Likes</span></div>
                            ) : (

                                <div className='ProfileNavItem d-flex justify-content-center align-items-center' style={{ width: '100px', height: '60px' }} onClick={handleLikeTweets}> <span style={{ color: 'gray' }}>Likes</span></div>
                            )
                        }
                    </div>

                    {showTweets && (

                        <div className='tweets-container'>
                            {

                                tweets.map((element, index) => (

                                    <Tweets {...element.data()} key={index} />
                                ))
                            }


                        </div>
                    )}
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
            {editMode && (
                <div className='OverlayContainer'>


                    <div className="EditContainer d-flex flex-column" style={{ width: '590px', height: "550px", borderRadius: '25px', backgroundColor: 'white' }} >


                        <Box className='d-flex justify-content-between align-items-center mx-3 my-3 EditHead ' >
                            <Box className='d-flex justify-content-center align-items-center Close' onClick={() => setEditMode(false)}><span style={{ fontSize: '22px' }}><AiOutlineClose /></span></Box>
                            <h4 className="flex-grow-1" style={{ margin: '0px 20px', fontSize: '21px', fontWeight: 'bold' }}>Edit Profile</h4>
                            <Box className='d-flex justify-content-center align-items-center  Save' onClick={() => setEditMode(false)}><span style={{ fontSize: '16px', fontWeight: '600' }}>Save</span></Box>
                        </Box>
                        <div className='EditWallpaper d-flex justify-content-center align-items-center'>
                            <div className='EditWallpaperIcon d-flex justify-content-center align-items-center'><MdOutlineCameraEnhance /></div>
                            <div className='EditProfilePicture d-flex justify-content-center align-items-center'>
                                {user && (

                                    <img src={user.photoURL}></img>
                                )}
                                <div className='EditProfilePictureIcon d-flex justify-content-center align-items-center'><MdOutlineCameraEnhance /></div>

                            </div>
                        </div>

                        <TextField variant='outlined' label="Name" sx={{ width: '560px', margin: '120px 10px 10px 10px' }}></TextField>
                        <TextField></TextField>
                        <TextField></TextField>
                        <TextField></TextField>



                    </div>
                </div>
            )}

        </div>




    )
}

export default Profile