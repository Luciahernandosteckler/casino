import { Juego } from './Juego';
import * as readlineSync from 'readline-sync';

export class Blackjack extends Juego {
    private baraja: string[];
    private jugadorCartas: string[];
    private bancaCartas: string[];

    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
        this.baraja = this.crearBaraja();
        this.jugadorCartas = [];
        this.bancaCartas = [];
    }

    // Implementación del método apostar
    apostar(monto: number) {
        if (monto < this.apuestaMinima || monto > this.apuestaMaxima) {
            console.log(`La apuesta debe estar entre $${this.apuestaMinima} y $${this.apuestaMaxima}`);
        } else {
            console.log(`Apostando $${monto} en Blackjack...`);
        }
    }

    // Método para crear la baraja de cartas
    private crearBaraja(): string[] {
        const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
        const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let baraja: string[] = [];
        for (let palo of palos) {
            for (let valor of valores) {
                baraja.push(`${valor} de ${palo}`);
            }
        }
        return baraja;
    }

    // Método para obtener el valor de una carta
    private valorCarta(carta: string): number {
        const valor = carta.split(' ')[0];  // Obtener el valor de la carta (2, 3, J, A, etc.)

        if (valor === 'A') return 11; // El As puede valer 11
        if (valor === 'K' || valor === 'Q' || valor === 'J') return 10; // Reyes, Reinas y Jotas valen 10
        return parseInt(valor); // El resto de las cartas tienen su valor numérico
    }

    // Método para sumar el valor de las cartas de un jugador o la banca
    private calcularTotal(cartas: string[]): number {
        let total = 0;
        let cantidadAses = 0;

        for (let carta of cartas) {
            total += this.valorCarta(carta);
            if (carta.startsWith('A')) cantidadAses++;
        }

        // Ajustar el valor de los Ases de 11 a 1 si el total excede 21
        while (total > 21 && cantidadAses > 0) {
            total -= 10;
            cantidadAses--;
        }

        return total;
    }

    // Método para repartir cartas al jugador y la banca
    private repartirCartas(): void {
        for (let i = 0; i < 2; i++) {
            this.jugadorCartas.push(this.baraja.splice(Math.floor(Math.random() * this.baraja.length), 1)[0]);
            this.bancaCartas.push(this.baraja.splice(Math.floor(Math.random() * this.baraja.length), 1)[0]);
        }
    }

    // Método para jugar
    public jugar(): void {
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
            if (this.calcularTotal(this.jugadorCartas) >= 21) break;
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
        } else if (totalBanca > 21) {
            console.log("La banca se ha pasado de 21. ¡Has ganado!");
        } else if (totalJugador > totalBanca) {
            console.log("¡Has ganado!");
        } else if (totalJugador < totalBanca) {
            console.log("La banca gana.");
        } else {
            console.log("Es un empate.");
        }
    }

    public mostrarInformacion(): void {
        console.log(`Juego: ${this.nombre}`);
        console.log(`Apuesta mínima: ${this.apuestaMinima}`);
        console.log(`Apuesta máxima: ${this.apuestaMaxima}`);
    }
}
