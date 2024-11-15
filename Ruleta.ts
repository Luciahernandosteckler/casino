import * as readlineSync from 'readline-sync';
import { Juego } from './Juego';

export class Ruleta extends Juego {
    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
    }

    // Lógica de la apuesta en la ruleta
    apostar(monto: number) {
        if (monto < this.apuestaMinima || monto > this.apuestaMaxima) {
            console.log(`La apuesta debe estar entre $${this.apuestaMinima} y $${this.apuestaMaxima}`);
        } else {
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
        } else {
            console.log("No ganaste esta vez. ¡Intenta de nuevo!");
        }
    }

    mostrarInformacion() {
        console.log(`Juego: ${this.nombre}`);
        console.log(`Apuesta mínima: $${this.apuestaMinima}`);
        console.log(`Apuesta máxima: $${this.apuestaMaxima}`);
    }
}
