import processing.serial.*;
Serial myPort;

import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

void setup(){
  size(800, 800);
  printArray(Serial.list()); // imprimmer la liste des appreils connectés au port série
  String portName = Serial.list()[0]; // ma carte arduino est la troisième dans la liste imprimmée dans la console
  
  oscP5 = new OscP5(this,12000);
  myRemoteLocation = new NetAddress("127.0.1",6648);
}

void draw(){
  
}

void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage */
  if ( theOscMessage.addrPattern().equals("/rotation_vector/r2")){
    print(" addrpattern: "+theOscMessage.addrPattern());
    print("### received an osc message.");
    println(" value: "+ theOscMessage.get(0).floatValue());
    
    OscMessage myMessage = new OscMessage("/r2");
    myMessage.add((float) theOscMessage.get(0).floatValue());
    oscP5.send(myMessage, myRemoteLocation); 
  }
}
