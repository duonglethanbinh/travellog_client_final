import React, { Component } from 'react';
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './Detail.css';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteid: ''
        };
    }
    handleChange = event => {
        this.setState({ deleteid: event.target.value });
    }
    deleteSubmit = (event) => {
        if (window.confirm("Delete this comment?")) {
            axios.delete(`https://travellog-server-final.herokuapp.com/blogs/${this.props.Pid}`)
                .then(res => {
                    alert('Delete completed');
                    window.location.reload();
                })
        }
    }
    checkLogintoDeleteandEdit(Pid) {
        if (localStorage.usertoken !== undefined) {
            if (jwt_decode(localStorage.usertoken).email === '17520279@gm.uit.edu.vn') {
                return (
                    <div>
                        <button onClick={this.deleteSubmit} type="button" className="btn btn-outline-danger" >Delete</button>
                        <Link to={`/update/${Pid}`}><button type="button" className="btn btn-outline-warning">Edit</button></Link>
                    </div>
                )
            }
            else {
                return (
                    <h6 className="text-danger"> You need to have admin account to delete or edit content</h6>
                )
            }
        } else {
            return (
                <Link className="text-danger" style={{ textDecoration: 'none' }} to="/signin"><h6>Login to add new blog</h6></Link>
            )
        }
    }
    render() {
        const { Pid, Pname, Ptitle, Pcontent, Pcreated } = this.props;
        // console.log(Pcreated);
        let date = new Date(Pcreated)
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        // console.log(year + '-' + month + '-' + dt);
        return (

            <div className="paras" >
                <h4>Place: {Pname}</h4>
                <h3>{Ptitle}</h3>
                <p>{Pcontent}</p>
                <h4><i> Created in:&nbsp;&nbsp;&nbsp;{`${year}-${month}-${dt}`}&nbsp;&nbsp;&nbsp;{`${hour}:${min}:${sec} `}</i></h4>
                {this.checkLogintoDeleteandEdit(Pid)}
            </div>
        );
    }
}

export default Detail;