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

const url = process.env.REACT_APP_BACK_URL + 'company/';



const fetchData = async centerCoordinates => {
    return await fetch(url, []).then(res=>res.json()).then(data=>{
        const newFeaturesList = [];

        for (const item of data) {
            const { X, Y, Nombre, Anchodeban,UltimaFech, TotalCompu, TotPCsPort,  Sector, Anio, Zona, EstadoActu,  NombreEE, Estado, Departamen, id } = item;

            //console.log(X);
            //console.log(DANE_X);
            var fechaoriginal="";
            if(UltimaFech!="" || UltimaFech!=null){
var fecha=UltimaFech;


            }else{
fechaoriginal="9999-99-99"
            }


     

            //console.log(Y_cord);


            newFeaturesList.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [X, Y]
                },
                properties: {
                    id,
                    name: Nombre,
                    description: NombreEE,
                    Estado: Estado,
                    Departamento: Departamen,
                    Sector: Sector,
                    Anio: Anio,
                    Zona: Zona,
                    Ancho:Anchodeban,
                    TotalCompu:TotalCompu,
                    TotPCsPort:TotPCsPort,
                    EstadoActual: EstadoActu,
                    Fecha:fechaoriginal

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


export default fetchData;
