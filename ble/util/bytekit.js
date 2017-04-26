//字节处理工具

/**
 * 取子字节数组
 * @param {Object} bytes
 * @param {Object} len
 */
function subBytes(bytes,len){
		var data=new Array[len];
		for (var i = 0; i < len; i++)
			data[i]=bytes[i];
		return data;
}