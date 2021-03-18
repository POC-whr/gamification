/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools","session");
var SESSIONINFO  = $.tools.session;


function validateSku(skus) {
	//Em manutenção
}
/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function create(param) {

	try {
		
		var after  = param.afterTableName;
		var pStmt  = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];


       pStmt = param.connection.prepareStatement("insert into \"restrictionRule.restrictionRule\" (\"idRule\", \"idRestriction\") values(?,?)");
       pStmt.setString(1, result.rule[0].idRule);
       pStmt.setString(2, result.rule[0].idRestriction);

	   pStmt.executeUpdate();
	   pStmt.close();

	} catch (e) {
		console.error(e);
		throw e;
	}
}