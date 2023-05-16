import React, { useState } from 'react';
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

const Spokesman = ({
    title,
    subtitle,
    description,
    logo_src,
    question_prefix,
    text_firld_message,
    submit_btn_message,
}) => {
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
        <div>
            <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={4}>
                    <Avatar alt={title} src={ logo_src } sx={{ width: 200, height: 200 }} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" gutterBottom>
                        { title }
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        { subtitle }
                    </Typography>
                    <Typography variant="body1" paragraph>
                        { description }
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
                label={ text_firld_message }
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
                { submit_btn_message }
            </Button>
            </Box>
            <br />
            {isLoading && <CircularProgress />}
            {curQuestion !== null && (
            <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent>
                <Typography variant="body2" color="error">
                    {question_prefix}: {curQuestion}
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
