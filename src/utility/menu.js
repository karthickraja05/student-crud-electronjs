const { app , shell, Menu } = require('electron')

const menuItem = [
      {
            label: 'More',
            submenu: [
                  {
                        label : 'About',
                        click: async () => {
                              await shell.openExternal('https://google.com')
                        }
                  },
                  {
                        type : 'separator',
                  },
                  {
                        label : 'Exit',
                        click: () => app.quit(),
                  }
            ]
      },
      
];

const menu = Menu.buildFromTemplate(menuItem);
Menu.setApplicationMenu(menu);

module.exports = { menuItem };