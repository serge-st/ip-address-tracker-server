import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

app.get('/getIpData', async (req, res) => {
    try {
        const result = await axios.get(`https://geo.ipify.org/api/v1`, {
            params: {
                apiKey: process.env.GEO_API_KEY,
                ipAddress: req.query.ip,
                domain: req.query.domain,
            }
        })
        res.status(200).send(result.data);
    } catch (err) {
        const {data} = err.response
        res.status(data.code).send(data.messages)
    }
});

app.get('/getIpDataDev', (req, res) => {
    const data = {"ip":"192.212.174.101","location":{"country":"LV","region":"Brooklyn","city":"NY 10001","lat":56.95406,"lng":24.12206,"postalCode":"","timezone":"-05:00","geonameId":864298},"as":{"asn":24651,"name":"LVBALTICOM-AS","route":"213.21.195.0/24","domain":"balticom.info","type":"Cable/DSL/ISP"},"isp":"SpaceX Starlink","proxy":{"proxy":false,"vpn":false,"tor":false}}
    res.send(data)
})

app.listen(5000, () => console.log('app started on port 5000'));