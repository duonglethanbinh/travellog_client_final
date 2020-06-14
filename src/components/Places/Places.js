import React, { Component } from 'react';
import './Places.css'
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeslist: [],
            deleteid: ''
        };
    }
    componentDidMount() {
        trackPromise(
            axios.get('https://travellog-server-final.herokuapp.com/places')
                .then(res => {
                    const placeslist = res.data;
                    this.setState({ placeslist });
                }))
    }
    checkLogintoAdd() {
        if (localStorage.usertoken !== undefined) {
            return (
                <form onSubmit={this.addSubmit}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header">Add name place</div>
                                <div className="card-body place-form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Name place</span>
                                        </div>
                                        <input onChange={(event) => this.isInputChange(event)} type="text" className="form-control" id="name" name="name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    Add image place
                                </div>
                                <div className="card-body place-form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">URL image</span>
                                        </div>
                                        <input onChange={(event) => this.isInputChange(event)} type="text" className="form-control" id="image" name="image" />
                                        <button className="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseGuide" aria-expanded="false" aria-controls="collapseGuide">Guide</button>
                                        <div className="collapse" id="collapseGuide">
                                            <div className="card-body place-form">
                                                <div className="input-group">
                                                    <p className="card-text">Upload your image by using some <b>website</b> we recommend: <a href="https://www.imageupload.net/" target="_blank" rel="noopener noreferrer">imageupload</a>, <a href="https://uphinh.org/" target="_blank" rel="noopener noreferrer">uphinh</a></p>
                                                    <p className="card-text">Then, paste <b>Image URL</b> to the image box</p>
                                                    <p className="card-text">Example of imagehost:</p>
                                                    <code>https://i0.wp.com/s1.uphinh.org/2020/06/13/nhatrang.jpg</code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-danger" type="submit">Submit</button>
                </form>
            )
        }
        else {
            return (
                <h4>Login to add new comment</h4>
            )
        }
    }
    checkLogintoDeleteandEdit(_id) {
        if (localStorage.usertoken !== undefined) {
            if (jwt_decode(localStorage.usertoken).email === '17520279@gm.uit.edu.vn') {
                return (
                    <nav style={{ textAlign: 'center' }}>
                        <button onClick={() => this.deleteSubmit(_id)} type="button" className="btn btn-outline-danger mr-2" >Delete</button>
                        <Link to={`/upd/${_id}`}><button type="button" className="btn btn-outline-warning mr-2">Edit</button></Link>
                    </nav>
                )
            } else {
                return (
                    <h6 className="text-danger"> You need to have admin account to delete or edit content</h6>
                )
            }
        } else {
            return (
                <Link className="text-danger" style={{ textDecoration: 'none' }} to="/signin"><h6 style={{ textAlign: 'center' }}>Login to add new place</h6></Link>
            )
        }
    }
    isInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    addSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        const blog = {
            name: this.state.name,
            image: this.state.image
        };
        const checkValue = [];
        this.state.placeslist.map(data => checkValue.push(data.name))
        if (checkValue.includes(this.state.name))
            alert('Invalid name. This name already have. Choose other name.')
        else {
            axios.post(`https://travellog-server-final.herokuapp.com/places/`, blog)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    axios.get(`https://travellog-server-final.herokuapp.com/places`)
                        .then(res => {
                            this.setState({ placeslist: res.data })
                        }).catch(err => {
                            console.error(err);
                        });
                    alert('Add completed.');
                })
        }
    }
    deleteSubmit = (_id) => {
        console.log(_id)
        if (window.confirm("Delete this picture?")) {
            axios.delete(`https://travellog-server-final.herokuapp.com/places/${_id}`)
                .then(res => {
                    alert('Delete completed');
                    axios.get(`https://travellog-server-final.herokuapp.com/places`)
                        .then(res => {
                            this.setState({ placeslist: res.data })
                        }).catch(err => {
                            console.error(err);
                        });
                })
        }
    }
    render() {
        const { placeslist } = this.state;
        return (
            <div className="album bg" id="reviews">
                <div className="place-box">
                    <h3>List places we have</h3>
                    <button className="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseAdding" aria-expanded="false" aria-controls="collapseAdding">
                        Click to add new place
                    </button>
                    <div className="collapse" id="collapseAdding">
                        {this.checkLogintoAdd()}
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {placeslist.map((data, i) => {
                            return (
                                <div key={i} className="col-md-4">
                                    <div className="card mb-4 box-shadow">
                                        <img className="card-img-top" src={data.image} alt="Card" />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <Link to="/blogs">
                                                    {data.name}
                                                </Link>
                                            </p>
                                            {this.checkLogintoDeleteandEdit(data._id)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Places; 