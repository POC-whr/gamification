this.connection = $.hdb.getConnection(
			{
				"isolationLevel": $.hdb.isolation.READ_COMMITTED
			});

this.defaultSchema = "";
this.procedureName = ""; 
this.packageName = "";
this.connection.setAutoCommit(false);

function setDefaultSchema(value){this.defaultSchema=value;}
function getDefaultSchema(){return this.defaultSchema;}
function setProcedureName(value){this.procedureName=value;}
function getProcedureName(){return this.procedureName;}
function setPackageName(value){this.packageName=value;}
function getPackageName(){return this.packageName;}


function loadProcedure()
{
	try
	{
		return this.connection.loadProcedure(this.defaultSchema, this.packageName + "::" + this.procedureName);
	}
	catch(e)
	{   
		throw new Error(e.message);
	}
}


function recordSetToJson(result)
{
	let record = [];
	for(let i=0;i<result.length;i++)
	{
		record.push(result[i]);
	}
	return {result:record};
}

function close(){this.connection.close();}
function commit(){this.connection.commit();}
function rollback(){this.connection.rollback();}
function setConnection(conn){this.connection = conn;}


