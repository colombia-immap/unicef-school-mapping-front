const url = process.env.REACT_APP_BACK_URL + 'company/';

const fetchData = async centerCoordinates => {
    return await fetch(url, {
        crossDomain: true,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(data => {
        const newFeaturesList = [];
        for (const item of data) {
            const {
                X,
                Y,
                Nombre,
                Anchodeban,
                UltimaFech,
                TotalCompu,
                TotPCsPort,
                Sector,
                Anio,
                Zona,
                EstadoActu,
                NombreEE,
                Estado,
                Departamen,
                id
            } = item;

            var fechaoriginal = "";

            if (UltimaFech != "" || UltimaFech != null) {
                var fecha = UltimaFech;
            } else {
                fechaoriginal = "9999-99-99"
            }

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
                    Ancho: Anchodeban,
                    TotalCompu: TotalCompu,
                    TotPCsPort: TotPCsPort,
                    EstadoActual: EstadoActu,
                    Fecha: fechaoriginal

                }
            });
        }

        return Promise.resolve({
            type: "FeatureCollection",
            features: newFeaturesList
        });
    });
};

export default fetchData;
