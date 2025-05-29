g




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0RxTmhkUXhNRkRMNXNqejFFVnQ3V3FVQWV2clpRV01rbVVNRDhPaVluND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1l5RGdDRmkyMFNxRjFoOGVWN1dUbnFxMDVxYW1GZEJVYVVHOVJnZ1Bnaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSGR3a25OdHZQWTgvcDhsa2tpSGRVTDZTOHBYWE54RmF6aUNST0g0NzJJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsWVhDaUxDTnJqV1BlU09lMEREVjhXdDZ4TTVMZEpZc29lYzFoRDBlemtvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhKVE51cXBIUmthaWhCcEJmN1doYnYrYWhEbTlZSVhiU1FpQkJJUURsR2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdsNGMwdHRKeFNwTUZISW9Nb1I4aG5FeGhGNDJsQTRpb1Z5WFZGZHlnbkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT01TMldRdXpFcmJQbUV6aVhrZTR5bTNYT1Z2RElCTEV2ZStXRUFZOGNrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaERRK2N6QTdlQ1U1cGkyZ05YSW01TUtuN1FEL25wcW5RUkhydlQ3MFlHZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRtd3NGdFpwMUh5dldoRkJjZldOczd4eTdyNmRrWFpnUEdlLzRTRTVjdnpoOS9qVG1mY0Q2dnBJanRHQjlZMTNWQlFubGQxY2JObGxNZVN0RWFSMkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEzLCJhZHZTZWNyZXRLZXkiOiJmVEgzdU5tL0RWalh6OTNSZUhNOVRjTEwrWGdJVXZoM1Z4c2pWQjMzWmtzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU5ODM3MDkwOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTlEMTFBM0ExQzYxMjlCQTBENSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4NTE3NTk1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJMTjg5NTJCUSIsIm1lIjp7ImlkIjoiMjMzNTk4MzcwOTA5OjExQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNDk5ODQ5MzAxMDc1NzE6MTFAbGlkIiwibmFtZSI6Ik1jVEhPVVNBTkTwn5iO8J+YjiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUG5nZzQ0QkVKK0Y0Y0VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR1BSb21RQjBhcE9wY0ZEWmRRQ1NTMnJmR0xmRFJKU2hZRUZlZHdIVWtpZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoib25DU290eXV6T0tFZEZMNUlrRkpzQ2FkSnN5UFNnL21ZYUNpTXlyRE5QZUwrYi9CamdZSmxWK3pRQWJuRVhBb3pESXhwMFJDbjc3eHhBYWNUWjNhZ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IkR1OUNBTXNnelI4NEs3dFJudUs0K2NBOXl5UDV0V3pTR0E1UFpTc29VSmNoMGg0RFZMbFg0QUpJdEJhQjVHRHJEQnlFVDA0Y1ZacDlERWtuUDMxV0FBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTk4MzcwOTA5OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJqMGFKa0FkR3FUcVhCUTJYVUFra3RxM3hpM3cwU1VvV0JCWG5jQjFKSW8ifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4NTE3NTQ3LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUI0SiJ9g',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "233598370909",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " King Lucci ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
