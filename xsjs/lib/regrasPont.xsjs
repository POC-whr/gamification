"use strict";
const TOOLS_PATH = "novogame.xsjs.lib.tools"; 
const PROCESS_PATH = "novogame.xsjs"; //???????????????? verificar viabilidade de manter essa estrutura
	


	let whrconn  = $.import(TOOLS_PATH, "whrconn");

/*Function responsible to retrieve results using HTTP GET*/
	function listRegras()
	{
		try
		{
			whrconn.setPackageName(PROCEDURE_PATH);
			whrconn.setProcedureName("prqcontroleseller");
			var proc = whrconn.loadProcedure();
			var result = proc();
			return whrconn.recordSetToJson(result.rsControleSeller);
		}
		catch(e)
		{
			whrconn.close();
			throw new Error(e.message);
		}
	}