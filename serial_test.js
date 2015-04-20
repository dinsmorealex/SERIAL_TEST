var serialport = require('serialport');// include the library
var SerialPort = serialport.SerialPort; // make a local instance of it
var portName = process.argv[2]; // get port name from the command line:

var led=1;

/* check that the port hasn't changed (look in Arduino app) */
var myPort = new SerialPort("/dev/tty.usbmodem1411", {
	baudRate: 9600,
	dataBits: 8, 
	parity: 'none', 
	stopBits: 1, 
	flowControl: false ,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n")
});

function testLedController(){
	console.log('send command for led=  '+led);

	myPort.write(led.toString());

	led++;
	if (led>3){
		led=1; //start over
	} 
}

myPort.on('open',function(){
	/* immediately begin calling the testLedController() function, every 2 seconds: */
	setInterval(testLedController,2000);
});

myPort.on('error', function(err){
	console.log('error=' + err)
});
