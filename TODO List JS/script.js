var emptyStr = '';
var editIdTmp;
var sortByDefault = true;
var sortByLetter = false;
var sortByDate = false;
var fix = false;
var nonfix = false;
var tasksAll = true;
var taskString;
var dateString;
var tasksTmp = emptyStr;
var tasksField;
var maxLength = 32;
var taskArr = [];
var preparedTaskArr = [];
var selected = [];
document.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode === 13) {
     onAdd();
	 showTasks();
  }
  return false;
}
/*Setting default string for date field */
function setDefaultDateField() {
  var ld = new Date();
  document.getElementById("datestr").value = ld.toLocaleDateString();
}
/* Sorting by task (increasing)*/
function byTask(a, b) {
  if (a.task > b.task){	
     return 1;
  }else{
    if (a.task < b.task){
       return -1;
    }else{
       return 0;
    }
  }
}
/* Sorting by date (increasing)*/
function byDate(a, b) {
  if (a.date > b.date){	
     return 1;
  }else{ 
	  if (a.date < b.date){
         return -1;
	  }else{
         return 0;
	  }
  }
}
/*Add new task */
function addElementToArray(element, mas) {
  mas.push(element);
}
/*Modify task */
function taskArrModifyItem() {
  taskArr[Number(editIdTmp)].task = taskString;
  taskArr[Number(editIdTmp)].date = dateString;
}
/*Trim task for optomal window view */
function taskTrim(tskStr){
  var trimmedTask = tskStr;
  if (trimmedTask.length > maxLength) {
     return trimmedTask.slice(0, maxLength);
  }else{
     return trimmedTask;
  }
}

function showTask(idx) {
  document.getElementById('taskstr').value = taskArr[Number(idx)].task;
}

function onAdd() {
  taskString = document.getElementById('taskstr').value;
  dateString = document.getElementById('datestr').value;
	
  if(isStringPass(taskString) && isStringPass(dateString)){
     addElementToArray({
	  isCompleted: false,
	  task: taskString,
	  date: dateString
	  }, taskArr);
  }
  document.getElementById('taskstr').value = emptyStr;
  setDefaultDateField();
  selected = [];
}

function showTasks() {
  tasksField = document.getElementById('tasks');
  editBtnLink = document.getElementById('editBtn');
  if(taskArr.length>0){
     if(tasksAll){
        proceedAll4ShowTasks();
	 }else{
	    if(fix){
           proceedFixed4ShowTasks();
	    }else{
           proceedNonFixed4ShowTasks();
        }
     }
     if(!sortByDefault){
		if(sortByLetter && preparedTaskArr.length>1){
			preparedTaskArr.sort(byTask);
		}
		if(sortByDate && preparedTaskArr.length>1){
			preparedTaskArr.sort(byDate);
		}
	 }
     tasksTmp = generateHtml();
	 tasksField.innerHTML = tasksTmp;
	 tasksTmp = emptyStr;
	 preparedTaskArr = [];
	 editBtnLink.style.display = "none"; 
  }
}

function generateHtml() {
  var tmp = '';
  if(preparedTaskArr.length!=0){
     for(var i=0; i<preparedTaskArr.length; i++) {
	    if(preparedTaskArr[i].isCompleted){
           tmp+= '<div class="task-wr" id="div' + preparedTaskArr[i].idx 
           + '"><div class="task-left">' + preparedTaskArr[i].date + '</div>' 
           + '<div class="task-chbox-right"><input type="checkbox" id="' 
           + preparedTaskArr[i].idx + '" onclick="chkBx(' + preparedTaskArr[i].idx 
           + ')"/></div>' + '<div class="task-right" onclick="showTask('+ i +')"><s>'
           + taskTrim(preparedTaskArr[i].task) + '</s></div></div>';		
        }else{
           tmp+= '<div class="task-wr" id="div' + preparedTaskArr[i].idx
           + '"><div class="task-left">' + preparedTaskArr[i].date + '</div>'
           + '<div class="task-chbox-right"><input type="checkbox" id="'
           + preparedTaskArr[i].idx + '" onclick="chkBx('
           + preparedTaskArr[i].idx + ')"/></div>'
           + '<div class="task-right" onclick="showTask('+ i
           +')">' + taskTrim(preparedTaskArr[i].task) + '</div></div>';   
		}
     }
  }
  return tmp;
}
/*proceed all tasks list */
function proceedAll4ShowTasks() {
  for(var i=0; i<taskArr.length; i++) {
     addElementToArray(
        {
         idx: i,
         isCompleted: taskArr[i].isCompleted,
         task: taskArr[i].task,
         date: taskArr[i].date
        }, preparedTaskArr);
  }
}
/*proceed fixed list */
function proceedFixed4ShowTasks() {
  for(var i=0; i<taskArr.length; i++) {
     if(taskArr[i].isCompleted) {
        addElementToArray(
        {
         idx: i,
		 isCompleted: taskArr[i].isCompleted,
		 task: taskArr[i].task,
		 date: taskArr[i].date},
		 preparedTaskArr);
		}
     }
  }
