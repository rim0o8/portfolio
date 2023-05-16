// 新しいtabでlinkを開くボタン

import React, { Component } from 'react';
import '../style/Btn.scss';

class Btn extends Component {
    render() {
        const {
            logo_src,
            title,
            subtitle,
            description,
            link,
        } = this.props;

        const openWindow = () => {
            window.open(link, '_blank');
        }

        return (
            <button className="Btn" onClick={openWindow}>
                { logo_src && <img className="logo" src={logo_src}></img> }
                { title && <div className="Btn-title">{title}</div> }
                { subtitle && <b>{subtitle}</b> }
                { description && <div className="Btn-description">{description}</div> }
            </button>
        );
    }
}

Btn.defaultProps = {
    title: '',
    subtitle: '',
    description: '',
    link: '',
};

export default Btn;