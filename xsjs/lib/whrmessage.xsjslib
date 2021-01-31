/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, no-semi:0*/
/*eslint-env node, es6 */
"use strict";

/**
 * Object to create structured messages 
 * @object {object} message
 * */
var message = {
		code : "",
		description: ""
};

/**
 * Enum for errors type.
 * @enum {string} type
 */
var messageType = {
		ERROR:"ERROR",
		INFO:"INFO",
		WARNING:"WARNING"
};

/**
 * Trace the message on xsengine service
 * @see 
 * Tracing Server-Side JavaScript (HANA Reference Guide) on the website https://help.sap.com/viewer/d89d4595fae647eabc14002c0340a999/2.0.04/en-US/e00ed41fc4864b0694eaf84ceac12488.html
 * @param {code} integer
 *   Message code.
 * @param {description} string
 * 	 Description of the message
 * @param {type} messageType
 * 	 Message Type
 * 
 * @return
 * Structured messages
 * */
function create(code, description,type)
{
	message.code = code;
	message.description = description;

	try
	{
		switch(type)
		{
		case "ERROR" :
			$.trace.error("ERROR:" + JSON.stringify(message));
			break;
		case "INFO" :
			$.trace.error("INFO:" + JSON.stringify(message));
			break;
		case "WARNING" :
			$.trace.error("WARNING:" + JSON.stringify(message));
			break;
		default:
			break;
		}
		return message;
	}
	catch(e){
		$.trace.error(e.message);}
}

function getMessageToString()
{
	return JSON.stringify(message);
}
