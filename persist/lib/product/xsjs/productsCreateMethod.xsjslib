/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("tools","session");
$.import("tools","conn");
var SESSIONINFO = $.xsjs.session;


/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/
function productsCreate(param) {

	try {
		var after = param.afterTableName;

		//Get Input New Record Values
		var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
		var rs = null;
		var Product = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "Details");
		pStmt.close();
		console.log(JSON.stringify(Product));
		console.log(Product.Details[0].id);
		
		var sql = '';
		sql += "insert into \"vtex.product\" (\"id\", \"name\", \"departmentId\", \"categoryId\", \"brandId\", \"linkId\", \"refId\", \"isVisible\", \"description\","; 
		sql += "\"descriptionShort\", \"releaseDate\", \"keyWords\", \"title\", \"isActive\", \"taxCode\", \"metaTagDescription\", \"supplierId\", \"showWithoutStock\", \"adWordsRemarketingCode\", \"lomadeeCampaignCode\", \"score\" )"; 
		sql += "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		
		pStmt = param.connection.prepareStatement(sql);

		pStmt.setString(1, Product.Details[0].id.toString());
		pStmt.setString(2, Product.Details[0].name.toString());
		pStmt.setString(3, Product.Details[0].departmentId.toString());
		pStmt.setString(4, Product.Details[0].categoryId.toString());		
		pStmt.setString(5, Product.Details[0].brandId.toString());
		pStmt.setString(6, Product.Details[0].linkId.toString());
		pStmt.setString(7, Product.Details[0].refId.toString());		
		pStmt.setString(8, Product.Details[0].isVisible.toString());
		pStmt.setString(9, Product.Details[0].description.toString());
		pStmt.setString(10, Product.Details[0].descriptionShort.toString());
		pStmt.setString(11, Product.Details[0].releaseDate.toString());
		pStmt.setString(12, Product.Details[0].keyWords.toString());
		pStmt.setString(13, Product.Details[0].title.toString());
		pStmt.setString(14, Product.Details[0].isActive.toString());		
		pStmt.setString(15, Product.Details[0].taxCode.toString());		
		pStmt.setString(16, Product.Details[0].metaTagDescription.toString());		
		pStmt.setString(17, Product.Details[0].supplierId.toString());		
		pStmt.setString(18, Product.Details[0].showWithoutStock.toString());		
		pStmt.setString(19, Product.Details[0].adWordsRemarketingCode.toString());										
		pStmt.setString(20, Product.Details[0].lomadeeCampaignCode.toString());
		pStmt.setString(21, Product.Details[0].score.toString());
		
		pStmt.executeUpdate();
		pStmt.close();
		//		}
	} catch (e) {
		console.error(e);
		throw e;
	}
}