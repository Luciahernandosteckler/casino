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
const readlineSync = __importStar(require("readline-sync"));
const Tragamonedas_1 = require("./Tragamonedas");
const Blackjack_1 = require("./Blackjack");
const Ruleta_1 = require("./Ruleta");
// Clase Jugador, podria tenerla en otro archivo
class Jugador {
    constructor(nombre, saldoInicial) {
        this.nombre = nombre;
        this.saldo = saldoInicial;
    }
    mostrarSaldo() {
        console.log(`Saldo de ${this.nombre}: $${this.saldo}`);
    }
    cargarSaldo(monto) {
        this.saldo += monto;
        console.log(`Saldo actualizado de ${this.nombre}: $${this.saldo}`);
    }
    retirarDinero(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            console.log(`Saldo actualizado de ${this.nombre}: $${this.saldo}`);
        }
        else {
            console.log('No tienes suficiente saldo para retirar esa cantidad.');
        }
    }
}
// Función para mostrar el menú principal
function mostrarMenu(jugador) {
    let opcion;
    do {
        try {
            console.log('\n--- Menú ---');
            console.log('1. Identificarse');
            console.log('2. Seleccionar Juego');
            console.log('3. Cargar Saldo');
            console.log('4. Retirar Dinero');
            console.log('5. Mostrar Saldo');
            console.log('6. Salir');
            opcion = readlineSync.questionInt('Elige una opción: ');
            switch (opcion) {
                case 1:
                    identificarse(jugador);
                    break;
                case 2:
                    seleccionarJuego(jugador);
                    break;
                case 3:
                    cargarSaldo(jugador);
                    break;
                case 4:
                    retirarDinero(jugador);
                    break;
                case 5:
                    jugador.mostrarSaldo();
                    break;
                case 6:
                    console.log('¡Gracias por jugar!');
                    break;
                default:
                    console.log('Opción no válida, por favor elige otra opción.');
                    break;
            }
        }
        catch (error) {
            console.log("Error al mostrar el menú o procesar la opción:", error);
        }
    } while (opcion !== 6);
}
// Función para la identificación del jugador
function identificarse(jugador) {
    try {
        jugador.nombre = readlineSync.question('Ingrese su nombre: ');
        jugador.saldo = readlineSync.questionInt('Ingrese su saldo inicial: ');
        console.log(`Bienvenido, ${jugador.nombre}!`);
        jugador.mostrarSaldo();
    }
    catch (error) {
        console.log("Error al intentar identificarse:", error);
    }
}
// Función para cargar saldo
function cargarSaldo(jugador) {
    try {
        const monto = readlineSync.questionInt('¿Cuánto dinero desea cargar? $');
        jugador.cargarSaldo(monto);
    }
    catch (error) {
        console.log("Error al cargar saldo:", error);
    }
}
// Función para retirar dinero
function retirarDinero(jugador) {
    try {
        const monto = readlineSync.questionInt('¿Cuánto dinero desea retirar? $');
        jugador.retirarDinero(monto);
    }
    catch (error) {
        console.log("Error al retirar dinero:", error);
    }
}
// En la función seleccionarJuego
function seleccionarJuego(jugador) {
    try {
        console.log('\n--- Juegos Disponibles ---');
        console.log('1. Tragamonedas');
        console.log('2. Blackjack');
        console.log('3. Ruleta');
        const opcionJuego = readlineSync.questionInt('Selecciona el juego (1-3): ');
        switch (opcionJuego) {
            case 1:
                const tragamonedas = new Tragamonedas_1.Tragamonedas('Tragamonedas', 10, 1000);
                const montoApuesta1 = readlineSync.questionInt('¿Cuánto deseas apostar en Tragamonedas? $');
                tragamonedas.apostar(montoApuesta1);
                tragamonedas.jugar();
                break;
            case 2:
                const blackjack = new Blackjack_1.Blackjack('Blackjack', 20, 500);
                const montoApuesta2 = readlineSync.questionInt('¿Cuánto deseas apostar en Blackjack? $');
                blackjack.apostar(montoApuesta2);
                blackjack.jugar();
                break;
            case 3:
                const ruleta = new Ruleta_1.Ruleta('Ruleta', 10, 500);
                const montoApuesta3 = readlineSync.questionInt('¿Cuánto deseas apostar en Ruleta? $');
                ruleta.apostar(montoApuesta3);
                ruleta.jugar();
                break;
            default:
                console.log('Juego no válido');
                break;
        }
    }
    catch (error) {
        console.log("Error al seleccionar o jugar el juego:", error);
    }
}
// Función principal
function iniciarJuego() {
    try {
        const nombreJugador = readlineSync.question('Ingrese su nombre: ');
        const saldoInicial = readlineSync.questionInt('Ingrese el saldo inicial: ');
        const jugador = new Jugador(nombreJugador, saldoInicial);
        jugador.mostrarSaldo();
        // Iniciar el menú
        mostrarMenu(jugador);
    }
    catch (error) {
        console.log("Error al iniciar el juego:", error);
    }
}
iniciarJuego();
