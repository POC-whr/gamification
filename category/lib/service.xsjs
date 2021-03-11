"use strict";
/**
 * HTTP Tool library has to be always imported. It's responsible to control http web requests and http web response*/

$.import("tools", "session");
$.import("tools", "whrhttp");
$.import("tools", "whrmessage");
$.import("xsjs","category");
var category = $.import("xsjs","category");
var whrhttp = $.tools.whrhttp;
var whrmessage = $.tools.whrmessage;
var request = whrhttp.getRequest();
var response = whrhttp.getResponse();


function processRequest() {
	try {

		if (request.method === $.net.http.GET && whrhttp.getIsContentTypeValid()) {
			response.status = $.net.http.OK;
		}
		if (request.method === $.net.http.POST) 
		{   
		
		    category.create( whrhttp.getJsonBody());

		}

	} catch (e) {
		response.status = $.net.http.INTERNAL_SERVER_ERROR;
        response.setBody(JSON.stringify(whrmessage.create(-1,e.message,whrmessage.messageType.ERROR)));
	}
}
processRequest();