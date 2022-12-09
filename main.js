const { app, BrowserWindow} = require('electron');

let window

function startApplication () {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });


    window.loadFile("index.html")
    window.openDevTools();

}

app.whenReady().then(() => {
    startApplication()
})
