const { BrowserWindow, Notification ,app , ipcMain  } = require("electron");
// const path = require('path')
const { getConnection } = require("./database");
const { getData, insertData,deleteData,updateData,getEditData } = require("./utility/student");
require("./utility/menu");

let mainWindow,childWindow1,childWindow2;
let devTool = false;
const conn = getConnection();

async function createWindow() {
      mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                  nodeIntegration: true,
                  contextIsolation: false,
            },
            show: false,
      });
      mainWindow.loadFile("src/ui/index.html");
      
      if(devTool){
            mainWindow.webContents.openDevTools();
      }
      
      mainWindow.maximize();
      mainWindow.show();
}

// Function to create child window of parent one
function createChildWindow() {
      childWindow1 = new BrowserWindow({
            width: 1000,
            height: 700,
            modal: true,
            show: false,
            parent: mainWindow, 
            webPreferences: {
                  nodeIntegration: true,
                  contextIsolation: false,
                  enableRemoteModule: true,
            },
      });
      
      // Child window loads settings.html file
      childWindow1.loadFile("src/ui/add.html");
      if(devTool){
            childWindow1.webContents.openDevTools();
      }
      childWindow1.once("ready-to-show", () => {
            childWindow1.show();
      });
}

// Function to create child window of parent one
function createChildWindow2(data) {
      childWindow2 = new BrowserWindow({
            width: 1000,
            height: 700,
            modal: true,
            show: false,
            parent: mainWindow, 
            webPreferences: {
                  nodeIntegration: true,
                  contextIsolation: false,
                  enableRemoteModule: true,
            },
      });
      
      // Child window loads settings.html file
      childWindow2.loadFile("src/ui/edit.html").then();
      if(devTool){
            childWindow2.webContents.openDevTools();
      }
      childWindow2.once("ready-to-show", () => {
            childWindow2.show();
            childWindow2.webContents.send('edit-data', data);
      });

}
      
ipcMain.on("openChildWindow", (event, arg) => {
      createChildWindow();
});


ipcMain.on("updateData", async (event, arg) => {
      if(arg.type === 'add'){
            await insertData(arg,mainWindow,childWindow1);
      }else{
            await updateData(arg,mainWindow,childWindow2);
      }
      
});

ipcMain.on("editStudent", async (event, arg) => {
      getEditData(arg,createChildWindow2);
});

ipcMain.on("deleteStudent", async (event, arg) => {
      await deleteData(arg,mainWindow);
});

ipcMain.on("getTableData", async (event, arg) => {
      getData(mainWindow);
});

app.whenReady().then(() => {
      createWindow();

});



