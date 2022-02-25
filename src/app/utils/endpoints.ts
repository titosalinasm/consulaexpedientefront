// import { EnvService } from '../env.service';

// let env = new EnvService();

export const END_POINTS = {

    configuracion: {
        config: '/configuracion/config',
    },
    avisos: {
        valida_aviso: '/aviso/validaaviso',
    },
    terminos: {
        terminos: '/terminos/verificarterminos',
        aceptartermino: '/terminos/aceptartermino',
        consultaterminos: '/terminos/consultaterminos'
    },
    file_system: {
        url: '/file/downloadfile?fileName=',
    },
    obtener_token: {
        url: 'http://desweblogic2.indecopi.gob.pe:10000/appTodosServicioAutorizacion/oauth/token'
    },
    registro: {
        solicitud: '/solicitud/registro/',
        consulta_lista_general: '/general/lstgeneral',
        consulta_ubigeo: '/ubigeo/lstubigeo',
        // ubigeo_paises: '/ubigeo/paises',
        // ubigeo_departamento: '/ubigeo/departamentos',
        // ubigeo_provincia: '/ubigeo/provincias',
        // ubigeo_distrito: '/ubigeo/distritos',
        usuario_sel: '/usuario/usuario',
        subir_archivo: '/file/uploadfile',
        valida_pago: '/tramite/validapago',
        titulosNiza: '/general/lstclase',
        validaexpediente: '/general/validaexpediente',
        validacertificado: '/general/validacertificado',
        validaexpedienteireal: '/general/validaexpedienteireal',
        lstpersona :'/solicitud/lstpersona',
        proceso_solicitud :'/proceso/creaedita',
        lstsolicitud :'/proceso/lstsolicitud',
        mijson :'/proceso/mijson',

    },
    pide: {
        consulta_pide: '/pide/consultapide',
        // consulta_reniec: '/pide/consultareniec',
        consulta_migraciones: '/pide/consultamigraciones',
    },
    arancel: {
        consulta_simple: '/aranceles/busquedasimple',
    }
};
