/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("rule.tools", "session");
$.import("rule.tools", "whrconn");
var SESSIONINFO = $.rule.tools.session;
var WHRCONN = $.rule.tools.whrconn;


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


       pStmt = param.connection.prepareStatement("insert into \"productRule.productRule\" (\"id\", \"idSaleType\", \"name\", \"version\",\"validityIni\",\"validityEnd\",\"validtyDays\",\"status\") values(?,?,?,?,?,?,?,?)");
    
       pStmt.setString(1, result.rule[0].id);
       pStmt.setString(2, result.rule[0].idSaleType);
       pStmt.setString(3, result.rule[0].name);
       pStmt.setDecimal(4, result.rule[0].version);
       pStmt.setString(5, result.rule[0].validityIni);
       pStmt.setString(6, result.rule[0].validityEnd);
       pStmt.setInteger(7, result.rule[0].validtyDays);
       pStmt.setString(8, result.rule[0].status);


	   pStmt.executeUpdate();
	   pStmt.close();

	} catch (e) {
		console.error(e);
		throw e;
	}
}
function update(param) {

	try {

		var after = param.afterTableName;
		var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];
	
		for(var i = 0; i <= result.rule.length - 1;i++)
		{
			var rule = {
				id: result.rule[i].id,
				idSaleType: result.rule[i].idSaleType,
				name: result.rule[i].name,
				version: result.rule[i].version,
				validityIni: result.rule[i].validityIni,
				validityEnd: result.rule[i].validityEnd,
				status: result.rule[i].status
			};
			paramin.push(rule);
		}
		
		WHRCONN.setProcedureName("pruProductRule");
		var proc = WHRCONN.loadProcedure();
		proc(paramin);
		WHRCONN.commit();
		WHRCONN.close();


	} catch (e) {
		console.error(e);
		throw e;
	}
}