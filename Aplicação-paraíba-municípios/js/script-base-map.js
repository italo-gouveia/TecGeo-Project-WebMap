"use strict";

require([
 "esri/Map",
 "esri/WebMap",
 "esri/views/SceneView",
 "esri/widgets/LayerList",
 "esri/widgets/Legend",
 "esri/widgets/Search",
 "esri/widgets/BasemapGallery",
 "esri/widgets/Expand",
 "dojo/domReady!"
], function (Map, WebMap, SceneView, LayerList, Legend, Search, BasemapGallery, Expand) {
  var webmap = new WebMap({
    portalItem: {
      id: "f71ce1c697dc4aeb99d6cfdbb5d36ceb"
    }
  });

  var view = new SceneView({
    container: "viewDiv",
    map: webmap
  });

  view.then(function () {
    //Seletor de camadas
    var layerList = new LayerList({
      view: view
    });
    view.ui.add(layerList, "top-right");

    //Legendas
    var layers = webmap.layers.items;
    for(var i = 0 ; i < layers.length; i++){
      var legend = new Legend({
        view: view,
        layerInfos: [{
          layer: layers[i],
          title: layers[i].title
        }]
      });
      view.ui.add(legend, "bottom-left");
    }

    //Busca por cidade
    var searchWidget = new Search({
	    view: view
    });

    view.ui.add(searchWidget, {
	    position: "top-left",
	    index: 0
    });

    //Galeria de mapas-base
    var basemapGallery = new BasemapGallery({
	    view: view
    });

    //Icone de expansão contendo a galeria de mapas-base
    var bgExpand = new Expand({
      view: view,
      content: basemapGallery,
      expandIconClass: "esri-icon-basemap"
    });

    view.ui.add(bgExpand, "bottom-right");

  });
});