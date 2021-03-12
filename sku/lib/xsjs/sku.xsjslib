/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools", "session");
$.import("tools", "whrconn");
var SESSIONINFO = $.tools.session;
var WHRCONN = $.tools.whrconn;
var ERROR_LISTSTATUS_NOT_FOUND = "JSon root (Array Root) object not found.";
/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function skuCreate(jsonObject) {

	try {

		if (jsonObject.root === undefined) {

			throw new Error(ERROR_LISTSTATUS_NOT_FOUND);
		} else {
			var paramin = [];
			for (var i = jsonObject.root.length - 1; i >= 0; i--) {
				try {
					var createSku = {
						id: jsonObject.root[i].Id,
						productId: jsonObject.root[i].ProductId,
						isActive: jsonObject.root[i].IsActive
						
					};
					paramin.push(createSku);

				} catch (e) {
					console.error(e);
					throw e;
				}
			}

			WHRCONN.setProcedureName("prcSku");
			var proc = WHRCONN.loadProcedure();
			proc(paramin);
			WHRCONN.commit();

		}

	} catch (e) {
		console.error(e);
		throw e;
	}
}