/*proceed nonfixed list */
function proceedNonFixed4ShowTasks() {
  for(var i=0; i<taskArr.length; i++) {
     if(!taskArr[i].isCompleted){
        addElementToArray(
           {
            idx: i,
            isCompleted: taskArr[i].isCompleted,
            task: taskArr[i].task,
            date: taskArr[i].date
           }, preparedTaskArr);
        }
  }
}

function chkBx(id) {
  var selector = document.getElementById(id);

  if (selector.checked) {
     selected.push(id);
     document.getElementById('div' + id).style.backgroundColor = "#EEFFFE";
  } else {
     var tmpIdx = selected.indexOf(id);
     selected.splice(tmpIdx, 1);
     if(Number(id % 2)==0){ 
        document.getElementById('div' + id).style.backgroundColor = "#F9F9F9";
     }else{ 
        document.getElementById('div' + id).style.backgroundColor = "#FFFFFF";
     } 
  }
}

function fixTasks() {
  if(selected.length>0){
     for(var i=0; i<selected.length; i++) {
        taskArr[Number(selected[i])].isCompleted = true;
     }
  }  	
  selected = [];
  showTasks();
  }

function editTask() {
  if(selected.length!=1){
     alert('JUST SELECT ONLY ONE TASK TO EDIT PLEASE ..');
  }else{
     editIdTmp = selected[0];
     editBtnLink = document.getElementById('editBtn');
     tasksTmp = taskArr[Number(editIdTmp)].task;
     document.getElementById('taskstr').value = tasksTmp;
     document.getElementById('datestr').value = taskArr[Number(editIdTmp)].date;
     editBtnLink.style.display = "block";
  }
}

function applyEditedTask() {
  taskString = document.getElementById('taskstr').value;
  dateString = document.getElementById('datestr').value;
  if(isStringPass(taskString) && isStringPass(dateString)){
     taskArrModifyItem();
  }
  document.getElementById('taskstr').value = emptyStr;
  setDefaultDateField();
  selected = [];

  taskString.innerHTML = tasksTmp;
  setDefaultDateField();
  tasksTmp = emptyStr;
  editIdTmp = emptyStr;
}

function deleteTasks() {
  if(selected.length>0){
     selected.sort();
     for(var i=(selected.length-1); i>=0; i--){
        taskArr.splice(selected[i],1);
     }
  }
  selected = [];
  showTasks();
}

function getAllTasks() {
  tasksAll = true;
  fix = false;
  nonfix = false;
  showTasks();
}

function getFixedTasks() {
  fix = true;
  tasksAll = false;
  nonfix = false;
  showTasks();
}

function getNonFixedTasks() {
  nonfix = true;
  fix = false;
  tasksAll = false;
  showTasks();
}

function setSortByTasks() {
  sortByDefault = false;
  sortByDate = false;
  sortByLetter = true;
  showTasks();
}

function setSortByDate() {
  sortByDefault = false;
  sortByLetter = false;
  sortByDate = true;
  showTasks();
}

function isStringPass(str) {
  if(str!=null && str!=''){
     return true;	
  }
  return false;
}