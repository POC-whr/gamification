"use strict";
/**
 * HTTP Tool library has to be always imported. It's responsible to control http web requests and http web response*/

$.import("tools", "session");
$.import("tools", "whrhttp");
$.import("tools", "whrmessage");
$.import("xsjs","seller");
var seller = $.import("xsjs","seller");
var whrhttp = $.tools.whrhttp;
var whrmessage = $.tools.whrmessage;
var request = whrhttp.getRequest();
var response = whrhttp.getResponse();
var ERROR_BODY = "Error";

function processRequest() {
	try {

		if (request.method === $.net.http.GET && whrhttp.getIsContentTypeValid()) {
			response.status = $.net.http.OK;
		}
		if (request.method === $.net.http.POST) 
		{   
			request.jsonBody = JSON.parse(bodyString);
		    seller.sellerCreate( whrhttp.getJsonBody());

		}

	} catch (e) {
		response.status = $.net.http.INTERNAL_SERVER_ERROR;
        response.setBody(JSON.stringify(whrmessage.create(-1,e.message,whrmessage.messageType.ERROR)));
	}
}
processRequest();