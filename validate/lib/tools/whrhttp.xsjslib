
"use strict";

var whrmessage = $.import("tools", "whrmessage");

var httpRequest = $.request;
var httpResponse = $.response;
var jsonBody = "";
var contentValid = true;
var parameters = [];
var bodyString = "";

var REQUEST_TYPE_WRONG = "Content type invalid or not found, use application/json";
var  REQUEST_BODY_EMPTY = "Request body is empty.";
var  REQUEST_CONTENT_TYPE = "application/json";
var  RESPONSE_CONTENT_TYPE = "application/json";
var  TYPE_MSG_ERROR = whrmessage.messageType.ERROR;//"ERROR";

this.httpResponse.contentType = RESPONSE_CONTENT_TYPE;

this.isValidContenType = function ()
{	
	if ( httpRequest.contentType !== REQUEST_CONTENT_TYPE){
		//this.contentValid = false;
		//$.trace.error(httpRequest.contentType + " | " + REQUEST_CONTENT_TYPE);
		whrmessage.create(1,REQUEST_TYPE_WRONG,TYPE_MSG_ERROR);
		this.httpResponse.status = $.net.http.BAD_REQUEST;
		this.httpResponse.setBody(JSON.stringify(whrmessage.message));
		return false;
	}
	else
		{
		return true;
		}
};


this.isEmptyBody = function ()
{
	var	body = httpRequest.body;
	var isEmpty = false;

	if(body === undefined)
		{
			whrmessage.create(2,REQUEST_BODY_EMPTY,TYPE_MSG_ERROR);
			this.httpResponse.status = $.net.http.INTERNAL_SERVER_ERROR;
			this.httpResponse.setBody(JSON.stringify(whrmessage.message));
			isEmpty = true;
		}
	return isEmpty;
};

this.isBodyJson = function ()
{
	var isJson = false;
	try
	{
		//var	bodyString = this.httpRequest.body.asString();
		bodyString = httpRequest.body.asString();
		try
		{
			jsonBody = JSON.parse(bodyString);
			isJson = true;
			
		}
		catch(ej)
		{
			$.trace.error("http request bodyString: " + bodyString);
			whrmessage.create(3,ej.message,TYPE_MSG_ERROR);
			throw new Error(e.message);
		}
		finally{return this.isJson;}
	}
	catch(e)
	{
		this.httpResponse.status = $.net.http.INTERNAL_SERVER_ERROR;
		whrmessage.create(4,e.message,TYPE_MSG_ERROR);
		throw new Error(e.message);
	}
	finally{return isJson;}
};

this.isValidMethod = function ()
{
	 switch ( httpRequest.method ) {
	     case $.net.http.GET:
	         break;
	     default:
	         if(contentValid === true){
	        	 if(!isEmptyBody()){
	        		 isBodyJson();
	        		 }
	        	 }
	         break;
	 }  
};

this.getParameters = function()
{
	parameters = httpRequest.parameters;
};

var getValueParemeterByName = function (name) {
    for (var i = 0; i < parameters.length; i += 1) {
        if (parameters[i].name === name) {
            return parameters[i].value;
        }
    }
};

function getJsonBody(){return jsonBody;}
function getRequest(){return httpRequest;}
function getResponse(){return httpResponse;}
function getAllParameters(){return parameters;}
function getIsContentTypeValid(){return this.contentValid;}
function getBodyAsString(){return bodyString;}

contentValid = isValidContenType();
isValidMethod();
getParameters();
