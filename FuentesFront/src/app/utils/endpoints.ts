// import { EnvService } from '../env.service';

// let env = new EnvService();

export const END_POINTS = {
    configuracion: {
        config: '/config/general',
    },
    busqueda: {
      busqueda_certificado: "/busqueda/certificado",
      busqueda_exp_relacionado: "/busqueda/exprelacionado",
      busqueda_expediente: "/busqueda/expediente",
      busqueda_detalle_expediente: "/busqueda/detalleexpediente",

    },
    token:{
      oauth:'/oauth/token'
    },
};
