/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools", "session");
var SESSIONINFO = $.tools.session;

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
		for (var i = result.seller.length - 1; i >= 0; i--) {
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

		pStmt = param.connection.prepareStatement("{ call \"prcIcssSeller\" }");
		pStmt.setString(1, paramin);
		pStmt.executeUpdate();
		pStmt.close();

	} catch (e) {
		console.error(e);
		throw e;
	}
}