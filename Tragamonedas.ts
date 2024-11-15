import { Juego } from "./Juego";

class Tragamonedas extends Juego {
    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
    }

    public apostar(monto: number): void {
        if (this.validarApuesta(monto)) {
            console.log(`Apuesta aceptada en ${this.nombre}: ${monto}`);
        }
    }

    public jugar(): void {
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
        } else if (rodillos[0] === rodillos[1] || rodillos[1] === rodillos[2] || rodillos[0] === rodillos[2]) {
            console.log("¡Casi! Dos rodillos coinciden, recuperas tu apuesta.");
        } else {
            console.log("¡Mejor suerte la próxima vez! Has perdido esta vez.");
        }
    }

    public mostrarInformacion(): void {
        console.log(`Juego: ${this.nombre}`);
        console.log(`Apuesta mínima: ${this.apuestaMinima}`);
        console.log(`Apuesta máxima: ${this.apuestaMaxima}`);
    }

    private calcularPremio(valor: number): number {
        // Premios según el valor de los rodillos
        const multiplicadores: { [key: number]: number } = {
            1: 5, // Ejemplo: si los tres rodillos muestran "1", el premio es 5x la apuesta
            2: 10,
            3: 20,
        };
        return multiplicadores[valor];
    }
}

export { Tragamonedas };
