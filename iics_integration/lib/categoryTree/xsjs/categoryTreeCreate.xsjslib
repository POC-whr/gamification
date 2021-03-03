/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools","session");
var SESSIONINFO  = $.tools.session;


function validatecategoryTree(param) {
	//Em manutenção
}
/*
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

function categoryTreeCreate(param) {

	try {
		
		var after  = param.afterTableName;
		var pStmt  = param.connection.prepareStatement("select * from \"" + after + "\"");
		var result = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "categoryTree");
		var paramin = [];

		pStmt = param.connection.prepareStatement("insert into \"categoryTree.categoryTree\" (\"id\", \"name\") values(?,?)");
        console.log(result.rule[0].id);

		pStmt.setString(1, result.rule[0].id);
		pStmt.setString(2, result.rule[0].name);

		pStmt.executeUpdate();
		pStmt.close();

	} catch (e) {
		console.error(e);
		throw e;
	}
}