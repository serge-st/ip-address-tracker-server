import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/getIpData', cors(corsOptions), async (req, res) => {
    try {
        const ip = req.query.ip ? req.query.ip : req.headers['x-forwarded-for'];
        const result = await axios.get(`https://geo.ipify.org/api/v1`, {
            params: {
                apiKey: process.env.GEO_API_KEY,
                ipAddress: ip,
                domain: req.query.domain,
            }
        })
        res.status(200).send(result.data);
    } catch (err) {
        const {data} = err.response
        res.status(data.code).send(data.messages)
    }
});

app.get('/getIpDataDev', cors(corsOptions), (req, res) => {
    const data = {"ip":"192.212.174.101","location":{"country":"LV","region":"Brooklyn","city":"NY 10001","lat":56.95406,"lng":24.12206,"postalCode":"","timezone":"-05:00","geonameId":864298},"as":{"asn":24651,"name":"LVBALTICOM-AS","route":"213.21.195.0/24","domain":"balticom.info","type":"Cable/DSL/ISP"},"isp":"SpaceX Starlink","proxy":{"proxy":false,"vpn":false,"tor":false}}
    setTimeout(() => res.send(data), 1000);
})

app.listen(PORT, () => console.log(`app started on port ${PORT}`));