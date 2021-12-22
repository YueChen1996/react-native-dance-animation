import csv from 'csvtojson';
import fs from 'fs';
const csvFilePath = '../top50.csv';
import fetch from 'node-fetch';

async function getAllResults() {
  const jsonArray = await csv().fromFile(csvFilePath);
  for (const result in jsonArray) {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${jsonArray[result].imdb_title_id}&apikey=403602e3`
    );
    const data = await response.json();
    jsonArray[result].poster = data.Poster;
  }
  fs.writeFile('output.json', JSON.stringify(jsonArray), function (err) {
    if (err) throw err;
    console.log('complete');
  });
}

getAllResults();
