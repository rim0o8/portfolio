import React, { useState, useEffect } from 'react';
import '../style/Spokesman.scss';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import ReactGA from "react-ga4";

const Spokesman = ({ name }) => {
    useEffect(() => {
        // Google Analytics
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
        event.preventDefault();
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
                setIsLoading(false);
                setApiData(prevData => prevData + decoder.decode(value));
                return reader.read().then(processText);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={4}>
                    <Avatar alt={ name } src="./img/yuuri_kurashima.jpg" sx={{ width: 200, height: 200 }} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" gutterBottom>
                        { name }
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    Spokesman
                    </Typography>
                    <Typography variant="body1" paragraph>
                        倉島悠吏について、AIエージェントがご質問にお答えいたします。<br />
                        ご質問内容は、本AIの改善に使用されます。<br />
                        誤った内容や不自然な内容をお返しする場合がございます。ご了承ください。
                        （ex: Virufyでの経験について教えてください）
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
                )
            }
        </div>
    );
}

export default Spokesman;
