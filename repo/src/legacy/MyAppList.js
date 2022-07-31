import React, { Component } from 'react';
import './MyAppList.css';
import MyAppBtn from "./MyAppBtn.js"

class MyAppList extends Component {
    render() {
        return (
            <div>
                <MyAppBtn
                    title="動物将棋"
                    link=""
                    description="2019.7に個人制作"
                />
                <MyAppBtn
                    title="NLPの何か"
                    link="https://apple.com"
                    description="作りたいなあって思ってる"
                />
                <MyAppBtn
                    title="お店でQR読み込んだらメニューになるやつ"
                    link="https://meta.com"
                    description="今作ってる"
                />
            </div>
        );
    }
}

export default MyAppList;