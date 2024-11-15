"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
class Juego {
    // Constructor
    constructor(nombre, apuestaMinima, apuestaMaxima) {
        this.nombre = nombre;
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
    }
    // Métodos comunes
    validarApuesta(monto) {
        if (monto < this.apuestaMinima) {
            console.error(`La apuesta es demasiado baja. La mínima es ${this.apuestaMinima}.`);
            return false;
        }
        if (monto > this.apuestaMaxima) {
            console.error(`La apuesta excede el máximo permitido de ${this.apuestaMaxima}.`);
            return false;
        }
        return true;
    }
}
exports.Juego = Juego;
