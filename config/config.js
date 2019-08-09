let SECRET = require('./secret/credentials');

module.exports = {
    DATABASE : `mongodb+srv://${SECRET.DATABASE.USER}:${SECRET.DATABASE.PASS}@${SECRET.DATABASE.LINK}/${SECRET.DATABASE.NAME}?retryWrites=true`,
    SECRET_PHRASE : SECRET.PHRASE,
    SESSION_OPTIONS : {
        saveUninitialized : true,
        resave : true,
        secret : SECRET.PHRASE,
        cookie : {
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 9
        }
    },
    SMTP_OPTIONS : {
        host : 'mail.zzz.com.ua',
        port: 587,
        secure: false,
        requireTLS : true,
        auth : {
            user : SECRET.SMTP.USER,
            pass : SECRET.SMTP.PASS
        }
    },
    RINGOSTAT : {
        analytics_api_projectid_debug : `https://analytics.ringostat.net/api/debug/project_settings?token=${SECRET.RINGOSTAT.ANALYTICS_API_DEBUG}`,
        api_sip_online : `https://api.ringostat.com/sipstatus/siponline?project_id=${SECRET.RINGOSTAT.PROJECT}&token=${SECRET.RINGOSTAT.TOKEN}`,
        api_sip_busy : `https://api.ringostat.com/sipstatus/speakingNow?project_id=${SECRET.RINGOSTAT.PROJECT}&token=${SECRET.RINGOSTAT.TOKEN}`,
        api_export_call_log : `https://api.ringostat.com/calls/export?project_id=${SECRET.RINGOSTAT.PROJECT}&token=${SECRET.RINGOSTAT.TOKEN}`,
        api_simple_callback : `https://api.ringostat.com/callback/outbound_call?project_id=${SECRET.RINGOSTAT.PROJECT}&token=${SECRET.RINGOSTAT.TOKEN}`,
        api_external_callback : `https://api.ringostat.net/a/v2?project_id=${SECRET.RINGOSTAT.PROJECT}&token=${SECRET.RINGOSTAT.TOKEN}`
    }
};