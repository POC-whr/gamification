/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools","session");
var SESSIONINFO  = $.tools.session;

/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function sellerCreate(param) {

	try {
		
		var after  = param.afterTableName;
		var pStmt  = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "seller");
		var paramin = [];


       pStmt = param.connection.prepareStatement("insert into \"seller.seller\" (\"sellerId\", \"nome\" ) values(?,?)");
       pStmt.setString(1, result.seller[0].sellerId);
       pStmt.setString(2, result.seller[0].nome);
	 
	   pStmt.executeUpdate();
	   pStmt.close();

	} catch (e) {
		console.error(e);
		throw e;
	}
}