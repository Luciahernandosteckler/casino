abstract class Juego {
    // Atributos comunes
    protected nombre: string;
    protected apuestaMinima: number;
    protected apuestaMaxima: number;

    // Constructor
    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        this.nombre = nombre;
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
    }

    // Métodos comunes
    public validarApuesta(monto: number): boolean {
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

    // Métodos abstractos
    public abstract apostar(monto: number): void;
    public abstract jugar(): void;
    public abstract mostrarInformacion(): void;
}

export { Juego };
