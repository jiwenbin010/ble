//BLE模块数据接收线程
var inputStream=null;

onmessage =function (evt){
  inputStream=evt.data;
}

var buf;
var btAryBuffer = null;

search: while(true) {
	
	if(inputStream!=null) {
		var a=inputStream.available();
		console.log(a);
		if(a==0)
			continue search;
			
		var len = inputStream.read(buf);
		if(len > 0) {
			console.log(len);
			btAryBuffer = subBytes(buf, len);
			postMessage(btAryBuffer);
			console.log(btAryBuffer);
		} else {
			continue search;
		}
	} else {
		continue search;
	}
}