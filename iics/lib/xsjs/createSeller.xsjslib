/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools", "session");
$.import("tools", "whrconn");
var SESSIONINFO = $.tools.session;
var WHRCONN=  $.tools.whrhttp;
/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function sellerCreate(param) {

	try {

		var after = param.afterTableName;
		var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "seller");
		var paramin = [];

		// pStmt = param.connection.prepareStatement("insert into \"seller.seller\" (\"sellerId\", \"nome\" ) values(?,?)");
		 $.trace.debug("Type your log comments here");
		for (var i = result.seller.length -1 ; i >= 0; i--) {
			try {
				var createSeller = {
					sellerId: result.seller[i].sellerId,
					nome: result.seller[i].nome
				};
				paramin.push(createSeller);

			} catch (e) {
				console.error(e);
				throw e;
			}
		}
		
		WHRCONN.setProcedureName("prcIcssSeller");
		var proc = WHRCONN.loadProcedure();
		proc(paramin);
		WHRCONN.commit();
		 


	} catch (e) {
		console.error(e);
		throw e;
	}
}