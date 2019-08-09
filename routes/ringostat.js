let express = require('express');
let router = express.Router();
let nodemailer = require('nodemailer');
let checkAuth = require('../config/check_authentication');
let axios = require('axios');

const CONFIG = require('../config/config');

const checkMail = mail => {
    let pattern = /.*@ringostat\.com/;
    return pattern.test(mail);
};
const getCurrentDate = () => {
    let year = new Date().getFullYear(),
        month = new Date().getMonth()+1,
        day = new Date().getDate(),
        hours = new Date().getHours()+3 > 9 ? new Date().getHours()+3 : `0${new Date().getHours()+3}`,
        minutes = new Date().getMinutes() > 9 ? new Date().getMinutes() : `0${new Date().getMinutes()}`,
        seconds = new Date().getSeconds() > 9 ? new Date().getSeconds() : `0${new Date().getSeconds()}`;

    return `${year}/${month}/${day}; ${hours}:${minutes}:${seconds}`
};
const createTableFromObject = object => {
    if (object.mail) {
        delete object.mail
    };

    let targetObjKeys = Object.keys(object),
        targetObjValues = Object.values(object);

    let tableStartTemplate = `<table style="border: 1px solid #007bff;border-radius:5px;margin: 15px 0;"><thead><tr><th style="border-bottom: 1px solid #007bff;padding:5px;">Ключ</th><th style="border-bottom: 1px solid #007bff;padding:5px;">Значение</th><th style="border-bottom: 1px solid #007bff;padding:5px;">Тип данных</th></tr></thead><tbody style="text-align:center">`,
        tableEndTemplate = `</tbody></table>`;

    let createTableBody = (key, value, result) => {
        result = ``;
        if (!key.length) {
            return result = `<tr><td colspan="3">Параметры не переданы</td></tr>`;
        }

        for (let k = 0, v = 0; k < key.length, v < value.length; k++, v++) {
            result += `<tr><td style="border-right: 1px solid #007bff;padding:5px;">${key[k]}</td><td style="padding:5px;">${value[v]}</td><td style="padding:5px;">${typeof value[v]}</td></tr>`
        }

        return result
    };

    return tableStartTemplate + createTableBody(targetObjKeys, targetObjValues) + tableEndTemplate
};
const createEmailFromData = (date, method, type, server, body) => {
    return `<h3>Данные вебхука</h3> <table style="border: 1px solid #007bff;border-radius:5px;margin: 0 0 15px;"> <tr><td style="border-right: 1px solid #007bff;padding:5px;font-weight:bold;">Дата звонка</td><td style="padding:5px;">${date}</td></tr><tr><td style="border-right: 1px solid #007bff;padding:5px;font-weight:bold;">Метод запроса</td><td style="padding:5px;">${method}</td></tr><tr><td style="border-right: 1px solid #007bff;padding:5px;font-weight:bold;">Content-Type</td><td style="padding:5px;">${method=='GET' ? 'http' : type}</td></tr><tr><td style="border-right: 1px solid #007bff;padding:5px;font-weight:bold;">IP-адрес Ringostat</td><td style="padding:5px;">${server}</td></tr></table> <h3>${method=="POST" ? 'Тело запроса' : 'Параметры запроса'}</h3> </p><p style="display:flex;justify-content: center;margin-bottom:15px;">${createTableFromObject(body)}</p>`
};
const getRingostatProjectData = (url, projectId) => {
    axios
        .get(`${url}&project_id=${projectId}`)
        .then ( response => response)
        .catch(error => error)
};

router.all('/sendWebhookDataToMail', function(req, res){
    let remoteServer = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userEmail = req.query.mail,
        contentTypeHeader = req.headers['content-type'],
        requestMethod = req.method,
        requestBody = req.body,
        requestQuery = req.query,
        requestTime = getCurrentDate();

    //check user mai
    if (!checkMail(userEmail)) {
        res.status(403).send({
            'statusCode': 403,
            'message': 'Forbidden',
            'reason': `Sorry, cant find user with email: ${userEmail}`
        });
    } else {
        let transporter = nodemailer.createTransport(CONFIG.SMTP_OPTIONS);
        let mailOptions = {
            from : '"CS Platform" <noreply@csplatform.com>',
            to : userEmail,
            subject : 'Ringostat Webhook Data | CS Platform',
            html : requestMethod === 'GET' ? createEmailFromData(requestTime, requestMethod, contentTypeHeader, remoteServer, requestQuery) :
                   contentTypeHeader === 'application/xml' ? createEmailFromData(requestTime, requestMethod, contentTypeHeader, remoteServer, requestBody.root) :
                   createEmailFromData(requestTime, requestMethod, contentTypeHeader, remoteServer, requestBody)
        };

        transporter.sendMail(mailOptions, function(err){
            if (err) {
                res.status(500).send({'statusCode':500,'message':'Forbidden','reason':`${err}`});
            }

            res.status(200).end();
        });
    }
});

router.post('/getRingostatProject', checkAuth.private, function(req, res){
    let project_id = req.body.projectId,
        ringostatAPI = CONFIG.RINGOSTAT.analytics_api_projectid_debug;

    res.send(getRingostatProjectData(ringostatAPI, project_id));
    //
});

module.exports = router;