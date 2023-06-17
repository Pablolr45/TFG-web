interface EscapeRoom {
  _id?: string;
  titulo: string;
  subtitulo: string;
  sala: string;
  cuentaAtras: boolean;
  minutos: number;
  puntuacion: boolean;
  restaPistas: number;
  presentacionInicial: PresentacionInicial;
  presentacionFinal: PresentacionFinal;
  recursos: Array<any>;
}
interface PresentacionInicial {
  tipo: "imagen" | "video";
  url: string;
}

interface PresentacionFinal extends PresentacionInicial {}

interface Recurso {
  type: string
}
type BlocNotas = "BLOCNOTAS";
interface Linterna extends Recurso {
  type: "LINTERNA"
}
