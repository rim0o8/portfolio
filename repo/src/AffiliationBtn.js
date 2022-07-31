// 新しいtabでlinkを開くボタン

import React, { Component } from 'react';
import './Btn.css';

class AffiliationBtn extends Component {
    render() {
        const {
            logo_src,
            title,
            link,
            position,
            description
        } = this.props;

        const openWindow = () => {
            window.open(link, '_blank');
        }

        return (
            <button className="Btn" onClick={openWindow}>
                <img className="logo" src={logo_src}></img>
                <div className="Btn-title">{title}</div>
                <b>{position}</b>
                <div className="Btn-description">{description}</div>
            </button>
        );
    }
}

export default AffiliationBtn;