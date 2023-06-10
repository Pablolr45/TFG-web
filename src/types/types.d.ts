interface EscapeRoom{
    titulo:string;
    subtitulo:string;
    sala:string;
    cuentaAtras:boolean;
    minutos:number;
    puntuacion:boolean;
    restaPistas:number;
    inicio:{
        tipo: 'imagen' | 'video' 
        url:string;
    };
    final:{
        tipo: 'imagen' | 'video'
        url:string;
    };
}