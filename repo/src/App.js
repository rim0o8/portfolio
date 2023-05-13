import logo from './logo.svg';
import './App.css';
import MyAppBtn from "./MyAppBtn.js"
import AffiliationBtn from "./AffiliationBtn.js"
import Contact from "./Contact.js"
import SNSLink from "./SNSLink.js"

function App() {
  return (
    <div className="App">
      <body className="App-header">
        <h2>Yuuri Kurashima</h2>
        <img className="large-logo" src="./yuuri.png"></img>
        Keywords: NLP, ML
        <h3>My Apps</h3>
        <div>
          <MyAppBtn
            logo_src="animal_shogi.webp"
            title="どうぶつしょうぎ"
            link="https://rim0o8.github.io/animal_shogi-page/AnimalShogi.html"
            description="2019.7にプログラミングを学びたての時にVue.jsの勉強のため個人制作"
          />
        </div>
        <h3>Affiliation</h3>
        <div>
          <AffiliationBtn
            logo_src="./TokyoUniversityOfScience.png"
            title="東京理科大学"
            link="https://www.tus.ac.jp/"
            position="田中真紀子研究室"
            description="理工学研究科数学専攻M1, リー群を基盤とした研究"
          />
          <AffiliationBtn
              logo_src="./elyza.png"
              title="ELYZA.inc"
              link="https://elyza.ai/"
              position="NLP AI ENGINEER Intern"
              description="NLP, ML, RetailTech, Crawling"
          />
          <AffiliationBtn
              logo_src="./virufy.jpeg"
              title="Virufy"
              link="https://virufy.org/ja/"
              position="MLOps ENGINEER"
              description="ML"
          />
        </div>
        <h3>Accounts</h3>
        <div>
          <SNSLink
            link="https://github.com/rim0o8"
            logo_src="./github.png"
          />
          <SNSLink
            link="https://www.linkedin.com/in/yuuri-kurashima-2828ab216/"
            logo_src="./linkedin.png"
          />
          <SNSLink
            link="https://twitter.com/q5TyT96EeKs6Xs8"
            logo_src="./twitter.png"
          />
          <SNSLink
            link="https://www.facebook.com/kurashimayuuri"
            logo_src="./facebook.png"
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
