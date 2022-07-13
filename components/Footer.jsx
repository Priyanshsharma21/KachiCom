import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';


const Footer = () => {
  return (
    <div className='footer-container'>
    <p>2022 KachiCom All right reserved</p>
    <p className="icons">
      <a href="https://www.instagram.com/priyansh_sharma_21/"><AiFillInstagram /></a>
      <a href="https://www.youtube.com/channel/UCLcOtm-lXx6m78eKB7DiY3Q"><AiOutlineTwitter /></a>
    </p>
    
    </div>
  )
}

export default Footer