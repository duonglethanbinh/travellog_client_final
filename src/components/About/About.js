import React, { Component } from 'react';
import Profile from '../../img/icons/profile.png';
import './About.css';
class About extends Component {
    render() {
        return (
            <div className="about_content" id="aboutme">
                <h3>About me</h3>
                <img src={Profile} alt="Profile Icon" />
                <p>
                    Hi there! My name is Thanh Bình. This is my first website developed by using HTML, CSS,
                    Javascript.<br /> All of the pictures and content are collected from many sources. So, if you have any problems with the content, please
                contact me through my email: <span><a href="mailto:17520279@gm.uit.edu.vn" style={{ textDecoration: 'none', margin: '5px' }}>
                        17520279@gm.uit.edu.vn</a></span><br />
                I will probably delete it.<br />Best regard.
            </p>
            </div>
        );
    }
}

export default About;