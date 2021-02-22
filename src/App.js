import React, {Component} from "react";
import SlidingPanel from "react-sliding-side-panel";
import mapboxgl from "mapbox-gl";
import {Row, Container, Col, Button, Modal, Table, Form, Nav} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import {BarChart, PieChart} from 'react-d3-components';
import ReactApexCharts from "react-apexcharts";
import * as d3 from "d3";
import "./App.css";
import cloneDeep from 'lodash/cloneDeep';
//Importar componentes
import helperMap from "./helper/helper-map";
import config from "./config";
import HashLoader from "react-spinners/HashLoader";
import datageo1 from './api/municipiosoptimo.json';

// Third-party React components
import fetchData from "./api/fetchData";
import fetchDataEE from "./api/fetchDataEE";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class App extends Component {
    constructor(props) {
        super(props);
        const urlssaberdpto = process.env.REACT_APP_BACK_URL + 'pruebadpto/';
        const urlssabermpio = process.env.REACT_APP_BACK_URL + 'pruebampio/';
        const urlssaberee = process.env.REACT_APP_BACK_URL + 'pruebaee/';
        this.state = helperMap.initializeMapState(config);
        this.state.urlsmunicipios = process.env.REACT_APP_BACK_URL + 'municipios/';
        this.updateValue = this.updateValue.bind(this);
        this.hoverlayers = this.hoverlayers.bind(this);
        this.areglografica = this.areglografica.bind(this);
        this.restablecerfiltro = this.restablecerfiltro.bind(this);
        this.filtrovalores = this.filtrovalores.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseEE = this.handleCloseEE.bind(this);
        this.handleCloseM = this.handleCloseM.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showModalEE = this.showModalEE.bind(this);
        this.showModalM = this.showModalM.bind(this);
        this.handlemodalClose = this.handlemodalClose.bind(this);
        this.state.show = false;
        this.state.valorestado = "Todos";
        this.state.valorsector = "Todos";
        this.state.valorzona = "Todos";
        this.state.panelType = "left";
        this.state.openPanel = false;
        this.state.panelSize = "30";
        this.state.noBackdrop = true;
        this.state.Id = "";
        this.state.Nombre = "";
        this.state.Descripcion = "";
        this.state.Estado = "";
        this.state.Departamento = "";
        this.state.departamentos = "Todos";
        this.state.valorinicial = "";
        this.state.valorfinal = "";
        this.state.checkconectado = false;
        this.state.checkdesconectado = false;
        this.state.checkconexion = "Todos";
        this.state.valorselect = "Todos";
        this.state.geojson = "";
        this.state.gjson = "";
        this.state.promesa = "";
        this.state.tooltipPie = "";
        this.state.geojson = "";
        this.state.gjson = "";
        this.state.promesa = "";
        this.state.endDate = new Date();
        this.state.startDate = new Date();
        this.state.pruebasaberdpto = "";
        this.state.pruebasabermpio = "";
        this.state.listaEE = "";
        this.state.pruebasaberee = "";
        this.state.showmodal = false;
        this.state.showmodalM = false;
        this.state.vigencia = "Todos";
        this.state.arraymunicipios = [];
        this.state.municipios = "Todos";
        this.state.loading = true;
        this.state.layoutcolegios = "active";
        this.state.layoutmunicipios = "";
        this.state.layoutEE = "";

        this.state.DepartamentoEE = "";
        this.state.MunicipioEE = "";
        this.state.Nombreestablecimiento = "";
        this.state.Sector_atencion = "";
        this.state.Calendario = "";
        this.state.Tasa_aprobacion = "";
        this.state.Tasa_reprobacion = "";
        this.state.Tasa_desercion = "";
        this.state.IRTE = "";
        this.state.showmodalEE = false;
        this.state.urlmunicipios = [];

        this.state.M_Departamento = "";
        this.state.M_Municipio = "";
        this.state.M_IPM = "";
        this.state.Tasa_aprobacion2018 = "";
        this.state.Tasa_aprobacion2019 = "";
        this.state.M_IRTE = "";
        this.state.display = 'none';
        this.state.filtrosede = 'block';
        this.state.displayestablecimientos = 'none';
        this.state.displayIRTE = 'none';
        this.state.displaysedes = 'none';

        this.state.codigodepartamento = [{codigo: 105, departamento: 'Antioquia'},
            {codigo: 168, departamento: 'Santander'},
            {codigo: 1, departamento: 'Amazonas'},
            {codigo: 8, departamento: 'Arauca'},
            {codigo: 38, departamento: 'Guainía'},
            {codigo: 39, departamento: 'Guaviare'},
            {codigo: 53, departamento: 'Putumayo'},
            {codigo: 59, departamento: 'San Andrés y Providencia'},
            {codigo: 77, departamento: 'Vaupés'},
            {codigo: 78, departamento: 'Vichada'},
            {codigo: 108, departamento: 'Atlántico'},
            {codigo: 113, departamento: 'Bolívar'},
            {codigo: 115, departamento: 'Boyacá'},
            {codigo: 117, departamento: 'Caldas'},
            {codigo: 118, departamento: 'Caquetá'},
            {codigo: 119, departamento: 'Cauca'},
            {codigo: 120, departamento: 'Cesar'},
            {codigo: 123, departamento: 'Córdoba'},
            {codigo: 125, departamento: 'Cundinamarca'},
            {codigo: 127, departamento: 'Chocó'},
            {codigo: 141, departamento: 'Huila'},
            {codigo: 185, departamento: 'Casanare'},
            {codigo: 170, departamento: 'Sucre'},
            {codigo: 176, departamento: 'Valle del Cauca'},
            {codigo: 173, departamento: 'Tolima'},
            {codigo: 166, departamento: 'Risaralda'},
            {codigo: 163, departamento: 'Quindio'},
            {codigo: 154, departamento: 'Norte de Santander'},
            {codigo: 152, departamento: 'Nariño'},
            {codigo: 150, departamento: 'Meta'},
            {codigo: 147, departamento: 'Magdalena'},
            {codigo: 144, departamento: 'La Guajira'}
        ];

        this.state.series = [{
            name: 'GRADO 3',
            data: [{x: 'Evaluados', y: 0}, {x: 'promedio', y: 0}, {x: 'error estandar', y: 0}]
        },
            {
                name: 'GRADO 5',
                data: [{x: 'w1', y: 0}, {x: 'w2', y: 0}, {x: 'error estandar', y: 0}]
            },
            {
                name: 'GRADO 9',
                data: [{x: 'w1', y: 0}, {x: 'w2', y: 0}, {x: 'error estandar', y: 0}]
            }
        ];

        this.state.options = {
            chart: {
                height: 350,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794',
                '#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
            ],
            title: {
                text: 'HeatMap - Pruebas Saber'
            }
        };

        this.state.sort = null;

        this.state.piechart = {
            label: 'Answer',
            values: [{x: 'Total Computador escritorio', y: 0}, {
                x: 'Total Portatiles',
                y: 0
            }]
        };
        this.state.tooltipPie = function (x, y) {
            return y;
        };

        this.state.bardata3 = [{
            label: 'Answer',
            values: [{x: 'Ancho Banda', y: 0}, {x: 'Total Computadores', y: 0}]
        }];
        this.state.tooltipScatter = "";


        //Inicio servicio api departamentos

        let pruebasaberdpto = fetch(urlssaberdpto, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json()).then(data => {
            const newFeaturesList = data;
            return Promise.resolve({
                resultado: newFeaturesList
            });
        });

        var promResueltadpto = Promise.resolve(pruebasaberdpto);

        promResueltadpto.then((json) => {
            this.state.pruebasaberdpto = json.resultado;
            return json;
        });

        //Inicio servicio api municipios

        let pruebasabermunicipio = fetch(urlssabermpio, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json()).then(data => {
            const newFeaturesList = data;
            return Promise.resolve({
                resultado: newFeaturesList
            });
        });

        var promResueltampio = Promise.resolve(pruebasabermunicipio);

        promResueltampio.then((json) => {
            this.state.pruebasabermpio = json.resultado;
            return json;
        });

        //Inicio servicio api escuela

        let pruebasaberee = fetch(urlssaberee, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json()).then(data => {
            const newFeaturesList = data;
            return Promise.resolve({
                resultado: newFeaturesList
            });
        });

        var promResueltaee = Promise.resolve(pruebasaberee);

        promResueltaee.then((json) => {
            this.state.pruebasaberee = json.resultado;
            return json;
        });
    }

    tooltipPie(x, y) {
        return y;
    }

    tooltip(x0, y0, x1, y1) {
        return x0 + ": " + x1;
    }

    //Inicio de mapa
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-72.9323, 4.2067],
            zoom: 4.5,
        });

        // fetch new data

        this.state.show = false;
        let mapLoadPromise = new Promise((resolve, reject) => {
            map.on("load", (e) => {
                resolve(map);
            });
            map.on("error", (e) => {
                reject(map);
            });
        });

        Promise.all([fetchData({
            longitude: this.state.center[0],
            latitude: this.state.center[0]
        }), mapLoadPromise]).then(([geojson, map]) => {
            // Calculate indexes for the vulnerabilities metrics
            this.state.gjson = geojson;
            this.setState({geojson: geojson});
            this.state.gjson = geojson;
            this.state.map = map;
        });

        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on("load", async () => {
            // add the data source for new a feature collection with no features
            const {lng, lat} = map.getCenter();

            //layer-capa  de  los municipios

            //Inicio servicio api municipiosEE

            var urlmunicipios = fetch(this.state.urlsmunicipios, {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }).then(res => res.json()).then(data => {
                const newFeaturesList = data;
                return Promise.resolve({
                    resultado: newFeaturesList
                });
            });

            var urlmunicipiospromesa = Promise.resolve(urlmunicipios);

            urlmunicipiospromesa.then((json) => {
                this.state.urlmunicipios = json.resultado;
                for (var i = 0; i < datageo1.features.length; i++) {
                    json.resultado.forEach(function (word) {
                        if (parseInt(datageo1.features[i].id) == word['Codigo_municipio']) {
                            datageo1.features[i].properties.IRTE = word['IRTE'];
                            datageo1.features[i].properties.IPM = word['IPM'];
                            datageo1.features[i].properties.Tasa_aprobacion2018 = word['Tasa_aprobacion2018'];
                            datageo1.features[i].properties.Tasa_aprobacion2019 = word['Tasa_aprobacion2019'];
                        }
                    });
                }
                map.addSource('states', {
                    type: 'geojson',
                    data: datageo1
                });

                map.addLayer({
                    'id': 'state',
                    'type': 'fill',
                    'source': 'states',
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                        'fill-color': {
                            "property": 'IRTE',
                            "stops": [[0, '#239B56'], [3.5, '#FFF333'], [7, '#F91C12']]
                        },
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0.5
                        ]
                    }
                });

                map.addLayer({
                    'id': 'state-borders',
                    'type': 'line',
                    'source': 'states',
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                        'line-color': '#627BC1',
                        'line-width': 2
                    }
                });

                map.on('click', 'state', async (e) => {
                    var IRTE = e.features[0].properties.IRTE;
                    var Municipio = e.features[0].properties.name;
                    var Departamento = e.features[0].properties.NOMBRE_DPT;
                    var IPM = e.features[0].properties.IPM;
                    var Tasa_aprobacion2018 = e.features[0].properties.Tasa_aprobacion2018;
                    var Tasa_aprobacion2019 = e.features[0].properties.Tasa_aprobacion2019;
                    this.state.showmodalM = true;
                    this.showModalM();
                    this.setState({M_IRTE: IRTE});
                    this.setState({M_Departamento: Departamento});
                    this.setState({M_Municipio: Municipio});
                    this.setState({M_IPM: IPM});
                    this.setState({Tasa_aprobacion2018: Tasa_aprobacion2018});
                    this.setState({Tasa_aprobacion2019: Tasa_aprobacion2019});
                });

                map.setLayoutProperty('state', 'visibility', 'none');
                map.setLayoutProperty('state-borders', 'visibility', 'none');
            });

            //puntos

            map.addSource("random-points-data", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [],
                },
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
            });

            // fetch new data
            map.getSource("random-points-data").setData(await fetchData({longitude: lng, latitude: lat}));

            this.state.loading = false;
            this.setState({loading: false});

            map.addLayer({
                id: "clusters",
                type: "circle",
                source: "random-points-data",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": [
                        "step", ["get", "point_count"],
                        "#96f3fd",
                        100,
                        "#60e4ff",
                        750,
                        "#00d3ff",
                    ],
                    "circle-radius": [
                        "step", ["get", "point_count"],
                        20,
                        100,
                        30,
                        750,
                        40,
                    ],
                },
            });

            map.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "random-points-data",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count}",
                    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                    "text-size": 12,
                },
            });

            map.addLayer({
                id: "unclustered-point",
                type: "symbol",
                source: "random-points-data",
                filter: ["!", ["has", "point_count"]],
                layout: {
                    // full list of icons here: https://labs.mapbox.com/maki-icons
                    "icon-image": "college-15", // this will put little croissants on our map
                    "icon-padding": 0,
                    "icon-allow-overlap": true,
                },
            });

            var features = map.queryRenderedFeatures({
                layers: ["unclustered-point"],
            });

            // inspect a cluster on click
            map.on("click", "clusters", function (e) {
                var features = map.queryRenderedFeatures(e.point, {
                    layers: ["clusters"],
                });
                var clusterId = features[0].properties.cluster_id;
                map.getSource("random-points-data").getClusterExpansionZoom(clusterId, function (err, zoom) {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom,
                    });
                });
            });

            map.on("click", "unclustered-point", async (e) => {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var nombre = e.features[0].properties.name;
                var description = e.features[0].properties.description;
                var id = e.features[0].properties.id;
                var Estado = e.features[0].properties.Estado;
                var Departamento = e.features[0].properties.Departamento;
                var Ancho = parseInt(e.features[0].properties.Ancho, 10);
                var TotalCompu = parseInt(e.features[0].properties.TotalCompu, 10);
                var Totalportatil = parseInt(e.features[0].properties.TotPCsPort, 10);
                var Totalcompumesa = TotalCompu - Totalportatil;

                this.state.bardata3 = [{
                    label: 'Answer',
                    values: [{x: 'Ancho Banda', y: Ancho}, {x: 'Total Computadores', y: TotalCompu}]
                }];
                this.state.piechart = {
                    label: 'Answer',
                    values: [{x: 'Total Computador escritorio', y: Totalcompumesa}, {
                        x: 'Total Portatiles',
                        y: Totalportatil
                    }]
                };
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Modal Content
                this.state.show = true;
                this.handleShow();
                this.Id = id;
                this.setState({Id: id});
                this.setState({Nombre: nombre});
                this.setState({Descripcion: description});
                this.setState({Estado: Estado});
                this.setState({Departamento: Departamento});

            });

            this.state.displaysedes = 'block';
            this.setState({displaysedes: 'block'});

            this.state.displayIRTE = 'block';
            this.setState({displayIRTE: 'block'});

            map.on("mouseenter", "clusters", function () {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "clusters", function () {
                map.getCanvas().style.cursor = "";
            });

            //Layer - capa de EE

            map.addSource("listaEE", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [],
                },
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
            });

            map.getSource("listaEE").setData(await fetchDataEE({longitude: lng, latitude: lat}));

            map.addLayer({
                id: "clustersEE",
                type: "circle",
                source: "listaEE",
                filter: ["has", "point_count"],
                layout: {
                    'visibility': 'visible'
                },
                paint: {
                    "circle-color": [
                        "step", ["get", "point_count"],
                        "#4974a5",
                        100,
                        "#969696",
                        750,
                        "#73A6AD",
                    ],
                    "circle-radius": [
                        "step", ["get", "point_count"],
                        20,
                        100,
                        30,
                        750,
                        40,
                    ],
                },
            });

            map.addLayer({
                id: "cluster-countEE",
                type: "symbol",
                source: "listaEE",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count}",
                    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                    "text-size": 12,
                    'visibility': 'visible'
                },
            });

            map.addLayer({
                id: "unclustered-point-EE",
                type: "symbol",
                source: "listaEE",
                filter: ["!", ["has", "point_count"]],
                layout: {
                    // full list of icons here: https://labs.mapbox.com/maki-icons
                    "icon-image": "bakery-15", // this will put little croissants on our map
                    "icon-padding": 0,
                    "icon-allow-overlap": true,
                    'visibility': 'visible',
                },
            });

            map.setLayoutProperty('clustersEE', 'visibility', 'none');
            map.setLayoutProperty('cluster-countEE', 'visibility', 'none');
            map.setLayoutProperty('unclustered-point-EE', 'visibility', 'none');

            var features = map.queryRenderedFeatures({
                layers: ["unclustered-point-EE"],
            });


            // inspect a cluster on click
            map.on("click", "clustersEE", function (e) {
                var features = map.queryRenderedFeatures(e.point, {
                    layers: ["clustersEE"],
                });
                var clusterId = features[0].properties.cluster_id;
                map.getSource("listaEE").getClusterExpansionZoom(clusterId, function (err, zoom) {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom,
                    });
                });
            });


            map.on("click", "unclustered-point-EE", async (e) => {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var id = e.features[0].properties.id;
                var nombre = e.features[0].properties.Nombreestablecimiento;
                var IRTE = e.features[0].properties.IRTE;
                var Municipio = e.features[0].properties.Municipio;
                var Departamento = e.features[0].properties.Departamento;
                var Sector_atencion = e.features[0].properties.Sector_atencion;
                var Calendario = e.features[0].properties.Calendario;
                var Tasa_aprobacion = e.features[0].properties.Tasa_aprobacion;
                var Tasa_reprobacion = e.features[0].properties.Tasa_reprobacion;
                var Tasa_desercion = e.features[0].properties.Tasa_desercion;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                this.state.showmodalEE = true;
                this.showModalEE();

                this.setState({Nombreestablecimiento: nombre});
                this.setState({IRTE: IRTE});
                this.setState({DepartamentoEE: Departamento});
                this.setState({MunicipioEE: Municipio});
                this.setState({Sector_atencion: Sector_atencion});
                this.setState({Calendario: Calendario});
                this.setState({Tasa_aprobacion: Tasa_aprobacion});
                this.setState({Tasa_reprobacion: Tasa_reprobacion});
                this.setState({Tasa_desercion: Tasa_desercion});

            });

            this.state.displayestablecimientos = 'block';
            this.setState({displayestablecimientos: 'block'});

            map.on("mouseenter", "clustersEE", function () {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "clustersEE", function () {
                map.getCanvas().style.cursor = "";
            });
        });
    }


    updateValue(e) {
        if (e.target.name == "CONECTADO") {
            this.setState({checkconectado: true});
            this.setState({checkdesconectado: false});
            this.state.checkconexion = "CONECTADO";
        }

        if (e.target.name == "DESCONECTADO") {
            this.setState({checkconectado: false});
            this.setState({checkdesconectado: true});
            this.state.checkconexion = "DESCONECTADO";
        }

        if (e.target.name == "Sfiltro") {
            this.setState({valorselect: e.target.value});
        }

        if (e.target.name == "valorinicial") {
            this.setState({valorinicial: e.target.value});
        }

        if (e.target.name == "valorfinal") {
            this.setState({valorfinal: e.target.value});
        }

        var conexion = this.state.checkconexion;

        if (e.target.name == "Estado") {
            this.setState({valorestado: e.target.value});
            this.state.valorestado = e.target.value;
        }

        if (e.target.name == "Sector") {
            this.setState({valorsector: e.target.value});
            this.state.valorsector = e.target.value;
        }

        if (e.target.name == "Zona") {
            this.setState({valorzona: e.target.value});
            this.state.valorzona = e.target.value;
        }
        var retorna = "";
        var resultado = cloneDeep(this.state.geojson);
        var varsector = this.state.valorsector;
        var varestado = this.state.valorestado;
        var varzona = this.state.valorzona;

        //Inicio de validaciones para cada select

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorselect == "Todos" &&
            this.state.valorzona == "Todos") {
            retorna = resultado;
        }

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.valorselect == "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona == "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }

        //checkconexion y select

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona == "Todos") {

            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        //filtro select

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "" &&
            this.state.valorzona == "Todos") {

            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        // sector
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona == "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            retorna = resultado;
        }

        //sector y select
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "" &&
            this.state.valorzona == "Todos"
        ) {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }

            retorna = resultado;
        }

        //sector y conexion

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona == "Todos"
        ) {
            resultado.features = resultado.features.filter(
                (feature) => feature.properties.Sector == varsector
            );
            resultado.features = resultado.features.filter(
                (feature) => feature.properties.EstadoActual == conexion
            );
            retorna = resultado;
        }

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona == "Todos"
        ) {
            resultado.features = resultado.features.filter(
                (feature) => feature.properties.Estado == varestado);
            retorna = resultado;
        }

        //estado y select

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona == "Todos") {

            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona == "Todos"
        ) {
            resultado.features = resultado.features.filter(
                (feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter(
                (feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }


        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos"
        ) {
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            retorna = resultado;
        }

        //zona y select
        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != ""
        ) {
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }

        //Filtro por conexion, zona y select
        if (this.state.valorsector == "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }

            retorna = resultado;
        }

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona == "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado && feature.properties.Sector == varsector);
            retorna = resultado;
        }

        //Filtro por estado, sector y select 
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona == "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado && feature.properties.Sector == varsector);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona == "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }

        //Filtro estado, sector conexion y select
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona == "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            retorna = resultado;
        }

        //Filtro sector, zona y select
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }

        //Filtro sector, zona,checkconexion y select
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado == "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            retorna = resultado;
        }

        //Filtro por estado, zona y select
        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }


        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }

        //Filtro por estado, conexion, zona y select
        if (this.state.valorsector == "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            retorna = resultado;
        }

        //Filtro por sector,estado,zona y select
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion == "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }
            retorna = resultado;
        }

        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            retorna = resultado;
        }

        //Filtro por todos los campos
        if (this.state.valorsector != "Todos" &&
            this.state.valorestado != "Todos" &&
            this.state.checkconexion != "Todos" &&
            this.state.valorzona != "Todos" &&
            this.state.valorselect != "Todos" &&
            this.state.valorinicial != "" &&
            this.state.valorfinal != "") {
            resultado.features = resultado.features.filter((feature) => feature.properties.Estado == varestado);
            resultado.features = resultado.features.filter((feature) => feature.properties.Zona == varzona);
            resultado.features = resultado.features.filter((feature) => feature.properties.Sector == varsector);
            resultado.features = resultado.features.filter((feature) => feature.properties.EstadoActual == conexion);
            if (this.state.valorselect == "Ancho") {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.Ancho >= this.state.valorinicial && feature.properties.Ancho <= this.state.valorfinal);
            } else {
                resultado.features = resultado.features.filter(
                    (feature) => feature.properties.TotalCompu >= this.state.valorinicial && feature.properties.TotalCompu <= this.state.valorfinal);
            }

            retorna = resultado;
        }

        //Linea de codigo que envia los datos filtrados a dibujar
        this.state.map.getSource("random-points-data").setData(retorna);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleCloseEE() {
        this.setState({showmodalEE: false});
    }

    handleCloseM() {
        this.setState({showmodalM: false});
    }

    handleShow() {
        this.setState({show: true});
        this.state.show = true;
    }

    showModal() {
        this.setState({showmodal: true});
        this.state.showmodal = true;
    }

    showModalEE() {
        this.setState({showmodalEE: true});
        this.state.showmodalEE = true;
    }

    showModalM() {
        this.setState({showmodalM: true});
        this.state.showmodalM = true;
    }

    handlemodalClose() {
        this.setState({showmodal: false});
    }

    //funcion de select con filtro por ancho de banda y totalcompu
    filtrovalores(e) {
        if (e.target.name == "Sfiltro") {
            this.setState({valorselect: e.target.value});
        }

        if (e.target.name == "valorinicial") {
            this.setState({valorinicial: e.target.value});
        }

        if (e.target.name == "valorfinal") {
            this.setState({valorfinal: e.target.value});
        }
    }

    hoverlayers(e) {

        if (e.target.name == "primeracapa") {
            if (e.target.className == "active") {
                this.state.map.setLayoutProperty('clusters', 'visibility', 'none');
                this.state.map.setLayoutProperty('cluster-count', 'visibility', 'none');
                this.state.map.setLayoutProperty('unclustered-point', 'visibility', 'none');
                this.state.layoutcolegios = "";
                this.setState({layoutcolegios: ""});
                this.state.filtrosede = 'none';
            } else {


                this.state.map.setLayoutProperty('clusters', 'visibility', 'visible');
                this.state.map.setLayoutProperty('cluster-count', 'visibility', 'visible');
                this.state.map.setLayoutProperty('unclustered-point', 'visibility', 'visible');
                this.state.layoutcolegios = "active";
                this.setState({layoutcolegios: "active"});
                this.state.filtrosede = 'block';
            }
        }

        if (e.target.name == "segundacapa") {
            if (e.target.className == "active") {
                this.state.map.setLayoutProperty('state', 'visibility', 'none');
                this.state.map.setLayoutProperty('state-borders', 'visibility', 'none');
                this.state.layoutmunicipios = "";
                this.setState({layoutmunicipios: ""});
                this.state.display = 'none';
            } else {
                try {
                    this.state.map.setLayoutProperty('state', 'visibility', 'visible');
                    this.state.map.setLayoutProperty('state-borders', 'visibility', 'visible');
                    this.state.layoutmunicipios = "active";
                    this.state.display = 'block';
                    this.setState({layoutmunicipios: "active"});
                } catch (err) {
                    console.log(err);
                }
            }
        }

        if (e.target.name == "terceracapa") {
            if (e.target.className == "active") {
                this.state.map.setLayoutProperty('clustersEE', 'visibility', 'none');
                this.state.map.setLayoutProperty('cluster-countEE', 'visibility', 'none');
                this.state.map.setLayoutProperty('unclustered-point-EE', 'visibility', 'none');
                this.state.layoutEE = "";
                this.setState({layoutEE: ""});
            } else {
                this.state.map.setLayoutProperty('clustersEE', 'visibility', 'visible');
                this.state.map.setLayoutProperty('cluster-countEE', 'visibility', 'visible');
                this.state.map.setLayoutProperty('unclustered-point-EE', 'visibility', 'visible');
                this.state.layoutEE = "active";
                this.setState({layoutEE: "active"});
            }
        }
    }

    areglografica(e) {

        const pruebadepto = this.state.pruebasaberdpto;
        const pruebampio = this.state.pruebasabermpio;

        if (e.target.name == "Vigencia") {
            this.setState({vigencia: e.target.value});
            this.state.vigencia = e.target.value;
            this.setState({municipios: "Todos"});
            this.state.municipios = "Todos";
            this.setState({departamentos: "Todos"});
            this.state.departamentos = "Todos";
        }
        var vigencia = this.state.vigencia;

        if (e.target.name == "Departamento") {
            var filtromunicipio = "";
            var nombredepartamento = e.target[e.target.selectedIndex].text;
            this.setState({departamentos: e.target.value});
            this.state.departamentos = e.target.value;
            filtromunicipio = pruebampio.filter(function (element) {
                return element.Vigencia == vigencia && element.Departamento == nombredepartamento;
            });
            this.state.arraymunicipios = filtromunicipio;
            this.setState({municipios: "Todos"});
            this.state.municipios = "Todos";

        }

        if (e.target.name == "Municipio") {
            this.setState({municipios: e.target.value});
            this.state.municipios = e.target.value;
        }

        var resultado = "";
        var departamentos = this.state.departamentos;
        if (this.state.vigencia != "Todos" && this.state.departamentos != "Todos" && this.state.municipios == "Todos") {
            resultado = pruebadepto.filter(function (element) {
                return element.Vigencia == vigencia && element.ID_DEPARTAMENTO == departamentos;
            });

            if (resultado == "" || resultado[0].DEPARTAMENTO == undefined) {
                resultado = this.state.series;
                resultado[0].DEPARTAMENTO = "";
            }

            this.state.series = [{
                name: 'GRADO 3',
                data: [{x: 'Evaluados', y: resultado[0].Evaluados3}, {
                    x: 'Promedio',
                    y: resultado[0].Promedio3
                }, {x: 'Error estandar', y: resultado[0].ErrorEstandar3}]
            },
                {
                    name: 'GRADO 5',
                    data: [{x: 'Evaluados', y: resultado[0].Evaluados5}, {
                        x: 'Promedio',
                        y: resultado[0].Promedio5
                    }, {x: 'Error estandar', y: resultado[0].ErrorEstandar5}]
                },
                {
                    name: 'GRADO 9',
                    data: [{x: 'Evaluados', y: resultado[0].Evaluados9}, {
                        x: 'Promedio',
                        y: resultado[0].Promedio9
                    }, {x: 'Error estandar', y: resultado[0].ErrorEstandar9}]
                }
            ];


            this.state.options = {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: true
                },
                plotOptions: {
                    heatmap: {

                        colorScale: {
                            ranges: [{
                                from: 0,
                                to: 30,
                                color: '#008FFB'
                            }
                            ],
                        },


                    }
                },
                colors: ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794',
                    '#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
                ],
                xaxis: {
                    type: 'category',
                    categories: ['Evaluados', 'promedio', 'Error estandar',]
                },
                title: {
                    text: 'HeatMap - Pruebas Saber ' + resultado[0].DEPARTAMENTO
                }
            };

        }

        if (this.state.vigencia != "Todos" && this.state.departamentos != "Todos" && this.state.municipios != "Todos") {

            var municipiofiltro = this.state.arraymunicipios;
            var seleccmunicipio = this.state.municipios;
            var resultadofiltromunicipio = "";
            resultadofiltromunicipio = municipiofiltro.filter(function (element) {
                return element.Cod_mpi == seleccmunicipio;
            });

            this.state.series = [{
                name: 'GRADO 3',
                data: [{x: 'Evaluados', y: resultadofiltromunicipio[0].Evaluados3}, {
                    x: 'Promedio',
                    y: resultadofiltromunicipio[0].Promedio3
                }, {x: 'Error estandar', y: resultadofiltromunicipio[0].ErrorEstandar3}]
            },
                {
                    name: 'GRADO 5',
                    data: [{x: 'Evaluados', y: resultadofiltromunicipio[0].Evaluados5}, {
                        x: 'Promedio',
                        y: resultadofiltromunicipio[0].Promedio5
                    }, {x: 'Error estandar', y: resultadofiltromunicipio[0].ErrorEstandar5}]
                },
                {
                    name: 'GRADO 9',
                    data: [{x: 'Evaluados', y: resultadofiltromunicipio[0].Evaluados9}, {
                        x: 'Promedio',
                        y: resultadofiltromunicipio[0].Promedio9
                    }, {x: 'Error estandar', y: resultadofiltromunicipio[0].ErrorEstandar9}]
                }
            ];

            this.state.options = {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: true
                },
                plotOptions: {
                    heatmap: {

                        colorScale: {
                            ranges: [{
                                from: 0,
                                to: 30,
                                color: '#008FFB'
                            }
                            ],
                        },


                    }
                },
                colors: ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794',
                    '#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
                ],
                xaxis: {
                    type: 'category',
                    categories: ['Evaluados', 'promedio', 'Error estandar',]
                },
                title: {
                    text: 'HeatMap - Pruebas Saber ' + resultadofiltromunicipio[0].Departamento + ' - ' + resultadofiltromunicipio[0].Municipio
                }
            };
        }

        if (this.state.vigencia == "Todos" && this.state.departamentos == "Todos" && this.state.municipios == "Todos") {

            this.state.series = [{
                name: 'GRADO 3',
                data: [{x: 'Evaluados', y: 0}, {x: 'promedio', y: 0}, {x: 'error estandar', y: 0}]
            },
                {
                    name: 'GRADO 5',
                    data: [{x: 'w1', y: 0}, {x: 'w2', y: 0}, {x: 'error estandar', y: 0}]
                },
                {
                    name: 'GRADO 9',
                    data: [{x: 'w1', y: 0}, {x: 'w2', y: 0}, {x: 'error estandar', y: 0}]
                }
            ];

            this.state.options = {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#008FFB"],
                title: {
                    text: 'HeatMap - Pruebas Saber'
                }
            };
        }
    }

