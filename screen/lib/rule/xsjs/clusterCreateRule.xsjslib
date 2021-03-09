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

function ruleCreate(param) {

	try {
		
		var after  = param.afterTableName;
		var pStmt  = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];
		pStmt = param.connection.prepareStatement("insert into \"clusterRule.clusterRule\" (\"id\", \"idCluster\", \"typeBuyer\", \"buyerValue\",\"recurrence\",\"target\",\"typeIndicated\",\"indicatedValue\",\"status\",\"days\" ) values(?,?,?,?,?,?,?,?,?,?)");

	   pStmt.setString(1, result.rule[0].id);
       pStmt.setString(2, result.rule[0].idCluster);
       pStmt.setString(3, result.rule[0].typeBuyer);
       pStmt.setString(4, result.rule[0].buyerValue);
       pStmt.setString(5, result.rule[0].recurrence);
       pStmt.setString(6, result.rule[0].target);
       pStmt.setString(7, result.rule[0].typeIndicated);
       pStmt.setString(8, result.rule[0].indicatedValue);
       pStmt.setString(9, result.rule[0].status); 
	   pStmt.setString(10,result.rule[0].days);
	
	//****INSERT RESTRICTIONS****
		
		try {
	
			var after = param.afterTableName;
			var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
			var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "restriction");
			var paramin = [];
	
			for (var i = result.restriction.length - 1; i >= 0; i--) {
				try {
					var createRestriction = {
						idRule: result.restriction[i].idRule,
						idRestriction: result.restriction[i].idRestriction
					};
					paramin.push(createRestriction);
	
				} catch (e) {
					console.error(e);
					throw e;
				}
			}
	
			pStmt = param.connection.prepareStatement("{ call \"prcRestrictionRules\" }");
			pStmt.setString(1, paramin);
			pStmt.executeUpdate();
			pStmt.close();
	
		} catch (e) {
			console.error(e);
			throw e;
		}

	} catch (e) {
		console.error(e);
		throw e;
	}
}