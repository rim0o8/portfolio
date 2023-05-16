import React, { Component } from 'react';
import '../style/SNSLink.scss';
import { replace_no_img } from '../utils';
import exportFunction from "../utils"

class SNSLink extends Component {

    render() {
        const {
            link,
            logo_src
        } = this.props;

        const openWindow = () => {
            window.open(link, '_blank');
        }

        return (
            <button className="SNSBtn" onClick={openWindow}>
                <img className="logo" src={exportFunction.replace_no_img(logo_src)}></img>
            </button>
        );
    }
}

export default SNSLink;