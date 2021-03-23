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

		var after = param.afterTableName;
		var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];
 
			for(var i = 0; i <= result.rule.length - 1;i++)
		{
			var rule = {
				id: null,
				idCluster: result.rule[i].idCluster,
				typeBuyer: result.rule[i].typeBuyer,
				buyerValue: result.rule[i].buyerValue,
				recurrence: result.rule[i].recurrence,
				target: result.rule[i].target,
				typeIndicated: result.rule[i].typeIndicated,
				indicatedValue: result.rule[i].indicatedValue,
				status: result.rule[i].status,
				days: result.rule[i].days
				
			};
			paramin.push(rule);
		}
		
		WHRCONN.setProcedureName("prcClusterCreateRule");
		var proc = WHRCONN.loadProcedure();
		var result = proc(paramin);
	                      
	    pStmt.execute();
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
				id: result.rule[i].idRule,
				idCluster: result.rule[i].idCluster,
				typeBuyer: result.rule[i].typeBuyer,
				buyerValue: result.rule[i].buyerValue,
				recurrence: result.rule[i].recurrence,
				target: result.rule[i].target,
				typeIndicated: result.rule[i].typeIndicated,
				indicatedValue: result.rule[i].indicatedValue,
				status: result.rule[i].status,
				days: result.rule[i].days
				
			};
			paramin.push(rule);
		}
		
		WHRCONN.setProcedureName("pruClusterRule");
		var proc = WHRCONN.loadProcedure();
		proc(paramin);
		WHRCONN.commit();
		WHRCONN.close();


	} catch (e) {
		console.error(e);
		throw e;
	}
}