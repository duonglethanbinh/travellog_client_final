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
                    Hi there! We are Thanh Bình and Hoàng Long. Our webapp was developed with HTML, CSS,
                    Javascript.<br /> All pictures and content are collected from many sources. So, if you have any problems with the content, please
                contact us via <span><a href="mailto:17520279@gm.uit.edu.vn" style={{ textDecoration: 'none', margin: '5px' }}>
                        17520279@gm.uit.edu.vn</a></span> or <span><a href="mailto:17521305@gm.uit.edu.vn" style={{ textDecoration: 'none', margin: '5px' }}>
                        17521305@gm.uit.edu.vn</a></span><br />
                We will probably delete it.<br />Best regards.
            </p>
            </div>
        );
    }
}

export default About;