//Funcion restablecer el filtro del mapa y los campos

    restablecerfiltro(e) {
        this.setState({
            valorestado: "Todos",
            valorsector: "Todos",
            valorzona: "Todos",
            checkconectado: false,
            checkdesconectado: false,
            valorinicial: '',
            valorfinal: '',
            checkconexion: "Todos",
        });
        this.state.map.getSource("random-points-data").setData(this.state.gjson);
        this.state.map.setCenter([-72.9323, 4.2067]);
        this.state.map.setZoom(4.5);
    }

    render() {

        const arraympio = this.state.arraymunicipios;


        return (
            <div className="app">

                <div className="map-container" ref={el => this.mapContainer = el}>

                </div>
                <div className="example-container">
                    <div className={`input-container ${this.state.openPanel ? 'active' : ''}`}>
                        <a href={"#"}
                           className="text-center text-black-100 font-weight-bold"
                           placeholder="Abrir Panel"
                           onClick={() => {
                               this.setState({setPanelType: 'left'});
                               this.setState({openPanel: !this.state.openPanel});
                           }}>
                            Filtros
                            <FontAwesome
                                className='bars'
                                size="2x"
                                name={this.state.openPanel ? 'angle-double-left' : 'angle-double-right'}
                                style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: 'black'}}/>
                        </a>
                    </div>

                    <div className={`input-container-modal-est`}>
                        <a href={"#"}
                           className="text-center text-black-100 font-weight-bold"
                           placeholder="Abrir Panel"
                           onClick={() => {
                               this.showModal();
                           }}>
                            Estadísticas
                            <FontAwesome
                                className='chart-line'
                                size="2x"
                                name={this.state.openPanel ? 'chart-line' : 'chart-line'}
                                style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: 'black'}}/>
                        </a>
                    </div>

                    <div className="layers">

                        <Nav as="ul">
                            <Nav.Item as="li" style={{display: this.state.displaysedes}}>
                                <a name="primeracapa" className={this.state.layoutcolegios} onClick={this.hoverlayers}
                                   href="#">Sedes</a>
                            </Nav.Item>
                            <Nav.Item as="li" style={{display: this.state.displayIRTE}}>
                                <a name="segundacapa" className={this.state.layoutmunicipios} onClick={this.hoverlayers}
                                   href="#">IRTE (Municipios)</a>
                            </Nav.Item>
                            <Nav.Item as="li" style={{display: this.state.displayestablecimientos}}>
                                <a name="terceracapa" className={this.state.layoutEE} onClick={this.hoverlayers}
                                   href="#">Establecimientos</a>
                            </Nav.Item>
                        </Nav>

                    </div>

                    <div className="map-overlay" style={{display: this.state.display}} id="legend">

                        <div>
                            <span className="legend-key"></span>
                            <span>&#8249; 3.5</span>
                        </div>
                        <div>
                            <span className="legend-key1"></span>
                            <span>3.5 - 6.99</span>
                        </div>
                        <div>
                            <span className="legend-key2"></span>
                            <span>&#8250; = 7</span>
                        </div>

                    </div>


                    <div className='row m-0  justify-content-center align-items-center vh-100'>

                        <HashLoader
                            size={80}
                            color={"#123abc"}
                            loading={this.state.loading}
                            css=''
                        />

                    </div>


                    <SlidingPanel
                        type={this.state.panelType}
                        isOpen={this.state.openPanel}
                        backdropClicked={() => this.setState({OpenPanel: false})}
                        size={this.state.panelSize}
                        panelClassName="additional-class"
                        noBackdrop={this.state.noBackdrop}>
                        <div className="panel-container">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Filtro por Estado</Form.Label>
                                <Form.Control as="select" name="Estado" value={this.state.valorestado}
                                              onChange={this.updateValue}>
                                    <option value='Todos'>Seleccione el Estado</option>
                                    <option value='ACTIVO'>ACTIVO</option>
                                    <option value='CIERRE TEMPORAL'>CIERRE TEMPORAL</option>
                                    <option value='CIERRE DEFINITIVO'>CIERRE DEFINITIVO</option>
                                </Form.Control>
                            </Form.Group>
                            <div className="row">
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Label>Filtro por Sector</Form.Label>
                                    <Form.Control as="select" name="Sector" value={this.state.valorsector}
                                                  onChange={this.updateValue}>
                                        <option value='Todos'>Seleccione el Sector</option>
                                        <option value='OFICIAL'>OFICIAL</option>
                                        <option value='NO OFICIAL'>NO OFICIAL</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Form.Group controlId="exampleForm.ControlSelect3">
                                    <Form.Label>Filtro por Zona</Form.Label>
                                    <Form.Control as="select" name="Zona" value={this.state.valorzona}
                                                  onChange={this.updateValue}>
                                        <option value='Todos'>Seleccione la zona</option>
                                        <option value='R'>R</option>
                                        <option value='U'>U</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Form.Label>
                                    Estado Actual
                                </Form.Label>
                            </div>
                            <Form.Group as={Row}>
                                <Col sm={6}>
                                    <Form.Check
                                        type="radio"
                                        label="CONECTADO"
                                        name="CONECTADO"
                                        id="formHorizontalRadios1"
                                        checked={this.state.checkconectado}
                                        onChange={this.updateValue}/>
                                </Col>
                                <Col sm={6}>
                                    <Form.Check
                                        type="radio"
                                        label="DESCONECTADO"
                                        name="DESCONECTADO"
                                        id="formHorizontalRadios2"
                                        checked={this.state.checkdesconectado}
                                        onChange={this.updateValue}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="row">
                                <Form.Group controlId="exampleForm.ControlSelect3">
                                    <Form.Label>
                                        Filtro por rango de valores
                                    </Form.Label>
                                    <Form.Control as="select" name="Sfiltro" value={this.state.valorselect}
                                                  onChange={this.filtrovalores}>
                                        <option value='Todos'>Seleccione la zona</option>
                                        <option value='Ancho'>Filtro por ancho de banda</option>
                                        <option value='TotalCompu'>Filtro por computadores</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <Row className="justify-content-md-center">
                                <Col xs lg="5">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="number" value={this.state.valorinicial} name="valorinicial"
                                                      onChange={this.filtrovalores} sm="4" placeholder="Rango Inicial"/>
                                    </Form.Group>
                                </Col>
                                <Col md="auto"></Col>
                                <Col xs lg="5">
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="number" value={this.state.valorfinal} name="valorfinal"
                                                      onChange={this.filtrovalores} sm="4" placeholder="Rango Final"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="row" style={{display: this.state.filtrosede}}>
                                <Button variant="primary" type="submit" onClick={this.updateValue}>
                                    Filtrar
                                </Button>
                                <br/>
                            </div>
                            <br/>
                            <div className="row">
                                <Button type="button" variant="success" className="close-button"
                                        onClick={this.restablecerfiltro}>
                                    Restablecer filtro
                                </Button>
                            </div>
                        </div>
                    </SlidingPanel>
                </div>

                <Modal size="lg" show={this.state.showmodal} onHide={this.handlemodalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row}>
                            <Col sm={6}>
                                <Form.Label>Filtro por Vigencia</Form.Label>
                                <Form.Control as="select" name="Vigencia" value={this.state.vigencia}
                                              onChange={this.areglografica}>
                                    <option value='Todos'>Seleccione la vigencia</option>
                                    <option value='2012'>2012</option>
                                    <option value='2013'>2013</option>
                                    <option value='2014'>2014</option>
                                    <option value='2015'>2015</option>
                                    <option value='2016'>2016</option>
                                    <option value='2017'>2017</option>
                                    <option value='2018'>2018</option>
                                    <option value='2019'>2019</option>
                                    <option value='2020'>2020</option>
                                </Form.Control>
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Filtro por Departamento</Form.Label>
                                <Form.Control as="select" name="Departamento" value={this.state.departamentos}
                                              onChange={this.areglografica}>
                                    <option value='Todos'>Seleccione El departamento</option>
                                    <option value='105'>Antioquia</option>
                                    <option value='168'>Santander</option>
                                    <option value='1'>Amazonas</option>
                                    <option value='8'>Arauca</option>
                                    <option value='38'>Guainía</option>
                                    <option value='39'>Guaviare</option>
                                    <option value='53'>Putumayo</option>
                                    <option value='59'>San Andrés y Providencia</option>
                                    <option value='77'>Vaupés</option>
                                    <option value='78'>Vichada</option>
                                    <option value='108'>Atlántico</option>
                                    <option value='113'>Bolívar</option>
                                    <option value='115'>Boyacá</option>
                                    <option value='117'>Caldas</option>
                                    <option value='118'>Caquetá</option>
                                    <option value='119'>Cauca</option>
                                    <option value='120'>Cesar</option>
                                    <option value='123'>Córdoba</option>
                                    <option value='125'>Cundinamarca</option>
                                    <option value='127'>Chocó</option>
                                    <option value='141'>Huila</option>
                                    <option value='185'>Casanare</option>
                                    <option value='170'>Sucre</option>
                                    <option value='176'>Valle del Cauca</option>
                                    <option value='173'>Tolima</option>
                                    <option value='166'>Risaralda</option>
                                    <option value='163'>Quindio</option>
                                    <option value='154'>Norte de Santander</option>
                                    <option value='152'>Nariño</option>
                                    <option value='150'>Meta</option>
                                    <option value='147'>Magdalena</option>
                                    <option value='144'>La Guajira</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={4}>
                            </Col>
                            <Col sm={4}>
                                <Form.Label>Filtro por Municipio</Form.Label>
                                <Form.Control as="select" name="Municipio" value={this.state.municipios}
                                              onChange={this.areglografica}>
                                    <option value="Todos">Seleccione el municipio</option>

                                    {arraympio.map((item) =>

                                        <option value={item.Cod_mpi}>{item.Municipio}</option>
                                    )
                                    }
                                </Form.Control>
                            </Col>
                            <Col sm={4}>
                            </Col>
                        </Form.Group>

                        <div id="chart">
                            <ReactApexCharts options={this.state.options} series={this.state.series} type="heatmap"
                                             height={350}/>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>


                <Modal size="lg" show={this.state.showmodalEE} onHide={this.handleCloseEE}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.Nombreestablecimiento}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Table striped bordered hover size="sm">
                            <tbody>
                            <tr>
                                <td>Nombre</td>
                                <td>{this.state.Nombreestablecimiento}</td>
                            </tr>
                            <tr>
                                <td>Departamento</td>
                                <td>{this.state.DepartamentoEE}</td>
                            </tr>
                            <tr>
                                <td>Municipio</td>
                                <td>{this.state.MunicipioEE}</td>
                            </tr>
                            <tr>
                                <td>Sector Atención</td>
                                <td>{this.state.Sector_atencion}</td>
                            </tr>
                            <tr>
                                <td>Calendario</td>
                                <td>{this.state.Calendario}</td>
                            </tr>
                            <tr>
                                <td>Tasa aprobación</td>
                                <td>{this.state.Tasa_aprobacion}</td>
                            </tr>
                            <tr>
                                <td>Tasa reprobacion</td>
                                <td>{this.state.Tasa_reprobacion}</td>
                            </tr>
                            <tr>
                                <td>Tasa desercion</td>
                                <td>{this.state.Tasa_desercion}</td>
                            </tr>
                            <tr>
                                <td>IRTE</td>
                                <td>{this.state.IRTE}</td>
                            </tr>
                            </tbody>
                        </Table>


                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>


                <Modal size="lg" show={this.state.showmodalM} onHide={this.handleCloseM}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Table striped bordered hover size="sm">
                            <tbody>
                            <tr>
                                <td>Departamento</td>
                                <td>{this.state.M_Departamento}</td>
                            </tr>
                            <tr>
                                <td>Municipio</td>
                                <td>{this.state.M_Municipio}</td>
                            </tr>
                            <tr>
                                <td>IPM</td>
                                <td>{this.state.M_IPM}</td>
                            </tr>
                            <tr>
                                <td>Tasa aprobación 2018</td>
                                <td>{this.state.Tasa_aprobacion2018}</td>
                            </tr>
                            <tr>
                                <td>Tasa aprobación 2019</td>
                                <td>{this.state.Tasa_aprobacion2019}</td>
                            </tr>
                            <tr>
                                <td>IRTE</td>
                                <td>{this.state.M_IRTE}</td>
                            </tr>
                            </tbody>
                        </Table>


                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>


                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.Nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Table striped bordered hover size="sm">
                            <tbody>
                            <tr>
                                <td>Descripción</td>
                                <td>{this.state.Descripcion}</td>
                            </tr>
                            <tr>
                                <td>Estado</td>
                                <td>{this.state.Estado}</td>
                            </tr>
                            <tr>
                                <td>Departamento</td>
                                <td>{this.state.Departamento}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <div className="row">
                            <Col sm={6}>
                                <BarChart
                                    title="Answer Results"
                                    data={this.state.bardata3} width={300}
                                    tooltipHtml={this.tooltip}
                                    tooltipOffset={{top: 15, left: 10}}
                                    height={300}
                                    margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
                            </Col>
                            <Col sm={6}>
                                <PieChart
                                    data={this.state.piechart}
                                    width={500}
                                    height={300}
                                    tooltipHtml={this.tooltipPie}
                                    margin={{top: 10, bottom: 10, left: 60, right: 100}}
                                    tooltipOffset={{top: 15, left: 10}}
                                    sort={this.tooltipPie}
                                />
                            </Col>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default App;
