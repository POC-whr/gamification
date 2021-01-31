/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, no-semi:0*/
/*eslint-env node, es6 */
"use strict";

var whrmessage = $.import("novogame.gaamification.tools.lib", "whrmessage");

this.httpRequest = $.request;
this.httpResponse = $.response;
this.jsonBody = "";
this.contentValid = true;
this.parameters = [];
var bodyString = "";

const REQUEST_TYPE_WRONG = "Content type invalid or not found, use application/json";
const REQUEST_BODY_EMPTY = "Request body is empty.";
const REQUEST_CONTENT_TYPE = "application/json";
const RESPONSE_CONTENT_TYPE = "application/json";
const TYPE_MSG_ERROR = whrmessage.messageType.ERROR;//"ERROR";

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
	var	body = this.httpRequest.body;
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
	let isJson = false;
	try
	{
		//var	bodyString = this.httpRequest.body.asString();
		bodyString = this.httpRequest.body.asString();
		try
		{
			this.jsonBody = JSON.parse(bodyString);
			this.isJson = true;
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
	 switch ( this.httpRequest.method ) {
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
	this.parameters = httpRequest.parameters;
};

var getValueParemeterByName = function (name) {
    for (var i = 0; i < parameters.length; i += 1) {
        if (parameters[i].name === name) {
            return parameters[i].value;
        }
    }
};

function getJsonBody(){return this.jsonBody;}
function getRequest(){return this.httpRequest;}
function getResponse(){return this.httpResponse;}
function getAllParameters(){return this.parameters;}
function getIsContentTypeValid(){return this.contentValid;}
function getBodyAsString(){return bodyString;}

this.contentValid = isValidContenType();
isValidMethod();
getParameters();
