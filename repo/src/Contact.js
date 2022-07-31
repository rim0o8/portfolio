import React, { Component } from 'react';
import './Contact.css';

class Contact extends Component {
    render() {
        const {
            mail,
            phone
        } = this.props;

        return (
            <div>
                <a href="mailto:{mail}">{mail}</a>
                <div className="Btn-title">{phone}</div>
            </div>
        );
    }
}

export default Contact;