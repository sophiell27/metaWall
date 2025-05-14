import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load service account credentials
const credentials = JSON.parse(
  fs.readFileSync('./credentials/meta-wall-service-account.json', 'utf-8'),
);

// Google API auth
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function fetchTranslations() {
  const spreadsheetId = '1GRVCi_6cztepxar1Fj65-tyInuitwLqEVmhGM3C6Q58';
  const sheetName = 'sheet1';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:Z`,
  });

  const rows = res.data.values;
  if (!rows) {
    console.log('No data found.');
    return;
  }

  const header = rows[0];
  const data = rows.slice(1);

  // const translations: Record<string, Record<string, string>> = {};
  const translations: Record<
    string,
    Record<string, string | Record<string, string>>
  > = {};

  header.forEach((lang) => {
    if (lang !== 'key') translations[lang] = {};
  });

  data.forEach((row) => {
    // [key, , ]
    const key = row[0];
    const isNested = key.includes('.');
    header.forEach((lang, idx) => {
      //[key, en.zh]
      if (lang !== 'key') {
        if (isNested) {
          const [parentKey, childKey] = key.split('.');
          if (!translations[lang][parentKey]) {
            console.log(
              '!translations[lang][parentKey]',
              !translations[lang][parentKey],
            );
            translations[lang][parentKey] = {};
          }
          if (
            typeof translations[lang][parentKey] === 'object' &&
            translations[lang][parentKey] !== null
          ) {
            (translations[lang][parentKey] as Record<string, string>)[
              childKey
            ] = row[idx] || '';
          }
        } else {
          translations[lang][key] = row[idx] || '';
        }
      }
    });
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  Object.entries(translations).forEach(([lang, content]) => {
    const dir = path.join(__dirname, `../public/locales/${lang}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'translation.json'),
      JSON.stringify(content, null, 2),
    );
    console.log(`✅ Generated ${lang}/translation.json`);
  });
}

fetchTranslations();
