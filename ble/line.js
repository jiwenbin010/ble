function getvalue() {
	var url = location.href;
	var temp1 = url.split('?')[1];
	var temp2 = temp1.split("=")[1];
	return temp2;
}

function connectDevice() {
	var address = getvalue();
	if(!address) {
		mui.toast('请选择蓝牙模块');
		return;
	}
	var main = plus.android.runtimeMainActivity();
	var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
	//	BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
	UUID = plus.android.importClass("java.util.UUID");
	var uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
	var BAdapter = BluetoothAdapter.getDefaultAdapter();
	var device = BAdapter.getRemoteDevice(address);
	plus.android.importClass(device);
	bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
	plus.android.importClass(bluetoothSocket);
	if(!bluetoothSocket.isConnected()) {
		console.log('检测到设备未连接，尝试连接....');
		bluetoothSocket.connect();
	}
	
	console.log('设备已连接');
	
	if(bluetoothSocket.isConnected()) {
		var connect_button = document.getElementById('connect');
		connect_button.value = "断开";
		inputStream = bluetoothSocket.getInputStream();
		plus.android.importClass(inputStream);
		outputStream = bluetoothSocket.getOutputStream();
		plus.android.importClass(outputStream);
		
		console.log(11);
		console.log(inputStream);

		//启动BLE接收线程
		var worker = new Worker('bluetooth/bluetooth.js');
		worker.postMessage(inputStream);
		worker.onmessage = function(event) {
			var re = document.getElementById('receive');
			re.innerHTML = event.data;
		}
	}
}

function getconnect() {
	var connect_button = document.getElementById('connect');
	if(connect_button.value == '连接') {
		connectDevice();
	} else {
		console.log('设备已断开');
		bluetoothSocket.close();
		bluetoothSocket = null;
		connect_button.value = "连接"
	}
}

function send() {
	var send_data = document.getElementById('send');
	var string = send_data.value;
	var send_buf = stringToByte(string);

	for(var i = 0; i < send_buf.length; i++) {
		outputStream.write(send_buf[i]);
	}
	outputStream.flush();

}

function stringToByte(string) {
	var string_buf = string.split(" ");
	console.log(string_buf);
	var buf_length = string_buf.length;
	var byte_buf = [];
	for(var i = 0; i < buf_length; i++) {
		byte_buf[i] = parseInt(string_buf[i], 16);
		//byte_buf[i]= byte_buf[i]& 0xff;
		console.log(byte_buf[i]);
	}
	return byte_buf;
}