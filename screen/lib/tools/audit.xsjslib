/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

/**  
@function Outputs the Session user and Language as JSON in the Response body
*/
$.import("tools", "session");
var SESSIONINFO = $.tools.session;
var ERROR_CREATE_USER_NOTFOUND = "createdBy column not found or is null";
function getAuditToCreate(jsonObject, createObject)
{
	try {

		if(SESSIONINFO.getIsEmpty(jsonObject.createdBy)===true)
		{
			throw Error(ERROR_CREATE_USER_NOTFOUND);
		}
		createObject["audit.createdOn"]	= SESSIONINFO.getIsUndefined(jsonObject.createdOn);
		createObject["audit.updatedOn"]	= SESSIONINFO.getIsUndefined(jsonObject.updatedOn);
		createObject["audit.createdBy"]	= jsonObject.createdBy;
		createObject["audit.updatedBy"]	= SESSIONINFO.getIsUndefined(jsonObject.updatedBy);
		return createObject;
	}
	catch (e) {
		throw new Error(e.message); 
	}
}
