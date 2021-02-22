const url = process.env.REACT_APP_BACK_URL + 'listaee/';

const fetchDataEE = async centerCoordinates => {
    return await fetch(url, {
        crossDomain: true,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(data => {
        const newFeaturesList = [];

        for (const item of data) {
            const {
                CoordenadaX2,
                CoordenadaY2,
                Municipio,
                Departamento,
                Sector_atencion,
                Calendario,
                Tasa_aprobacion,
                Tasa_reprobacion,
                Tasa_desercion,
                Nombre_establecimiento,
                Vigencia,
                IRTE,
                Validada,
                TIC,
                Area,
                id
            } = item;

            newFeaturesList.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [CoordenadaX2, CoordenadaY2]
                },
                properties: {
                    id,
                    Nombreestablecimiento: Nombre_establecimiento,
                    Vigencia: Vigencia,
                    IRTE: IRTE,
                    Validada: Validada,
                    TIC: TIC,
                    Area: Area,
                    Municipio: Municipio,
                    Departamento: Departamento,
                    Sector_atencion: Sector_atencion,
                    Calendario: Calendario,
                    Tasa_aprobacion: Tasa_aprobacion,
                    Tasa_reprobacion: Tasa_reprobacion,
                    Tasa_desercion: Tasa_desercion

                }
            });
        }

        return Promise.resolve({
            type: "FeatureCollection",
            features: newFeaturesList
        });
    });
};

export default fetchDataEE;
