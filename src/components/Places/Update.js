import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateid: this.props.match.params.Pid,
            datablog: [],
            name: '',
            image: ''
        };
    }

    componentDidMount() {
        axios.get(`https://travellog-server-final.herokuapp.com/places/${this.state.updateid}/data`)
            .then(res => {
                this.setState(
                    {
                        datablog: res.data,
                        name: res.data.name,
                        image: res.data.image
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
        const place = {
            name: this.state.name,
            image: this.state.image
        };
        console.log(this.props.match.params)
        console.log(this.state.updateid);
        console.log(typeof (place));
        axios.patch(`https://travellog-server-final.herokuapp.com/places/${this.props.match.params.Pid}`, place)
            .then(res => {
                console.log(res);
                console.log(res.data);
                axios.get(`https://travellog-server-final.herokuapp.com/places/${this.state.updateid}/data`)
                    .then(res => {
                        this.setState({ datablog: res.data })
                    }).catch(err => {
                        console.error(err);
                    });
                alert('Update completed. Click go back to move to Places');
            })
    }
    render() {
        const { datablog } = this.state;
        return (
            <div className="update-box">
                <div className="card card-body update-container">
                    <h3 style={{ textAlign: 'center' }}>Edit</h3>
                    <form onSubmit={this.updateSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input onChange={(event) => this.isInputChange(event)} type="text" className="form-control" id="name" name="name" defaultValue={datablog.name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Title</label>
                            <input onChange={(event) => this.isInputChange(event)} type="text" className="form-control" id="image" name="image" defaultValue={datablog.image} required />
                        </div>
                        <button className="btn btn-outline-danger" type="submit">Confirm</button>
                        <Link to='/places'><button className="btn btn-outline-success" type="button"> Go back</button></Link>
                    </form>

                </div>
            </div>
        );
    }
}

export default Update;