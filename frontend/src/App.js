import './style/App.scss';
import MyAppBtn from "./components/MyAppBtn.js"
import AffiliationBtn from "./components/AffiliationBtn.js"
import Contact from "./components/Contact.js"
import SNSLink from "./components/SNSLink.js"
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
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

  const [inputValue, setInputValue] = useState('');
  const [curQuestion, setCurQuestion] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();  // ページのリロードを防ぐ
    setIsLoading(true);
    setCurQuestion(inputValue);
    setInputValue('');
    setApiData('');

    ReactGA.event({
      category: "Form",
      action: "Submit question",
      label: inputValue
    });

    try {
      const formdata = new FormData()
      formdata.append('text', inputValue)
      const response = await fetch(
        'http://localhost:8000/api/aboutme', {
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
            return;
          }
          setIsLoading(false);

          setApiData(prevData => prevData + decoder.decode(value));
          return reader.read().then(processText);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={4}>
            <Avatar alt="Yuuri Kurashima" src="./img/yuuri_kurashima.jpg" sx={{ width: 200, height: 200 }} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Yuuri Kurashima
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Keywords: NLP, ML
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Spokesman
            </Typography>
            <Typography variant="body1" paragraph>
              倉島悠吏について、AIエージェントがご質問にお答えいたします。<br />
              ご質問内容は、本AIの改善に使用されます。<br />
              誤った内容や不自然な内容をお返しする場合がございます。ご了承ください。
              （ex: 開発歴について教えてください）
            </Typography>
          </Grid>
        </Grid>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            marginTop: '20px',
          }}
        >
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            label="Your Input"
            fullWidth
            sx={{
              backgroundColor: '#fff',
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
              <Typography variant="body2" color="error">
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
    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
      My Apps
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <MyAppBtn
          logo_src="./img/animal_shogi.webp"
          title="どうぶつしょうぎ"
          link="https://rim0o8.github.io/animal_shogi-page/AnimalShogi.html"
          description="2019.7にプログラミングを学びたての時にVue.jsの勉強のため個人制作"
        />
      </Grid>
    </Grid>

    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
  Affiliation
</Typography>
<Grid container spacing={3}>
  <Grid item xs={12} sm={6}>
    <AffiliationBtn
      logo_src="./img/TokyoUniversityOfScience.png"
      title="東京理科大学"
      link="https://www.tus.ac.jp/"
      position="創域理工学研究科数理科学専攻M2, 田中真紀子研究室"
      description="微分幾何学において、等質空間（全ての点が同様の性質の空間）はリー群（連続的対称性を持つ数学的構造）の性質を探索する手段を与えます。統計的対象もリー群と見做せ、この手法を用いて新たな性質の探索を行います"
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <AffiliationBtn
      logo_src="./img/elyza.png"
      title="ELYZA.inc"
      link="https://elyza.ai/"
      position="Project Scope Lead AI ENGINEER"
      description="最大手の大手人材・広告企業とのPoCプロジェクトにおいて、日本語の大規模言語生成モデル「ELYZA Pencil」の性能改善に取り組み、1年以上に渡り継続的に成果を出し、クライアントの業務効率化に貢献しました。"
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <AffiliationBtn
      logo_src="./img/virufy.jpeg"
      title="Virufy"
      link="https://virufy.org/ja/"
      position="Japan Project Manager | MLOps ENGINEER"
      description="12箇所のPCR検査場/病院/待機ホテルと連携し、日本人の咳の音声データを収集するプロジェクトを管理。0から20名規模のチームを立ち上げる。また、MLOps Engineerとして、SageMaker Neoでモデルの最適化に取り組む"
    />
  </Grid>
</Grid>

    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
      Connect with me
    </Typography>
    <Grid container spacing={2}>
      <Grid item>
        <SNSLink
          link="https://github.com/rim0o8"
          logo_src="./img/github.png"
        />
      </Grid>
      <Grid item>
        <SNSLink
          link="https://www.linkedin.com/in/yuuri-kurashima-2828ab216/"
          logo_src="./img/linkedin.png"
        />
      </Grid>
      <Grid item>
        <SNSLink
          link="https://twitter.com/q5TyT96EeKs6Xs8"
          logo_src="./img/twitter.png"
          />
          </Grid>
          <Grid item>
          <SNSLink
                     link="https://www.facebook.com/kurashimayuuri"
                     logo_src="./img/facebook.png"
                   />
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Contact
        </Typography>
        <Contact
          mail="kurashimayuuri@gmail.com"
          phone=""
        />
  </Container>
</div>
);
}


  /*
  return (
    <div className="App">
      <body className="App-header">
        <h2>Yuuri Kurashima</h2>
        <img className="large-logo" src="./img/yuuri_kurashima.jpg" alt=""></img>
        Keywords: NLP, ML
        <h3>Spokesman</h3>
        <font size="4">
        倉島悠吏について、AIエージェントがご質問にお答えいたします。<br />
        ご質問内容は、本AIの改善に使用されます。<br />
        誤った内容や不自然な内容をお返しする場合がございます。ご了承ください。
        （ex: 開発歴について教えてください）
        </font>
        <br /><br />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            label="Your Input"
            sx={{
              backgroundColor: '#fff',
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
*/

export default App;
