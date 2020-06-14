import React, { Component } from 'react';
import { Prompt } from "react-router-dom";
import './Contact.css';
import Form from '../../img/icons/form.png'
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBlocking: false,
            isRedirect: false
        }
    }
    isInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            isBlocking: value.length > 0,
            [name]: value
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        event.target.reset();
        this.setState({
            isBlocking: false,
            isRedirect: false,
            submitted: false,
            submitResult: false
        });

        fetch('https://travellog-7th-backend.herokuapp.com/contacts',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    message: this.state.message,
                })
            }).then((res) => res.json())
            .then((json) => {
                this.setState({ submitted: true, submitResult: true });
                alert("Success")

            })
            .catch((error) => {
                this.setState({ submitted: true, submitResult: false });
            });

    }
    render() {
        return (
            <div>
                {<Prompt when={this.state.isBlocking} message={location => `Are you sure you want to go to ${location.pathname}`} />}
                <div className="contact_content" id="contact">
                    <h3>Contact me</h3>
                    <img src={Form} alt="Form" />
                    <form id="contact-form" onSubmit={(event) => this.submitForm(event)}>
                        <label htmlFor="name">Full Name</label>
                        <input onChange={(event) => this.isInputChange(event)} type="text" id="name" name="name" placeholder="Your full name.." required className="form-control"/>
                        <label htmlFor="email">Email</label>
                        <input onChange={(event) => this.isInputChange(event)} type="email" id="email" name="email" placeholder="Your email.." required className="form-control"/>
                        <label htmlFor="message">Your Message</label>
                        <textarea onChange={(event) => this.isInputChange(event)} id="message" name="message" placeholder="Write something.." rows="5" className="form-control" required></textarea>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Contact; 