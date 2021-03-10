"use strict";  
/**
 * HTTP Tool library has to be always imported. It's responsible to control http web requests and http web response*/
var whrhttp  = $.import("tool", "whrhttp");
var request  = whrhttp.getRequest();
var response = whrhttp.getResponse();


function processRequest(){
    try {
    	
    	$.trace.error("Start service: " + JSON.stringify(whrhttp.getJsonBody()));
    	if(request.method === $.net.http.GET && whrhttp.getIsContentTypeValid())
        {
			response.status = $.net.http.OK;
        }
		if(request.method === $.net.http.POST)
		{
			/*
			
			if(whrhttp.getJsonBody()!=="")
			{	
				
			    let statusOrder  = $.import(SERVICE_PATH,"packageStatus");
				statusOrder.create(whrhttp.getJsonBody());
				
			}
			else
			{  
			   throw new Error(ERROR_BODY + whrmessage.getMessageToString() + " | " + whrhttp.getBodyAsString());
			}*/
		}		
		
		
    } catch (e) 
    {  
        throw e;
    }
}
processRequest();