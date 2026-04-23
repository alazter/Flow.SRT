const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

function createWindow() {
    // Configurações da janela ao estilo FlowSRT (Glassmorphism, limpa e moderna)
    mainWindow = new BrowserWindow({
            width: 450,  // Deixa a janela estreita
            height: 750, // Deixa a janela alta
            minWidth: 400,
            minHeight: 600,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            icon: path.join(__dirname, 'logo.png') // Aplica o seu logo na barra do Windows
        });

    // Desativa o menu de topo nativo (File, Edit, etc) completamente
    Menu.setApplicationMenu(null);

    // Carrega a interface HTML
    mainWindow.loadFile('sincronizador.html');

    // Assim que o ecrã carregar, procura atualizações silenciosamente
    mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Lógica de Atualização Automática
autoUpdater.on('update-available', () => {
    console.log('Nova versão encontrada! A descarregar...');
});

autoUpdater.on('update-downloaded', () => {
    // Quando o download termina, a app instala e reinicia sozinha
    autoUpdater.quitAndInstall();
});