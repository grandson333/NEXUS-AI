




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0Z6NEJZSzJPYk1nbGRRS0ExYlRWRkhYMFZKckwxbGhLNjVWTjQ0VlBYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzNhRzNOd3ZVazM3OTlkS2pyTnRScXBsT0xkSDc2TjBNcENWMnVLNlNCbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RG1BNzI4MzI4cFhtY1FLajJFWndtcEpLYm5PTXhVVjM0ZDN4bWJyUDA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSVJWakNoR1U1djhtTHI2TjZHS3crc0hmQ1BGQkV1eFpFSGlDU0pHUXh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldQQngzb2RNTnRPLzIvU3M4cGt6SmlkUDFxSHV2a0FUUE1YRFdpdkI2R0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJ0aWNDV3JVNUpxTEJuRGQwTlBjRWJMVUg1ZXdzb1lWMWZFd0JsOVV3RWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEFFMlBUUGZrcFdXOFBIOWlIL0RJYjlDUU52b0ZhZjUyS1pmN0RnTXFHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFJFa0hjbGNWQklwZTVVRGFnRjBqa0NCcyt0TzdyejF6WURJQXl2cjBoTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQrU3VjaExTVlQ5RFIwVkJ3a2FUanRFN1M0SUNFV0Vzcm1rYlhTeG4rSFJBSWxValVyWkdkL3dVOUtqQ3kvSXJCQWRTZDVSUStRYm1ya1ROaEljbkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzQsImFkdlNlY3JldEtleSI6IjV5Q0FLVk9WUk8zZW1NcDBhNlAwVnZ5MEJuU005encwSmloNzNlSWUvWFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzMjY2Njc2MjU4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMzNzg5OTVENTdFQjgxOUQxNjE0MDg5NkQ2RTg0NjgyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgyNzgzMDR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkcxS1pLUlBaIiwibWUiOnsiaWQiOiIyMzMyNjY2NzYyNTg6MTBAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxODI3NTEzNjE3OTgyNTg6MTBAbGlkIiwibmFtZSI6IksuViBMVUNDSfCfkb4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lSUxSQ0N1TkxCQmhnQklBQW9BQT09IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilg1K05KaGhuNUpDcmM3NG5KTzkyTjdUdnlocnRSaVpXU3JMdVIrWFc5d0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJjY0t4dnBZM1M2bVM5OWJoN0hoM2Jzc3JFdjBwUTI5VUdrOGR6MDFmSzBGUGNlVnBHRGNvaVAycnRpYko4NHlzQnBzQVA2ZTY4UDR6MzhxR1c2d0J3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYVXpyRVozR2xWUlAzbnJpYUNCb2RFWTk3eTdnbGxtVHpTTWJXZjg4aHk5L3llMWdWNURpUG56cHEzdFR1TE90VGNyZlpSNVVNNjE2SVg4MXdob1pEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzI2NjY3NjI1ODoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWK2ZqU1lZWitTUXEzTytKeVR2ZGplMDc4b2E3VVltVmtxeTdrZmwxdmNDIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDgyNzgyODcsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQWNPIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "233266676258",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " King Lucci ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
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
