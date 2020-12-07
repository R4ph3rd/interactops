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
  //myPort = new Serial(this, portName, 9600); // on ouvre la communication
  //myPort.bufferUntil('\n');
  
  oscP5 = new OscP5(this,12000);
  myRemoteLocation = new NetAddress("127.0.1",6648);
}

void draw(){
  
}

void serialEvent (Serial myPort) {
  try { // on essaye de faire qqchose mais on ne plante pas si on y arrive pas
    while (myPort.available() > 0) {
      String inBuffer = myPort.readStringUntil('\n'); // lire la chaine de caractère du port série jusqu'au retour charriot
      if (inBuffer != null) { // si ce n'est pas nul
        if (inBuffer.substring(0, 1).equals("{")) { // et si ça ressemble à du json
          JSONObject json = parseJSONObject(inBuffer); // on essaye de le lire comme du json
          // C'est à partir de là qu'il faut comprendre !!
          if (json == null) {}
          else { // sinon on récupère la valeur portant le nom 'distance' et on la stocke dans une variable !
            OscMessage myMessage = new OscMessage("/wek/inputs");
            myMessage.add((float) abs(json.getInt("flex")));
            oscP5.send(myMessage, myRemoteLocation); 
          }
        } 
        else {
        }
      }
    }
  } 
  catch (Exception e) {
  }
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
