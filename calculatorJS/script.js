var screenElement = document.getElementById('fieldnum');
var tmp1 = 0;
screenElement.innerHTML = tmp1;
var tmp2 = 0;
var tmpOper = '';
var emptyOper = '';
var operCount = 0;
var plusStr = '+';
var minusStr = '-';
var multiplyStr = '*';
var divideStr = '/';

function onNum(num) {
  console.log(num);
  if(tmpOper==emptyOper){
	  if(+tmp1==0){
		tmp1 = num;  
	  }else{
		tmp1 = emptyOper + tmp1 + num; 
	  }
	  screenElement.innerHTML = tmp1;
  }else{
	  if(+tmp2==0){
		tmp2 = num;  
	  }else{
		tmp2 = emptyOper + tmp2 + num; 
	  }
	  screenElement.innerHTML = tmp2;
  }
}

function onPlus() {
        console.log("Operation plus");
        
        if(+tmp2==0){
        if(tmpOper==emptyOper){
        operCount++;
        tmpOper=plusStr;
        }else{
        tmpOper=plusStr;
        }
        }else{
        operCount++;
		if(!checkOperationCount(plusStr)){
			tmpOper=plusStr;
		}
        }     
}

function onMinus() {
  console.log("Operation minus");
        if(+tmp2==0){
        if(tmpOper==emptyOper){
        operCount++;
        tmpOper=minusStr;
        }else{
        tmpOper=minusStr;
        }
        }else{
        operCount++;
		if(!checkOperationCount(minusStr)){
			tmpOper=minusStr;
		}
        }  
}

function onMultiply () {
  console.log("Operation multiply");
        if(+tmp2==0){
        if(tmpOper==emptyOper){
        operCount++;
        tmpOper=multiplyStr;
        }else{
        tmpOper=multiplyStr;
        }
        }else{
        operCount++;
		if(!checkOperationCount(multiplyStr)){
			tmpOper=multiplyStr;
		}
        }
}

function onDivide() {
  console.log("Operation divide");
        if(+tmp2==0){
        if(tmpOper==emptyOper){
        operCount++;
        tmpOper=divideStr;
        }else{
        tmpOper=divideStr;
        }
        }else{
        operCount++;
		if(!checkOperationCount(divideStr)){
			tmpOper=divideStr;
		}
        }
}

function onTotal() {
  console.log("Operation total equal");
  proceedOper(tmpOper);
  screenElement.innerHTML = tmp1;
  operCount=0;
  tmp2 = 0;
  tmpOper = emptyOper;
}

function checkOperationCount (oper) {
  if (operCount>1) {
	  proceedOper(tmpOper);
          screenElement.innerHTML = tmp1;
	  operCount=1;
	  tmpOper=oper;
	  tmp2 = 0;
  }else{
	return false;  
  }
}

function proceedOper (oper) {
  switch (oper) {
   case plusStr:
      console.log("Operation plus");
      tmp1 = Number(tmp1) + Number(tmp2);
      tmp2 = 0;
      tmpOper = emptyOper;
      break;
   case minusStr:
      console.log("Operation minus");
      tmp1 = Number(tmp1) - Number(tmp2);
      tmp2 = 0;
      tmpOper = emptyOper;
      break;
   case multiplyStr:
      console.log("Operation multiply");
      tmp1 = Number(tmp1) * Number(tmp2);
      tmp2 = 0;
      tmpOper = emptyOper;
      break;
   case divideStr:
      console.log("Operation divide");
      if(Number(tmp2)==0){
      tmp1 = 'error';
      }else{
      tmp1 = Number(tmp1) / Number(tmp2);
      }
      tmp2 = 0;
      tmpOper = emptyOper;
      break;
   default:
      break;
}
}

function onReset () {
  console.log("Operation reset");
  tmp1 = 0;
  tmp2 = 0;
  operCount = 0;
  tmpOper = emptyOper;
  screenElement.innerHTML = tmp1;
}