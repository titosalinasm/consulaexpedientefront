export const CONSTANTES = {
    appId: {
        registro_marcas: 4,
    },

    pages: {
        COD_P_000: 'COD_P_000',
        COD_P_001: 'COD_P_001',
        COD_P_002: 'COD_P_002',
        COD_P_003: 'COD_P_003',
        COD_P_004: 'COD_P_004',
        COD_P_005: 'COD_P_005',
        COD_P_006: 'COD_P_006',
        COD_ARANCEL: 'COD_ARANCEL',
        COD_CONF_ARCHIVO:'COD_CONF_ARCHIVO',
        COD_MANUAL_REDUCCION: 'COD_MANUAL_REDUCCION',
        // COD_PRE_FRECUENTES : 'COD_PRE_FRE'
    },

    msg_error: {
        msg: 'Se encontró un error inesperado, intente nuevamente.',
        msg_pide: 'En estos momentos el servicio para obtención de datos personales no se encuentra activo, por favor, ingrese su información de forma manual o inténtelo más tarde.',
        msg_archivo: 'La capacidad máxima de carga de archivos es de 25 MB.',
        msg_pago: 'El pago ingresado es incorrecto. Verifique su voucher nuevamente.',
        msg_envio: 'Su solicitud no ha podido ser cargada correctamente. Intente nuevamente.',
    },

    label: {
        obra_literaria: {
            datos_obra: {
                vcTituloObra: 'literaria',
                // vcImg: 'obra-literaria',
            },
            pago_obra: {
                vcLblArancel: 'Literarias',
                // vcImg: 'obra-literaria',
            }
        },
        obra_artistica: {
            datos_obra: {
                vcTituloObra: 'artística',
                // vcImg: 'obra-artistica',
            },
            pago_obra: {
                vcLblArancel: 'Artísticas',
                // vcImg: 'obra-literaria',
            }
        }
    },

    info: {
        obra_literaria: {
            vcTitulo: 'Obra Literaria',
            vcImg: 'obra-literaria',
            datos_obra: {
                vcTituloObra: 'Consigna el título de tu obra.',
                vcLaObraSePublico: 'Publicación: Cuando el ejemplar de la obra se ha puesto al alcance del público.',
                vcLugarPublicacion: 'Coloca el país donde se ha publicado la obra.',
                vcFechaPublicacion: 'Coloca la fecha en la que se ha publicado la obra.',
                vcNumeroEdicion: 'Coloca el número de edición de la obra.',
                vcNumeroEjemplares: 'Coloca el número de ejemplares impresos de la obra.',
                vcLaObraOriginariaODerivada: 'Obra originaria: Obra que se realiza sin basarse en ninguna obra. \n Obra Derivada: Obra creada en base a una obra preexistente. Ejemplo: resumen, arreglo, adaptación, traducción.',
                vcTituloObraOriginaria: 'Coloca el título de la obra originaria.',
                vcEsAutorDeObraOriginaria: 'El autor de la obra derivada es el titular de los derechos sobre su aporte, sin perjuicio de la protección de los autores de las obras originarias empleadas para realizarla.',
                vcNombreAutorObraOriginaria: 'Coloca el nombre del autor de la obra originaria en la cual se basa tu obra.',
            },
            autoria_obra: {
                vcInfoAutor: 'Persona natural que realiza la creación intelectual.',
            },
            archivo_obra: {
                vcInfoTitulo: 'Adjunta tu obra en formato pdf.',
                vcInfoAnexos: 'Adjunta otros documentos como: Memoria descriptiva, Cesión de derechos patrimoniales, Autorizaciones, entre otros.',
                // vcInfoAnexos: 'Adjunta otros documentos. Por ejemplo: Autorización de los autores de las imágenes, fotografías, dibujos y gráficos incluidos en el texto literario; Imagen de DNI; Contrato de Edición (de ser el caso) entre otros.',
            },
            pago_obra: {
                vcInfoRegistraPago: 'Ingresa los datos solicitados ubicados en el voucher de pago.',
            }
        },
        obra_artistica: {
            vcTitulo: 'Registro de marca',
            // vcTitulo: 'Obra Artística',
            vcImg: 'obra-artistica',
            datos_obra: {
                vcTituloObra: 'Consigna el título de tu obra artística.',
                vcTipoObra: 'Deberás elegir el tipo de obra artística que deseas registrar. Por ejemplo: Obra musical, fotografía, dibujo, mapa, obra de arte aplicado, obra arquitectónica, entre otros.',
                vcLaObraSePublico: 'Publicación: Cuando el ejemplar de la obra se ha puesto al alcance del público.',
                vcLugarPublicacion: 'Coloca el país donde se ha publicado la obra.',
                vcFechaPublicacion: 'Coloca la fecha en la que se ha publicado la obra.',
                vcNumeroEdicion: '',
                vcNumeroEjemplares: '',
                vcLaObraOriginariaODerivada: 'Obra originaria: Obra realizada sin basarse en ninguna obra. \n Obra Derivada: Obra creada en base a una obra preexistente. Ejemplo: resumen, arreglo, adaptación, traducción.',
                vcTituloObraOriginaria: 'Deberás consignar el título de la obra originaria.',
                vcEsAutorDeObraOriginaria: 'El autor de la obra derivada es el titular de los derechos sobre su aporte, sin perjuicio de la protección de los autores de las obras originarias empleadas para realizarla.',
                // vcEsAutorDeObraOriginaria: '¿Eres el autor de la obra originaria en la cual se basa tu obra? El autor de la obra derivada es el titular de los derechos sobre su aporte, sin perjuicio de la protección de los autores de las obras originarias empleadas para realizarla.',
                vcNombreAutorObraOriginaria: 'Coloca el nombre del autor de la obra originaria en la cual se basa tu obra.',
            },
            autoria_obra: {
                vcInfoAutor: 'Persona natural que realiza la creación intelectual.',
            },
            archivo_obra: {
                vcInfoTitulo: 'Adjunta tu obra en formato pdf, mp3, jpg, jpeg, png, mpeg4, zip.',
                vcInfoAnexos: 'Adjunta otros documentos como: Memoria descriptiva, Cesión de derechos patrimoniales, Autorizaciones, entre otros.',
                // vcInfoAnexos: 'Adjunta otros documentos. Por ejemplo: Autorización de los autores de las imágenes, fotografías, dibujos y gráficos incluidos en el texto literario; Imagen de DNI; Contrato de Edición (de ser el caso) entre otros.',
            },
            pago_obra: {
                vcInfoRegistraPago: 'Ingresa los datos solicitados ubicados en el voucher de pago.',
            }
        },
    }
};
