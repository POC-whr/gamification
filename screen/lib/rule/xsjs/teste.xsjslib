/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools", "session");
var SESSIONINFO = $.tools.session;

function validateSku(skus) {
	//Em manutenção
}
/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function header_create_before_exit(param) {

	try {

		var princ = param.principalTableName;
		var pStmt = param.connection.prepareStatement("select * from \"" + princ + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];

		/*id			: String(32);
			apiId		: Integer;
			name		: String(40);
			value		: String(50);
			APIS		: association [0..*] to apis on APIS.id = apiId;*/

		/*			id 			: Integer;
					typeId		: Integer;
					maxRecord	: Integer;
					endpoint	: String(300);
					clientId	: String(15);*/

		pStmt = param.connection.prepareStatement("insert into \"apis.headers\" (\"id\", \"apiId\", \"name\", \"value\") values(?,?,?,?)");

		pStmt.setString(1, result.rule[0].id);
		pStmt.setInteger(2, result.rule[0].apiId);
		pStmt.setString(3, result.rule[0].name);
		pStmt.setString(4, result.rule[0].value);
		//      pStmt.setString(5, result.rule[0].APIS);

		pStmt.executeUpdate();
		//		}
		pStmt.close();
		
		//apis_create_before_exit(param);

		/*	   //****INSERT RESTRICTIONS****
				try {
				pStmt = param.connection.prepareStatement("insert into \"restrictionRule.restrictionRule\" (\"idRule\",\"idRestriction\") values(?,?)");

					var after = param.afterTableName;
					var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
					var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "restriction");
					var paramin = [];

					for (var i = result.idRestriction.length - 1; i >= 0; i--) {
						try {
							var createRestriction = {
								idRule: result.idRestriction[i],
								idRestriction: result.idRestriction[i]
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
				}*/

	} catch (e) {
		console.error(e);
		throw e;
	}
}

function apis_create_before_exit(param) {

	try {

		var dep = param.dependentTableName;
		var pStmt = param.connection.prepareStatement("select * from \"" + dep + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "rule");
		var paramin = [];

		pStmt = param.connection.prepareStatement(
			"insert into \"apis.apis\" (\"id\", \"typeId\", \"maxRecord\", \"endpoint\",\"clientId\") values(?,?,?,?,?)");

		pStmt.setInteger(1, result.rule[0].id);
		pStmt.setInteger(2, result.rule[0].typeId);
		pStmt.setInteger(3, result.rule[0].maxRecord);
		pStmt.setString(4, result.rule[0].endpoint);
		pStmt.setString(5, result.rule[0].clientId);

		pStmt.executeUpdate();

		pStmt.close();
	} catch (e) {
		console.error(e);
		throw e;
	}
}