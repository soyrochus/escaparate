var express = require('express');
var filesystem = require('fs');

var app = express();
var TEST_TMP = './';
var format = require('util');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(express.bodyParser());
app.use(express.static('../sencha'));
app.use(express.cookieParser());
app.use(allowCrossDomain);

app.post('/slsproxy/slsquality/saveHighQualityPhoto.htm', function( req, res) {
 
  console.log(req);
  // the uploaded file can be found as `req.files.image` and the
  // title field as `req.body.title`
  res.send('imagen:'+req.files.image.name+' size :' + req.files.image.size / 1024 | 0 +' path'
    + req.files.image.path);
});


app.get('/upload',function(req,res) {
   res.send('<form method="post" action="slsproxy/slsquality/saveHighQualityPhoto.htm" enctype="multipart/form-data">'
    + '<p>Title: <input type="text" name="title" /></p>'
    + '<p>Image: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');});
/*app.get('/soporte/Intervenciones', mdata.toread('./data.json'));

app.get('/soporte/Intervenciones/:id', mdata.toread('./data.json', function(data, request, response) {
    var taskId = request.params.id;
    try {
       var res = mdata.find(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/soporte/Intervenciones', mdata.towrite('./data.json', function(data, newdata, save, request, response) {
    try {

       var res = mdata.insert(newdata, data);
       save(data);
       
    } catch (error) {
       
        response.send(error);
    }
     
}));

app.put('/soporte/Intervenciones/:id', mdata.towrite('./data.json', function(data, newdata, save, request, response) {
    
    var taskId = request.params.id;
   
    try {

       var res = mdata.replace(newdata, data);
       save(data);

    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.delete('/soporte/Intervenciones/:id', mdata.towrite('./data.json', function(data, newdata, save, request, response) {
    
    var taskId = request.params.id;
    try {

       var res = mdata.remove(taskId, data);
       save(data);

    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));*/

app.get('/foo', function (req, res) {
  console.log('foo');
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Credentials',true);
    res.cookie('SLSID', 'desde_foo');
    res.send(200,'{"success":"true"}');
    // ...
});
var mdata = require('./remedata');
var mock = require('./mock');



//-------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slssynchronize/deviceSubscribe.htm', mdata.towrite('./devices.json', function(data, newdata,save,request,response) {
   
    console.log('deviceSubscribe');
    try{
    var res={token:'1111111'};
    return data[res];
    }catch(error){console.log(error)}
    // ...
}));

