this.connection = $.hdb.getConnection(
			{
				"isolationLevel": $.hdb.isolation.READ_COMMITTED
			});

this.procedureName = "";
this.connection.setAutoCommit(false);

function setProcedureName(value){this.procedureName=value;}
function getProcedureName(){return this.procedureName;}

function loadProcedure()
{
	try
	{
		
		return this.connection.loadProcedure(this.procedureName);
	}
	catch(e)
	{   
		
		throw new Error(e.message);
	}
}


function recordSetToJson(result)
{
	var record = [];
	for(var i=0;i<result.length;i++)
	{
		record.push(result[i]);
	}
	return {result:record};
}


function close(){this.connection.close();}
function commit(){this.connection.commit();}
function rollback(){this.connection.rollback();}
function setConnection(conn){this.connection = conn;}
function executeQuery(sqlStatement){return this.connection.executeQuery(sqlStatement);}


