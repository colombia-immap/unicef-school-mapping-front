/**
 * A complete Coordinate Pair consisting of a latitude and longitude
 * @typedef {Object} CoordinatePair
 * @property {number} longitude - longitude coordinate
 * @property {number} latitude - latitude coordinate
 */




/**
 * Generates a GeoJSON FeatureCollection of random points based on
 * the center coordinates passed in.
 * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
 * @return {results} GeoJSON FeatureCollection
 */

const url = process.env.REACT_APP_BACK_URL + 'listaee/';



const fetchDataEE = async centerCoordinates => {
    return await fetch(url, []).then(res=>res.json()).then(data=>{
        const newFeaturesList = [];

        for (const item of data) {
            const { CoordenadaX2, CoordenadaY2,Municipio, Departamento, Sector_atencion, Calendario,Tasa_aprobacion,Tasa_reprobacion,Tasa_desercion, Nombre_establecimiento, Vigencia, IRTE,Validada, TIC, Area, id } = item;

            //console.log(X);
            //console.log(DANE_X);

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
        //console.log('DONE');

        return Promise.resolve({
            type: "FeatureCollection",
            features: newFeaturesList
        });
    });
};

/**
 * Generates a random point within 0.025 radius of map center coordinates.
 * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
 * @return {CoordinatePair} randomly generated coordinate pair
 */


export default fetchDataEE;
