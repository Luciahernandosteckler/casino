"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruleta = void 0;
const readlineSync = __importStar(require("readline-sync"));
const Juego_1 = require("./Juego");
class Ruleta extends Juego_1.Juego {
    constructor(nombre, apuestaMinima, apuestaMaxima) {
        super(nombre, apuestaMinima, apuestaMaxima);
    }
    // Lógica de la apuesta en la ruleta
    apostar(monto) {
        if (monto < this.apuestaMinima || monto > this.apuestaMaxima) {
            console.log(`La apuesta debe estar entre $${this.apuestaMinima} y $${this.apuestaMaxima}`);
        }
        else {
            console.log(`Apostando $${monto} en la Ruleta...`);
        }
    }
    // Lógica de juego
    jugar() {
        // Simula un giro de ruleta con un número aleatorio entre 0 y 36
        const numeroGanador = Math.floor(Math.random() * 37); // Números de la ruleta 0 a 36
        console.log(`El número ganador es: ${numeroGanador}`);
        // Lógica de la apuesta: el jugador elige un número entre 0 y 36
        const numeroElegido = readlineSync.questionInt('Apostaste a qué número de la ruleta (0-36): ');
        if (numeroElegido === numeroGanador) {
            console.log("¡Felicidades! Has ganado la apuesta.");
            // Agregar logica para sumar dinero actual
        }
        else {
            console.log("No ganaste esta vez. ¡Intenta de nuevo!");
        }
    }
    mostrarInformacion() {
        console.log(`Juego: ${this.nombre}`);
        console.log(`Apuesta mínima: $${this.apuestaMinima}`);
        console.log(`Apuesta máxima: $${this.apuestaMaxima}`);
    }
}
exports.Ruleta = Ruleta;
