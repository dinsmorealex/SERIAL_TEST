var serialport = require('serialport'),// include the library
   SerialPort = serialport.SerialPort, // make a local instance of it
   // get port name from the command line:
   portName = process.argv[2];

   var led=1;

   var myPort = new SerialPort("/dev/tty.usbmodem1411", {
   baudRate: 9600,
    dataBits: 8, 
	     parity: 'none', 
	     stopBits: 1, 
	     flowControl: false ,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")

 });

myPort.on('open',function(){
	setInterval(testLedController,2000);
});

function testLedController(){
	console.log('send command for led='+led);

	myPort.write(led.toString());

	led++;
	if (led>3)
		led=1;

}

myPort.on('error', function(err){
	console.log('error=' + err)
});
