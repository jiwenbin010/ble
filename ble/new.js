function searchDevices(address){
	
	//注册类
	var main = plus.android.runtimeMainActivity();
	var IntentFilter = plus.android.importClass('android.content.IntentFilter');
	var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
	var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
	var BAdapter = BluetoothAdapter.getDefaultAdapter();
	
	var filter = new IntentFilter();
	var bdevice = new BluetoothDevice();
//	var on=null;
//	var un=null;
	var vlist1=document.getElementById("list1");
	vlist1.innerHTML='';
//	var vlist2=document.getElementById("list2");
//	vlist2.innerHTML='';
	var button1=document.getElementById('bt1');
	button1.value='正在搜索请稍后';
	button1.disabled=true;
	
	BAdapter.startDiscovery();//开启搜索
	console.log("开始搜索设备");
	var receiver;
	receiver=plus.android.implements('io.dcloud.android.content.BroadcastReceiver',{
		onReceive: function(context,intent){ //实现onReceiver回调函数
			plus.android.importClass(intent);//通过intent实例引入intent类，方便以后的‘.’操作
			console.log(intent.getAction());//获取action
			if(intent.getAction()==bdevice.ACTION_FOUND){
				console.log("搜索设备");
				BleDevice=intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
				var li1=document.createElement('li');//注册
				var a=document.createElement('a');	
				a.id=BleDevice.getAddress();
				//a.setAttribute('id',BleDevice.getAddress());
				var new_address=BleDevice.getAddress();
				a.onclick=function open(){
					var myurl="new_file.html?address="+new_address;
					window.location.href=myurl;
				}
				
				//a.setAttribute('href',"new_file.html");
				//a.setAttribute('onclick','open(id)');
				a.innerText=BleDevice.getName()+'   '+BleDevice.getAddress();
				vlist1.appendChild(a);
				vlist1.appendChild(li1);
				
			}
		}
	});
	
	filter.addAction(bdevice.ACTION_FOUND);
//	filter.addAction("android.bluetooth.device.action.PAIRING_REQUEST");
	filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
	filter.addAction(BAdapter.ACTION_STATE_CHANGED);
	main.registerReceiver(receiver, filter);//注册监听
}

//function open(id){
//	var address=id;
//	var myurl="new_file.html?address="+address;
//	window.location.assign(myurl);
	
//}


