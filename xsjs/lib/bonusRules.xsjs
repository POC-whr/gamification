/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, no-semi:0*/
/*eslint-env node, es6 */
"use strict";

//Constant paths used to import libraries  
const TOOLS_PATH = "novogame.gamification.tools.lib";
const PROCESS_PATH = "novogame.gamification.xsjs";
const PROCEDURE_PATH = "novogame.gamedb.procedures"; 
const whrconn  = $.import(TOOLS_PATH, "whrconn");

/*Function responsible to retrieve results using HTTP GET*/
	function listRules()
	{
		try
		{
			whrconn.setPackageName(PROCEDURE_PATH);
			whrconn.setProcedureName("prqBasicRules");
			var proc = whrconn.loadProcedure();
			var result = proc();
			return whrconn.recordSetToJson(result.rsBasicRules);
		}
		catch(e)
		{
			whrconn.close();
			throw new Error(e.message);
		}
	}