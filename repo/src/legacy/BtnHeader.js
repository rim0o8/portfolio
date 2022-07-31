import React, { Component } from 'react';
import './BtnHeader.css';
import MyAppBtn from "./MyAppBtn.js"

class BtnHeader extends Component {
    render() {
        return (
            <div>
                <MyAppBtn
                    title="Make Flow"
                    link="make_flow.html"
                />
                <MyAppBtn
                    title="Settings"
                    link="https://meta.com"
                />
            </div>
        );
    }
}

export default BtnHeader;