const { Notification } = require("electron");
const { getConnection } = require("../database");
const { randomUUID } = require('crypto');

const db = getConnection();

async function insertData(arg,win,child){
      let inData = {
            'name': arg.name,
            'age': arg.age,
      };
      try { 
            await db.put({
                  _id: randomUUID(),
                  data: inData
            });
            
            new Notification({
                  title : 'Success',
                  body : 'Student added',
            }).show();
            child.destroy();
            win.reload();
      } catch (error) {
            new Notification({
                  title : 'Failed',
                  body : 'Student added failed',
            }).show();
      }
}


async function getData(win){

      try { 
            var result = await db.allDocs({
                  include_docs: true,
                });
            
            let rows = result['rows'];
            if(rows && rows.length > 0){
                  result = rows;
            }else{
                  result = [];
            }
            win.webContents.send('get-data', result);
           
      } catch (error) {
           
      }
}

async function getEditData(arg,callback){
      try { 
            var result = await db.get(arg.id);
            callback(result);
      } catch (error) {
           
      }
}

async function deleteData(arg,win){
      try { 
            await db.remove(arg.id,arg.rev);
            win.reload();
            new Notification({
                  title : 'Success',
                  body : 'Student deleted',
            }).show();
            
      } catch (error) {
            console.log(error);
            new Notification({
                  title : 'Failed',
                  body : 'Student delete failed',
            }).show();
      }
}
async function updateData(arg,win,child){
      
      let updata = {
            name: arg.name,
            age: arg.age,
      }
      try { 
            await db.put({
                  _id: arg.id,
                  _rev: arg.rev,
                  data: updata
                });
            
            new Notification({
                  title : 'Success',
                  body : 'Student updated',
            }).show();
            child.destroy();
            win.reload();
            
      } catch (error) {
            
            new Notification({
                  title : 'Failed',
                  body : 'Student updated failed',
            }).show();
      }
}

module.exports = {
      getData,
      insertData,
      deleteData,
      updateData,
      getEditData,
}