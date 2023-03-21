const ipc = window.require('electron').ipcRenderer;

var add = document.getElementById('add_student');
var main = document.getElementById('main');
var tbody = document.getElementById('tbody');

function addWindow(){
    ipc.send('openChildWindow');  
}

add.addEventListener('click',function(){
      addWindow();
});

// renderer process
ipc.on('get-data', function (event,store) {
      let html = '';
      let id = 1;
      for(let obj of store){
            let currentData = obj.doc.data;
            html += `
                  <tr>
                        <td>${id}</td>
                        <td>${currentData.name}</td>
                        <td>${currentData.age}</td>
                        <td>  
                              <button type="button" class="btn btn-default btn-sm edit_44" id="edit${obj.id}">
                                    <span class="glyphicon glyphicon-edit"></span>
                              </button>
                              <button type="button" class="btn btn-default btn-sm trash_44" id="trash${obj.id}" data-rev="${obj.value.rev}">
                                    <span class="glyphicon glyphicon-trash"></span>
                              </button>
                        </td>
                  </tr>
            `;
            id++;
      }
      tbody.innerHTML = html;

      var elements = document.getElementsByClassName("trash_44");

      var deleteFunction = function() {
            var attribute = this.getAttribute("id");
            var revID = this.getAttribute("data-rev");
            var objId = attribute.replace('trash','');
            if(confirm('Are you sure you want delete this record?')){
                  ipc.send('deleteStudent',{
                        id: objId,
                        rev: revID,
                  });  
            }
      };

      for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', deleteFunction, false);
      }

      var editFunction = function() {
            var attribute = this.getAttribute("id");
            var objId = attribute.replace('edit','');
            ipc.send('editStudent',{
                  id: objId
            });  
      };

      var editElements = document.getElementsByClassName("edit_44");
      for (var i = 0; i < editElements.length; i++) {
            editElements[i].addEventListener('click', editFunction, false);
      }

    
});

window.onload = function(){
      main.style.display = 'block';
      ipc.send('getTableData');  
      
};



