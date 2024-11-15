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
exports.Blackjack = void 0;
const Juego_1 = require("./Juego");
const readlineSync = __importStar(require("readline-sync"));
class Blackjack extends Juego_1.Juego {
    constructor(nombre, apuestaMinima, apuestaMaxima) {
        super(nombre, apuestaMinima, apuestaMaxima);
        this.baraja = this.crearBaraja();
        this.jugadorCartas = [];
        this.bancaCartas = [];
    }
    // Implementación del método apostar
    apostar(monto) {
        if (monto < this.apuestaMinima || monto > this.apuestaMaxima) {
            console.log(`La apuesta debe estar entre $${this.apuestaMinima} y $${this.apuestaMaxima}`);
        }
        else {
            console.log(`Apostando $${monto} en Blackjack...`);
        }
    }
    // Método para crear la baraja de cartas
    crearBaraja() {
        const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
        const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let baraja = [];
        for (let palo of palos) {
            for (let valor of valores) {
                baraja.push(`${valor} de ${palo}`);
            }
        }
        return baraja;
    }
    // Método para obtener el valor de una carta
    valorCarta(carta) {
        const valor = carta.split(' ')[0]; // Obtener el valor de la carta (2, 3, J, A, etc.)
        if (valor === 'A')
            return 11; // El As puede valer 11
        if (valor === 'K' || valor === 'Q' || valor === 'J')
            return 10; // Reyes, Reinas y Jotas valen 10
        return parseInt(valor); // El resto de las cartas tienen su valor numérico
    }
    // Método para sumar el valor de las cartas de un jugador o la banca
    calcularTotal(cartas) {
        let total = 0;
        let cantidadAses = 0;
        for (let carta of cartas) {
            total += this.valorCarta(carta);
            if (carta.startsWith('A'))
                cantidadAses++;
        }
        // Ajustar el valor de los Ases de 11 a 1 si el total excede 21
        while (total > 21 && cantidadAses > 0) {
            total -= 10;
            cantidadAses--;
        }
        return total;
    }
    // Método para repartir cartas al jugador y la banca
    repartirCartas() {
        for (let i = 0; i < 2; i++) {
            this.jugadorCartas.push(this.baraja.splice(Math.floor(Math.random() * this.baraja.length), 1)[0]);
            this.bancaCartas.push(this.baraja.splice(Math.floor(Math.random() * this.baraja.length), 1)[0]);
        }
    }
    // Método para jugar
    jugar() {
        console.log("Repartiendo cartas...");
        this.repartirCartas();
        console.log(`Cartas del Jugador: ${this.jugadorCartas.join(" | ")} (Total: ${this.calcularTotal(this.jugadorCartas)})`);
        console.log(`Cartas de la Banca: ${this.bancaCartas[0]} | ???`);
        // El jugador puede pedir cartas hasta que decida plantarse
        let decisionJugador = readlineSync.question("¿Quieres pedir otra carta? (s/n): ");
        while (decisionJugador === 's' && this.calcularTotal(this.jugadorCartas) < 21) {
            const nuevaCarta = this.baraja.splice(Math.floor(Math.random() * this.baraja.length), 1)[0];
            this.jugadorCartas.push(nuevaCarta);
            console.log(`Nueva carta: ${nuevaCarta}`);
            console.log(`Cartas del Jugador: ${this.jugadorCartas.join(" | ")} (Total: ${this.calcularTotal(this.jugadorCartas)})`);
            if (this.calcularTotal(this.jugadorCartas) >= 21)
                break;
            decisionJugador = readlineSync.question("¿Quieres pedir otra carta? (s/n): ");
        }
        // La banca pide cartas si tiene menos de 17
        let totalBanca = this.calcularTotal(this.bancaCartas);
        while (totalBanca < 17) {
            const nuevaCartaBanca = this.baraja.splice(Math.floor(Math.random() * this.baraja.length), 1)[0];
            this.bancaCartas.push(nuevaCartaBanca);
            totalBanca = this.calcularTotal(this.bancaCartas);
        }
        console.log(`Cartas de la Banca: ${this.bancaCartas.join(" | ")} (Total: ${totalBanca})`);
        // Determinar quién gana
        const totalJugador = this.calcularTotal(this.jugadorCartas);
        if (totalJugador > 21) {
            console.log("¡Te has pasado de 21! Has perdido.");
        }
        else if (totalBanca > 21) {
            console.log("La banca se ha pasado de 21. ¡Has ganado!");
        }
        else if (totalJugador > totalBanca) {
            console.log("¡Has ganado!");
        }
        else if (totalJugador < totalBanca) {
            console.log("La banca gana.");
        }
        else {
            console.log("Es un empate.");
        }
    }
    mostrarInformacion() {
        console.log(`Juego: ${this.nombre}`);
        console.log(`Apuesta mínima: ${this.apuestaMinima}`);
        console.log(`Apuesta máxima: ${this.apuestaMaxima}`);
    }
}
exports.Blackjack = Blackjack;
