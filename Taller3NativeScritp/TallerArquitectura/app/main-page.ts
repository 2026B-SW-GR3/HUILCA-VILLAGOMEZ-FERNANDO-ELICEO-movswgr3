// import { EventData, Page } from '@nativescript/core'
// import { HelloWorldModel } from './main-view-model'
//
// export function navigatingTo(args: EventData) {
//   const page = <Page>args.object
//   page.bindingContext = new HelloWorldModel()
// }


import { EventData, Page, GridLayout, Label, Application, Color } from '@nativescript/core';

// Esta función se ejecuta cuando entramos a la página (evento navigatingTo)
export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;

    // Ejecutamos nuestra lógica de recursos nativos
    configurarInterfazNativa(page);

    // Requerimiento del taller: Detectar cambio de orientación en tiempo real
    Application.on(Application.orientationChangedEvent, () => {
        configurarInterfazNativa(page);
    });
}

function configurarInterfazNativa(page: Page) {
    // Solo ejecutamos esto si estamos en Android
    if (Application.android) {
        // ACCESO DIRECTO A APIs NATIVAS (Explicar en la diapo)
        const context = Application.android.context;
        const res = context.getResources();
        const pkgName = context.getPackageName();

        // 1. Obtenemos los IDs de los recursos que creamos en App_Resources
        // Android busca automáticamente en la carpeta correcta (values, values-en, etc.)
        const idTexto = res.getIdentifier("mensaje_taller", "string", pkgName);
        const idColorTexto = res.getIdentifier("color_texto", "color", pkgName);
        const idColorFondo = res.getIdentifier("color_fondo", "color", pkgName);

        // 2. Referenciamos los componentes de nuestra vista XML
        const etiqueta = page.getViewById("miEtiqueta") as Label;
        const contenedor = page.getViewById("contenedorPrincipal") as GridLayout;

        // 3. Aplicamos los valores recuperados del sistema operativo
        if (idTexto > 0) {
            etiqueta.text = res.getString(idTexto);
        }

        if (idColorTexto > 0) {
            etiqueta.color = new Color(res.getColor(idColorTexto));
        }

        if (idColorFondo > 0) {
            contenedor.backgroundColor = new Color(res.getColor(idColorFondo));
        }
    }
}
