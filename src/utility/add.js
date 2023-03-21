const ipc = window.require('electron').ipcRenderer;

var sname = document.getElementById('name');
var age = document.getElementById('age');


function addStudent(){
      var name_val = sname.value.trim();
      var age_val = age.value.trim();
      if(name_val === ''){
            alert('Please enter student name');
            return '';
      }else if(age_val === ''){
            alert('Please enter student age');
            return '';
      }

      if(name_val.length < 5){
            alert('Student name must contain more than 5 char');
            return '';
      }else if(name_val.length > 15){
            alert('Student name must contain not more than 15 char');
            return '';
      }
      let data = {
            name: name_val,
            age: age_val,
            type: 'add',
      };
      sendDataToMainWindow(data);
      return '';
}


function sendDataToMainWindow(data){
      ipc.send('updateData',data);  
}


