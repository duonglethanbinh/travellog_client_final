import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small fixed-bottom">
                <div className="footer-copyright text-center py-3">
                    Posted by: <a href="mailto:17520279@gm.uit.edu.vn">
                        Dương Lê Thanh Bình</a>
                </div>
            </footer>
        )
    }
}

export default Footer;
