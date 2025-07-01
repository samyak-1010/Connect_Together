import React, { useState } from 'react'
import BannerVideo from '../assets/banner.mp4'
import Button from '../components/common/Button'
import { TypeAnimation } from 'react-type-animation'
import { Fade } from 'react-awesome-reveal'
import Section2 from '../components/HomePageSection/Section2'
import Section2AskedPart from '../components/HomePageSection/Section2AskedPart'
import Section3 from '../components/HomePageSection/Section3'
import Footer from '../components/common/Footer'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'

const Home = () => {
   const {user}=useSelector((state)=>state.profile)
   console.log("User", user);
   const navigate=useNavigate();
  return (
    <div className='homePage'>
        <div className='section1'>
            <div className='setion1InitialDiv'>
            <div className='section1text'>
                <div className='webTitle'>
                <TypeAnimation
                    sequence={["Connect Together",3000,""]}
                    repeat={Infinity}
                    // omitDeletionAnimation={true}
                  
                ></TypeAnimation></div>
                <Fade>
                <div className='webPara'>
                    
                   Empowering Parents as Partners in Children's Education is a revolutionary platform dedicated to enhancing parental involvement in education. Through our comprehensive hub of resources, interactive activities, and community support, we empower parents to become active partners in their children's learning journey.
                </div>
                <div className='webPara'>
                Join us in revolutionizing education through empowered parenting.                </div>
                </Fade>
                <div className='introButtons'>
 {!user ? (
    <>
      <Button text={"SignUp"} path={"signup"}></Button>
      <Button text={"LogIn"} path={"login"}></Button>
    </>
  ) : (
    <>
      {/* {user.role === "Instructor" && (
        <div className='welcomeButtonToMenty' onClick={()=>{navigate("/notification")}}>Notification</div>
      )}
      {user.role==="Student" && (
        <div className='welcomeButtonToMenty' onClick={()=>{navigate("/askdoubt")}}>Ask Doubt</div>
      )} */}
    </>
  )}
</div>

            </div>
            <div className='webIntroVideo'>
            <video muted loop autoPlay>
                    <source src={BannerVideo} type="video/mp4"/>
                </video>
            </div>
            </div>
            {/* <div className='introButtons'>
               <Button text={"SignUp"} path={"signup"}></Button>
               <Button text={"LogIn"} path={"login"}></Button>
            </div> */}
        </div>

        {/* <div className='section2'>
            <h1 className='section2Heading'>Do you need Menty?</h1>
            <div className='underline'></div>
            <p className='section2Para'><span className='section2Span'>Ever felt lost during a class or online lecture?</span> We surveyed students and uncovered their top responses when struggling to understand</p>
            <Section2/>
            <Section2AskedPart/>
        </div> */}
        {/* <Section3/> */}
        {/* <Footer /> */}
    </div>
  )
}

export default Home
