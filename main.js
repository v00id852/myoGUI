import pkg from './package.json';
import {app, BrowserWindow} from 'electron';

let forceQuit = true;
let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        x: 745,
        y: 500,
        minWidth: 745,
        minHeight: 450,
        transparent: true,
        titleBarStyle: 'hidden-inset',
        backgroundColor: 'none',
        resizable: false,
    });

    mainWindow.loadURL(
        `file://${__dirname}/src/index.html`
    );

    mainWindow.on('close', e => {
        mainWindow = null;
        app.quit();
    });

    mainWindow.webContents.on('did-finish-load', () => {
        try {
            mainWindow.show();
            mainWindow.focus();
        } catch (ex) { }
    });

    mainWindow.setMenu(null);
};

app.setName(pkg.name);
app.on('ready', createMainWindow);
app.on('before-quit', () => {
    forceQuit = true;
});
