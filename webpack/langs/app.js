const axios = require('axios');
const { tsv2json } = require('tsv-json');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const getData = link => axios.get(link);

const parseData = data => {
  const result = {
    ru: { index: 'ru', },
    en: { index: 'en', },
  };

  for (let i = 0; i < data.length; i += 1) {
    if (i === 0) continue;

    const arr = data[i];
    const key = arr[0];
    if (!key) continue;
    if (key === '#') break;

    const ruValue = arr[1];
    const enValue = arr[2];

    result.en[key] = enValue;
    result.ru[key] = ruValue;
  }

  return result;
};

const rl = readline.createInterface({ input, output });
rl.question('Введите ссылку: ', link => {
  getData(link).then(res => {
    console.log('Данные получены, запущена обработка...');
    const jsonData = tsv2json(res.data);
    const parsedData = parseData(jsonData);
    const data = JSON.stringify(parsedData, null, 2);
    const fileName = 'langs.json';
    fs.writeFile(`${__dirname}/${fileName}`, data, (err) => { 
      if (err) throw err; 
      console.log(`Результат в файле: ${fileName}`); 
      }); 
  }).catch(e => {
    console.log('Неправильная ссылка');
  });
  
  rl.close();
});
