"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamonedas = void 0;
const Juego_1 = require("./Juego");
class Tragamonedas extends Juego_1.Juego {
    constructor(nombre, apuestaMinima, apuestaMaxima) {
        super(nombre, apuestaMinima, apuestaMaxima);
    }
    apostar(monto) {
        if (this.validarApuesta(monto)) {
            console.log(`Apuesta aceptada en ${this.nombre}: ${monto}`);
        }
    }
    jugar() {
        console.log(`Jugando a ${this.nombre}...`);
        // Simular 3 rodillos
        const rodillos = [
            Math.floor(Math.random() * 3) + 1, // Genera números del 1 al 3
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 3) + 1,
        ];
        console.log(`Rodillos: ${rodillos.join(" | ")}`);
        // Verificar combinaciones
        if (rodillos[0] === rodillos[1] && rodillos[1] === rodillos[2]) {
            console.log("¡Felicidades! Has ganado con una combinación perfecta 🎉");
            // Premiar al jugador
            const premio = this.calcularPremio(rodillos[0]);
            console.log(`Has ganado ${premio} créditos.`);
        }
        else if (rodillos[0] === rodillos[1] || rodillos[1] === rodillos[2] || rodillos[0] === rodillos[2]) {
            console.log("¡Casi! Dos rodillos coinciden, recuperas tu apuesta.");
        }
        else {
            console.log("¡Mejor suerte la próxima vez! Has perdido esta vez.");
        }
    }
    mostrarInformacion() {
        console.log(`Juego: ${this.nombre}`);
        console.log(`Apuesta mínima: ${this.apuestaMinima}`);
        console.log(`Apuesta máxima: ${this.apuestaMaxima}`);
    }
    calcularPremio(valor) {
        // Premios según el valor de los rodillos
        const multiplicadores = {
            1: 5, // Ejemplo: si los tres rodillos muestran "1", el premio es 5x la apuesta
            2: 10,
            3: 20,
        };
        return multiplicadores[valor];
    }
}
exports.Tragamonedas = Tragamonedas;
