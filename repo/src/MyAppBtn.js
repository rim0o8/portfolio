// 新しいtabでlinkを開くボタン
import React, { Component } from 'react';
import './Btn.css';
import exportFunction from "./utils"

class MyAppBtn extends Component {
    render() {
        const {
            logo_src,
            title,
            link,
            description
        } = this.props;

        const openWindow = () => {
            window.open(link, '_blank');
        }

        return (
            <button className="Btn" onClick={openWindow}>
                <img className="logo" src={exportFunction.replace_no_img(logo_src)}></img>
                <div className="Btn-title">{title}</div>
                <div className="Btn-description">{description}</div>
            </button>
        );
    }
}

export default MyAppBtn;