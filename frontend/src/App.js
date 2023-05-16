import './style/App.scss';
import Btn from "./components/Btn.js"
import Contact from "./components/Contact.js"
import Spokesman from "./components/Spokesman.js"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';


import Typography from '@mui/material/Typography';

import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    // Google Analytics
    ReactGA.initialize("G-THFX69N9EX");
    ReactGA.send("pageview");
  }, []);

  return (
    <div className="App">
      <Container maxWidth="md">
        <Spokesman
          name="Yuuri Kurashima"
        />
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          My Apps
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Btn
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
            <Btn
              logo_src="./img/TokyoUniversityOfScience.png"
              title="東京理科大学"
              link="https://www.tus.ac.jp/"
              subtitle="創域理工学研究科数理科学専攻M2, 田中真紀子研究室"
              description="微分幾何学において、等質空間（全ての点が同様の性質の空間）はリー群（連続的対称性を持つ数学的構造）の性質を探索する手段を与えます。統計的対象もリー群と見做せ、この手法を用いて新たな性質の探索を行います"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Btn
              logo_src="./img/elyza.png"
              title="ELYZA.inc"
              link="https://elyza.ai/"
              subtitle="Project Scope Lead AI ENGINEER"
              description="最大手の大手人材・広告企業とのPoCプロジェクトにおいて、日本語の大規模言語生成モデル「ELYZA Pencil」の性能改善に取り組み、1年以上に渡り継続的に成果を出し、クライアントの業務効率化に貢献しました。"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Btn
              logo_src="./img/virufy.jpeg"
              title="Virufy"
              link="https://virufy.org/ja/"
              subtitle="Japan Project Manager | MLOps ENGINEER"
              description="12箇所のPCR検査場/病院/待機ホテルと連携し、日本人の咳の音声データを収集するプロジェクトを管理。0から20名規模のチームを立ち上げる。また、MLOps Engineerとして、SageMaker Neoでモデルの最適化に取り組む"
            />
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Connect with me
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Btn
              link="https://github.com/rim0o8"
              logo_src="./img/github.png"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Btn
              link="https://www.linkedin.com/in/yuuri-kurashima-2828ab216/"
              logo_src="./img/linkedin.png"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Btn
              link="https://twitter.com/q5TyT96EeKs6Xs8"
              logo_src="./img/twitter.png"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Btn
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

export default App;
