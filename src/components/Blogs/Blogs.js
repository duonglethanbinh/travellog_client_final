import React, { Component } from 'react';
import Detail from './Detail';
import './Blogs.css'
//Package for put, get, patch, delete
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogslist: [],
            placesname: [],
            searchid: '',
            currentPage: 1,
            blogsPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
    }
    checkLogintoAdd(placesname) {
        if (localStorage.usertoken !== undefined) {
            return (
                <form id="blog-form" onSubmit={(event) => this.submitForm(event)}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">Name Place</label>
                            <select onChange={(event) => this.isInputChange(event)} type="text" id="name" name="name">
                                <option value="" hidden>Your place choice...</option>
                                {
                                    placesname.map((data, i) => {
                                        return (
                                            <option key={i}>{data.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="title">Title</label>
                            <input onChange={(event) => this.isInputChange(event)} type="text" id="title" name="title" placeholder="Your title .." required />
                        </div>
                    </div>
                    <label htmlFor="content">Content</label>
                    <textarea onChange={(event) => this.isInputChange(event)} id="content" name="content" placeholder="Write something.." rows="5" required></textarea>
                    <input type="submit" value="Submit" />
                </form>
            )
        }
        else {
            return (
                <h4>Login to add new comment</h4>
            )
        }
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    componentDidMount() {
        let one = "https://travellog-7th-backend.herokuapp.com/blogs";
        let two = "https://travellog-7th-backend.herokuapp.com/places"
        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        trackPromise(
            axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
                const responseOne = responses[0]
                const responseTwo = responses[1]
                const blogslist = responseOne.data;
                const placesname = responseTwo.data;
                this.setState({ blogslist, placesname });
            })).catch(errors => {
                console.error(errors);
            })
        )
    }
    isInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        event.target.reset();
        this.setState({
            submitted: false,
            submitResult: false
        });
        fetch('https://travellog-7th-backend.herokuapp.com/blogs',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    title: this.state.title,
                    content: this.state.content,
                })
            }).then((res) => res.json())
            .then((json) => {
                this.setState({ submitted: true, submitResult: true });
                alert("Succeeded. Check on the first pages.");
                axios.get('https://travellog-7th-backend.herokuapp.com/blogs')
                    .then(res => {
                        const blogslist = res.data;
                        this.setState({ blogslist });
                    })
            })
            .catch((error) => {
                this.setState({ submitted: true, submitResult: false });
            });
    }
    submitSearchForm = (search_id) => {
        console.log(search_id);
        axios.get(`https://travellog-7th-backend.herokuapp.com/blogs${search_id}`)
            .then(res => {
                const blogslist = res.data;
                this.setState({ blogslist, currentPage: 1 });
            })
    }

    render() {
        const { blogslist, placesname, currentPage, blogsPerPage } = this.state;
        // Logic for displaying current blogs
        const indexOfLastBlogs = currentPage * blogsPerPage;
        const indexOfFirstBlogs = indexOfLastBlogs - blogsPerPage;
        const currentBlogs = blogslist.slice(indexOfFirstBlogs, indexOfLastBlogs);

        const renderBlogs = currentBlogs.map((data, i) => {
            return (
                <Detail key={i} Pid={data._id} Pname={data.name} Ptitle={data.title} Pcontent={data.content} Pcreated={data.created} />
            )
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(blogslist.length / blogsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button type="button" className="btn btn-outline-secondary" key={number} id={number} onClick={this.handleClick} style={{ cursor: 'pointer', margin: '5px' }}>
                    {number}
                </button>
            );
        });

        return (
            <div >

                <div className="blog_content" id="contact">
                    <button className="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseAdding" aria-expanded="false" aria-controls="collapseAdding">
                        Click to add new comment
                    </button>
                    <div className="collapse" id="collapseAdding">
                        {this.checkLogintoAdd(placesname)}
                    </div>
                </div>

                <div className="search-box">
                    <h4>Sort: </h4>
                    <div className="input-group search">
                        <button onClick={() => this.submitSearchForm('/')} className="btn btn-light" type="submit">All</button>
                        {
                            placesname.map((data, i) => {
                                return (
                                    <button key={i} onClick={() => this.submitSearchForm(`/${data.name}`)} className="btn btn-light" type="button">{data.name}</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <ul className="pagination justify-content-center">
                        <h4>Page: </h4>
                        {renderPageNumbers}
                    </ul>
                    <div className="main_box">
                        {renderBlogs}
                    </div>
                </div>
            </div>
        )
    }
}

export default Blogs;

