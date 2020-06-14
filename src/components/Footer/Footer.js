import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small fixed-bottom">
                <div className="footer-copyright text-center py-3">
                    © 2020.  All rights reserved.
                </div>
            </footer>
        )
    }
}

export default Footer;
