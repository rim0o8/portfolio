import './App.css';
import MyAppBtn from "./MyAppBtn.js"
import AffiliationBtn from "./AffiliationBtn.js"
import Contact from "./Contact.js"
import SNSLink from "./SNSLink.js"

import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-THFX69N9EX");
    ReactGA.send("pageview");
  }, []);

  const [inputValue, setInputValue] = useState('');  // 入力値を保持するステート
  const [curQuestion, setCurQuestion] = useState(null);  // 入力値を保持するステート
  const [apiData, setApiData] = useState(null);  // APIから受信したデータを保持するステート
  const [isLoading, setIsLoading] = useState(false);  // データ取得中を示すステート

  // テキストボックスの入力値が変更された時の処理
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  // 送信ボタンがクリックされた時の処理
  const handleSubmit = async event => {
    event.preventDefault();  // ページのリロードを防
    setIsLoading(true);
    setCurQuestion(inputValue);
    setInputValue('');  // テキストボックスを空にする
    setApiData('');  // APIから受信したデータを空にする

    ReactGA.event({
      category: "Form",
      action: "Submit question",
      label: inputValue
    });

    try {
      const formdata = new FormData()
      formdata.append('text', inputValue)
      const response = await fetch(
        'https://rim0o8.com/api/aboutme', {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputValue }),
        }
      );

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        reader.read().then(function processText({ done, value }) {
          if (done) {
            console.log('Stream finished');
            return;
          }

          setApiData(prevData => prevData + decoder.decode(value));
          return reader.read().then(processText);
        });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);  // ローディング状態を終了
  };

  return (
    <div className="App">
      <body className="App-header">
        <h2>Yuuri Kurashima</h2>
        <img className="large-logo" src="./img/yuuri_kurashima.jpg" alt=""></img>
        Keywords: NLP, ML
        <h3>Spokesman</h3>
        倉島悠吏について、AIエージェントがご質問にお答えいたします。<br />
        ご質問内容は、本AIの改善に使用されます。<br />
        誤った内容や不自然な内容をお返しする場合がございます。ご了承ください。
        （ex: 開発歴について教えてください）
        <br /><br />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,  // ボックス間のスペース
          }}
        >
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            label="Your Input"
            sx={{
              backgroundColor: '#fff',  // テキストフィールドの背景色を白に設定
            }}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            送信
          </Button>
        </Box>
        <br />
        {isLoading && <CircularProgress />}
        {curQuestion !== null && (
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="body2" style={{ color: 'red' }}>
                質問　{curQuestion}
              </Typography>
            </CardContent>
          </Card>
        )}
        {apiData !== null && (
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="body2">
                {apiData}
              </Typography>
            </CardContent>
          </Card>
        )}


        <h3>My Apps</h3>
        <div>
          <MyAppBtn
            logo_src="./img/animal_shogi.webp"
            title="どうぶつしょうぎ"
            link="https://rim0o8.github.io/animal_shogi-page/AnimalShogi.html"
            description="2019.7にプログラミングを学びたての時にVue.jsの勉強のため個人制作"
          />
        </div>
        <h3>Affiliation</h3>
        <div>
          <AffiliationBtn
            logo_src="./img/TokyoUniversityOfScience.png"
            title="東京理科大学"
            link="https://www.tus.ac.jp/"
            position="創域理工学研究科数理科学専攻M2, 田中真紀子研究室"
            description="微分幾何学において、等質空間（全ての点が同様の性質の空間）はリー群（連続的対称性を持つ数学的構造）の性質を探索する手段を与えます。統計的対象もリー群と見做せ、この手法を用いて新たな性質の探索を行います"
          />
          <AffiliationBtn
              logo_src="./img/elyza.png"
              title="ELYZA.inc"
              link="https://elyza.ai/"
              position="Project Scope Lead AI ENGINEER"
              description="最大手の大手人材・広告企業とのPoCプロジェクトにおいて、日本語の大規模言語生成モデル「ELYZA Pencil」の性能改善に取り組み、1年以上に渡り継続的に成果を出し、クライアントの業務効率化に貢献しました。"
          />
          <AffiliationBtn
              logo_src="./img/virufy.jpeg"
              title="Virufy"
              link="https://virufy.org/ja/"
              position="Japan Project Manager | MLOps ENGINEER"
              description="12箇所のPCR検査場/病院/待機ホテルと連携し、日本人の咳の音声データを収集するプロジェクトを管理。0から20名規模のチームを立ち上げる。また、MLOps Engineerとして、SageMaker Neoでモデルの最適化に取り組む"
          />
        </div>
        <h3>Connect with me</h3>
        <div>
          <SNSLink
            link="https://github.com/rim0o8"
            logo_src="./img/github.png"
          />
          <SNSLink
            link="https://www.linkedin.com/in/yuuri-kurashima-2828ab216/"
            logo_src="./img/linkedin.png"
          />
          <SNSLink
            link="https://twitter.com/q5TyT96EeKs6Xs8"
            logo_src="./img/twitter.png"
          />
          <SNSLink
            link="https://www.facebook.com/kurashimayuuri"
            logo_src="./img/facebook.png"
          />
        </div>
        <h3>Contact</h3>
        <Contact
          mail="kurashimayuuri@gmail.com"
          phone=""
        />
      </body>
    </div>
  );
}

export default App;
