/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, no-semi:0*/
/*eslint-env node, es6 */
"use strict";

//Constant paths used to import libraries  
const TOOLS_PATH = "gamification.xsjs.tools";
const PROCESS_PATH = "gamification.xsjs";
const SERVICE_PATH = PROCESS_PATH + ".lib";  
var ERROR_BODY = "Request body is empty or invalid.";

// Message Tool Library, implement and customize friendly or stack messages to information or runtime error   novogame.gamedb.tables::basicRules.basicRules
var whrmessage  = $.import(SERVICE_PATH, "whrmessage");

//HTTP Tool library has to always be imported. It's responsible to control http web requests and http web response*/
var whrhttp  = $.import("gamification.xsjs.lib", "whrhttp");
let request  = whrhttp.getRequest();
let response = whrhttp.getResponse(); 

// Default function to process the HTTP request
function processRequest()
{
	//Set action according HTTP Method and valid content-Type 
	try
	{
		/***HTTP GET***/
		if(request.method === $.net.http.GET && whrhttp.getIsContentTypeValid()) 
		{
			/*Library import*/
			let instance = $.import(SERVICE_PATH, "bonusRules");
			
			/*Call and return of application logic*/
			response.status = $.net.http.OK;
			response.setBody(JSON.stringify(instance.listRules())); 
		}
	}
	catch (e) 
	{
		response.status = $.net.http.INTERNAL_SERVER_ERROR;
		response.setBody(JSON.stringify(whrmessage.create(-1,e.message,whrmessage.messageType.ERROR)));
	}
}