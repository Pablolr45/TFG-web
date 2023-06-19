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
}
interface PresentacionInicial {
  tipo: "imagen" | "video";
  url: string;
}

interface PresentacionFinal extends PresentacionInicial {}

