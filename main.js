const { app, BrowserWindow ,ipcMain} = require("electron");
const path = require("path");
const axios = require('axios');


const isDev = true;

const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1200 : 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.whenReady().then(() => {
  ipcMain.handle('axios.openAI',openAI)
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

async function openAI(event, sentence){
  let res = null;

    await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        data: {
          model: "text-davinci-003",
          prompt: "Write a recipe based on these ingredients and instructions:\n\n" + sentence,
          temperature: 0.3,
          max_tokens: 120,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0
        },
        headers: {
          
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
      }).then(function (response) {
        res = response.data;
      })
      .catch(function (error) {
        res = error;
      });

  return res;
}