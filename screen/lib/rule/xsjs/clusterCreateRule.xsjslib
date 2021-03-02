/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools","session");
$.import("tools","audit");
$.import("tools","conn");

var SESSIONINFO  = $.tools.session;
var AUDIT        = $.tools.audit;
var CONN         = $.tools.conn;
var PROCESS_PATH = "WHR.BUS.d2c.ecommerce.instance";
var PROCEDURE_PATH = PROCESS_PATH + ".data.procedure";

function validateSku(skus) {
	//Em manutenção
}



var instanceObject = function(param)
{
	return {
		
		idCluster		: param.idCluster,
		typeBuyer		: param.typeBuyer,
		buyerValue 	    : param.buyerValue,
		recurrence		: param.recurrence,
		target          : param.target,
		typeIndicated   : param.typeIndicated,
		indicatedValue  : param.indicatedValue,
		days            : param.days,
		status          : param.status
   
	};
};
/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function createByProcedure(conn, paramin)
{
	conn.setProcedureName("prcinstance");
	var proc = conn.loadProcedure();
	var result = proc(paramin);
	return result.instanceId;
}
function ruleCreate(param) {

	try {
		
		var after  = param.afterTableName;
		var pStmt  = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];
		var instanceId = null;
		
		for(var i = 0; i <= result.rule.length - 1;i++)
			{
				paramin.push(AUDIT.getAuditToCreate(result.rule[i],instanceObject(result.rule[i])));
			}
			
			
			
		instanceId = createByProcedure(CONN, paramin);	
		pStmt = param.connection.prepareStatement('update "' + after + '" set \"id\" = ' + "\'" + instanceId + "\'");
		pStmt.executeUpdate();
		pStmt.close();
	    		
			CONN.commit();
			CONN.close();

	} catch (e) {
		console.error(e);
		throw e;
	}
}