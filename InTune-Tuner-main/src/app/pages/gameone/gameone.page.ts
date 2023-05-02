import { Component, OnInit } from '@angular/core';
import { AlertController,NavController,createAnimation  } from '@ionic/angular';
import { CancionIn } from './model/CancionIn';

import { Nota } from './model/nota';

declare const p5;
declare const ml5;


@Component({
  selector: 'app-gameone',
  templateUrl: './gameone.page.html',
  styleUrls: ['./gameone.page.scss'],
})

export class GameonePage implements OnInit {

  titulo;
  private listNotas: Nota[] = [];
  private listaRecibeFrecuencia : number[]=[];
  p5;
  advice;
  pitch; 
  private isEvaluating: boolean = false;
  private MAX_FREQ_LENGTH: number = 5;
  private TOLERANCE: number = 10;

  constructor() { }

  initializeMic(){
    new p5((tuner) => this.handleInput(tuner, this));
  }

  handleInput(tuner, object) {
    let freq = 0;
    tuner.setup = () => {
      const modelUrl = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
      const audioContext = new AudioContext();
      const mic = new p5.AudioIn(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      let pitch;
      mic.start(loadModel);
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      function loadModel() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        pitch = ml5.pitchDetection(modelUrl, audioContext, mic.stream, modelLoaded);
      }
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      function modelLoaded() {
        pitch.getPitch(gotPitch);
      }
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      function gotPitch(error: string, frequency: number) {
        if (error) {
          console.error(error);
        }
        if (frequency) {
          freq = frequency;
        }
        if (!object.isEvaluating){
          object.listaRecibeFrecuencia.push(freq);
          if (object.listaRecibeFrecuencia.length > object.MAX_FREQ_LENGTH){
            object.listaRecibeFrecuencia.pop();
          }
        }
        // console.log((new  Date()).toISOString() + " - Escuchando: " + freq);
        pitch.getPitch(gotPitch);
      }
    };
  }

