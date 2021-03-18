/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools", "session");
$.import("tools", "whrconn");
var SESSIONINFO = $.tools.session;
var WHRCONN = $.tools.whrconn;
var ERROR_LISTSTATUS_NOT_FOUND = "JSon root (Array Order) object not found.";

/**
@function Puts a JSON object into the Response Object
@param {object} jsonOut - JSON Object
*/
function outputJSON(jsonOut){
	var out = [];
	for(var i=0; i<jsonOut.length;i++){
		out.push(jsonOut[i]);
	}
	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(out));
}

/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function skuValidate(jsonObject) {

	try {

		if (jsonObject.root === undefined) {

			throw new Error(ERROR_LISTSTATUS_NOT_FOUND);
		} else {
			var paramin = [];
			for (var i = jsonObject.root.length - 1; i >= 0; i--) {
				try {
					var createSku = {
						id: jsonObject.root[i].id,
						productId: jsonObject.root[i].productId,
						isActive: jsonObject.root[i].isActive
					};
					paramin.push(createSku);

				} catch (e) {
					console.error(e);
					throw e;
				}
			}
			
			var saleType = 'Linha Branca';
			
			WHRCONN.setProcedureName("prcSkuValidate");
			var proc = WHRCONN.loadProcedure();
			var results = proc(saleType, paramin);
			//WHRCONN.commit();
			WHRCONN.close();
			return outputJSON(results.PARAMOUT);

		}

	} catch (e) {
		console.error(e);
		throw e;
	}
}