app.post('/slsproxy/slsquality/findTechnician.htm', mdata.towrite('./users.json', function(data, newdata,save,request,response) {

  //tenemos que inyertar una cookie con el valor SLSID
  var technician = newdata.technicianLogin;
 
  //var appCode = newdata.applicationCode;
    try {
       var res = mock.getTechnician(technician,data);
       if (res >= 0){
          /*response.cookie('SLSID', 'baz');
          response.contentType('application/json');
          response.send({'success': true, 'data': data[res]});  */
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
  
}));



app.post('/slsproxy/login/login.htm', mdata.towrite('./users.json', function(data, newdata,save,request,response) {

  //tenemos que inyertar una cookie con el valor SLSID
  var username = newdata.username;
  var password = newdata.password;
  //var appCode = newdata.applicationCode;
    try {
       var res = mock.getUser(username,password, data);
       if (res >= 0){
          /*response.cookie('SLSID', 'baz');
          response.contentType('application/json');
          response.send({'success': true, 'data': data[res]});  */
          return data[res];
       } else {
          return  {success:false}//response.send(403,'{"success":"false"}') ;      
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
  
}));
app.post('/slsproxy/slsmanager/getUserPermission.htm', mdata.towrite('./users.json', function(data, newdata,save,request,response) {

	//tenemos que inyertar una cookie con el valor SLSID
  var username = newdata.username;
	var password = newdata.password;
	//var appCode = newdata.applicationCode;
    try {
       var res = mock.getUser(username,password, data);
       if (res >= 0){
          /*response.cookie('SLSID', 'baz');
          response.contentType('application/json');
          response.send({'success': true, 'data': data[res]});  */
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
	
}));
app.post('/slsproxy/slsquality/getImperfection.htm', mdata.towrite('./imperfectionAX.json', function(data, newdata) {
    var taskId = newdata.imperfectionId;
    try {
       var res = mock.getImperfection(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
	
}));

app.post('/slsproxy/slsquality/findImperfection.htm', mdata.towrite('./imperfectionAX.json', function(data, newdata) {
    var imperfectionCode = newdata.imperfectionCode || null,
		imperfectionDescription = newdata.imperfectionDescription || null,
		maxOptimalValue = newdata.maxOptimalValue || null,
		maxAcceptableValue = newdata.maxAcceptableValue || null,
		brandCode = newdata.brandCode || null,
		familyCode = newdata.familyCode || null;
	
    try {
       var res = mock.findImperfection(imperfectionCode, imperfectionDescription, maxOptimalValue, maxAcceptableValue, brandCode, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/getAlteration.htm', mdata.towrite('./alterationAX.json', function(data, newdata) {
    var taskId = newdata.alterationId;
    try {
       var res = mock.getAlteration(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
	
}));

app.post('/slsproxy/slsquality/findAlteration.htm', mdata.towrite('./alteration.json', function(data, newdata) {
    var alterationCode = newdata.alterationCode || null,
		alterationDescription = newdata.alterationDescription || null,
		maxOptimalValue = newdata.maxOptimalValue || null,
		maxAcceptableValue = newdata.maxAcceptableValue || null,
		brandCode = newdata.brandCode || null,
		familyCode = newdata.familyCode || null;
	
    try {
      
	   var res = mock.findAlteration(alterationCode, alterationDescription, maxOptimalValue, maxAcceptableValue, brandCode, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/getQualityDistribution.htm', mdata.towrite('./distribution.json', function(data, newdata) {
    var taskId = newdata.quaDistributionId;
    try {
       var res = mock.getDistribution(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
	
}));

app.post('/slsproxy/slsquality/findQualityDistribution.htm', mdata.towrite('./distribution.json', function(data, newdata) {
    var distributionCode = newdata.quaDistributionCode || null,
		distributionDescription = newdata.quaDistributionDescription || null,
		maxOptimalValue = newdata.maxOptimalValue || null,
		maxAcceptableValue = newdata.maxAcceptableValue || null,
		brandCode = newdata.brandCode || null,
		familyCode = newdata.familyCode || null;
	
    try {
       var res = mock.findDistribution(distributionCode, distributionDescription, maxOptimalValue, maxAcceptableValue, brandCode, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/getOrganolepticQuality.htm', mdata.towrite('./organoleptic.json', function(data, newdata) {
    var taskId = newdata.orgQualityId;
    try {
       var res = mock.getOrgQuality(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
	
}));

app.post('/slsproxy/slsquality/findOrganolepticQuality.htm', mdata.towrite('./organoleptic.json', function(data, newdata) {
    var orgQualityCode = newdata.orgQualityCode || null,
		orgQualitynDescription = newdata.orgQualitynDescription || null,
		maxOptimalValue = newdata.maxOptimalValue || null,
		maxAcceptableValue = newdata.maxAcceptableValue || null,
		familyCode = newdata.familyCode || null;
	
    try {
       var res = mock.findOrgQuality(orgQualityCode, orgQualitynDescription, maxOptimalValue, maxAcceptableValue, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsmaster/getFamily.htm', mdata.towrite('./family.json', function(data, newdata) {
    var taskId = newdata.familyCode || null;
    try {
       var res = mock.getFamily(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
	
}));

app.post('/slsproxy/slsmaster/findFamily.htm', mdata.towrite('./family.json', function(data, newdata) {
	var familyCode = newdata.familyCode || null,
		familyDescription = newdata.familyDescription || null;
    try {
       var res = mock.findFamily(familyCode, familyDescription, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsmaster/getBrand.htm', mdata.towrite('./brand.json', function(data, newdata) {
    var taskId = newdata.brandCode || null;
    try {
       var res = mock.getBrand(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slsmaster/findBrand.htm', mdata.towrite('./brandAx.json', function(data, newdata) {
    var brandCode = newdata.brandCode || null,
		brandTypeCode = newdata.brandTypeCode || null,
		brandDescription = newdata.brandDescription || null;
    try {
       var res = mock.findBrand(brandCode, brandTypeCode, brandDescription, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slswarehouse/getpalletstock.htm', mdata.towrite('./palletstock.json', function(data, newdata) {
    var source = newdata.source || null,
		palletSSCC = newdata.palletSSCC || null;
    try {
       var res = mock.getPalletStock(source, palletSSCC, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slswarehouse/findpalletstock.htm', mdata.towrite('./palletstock.json', function(data, newdata) {
    var source = newdata.source || null,
		lastControlData = newdata.lastControlData || null,
		palletSSCC = newdata.palletSSCC || null,
		platformSSCC = newdata.platformSSCC || null,
		packagingDate = newdata.packagingDate || null,
		lifeForSale = newdata.lifeForSale ||null,
		lotNumber = newdata.lotNumber || null,
		boxNumber = newdata.boxNumber ||null,
		qualificationCode = newdata.qualificationCode || null,
		shipmentCode = newdata.shipmentCode || null,
		familyCode = newdata.familyCode || null,
		packagingCode = newdata.packagingCode || null,
		location = newdata.location || null;
    try {
       var res = mock.findPalletStock(source, lastControlData, palletSSCC, platformSSCC, packagingDate, 
										lifeForSale, lotNumber, boxNumber, qualificationCode, shipmentCode, 
										familyCode, packagingCode, location, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slslogistic/getPurchOrder.htm', mdata.towrite('./purchorder.json', function(data, newdata) {
    var purchCode = newdata.purchCode || null;
    try {
       var res = mock.getPurchOrder(purchCode, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slslogistic/findPurchOrder.htm', mdata.towrite('./purchorder.json', function(data, newdata) {
    /*var deliveryDate = newdata.deliveryDate || null,
		purchCode = newdata.purchCode || null,
		totalBoxes = newdata.totalBoxes || null,
		brandCode = newdata.brandCode || null,
		purchDataAreaCode = newdata.purchDataAreaCode || null,
		pallets = newdata.pallets || null,
		loadPlatform = newdata.loadPlatform || null,
		unloadPlatform = newdata.unloadPlatform || null,
		unitsNumber = newdata.unitsNumber || null,
		weightUnit = newdata.weightUnit || null,
		countryCode = newdata.countryCode || null,
		packagingCode = newdata.packagingCode || null,
		familyCode = newdata.familyCode || null;
    try {
       var res = mock.findPurchOrder(deliveryDate, purchCode, totalBoxes, brandCode, purchDataAreaCode, 
									 pallets, loadPlatform, unloadPlatform, unitsNumber, weightUnit, 
									 countryCode, packagingCode, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }*/
    return {"fwk":{"fwkExceptions":["Connection reset; nested exception is java.net.SocketException: Connection reset]"]},"success":false};
     
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slslogistic/getShipment.htm', mdata.towrite('./shipment.json', function(data, newdata) {
    var shipmentCode = newdata.shipmentCode || null;
    try {
       var res = mock.getShipment(shipmentCode, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slslogistic/findShipment.htm', mdata.towrite('./shipment.json', function(data, newdata) {
    var shipmentCode = newdata.shipmentCode || null,
		logisticModel = newdata.logisticModel || null,
		transportType = newdata.transportType || null,
		transportMode = newdata.transportMode || null,
		logisticProvider = newdata.logisticProvider || null,
		driverTelf = newdata.driverTelf || null,
		tractorId = newdata.tractorId || null,
		trailerId = newdata.trailerId || null,
		numOfDrivers = newdata.numOfDrivers || null,
		trailerTemp = newdata.trailerTemp || null,
		boatCode = newdata.boatCode || null,
		boatContainer = newdata.boatContainer || null,
		notes = newdata.notes || null,
		loadDate = newdata.loadDate || null,
		unloadDate = newdata.unloadDate || null,
		loadPlatformCode = newdata.loadPlatformCode || null,
		unloadPlatformCode = newdata.unloadPlatformCode || null;
    try {
       var res = mock.findShipment(shipmentCode, logisticModel, transportType, transportMode, logisticProvider, 
									 driverTelf, tractorId, trailerId, numOfDrivers, trailerTemp, 
									 boatCode, boatContainer, loadDate, unloadDate, notes, loadPlatformCode, unloadPlatformCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slswarehouse/findshipmentstock.htm', mdata.towrite('./shipmentstock.json', function(data, newdata) {
    var shipmentCode = newdata.shipmentCode || null,
		logisticModel = newdata.logisticModel || null,
		transportType = newdata.transportType || null,
		transportMode = newdata.transportMode || null,
		logisticProvider = newdata.logisticProvider || null,
		driverTelf = newdata.driverTelf || null,
		tractorId = newdata.tractorId || null,
		trailerId = newdata.trailerId || null,
		numOfDrivers = newdata.numOfDrivers || null,
		trailerTemp = newdata.trailerTemp || null,
		boatCode = newdata.boatCode || null,
		boatContainer = newdata.boatContainer || null,
		notes = newdata.notes || null,
		loadDate = newdata.loadDate || null,
		unloadDate = newdata.unloadDate || null,
		loadPlatformCode = newdata.loadPlatformCode || null,
		unloadPlatformCode = newdata.unloadPlatformCode || null;
    try {
       var res = mock.findShipmentStock(shipmentCode, logisticModel, transportType, transportMode, logisticProvider, 
									 driverTelf, tractorId, trailerId, numOfDrivers, trailerTemp, 
									 boatCode, boatContainer, loadDate, unloadDate, notes, loadPlatformCode, unloadPlatformCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slswarehouse/findShipmentPallet.htm', mdata.towrite('./shipmentPallet.json', function(data, newdata) {
     console.log('findShipmentPallet');
    var shipmentCode = newdata.shipmentCode || null,
    palletSSCC= newdata.palletSSCC || null,
    logisticModel = newdata.logisticModel || null,
    transportType = newdata.transportType || null,
    transportMode = newdata.transportMode || null,
    logisticProvider = newdata.logisticProvider || null,
    driverTelf = newdata.driverTelf || null,
    tractorId = newdata.tractorId || null,
    trailerId = newdata.trailerId || null,
    numOfDrivers = newdata.numOfDrivers || null,
    trailerTemp = newdata.trailerTemp || null,
    boatCode = newdata.boatCode || null,
    boatContainer = newdata.boatContainer || null,
    notes = newdata.notes || null,
    loadDate = newdata.loadDate || null,
    unloadDate = newdata.unloadDate || null,
    loadPlatformCode = newdata.loadPlatformCode || null,
    unloadPlatformCode = newdata.unloadPlatformCode || null;
    try {
      
       var res = mock.findShipmentPallet1(shipmentCode,palletSSCC, unloadPlatformCode, data);
    
     var aux = [];
       if (res.length >= 0){
      for (var i = 0; i < res.length; i++) {
        aux.push(data[res[i]]);
      }
      return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slslogistic/getSalesOrder.htm', mdata.towrite('./salesorder.json', function(data, newdata) {
    var salesCode = newdata.salesCode || null;
    try {
       var res = mock.getSalesOrder(salesCode, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slslogistic/findSalesOrder.htm', mdata.towrite('./salesAX.json', function(data, newdata) {
    var shippingDate = newdata.shippingDate || null,
		salesCode = newdata.salesCode || null,
		totalBoxes = newdata.totalBoxes || null,
		brandCode = newdata.brandCode || null,
		salesDataAreaCode = newdata.salesDataAreaCode || null,
		pallets = newdata.pallets || null,
		loadPlatform = newdata.loadPlatform || null,
		unloadPlatform = newdata.unloadPlatform || null,
		weightUnit = newdata.weightUnit || null,
		unitsNumber = newdata.unitsNumber || null,
		countryCode = newdata.countryCode || null,
		packagingCode = newdata.packagingCode || null,
		familyCode = newdata.familyCode || null;
    try {
       var res = mock.findSalesOrder(shippingDate, salesCode, totalBoxes, brandCode, salesDataAreaCode, 
									 pallets, loadPlatform, unloadPlatform, weightUnit, unitsNumber, 
									 countryCode, packagingCode, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/findCorrectiveAction.htm', mdata.towrite('./correctiveaction.json', function(data, newdata) {
    try {
       var res = mock.findCorrectiveAction(data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
}));
//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/findBrandPercentage.htm', mdata.towrite('./brandPercentage.json', function(data, newdata) {
    try {
       var res = mock.findCorrectiveAction(data);
     var aux = [];
       if (res.length >= 0){
      for (var i = 0; i < res.length; i++) {
        aux.push(data[res[i]]);
      }
      return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/saveQualityControl.htm', mdata.towrite('./correctiveaction.json', function(data, newdata) {
    try {
		var date = new Date();
		var fileName = '' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds(); 	
		filename = './qualitycontrol/qualitycontrol-' + fileName + '.json';
		
		filesystem.writeFile(filename, JSON.stringify(newdata), function(err){
			if (err){
			console.log(err);
			}
		 });
      
      return {success: true, data : { qualityControlCode:"BIEN"}};
     //return {"fwk":{},"success":false,"errors":{"result":"No se ha podido obtener el pallet 184306312580090158 para su actualizacion"}};

    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slslogistic/getPlatform.htm', mdata.towrite('./platform.json', function(data, newdata) {
    var platformCode = newdata.platformCode || null;
    try {
       var res = mock.getPlatform(platformCode, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slslogistic/findPlatform.htm', mdata.towrite('./platformsAx.json', function(data, newdata) {
    var platformCode = newdata.platformCode || null,
		platformDescription = newdata.platformDescription || null,
		areaCode = newdata.areaCode || null,
		street = newdata.street || null,
		zipCode = newdata.zipCode || null,
		city = newdata.city || null,
		countryCode = newdata.countryCode || null,
		stateCode = newdata.stateCode || null,
		countyCode = newdata.countyCode || null;
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > 5000){
        break;
      }
    }
    try {
       var res = mock.findPlatform(platformCode, platformDescription, areaCode, street, zipCode, city, 
									 countryCode, stateCode, countyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/getTemperatureIndex.htm', mdata.towrite('./temperatureindex.json', function(data, newdata) {
    var temperatureindexid = newdata.temperatureindexid || null;
    try {
       var res = mock.getTemperatureIndex(temperatureindexid, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.post('/slsproxy/slsquality/findTemperatureIndex.htm', mdata.towrite('./temperatureindex.json', function(data, newdata) {
    var familyCode = newdata.familyCode || null,
		maxOptimalValue = newdata.maxOptimalValue || null,
		minOptimalValue = newdata.minOptimalValue || null,
		maxAcceptableValue = newdata.maxAcceptableValue || null,
		minAcceptableValue = newdata.minAcceptableValue || null;
    try {
       var res = mock.findTemperatureIndex(familyCode, maxOptimalValue, minOptimalValue, maxAcceptableValue, minAcceptableValue, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsmaster/findPackaging.htm', mdata.towrite('./packaging.json', function(data, newdata) {
    var packagingCode = newdata.packagingCode || null,
		familyCode = newdata.familyCode || null;
    try {
       var res = mock.findPackaging(packagingCode, familyCode, data);
	   var aux = [];
       if (res.length >= 0){
			for (var i = 0; i < res.length; i++) {
				aux.push(data[res[i]]);
			}
			return aux;
       } else {
          return {success: false};           
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

//--------------------------------------------------------------------------------------------------------------------------
app.post('/slsproxy/slsquality/saveHighQualityPhoto1.htm', mdata.towrite('./correctiveaction.json', function(data, newdata) {
    try {
		var date = new Date();
		var fileName = '' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds(); 	
		filename = './qualitycontrol/photo-' + fileName + '.json';
		
		console.log(filename);
		
		filesystem.writeFile(filename, JSON.stringify(newdata), function(err){
			if (err){
			console.log(err);
			}
		 });

    } catch (error) {
        console.log(error);
        response.send(error);
    }
     
}));

app.listen(8080);
