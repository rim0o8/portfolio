import React, { Component } from 'react';

class Contact extends Component {
    render() {
        const {
            mail,
            phone
        } = this.props;

        return (
            <div>
                <h3>
                <a href="mailto:{mail}">{mail}</a>
                </h3>
                <div className="Btn-title">{phone}</div>
                <br></br>
            </div>
        );
    }
}

export default Contact;