  doAnimation(dibujo:string,freq: number, id: Number){ 
    const animation = createAnimation();

    if (dibujo.charAt(0)!="X"){
      console.log((new  Date()).toISOString() + " - Cuerda uno");
      const img = document.createElement("img");
      if (dibujo.charAt(0)=="0"){
        img.src = "../../assets/juegouno/cero.png";
      }
      if (dibujo.charAt(0)=="1"){
        img.src = "../../assets/juegouno/uno.png";
      }
      if (dibujo.charAt(0)=="2"){
        img.src = "../../assets/juegouno/dos.png";
      }
      if (dibujo.charAt(0)=="3"){
        img.src = "../../assets/juegouno/tres.png";
      }
      img.id = "card_1_" + id;
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.position = "absolute";
      document.getElementById("cuerda_uno").appendChild(img);

      animation.addElement(document.querySelector("#card_1_" + id));
    }

    if (dibujo.charAt(1)!="X"){
      console.log((new  Date()).toISOString() + " - Cuerda dos");
      const img = document.createElement("img");
      if (dibujo.charAt(1)=="0"){
        img.src = "../../assets/juegouno/cero.png";
      }
      if (dibujo.charAt(1)=="1"){
        img.src = "../../assets/juegouno/uno.png";
      }
      if (dibujo.charAt(1)=="2"){
        img.src = "../../assets/juegouno/dos.png";
      }
      if (dibujo.charAt(1)=="3"){
        img.src = "../../assets/juegouno/tres.png";
      }
      img.id = "card_2_" + id;
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.position = "absolute";
      document.getElementById("cuerda_dos").appendChild(img);

      animation.addElement(document.querySelector("#card_2_" + id));
    }
    if (dibujo.charAt(2)!="X"){
      console.log((new  Date()).toISOString() + " - Cuerda tres");
      const img = document.createElement("img");
      if (dibujo.charAt(2)=="0"){
        img.src = "../../assets/juegouno/cero.png";
      }
      if (dibujo.charAt(2)=="1"){
        img.src = "../../assets/juegouno/uno.png";
      }
      if (dibujo.charAt(2)=="2"){
        img.src = "../../assets/juegouno/dos.png";
      }
      if (dibujo.charAt(2)=="3"){
        img.src = "../../assets/juegouno/tres.png";
      }
      img.id = "card_3_" + id;
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.position = "absolute";
      document.getElementById("cuerda_tres").appendChild(img);

      animation.addElement(document.querySelector("#card_3_" + id));
    }
    if (dibujo.charAt(3)!="X"){
      console.log((new  Date()).toISOString() + " - Cuerda cuatro");
      const img = document.createElement("img");
      if (dibujo.charAt(3)=="0"){
        img.src = "../../assets/juegouno/cero.png";
      }
      if (dibujo.charAt(3)=="1"){
        img.src = "../../assets/juegouno/uno.png";
      }
      if (dibujo.charAt(3)=="2"){
        img.src = "../../assets/juegouno/dos.png";
      }
      if (dibujo.charAt(3)=="3"){
        img.src = "../../assets/juegouno/tres.png";
      }
      img.id = "card_4_" + id;
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.position = "absolute";
      document.getElementById("cuerda_cuatro").appendChild(img);

      animation.addElement(document.querySelector("#card_4_" + id));
    }
    
    animation
    .duration(1500)
    .iterations(1)
    .onFinish(()=>{this.evaluateNote(freq, id, dibujo)})
    .fromTo('transform', 'translateY(0px)', 'translateY(2400%)')
    ;    
    animation.play();    
  }

iniciaJuego(){
  this.initializeMic();
  this.drawNotes();
}

delays(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

 async drawNotes(){
    let before: number = 0;
    let initial: number = 0;
   
    console.log((new  Date()).toISOString() + " - Inicio proceso -");
    for (let index = 0; index < this.listNotas.length; index++) {      
      if (index==0){
        before = 0
      }else{
        before = this.listNotas[index-1].time;
      }
      initial = this.listNotas[index].time - before;
      await this.delays(initial);
      this.doAnimation(this.listNotas[index].notaDraw,this.listNotas[index].notaFrecuency, index);
    }
  }

  evaluateNote(freq:number, id: Number, dibujo:string){
    if (dibujo.charAt(0)!="X"){
      document.getElementById("card_1_" + id).remove();
    }
    if (dibujo.charAt(1)!="X"){
      document.getElementById("card_2_" + id).remove();
    }
    if (dibujo.charAt(2)!="X"){
      document.getElementById("card_3_" + id).remove();
    }
    if (dibujo.charAt(3)!="X"){
      document.getElementById("card_4_" + id).remove();
    }

    this.isEvaluating = true;
    console.log((new  Date()).toISOString() + " - Cantidad de Frecuencias:" + this.listaRecibeFrecuencia.length);
    let suma: number = 0; 
    for(var i = 0; i < this.listaRecibeFrecuencia.length ; i++){
      suma = suma + this.listaRecibeFrecuencia[i];
    }
    
    let freqPromedio: number = 0;
    if(this.listaRecibeFrecuencia.length > 0){
      freqPromedio = suma / this.listaRecibeFrecuencia.length;
    }
    this.listaRecibeFrecuencia = [];
    this.isEvaluating = false;

    if((freqPromedio>=freq - this.TOLERANCE) && (freqPromedio<=freq + this.TOLERANCE)){
      console.log((new  Date()).toISOString() + "- " + id + " - OK - Esperando Frecuencia: " + freq + " - Recibida: " + freqPromedio);
    }else{
      console.log((new  Date()).toISOString() + "- " + id + " - ERROR - Esperando Frecuencia: " + freq + " - Recibida: " + freqPromedio);
    }
  }

  ngOnInit() {
    const cancion: CancionIn = {
      "titulo":"Prueba 1",
      "notasMusicales":[
          {
              "nombre": "RE",
              "segundo": 1000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 2000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "LA",
              "segundo": 3000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "LA",
              "segundo": 4000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "RE",
              "segundo": 5000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 6000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "LA",
              "segundo": 7000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "LA",
              "segundo": 8000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "RE",
              "segundo": 9000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 10000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 11000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 12000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 13000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 14000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 15000,
              "frecuencia":293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 16000,
              "frecuencia":293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "LA",
              "segundo": 17000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "LA",
              "segundo": 18000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "RE",
              "segundo": 19000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 20000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 21000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 22000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 23000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 24000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "LA",
              "segundo": 25000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "LA",
              "segundo": 26000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "RE",
              "segundo": 27000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 28000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 29000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 30000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 31000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 32000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo":33000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 34000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "LA",
              "segundo": 35000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "LA",
              "segundo": 36000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "RE",
              "segundo": 37000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 38000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "LA",
              "segundo": 39000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "LA",
              "segundo": 40000,
              "frecuencia": 440,
              "cuerdas": "XX0X"
          },
          {
              "nombre": "RE",
              "segundo": 41000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 42000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 43000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 44000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 45000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 46000,
              "frecuencia": 293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 47000,
              "frecuencia":293.665,
              "cuerdas": "X0XX"
          },
          {
              "nombre": "RE",
              "segundo": 48000,
              "frecuencia":293.665,
              "cuerdas": "X0XX"
          }
      ]
  }

  cancion.notasMusicales.forEach(nota => {
    const notaOut:Nota = new Nota();
    notaOut.time = nota.segundo;
    notaOut.notaName = nota.nombre;
    notaOut.notaFrecuency = nota.frecuencia;
    notaOut.notaDraw = nota.cuerdas;

    this.listNotas.push(notaOut);
  })

  }
}

