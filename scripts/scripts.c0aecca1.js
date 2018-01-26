"use strict";angular.module("emptyChairWidgetApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","nvd3","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/actionbtn",{templateUrl:"views/actionbtn.html",controller:"ActionbtnCtrl",controllerAs:"actionbtn"}).when("/widgets/vargas-lleras-discurso",{templateUrl:"views/wg-vargas-lleras-discurso.html",controller:"WgVargasLlerasDiscursoCtrl",controllerAs:"wgVargasLlerasDiscurso",resolve:{data:["jsonGetter",function(a){return a.get("data/vargas-lleras-words")}],options:["jsonGetter",function(a){return a.get("options/wordsviz.conf")}]}}).when("/widgets/timochenko-discurso",{templateUrl:"views/wg-timochenko-discurso.html",controller:"WgVargasLlerasDiscursoCtrl",controllerAs:"wgTimochenkoDiscurso",resolve:{data:["jsonGetter",function(a){return a.get("data/timochenko-words")}],options:["jsonGetter",function(a){return a.get("options/wordsviz.conf")}]}}).otherwise({redirectTo:"/"})}]),angular.module("emptyChairWidgetApp").controller("MainCtrl",["$scope",function(a){function b(){for(var a=[],b=[],c=[],d=0;d<100;d++)a.push({x:d,y:Math.sin(d/10)}),b.push({x:d,y:d%10==5?null:.25*Math.sin(d/10)+.5}),c.push({x:d,y:.5*Math.cos(d/10+2)+Math.random()/5});return[{values:a,key:"Sine Wave",color:"#ff7f0e",strokeWidth:2,classed:"dashed"},{values:c,key:"Cosine Wave",color:"#2ca02c"},{values:b,key:"Another sine wave",color:"#7777ff",area:!0}]}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.options={chart:{type:"lineChart",height:200,margin:{top:20,right:20,bottom:40,left:55},x:function(a){return a.x},y:function(a){return a.y},useInteractiveGuideline:!0,dispatch:{stateChange:function(a){console.log("stateChange")},changeState:function(a){console.log("changeState")},tooltipShow:function(a){console.log("tooltipShow")},tooltipHide:function(a){console.log("tooltipHide")}},xAxis:{axisLabel:"Time (ms)"},yAxis:{axisLabel:"Voltage (v)",tickFormat:function(a){return d3.format(".02f")(a)},axisLabelDistance:-10},callback:function(a){console.log("!!! lineChart callback !!!")}},title:{enable:!0,text:"Una gráfica ahí"},subtitle:{enable:!0,text:"Subtitle for simple line chart. Ay lorem lorem, lorem ipsum, lorem lorem, hasta cuando (8)",css:{"text-align":"center",margin:"10px 13px 0px 7px"}},caption:{enable:!0,html:"<b>Figure 1.</b> Gráfica sideral intergaláctika.",css:{"text-align":"justify",margin:"10px 13px 0px 7px"}}};var c={data:b};a.data=c.data}]),angular.module("emptyChairWidgetApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("emptyChairWidgetApp").controller("ActionbtnCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("emptyChairWidgetApp").controller("WgVargasLlerasDiscursoCtrl",["$scope","$window","wordsVizDataProcessor","data","options",function(a,b,c,d,e){function f(a){return{word:a}}function g(a){return-1!=h.indexOf(a)}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.data=d,a.options=e,a.selectedWords=c.getSortedWords(d,"score",!1,3),a.$watchCollection("selectedWordTuples",function(){a.selectedWords=a.selectedWordTuples.map(function(a){return a.word})}),a.$watchCollection("selectedWords",function(){a.selectedWordTuples=a.selectedWords.map(f)});var h=c.getSortedWords(d,"score",!1,10);a.wordTuples=c.getSortedWords(d,"lemma").map(f),b.innerWidth<600&&(a.wordTuples=c.getSortedWords(d,"lemma").filter(g).map(f)),a.selectedWordTuples=a.selectedWords.map(f)}]),angular.module("emptyChairWidgetApp").directive("multiwordSelect",function(){function a(a,b){function c(b){var c=d(a.selectedWords,b);-1==c?h(b):a.selectedWords.splice(c,1)}function d(a,b){var c=b.word;return a.map(g).indexOf(c)}function e(a,b,c){return c.indexOf(a)===b}function f(a){return a.category}function g(a){return a.word}function h(b){!a.selectLimit||a.selectedWords.length<parseInt(a.selectLimit)?a.selectedWords.push(b):i()}function i(){0==a.alerts.length&&a.alerts.push({msg:a.limitReachedMsg})}a.alerts=[],a.categories=a.words.map(f).filter(e),a.isCategorized=-1==a.categories.indexOf(void 0),a.closeAlert=function(b){a.alerts.splice(b,1)},a.toggleWord=function(b){-1!=d(a.words,b)&&c(b)},a.isSelected=function(b){return d(a.selectedWords,b)>-1}}return{templateUrl:"templates/directives/multiword-select.html",restrict:"E",scope:{words:"<",selectedWords:"=",selectLimit:"<",limitReachedMsg:"@"},link:a}}),angular.module("emptyChairWidgetApp").service("jsonGetter",["$http",function(a){this.get=function(b){return a({method:"GET",url:"files/"+b+".json"}).then(function(a){return a.data})}}]),angular.module("emptyChairWidgetApp").service("timeSeriesParser",function(){this.getNamesSortedByKey=function(a,b,c,d){return this.getNames(a,b).sort(function(e,f){return(a[b][e][c]-a[b][f][c])*(d?1:-1)})},this.getDateValueTuples=function(a,b,c,d,e){var f=a[c][d][e],g=this.getDates(a,b);return f.map(function(a,b){return{x:g[b],y:a}})},this.getDates=function(a,b){return a.dates.map(function(a){return new Date(a)})},this.getNames=function(a,b){return Object.keys(a[b])}}),angular.module("emptyChairWidgetApp").directive("credits",function(){return{templateUrl:"templates/directives/credits.html",restrict:"E",link:function(a,b,c){}}}),angular.module("emptyChairWidgetApp").service("wordsVizDataProcessor",function(){function a(a,b){return a[b]}function b(a,b){for(var c=b[0],d=0,e=Math.abs(a-c),f=0;f<b.length;f++){var g=Math.abs(a-b[f]);g<e&&(e=g,c=b[f],d=f)}return d}function c(a,c,d,e){var f=b(new Date(e),c),g=d[a.dates[f]]?d[a.dates[f]]+", ":"";d[a.dates[f]]=g+a.marks[e]}function d(a,b,c){var d=Object.keys(b.words).sort(a);return c?d.slice(0,c):d}function e(a,b,c,d,e){var f=c?1:-1;return(a.words[d][b]-a.words[e][b])*f}function f(a,b,c,d,e,f){var g=d?1:-1;return(a.words[e][b][c]-a.words[f][b][c])*g}function g(a){var b=this.data.words[a][this.serieName],c=j(this.data);this.totaldata[a]=h(c,b,a)}function h(a,b,c){return{values:b.map(i,{xvalues:a}),key:c}}function i(a,b){return{x:this.xvalues[b],y:a}}function j(a){return a.dates.map(k)}function k(a){return new Date(a)}this.remap=function(a,b){var c={};return Object.keys(a.words).forEach(g,{totaldata:c,serieName:b,data:a}),c},this.getSortedWords=function(a,b,c,f){return d(e.bind(null,a,b,c),a,f)},this.getSortedWordsBySerie=function(a,b,c,e,g){return d(f.bind(null,a,b,c,e),a,g)},this.reindexMarks=function(a){var b=j(a),d={};return a.marks&&Object.keys(a.marks).forEach(c.bind(null,a,b,d)),d},this.formatDateWithMarks=function(a,b){var c=this.formatDate(b);return c+(a[c]?"<p>"+a[c]+"</p>":"")},this.formatDate=function(a){var b=new Date(a);return b.setTime(b.getTime()+60*b.getTimezoneOffset()*1e3),d3.time.format("%Y-%m-%d")(new Date(b))},this.getFromRemapped=function(b,c){return c.map(a.bind(null,b))}}),angular.module("emptyChairWidgetApp").directive("wordsViz",["wordsVizDataProcessor",function(a){function b(b,c,d){function e(c){var d=c[0].pointIndex;b.selectedWords=a.getSortedWordsBySerie(b.data,"norm2",d,!1,3),b.$apply()}b.graphData=[],b.options.chart.xAxis.tickFormat=a.formatDate;var f=a.reindexMarks(b.data);b.options.chart.interactiveLayer={tooltip:{headerFormatter:a.formatDateWithMarks.bind(a,f)}};var g=a.remap(b.data,"norm2");b.$watchCollection("selectedWords",function(){b.graphData=a.getFromRemapped(g,b.selectedWords)}),b.options.chart.lines={dispatch:{elementClick:e}},b.options.chart.xAxis.axisLabel=b.axisLabelX,b.options.chart.yAxis.axisLabel=b.axisLabelY,b.options.caption.text=b.caption}return{template:'<nvd3 options="options" data="graphData"></nvd3>',restrict:"E",scope:{options:"<",data:"<",selectedWords:"=",axisLabelX:"@",axisLabelY:"@",caption:"@"},link:b}}]),angular.module("emptyChairWidgetApp").controller("WgTimochenkoDiscursoCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("emptyChairWidgetApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/actionbtn.html",'<div class="row"> <div class="widget-action-button"> <div class="widget-action-button-content"> <h1>Ciencia y visión</h1> <p>Juegue con una herramienta que le permitirá comprender el panorama político del país</p> <img id="action-button-animated-logo" src="images/weblogo.gif" alt="I\'m Yeoman"> <button> <span>Explore <i>Status</i></span> </button> <p>Un desarrollo de <span> <img id="action-button-text-logo" src="images/logos/wjlogo-small.png" alt="I\'m Yeoman"> </span> </p> </div> </div> <div></div></div>'),a.put("views/main.html",'\x3c!-- <div class="jumbotron">\n  <h1>\'Allo, \'Allo!</h1>\n  <p class="lead">\n    <img src="images/yeoman.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#!/about">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div> --\x3e <div class="row"> <div class="container-fluid widget-container"> <h1>Título</h1> <p> Instrucciones </p> <div class="row"> <div class="col-sm-6"> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> <div class="col-sm-6"> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> </div> <div class="row"> t> <nvd3 options="options" data="data" class="with-3d-shadow with-transitions"></nvd3> </div> </div></div>'),a.put("views/wg-timochenko-discurso.html",'<div class="row"> <div class="container-fluid widget-container"> <h1>¿Cómo se ha transformado el discurso de Timochenko?</h1> <p> Seleccione hasta 5 términos y estudie su evolución en el tiempo. </p> <multiword-select words="wordTuples" selected-words="selectedWordTuples" select-limit="5" limit-reached-msg="Solo puede seleccionar hasta cinco palabras a la vez" class=""></multiword-select> <words-viz options="options" data="data" selected-words="selectedWords" caption="Análisis de ??? tweets de Timochenko (@TimoFARC) entre ??? y ???" axis-label-x="Fecha" axis-label-y="Frencuencia de uso semanal"></words-viz> <credits></credits> </div> </div>'),a.put("views/wg-vargas-lleras-discurso.html",'<div class="row"> <div class="container-fluid widget-container"> <h1>¿Cómo se ha transformado el discurso de Vargas Lleras?</h1> <p> Seleccione hasta 5 términos y estudie su evolución en el tiempo. </p> <multiword-select words="wordTuples" selected-words="selectedWordTuples" select-limit="5" limit-reached-msg="Solo puede seleccionar hasta cinco palabras a la vez" class=""></multiword-select> <words-viz options="options" data="data" selected-words="selectedWords" caption="Análisis de 3528 tweets de Germán Vargas Lleras (@German_Vargas) entre diciembre de 2015 y enero de 2018" axis-label-x="Fecha" axis-label-y="Frencuencia de uso semanal"></words-viz> <credits></credits> </div> </div>')}]);