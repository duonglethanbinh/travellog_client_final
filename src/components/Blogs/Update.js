import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Update.css';
class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateid: this.props.match.params.Pid,
            datablog: [],
            name: '',
            title: '',
            content: ''
        };
    }

    componentDidMount() {
        axios.get(`https://travellog-server-final.herokuapp.com/${this.state.updateid}/data`)
            .then(res => {
                this.setState(
                    {
                        datablog: res.data,
                        name: res.data.name,
                        title: res.data.title,
                        content: res.data.content
                    }
                )
            }).catch(err => {
                console.error(err);
            });
    }
    isInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    updateSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        const blog = {
            name: this.state.name,
            title: this.state.title,
            content: this.state.content,
            created: Date.now()
        };
        console.log(this.props.match.params)
        console.log(this.state.updateid);
        console.log(typeof (blog));
        axios.patch(`https://travellog-server-final.herokuapp.com/blogs/${this.props.match.params.Pid}`, blog)
            .then(res => {
                console.log(res);
                console.log(res.data);
                axios.get(`https://travellog-server-final.herokuapp.com/blogs/${this.state.updateid}/data`)
                    .then(res => {
                        this.setState({ datablog: res.data })
                    }).catch(err => {
                        console.error(err);
                    });
                alert('Update completed. Click go back to move to Blog');
            })
    }
    render() {
        const { datablog } = this.state;
        return (
            <div className="update-box">
                <div className="card card-body update-container">
                    <h3 style={{textAlign:'center'}}>Edit</h3>
                    <form onSubmit={this.updateSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input onChange={(event) => this.isInputChange(event)} type="text" className="form-control" id="name" name="name" defaultValue={datablog.name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input onChange={(event) => this.isInputChange(event)} type="text" className="form-control" id="title" name="title" defaultValue={datablog.title} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea onChange={(event) => this.isInputChange(event)} className="form-control" id="content" name="content" rows={3} defaultValue={datablog.content} required />
                        </div>
                        <button className="btn btn-outline-danger" type="submit">Confirm</button>
                        <Link to='/blogs'><button className="btn btn-outline-success" type="button"> Go back</button></Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Update;