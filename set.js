const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUhNRHJ4N0s5UkNlUGptU3doWlFkWG1JemJ0TzdVRnVPRkNQcFNFN04zbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYThWTkIwakZYbHF3ZkE4S0FUSHdDQzZBYldnSVJoTWdOWVFRWE1FajFXYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTW45N0dpNWg5K0Q0RmZlRTFyWVFvMENTOTUyVkpmNXM0Wmd5VjZLYkc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5T0lNcEU0WGhrVkdvSFlQQ0dZL0tEaEdEY2dRbk1EclBWQVZXdWVuUmo4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndQamt5Um9UbGRuZVEwRjBwYmNSNEY3eWI3Z3RJYmp6YWx5R0ZZWElTbkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJMUjhoS1FHZVZkeHNKblZmQzczaitBbmxoa0dpdEtVYUVycUFVbUI5Mk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZMMkJrWFdOS2k2YXlwUzNXN0dITW5GT3liYXd0a28zTG1QS09SSzBHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjRiR0JmbW1IN1hoRzdSd3VtektWKzZUYlIyT0NsZ3o1UUlSU3pTMFdIQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9wWE5FQ3BuOEJRTXdLTTFUU3Vhc25VK3B1ZzcwWUxYaWJYOGFudWJCb3NzMUxycWp1alFyTU1CVjV4b3dabW1xbUZEODQrd0FFaXFvWlU0dmc5NWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE4LCJhZHZTZWNyZXRLZXkiOiJuenlWZDlybW91TTJodUcxc01reCtoZTdXNkVyTEpqN0dPbVorUUt1aDVzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUSG1xNHVXdVFLT2JMN2tGWENvSzNBIiwicGhvbmVJZCI6ImNkM2M1YThjLTQ1ZTctNDQ4Yi1hY2IyLTJhNDExZjljN2YzNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMenp0TFh3aDAvb1lEcFR5ODZQclNlbUFPam89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTd3Q2ZUMjV6eWU5YWJTL3VSTWlyWVVJbk5BPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZQNjZHV1YyIiwibWUiOnsiaWQiOiI5MTk3NzgwMzU0OTY6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiR2l0PC8+Q29kZXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ052bjd2RUVFS1hlMzdRR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjAwZVRVT09uUG1yaUdMSG1CUHBoMjBsUDFCWVdtVmdlYlBHM0dxYzNFaEU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikh0OU4xdkUzUERnZlRRTy9QenVQQ0Rhckcyc21nWGlsb3RtQmpRTSs5bDlPOFlBQWR4NkRlUVNnRzVrT0luWHBKRzVIMlR2TXMzWlNVM0NnTWJ6aUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJwWTJYYmNqeDV2UU4zbVRxZWZaRGpkdW1mQWhLTnlnenVwaVkwZSt2NlJnQnZTMm1tZ094Q0lIKzdYa3hDSm9jeWZ4cnBEdnpWS214N2lFbmFIMFdnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTc3ODAzNTQ5NjoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkTkhrMURqcHo1cTRoaXg1Z1Q2WWR0SlQ5UVdGcGxZSG16eHR4cW5OeElSIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMjMzMjAzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVsbCJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://koyeb-adm:plW5ivDus0GQ@ep-wild-fog-a19c0p4i.ap-southeast-1.pg.koyeb.app/koyebdb",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
