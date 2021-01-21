"use strict";

/** 
 * Default function to process the HTTP request
 * */
function processRequest()
{
	try
	{
		//Set action according HTTP Method and valid content-Type 
		if(request.method === $.net.http.GET && whrhttp.getIsContentTypeValid()) 
		{
			/*Library import*/
			let instance = $.import("novogame.xsjs.lib", "regrasPont");
			
			/*Call and return of application logic*/
			response.status = $.net.http.OK;
			response.setBody(JSON.stringify(instance.listRegras())); 
		}
	}
	catch (e) 
	{
		response.status = $.net.http.INTERNAL_SERVER_ERROR;
		response.setBody(JSON.stringify(whrmessage.create(-1,e.message,whrmessage.messageType.ERROR)));
	}
}