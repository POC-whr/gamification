/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools", "session","audit","conn");
var SESSIONINFO  = $.tools.session;
var AUDIT        = $.tools.audit;
var CONN         = $.tools.conn;

function validateSku(skus) {
	//Em manutenção
}



	var instanceObject = function(param)
	{
		return {
			
			idRule          : param.idRule,
			idCluster		: param.idCluster,
			typeBuyer		: param.typeBuyer,
			buyerValue 	    : param.buyerValue,
			recurrence		: param.recurrence,
			target          : param.target,
			typeIndicated   : param.typeIndicated,
			indicatedValue  : param.indicatedValue,
			creationDate    : param.creationDate,
			creationUser    : param.creationUser,
			days            : param.days,
			name            : param.name,
			status          : param.status
			
		};
	};
/**
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
		var instanceId = null;
		
		
		for(var i = 0; i <= result.rule.length - 1;i++)
			{
				paramin.push(AUDIT.getAuditToCreate(result.rule[i],instanceObject(result.rule[i])));
			}
		instanceId = instanceId = createByProcedure(CONN, paramin);	
			
		pStmt.close();
		
		
		console.log(JSON.stringify(User));
		console.log(User.Details[0].FirstName);
	
		pStmt = param.connection.prepareStatement("insert into \"UserData.User\" (\"FirstName\", \"LastName\", \"Email\") values(?,?,?)");

		pStmt.setString(1, User.Details[0].FirstName.toString());
		pStmt.setString(2, User.Details[0].LastName.toString());
		pStmt.setString(3, User.Details[0].Email.toString());

		pStmt.executeUpdate();
		pStmt.close();
		//		}
	} catch (e) {
		console.error(e);
		throw e;
	}
}