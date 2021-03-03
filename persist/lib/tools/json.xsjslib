(function(exports){

	/**
	 *  Verify all properties/attributes and values of object JSon structure
	 * @param {jsonOrigin} JSONObject
	 * @return JSONObject
	 * Returns JSONObject only where found a type object on jsonOrigin parameter input 
	 * */
	function getPropertiesAndValues(jsonOrigin)
	{

		let property = "";
		if(jsonOrigin!==null){
			for(let prop in jsonOrigin) {
				if(jsonOrigin.hasOwnProperty(prop)){
					let newObj = {};
					if(!(typeof (jsonOrigin[prop]) === 'object')) {
						property += '"' + prop + '"' + ":" +  '"' + jsonOrigin[prop].toString() + '"' + ",";
					}
				}
			}
			property = "{" + property.substring(0,property.length-1) + "}";
		}
		return JSON.parse(property);
	}

	/**
	 *  Verify if JSon Attribute is undefined
	 * @param {attribute} JSONAttribute
	 * @return Boolean
	 * Returns value of attribute or null
	 * */
	function getIsUndefined(attribute)
	{
		let nullValue = null;
		return (attribute===undefined ? nullValue : attribute);
	}

	/**
	 * Verify if JSon Attribute is empty
	 * @param {attribute} JSONAttribute
	 * @return Boolean
	 * Returns true/false 
	 * */
	function getIsEmpty(attribute)
	{
		return (getIsUndefined(attribute) === null ? true : attribute==="" ? true : false);
	}

	/**
	 * Verify if JSon Attribute is any value boolean
	 * @param {attribute} JSONAttribute
	 * @return Boolean
	 * Returns true/false 
	 * */
	function getIsTrueValue(attribute)
	{
		let trueValue = false;
		if (!getIsEmpty(attribute))
		{
			trueValue	 = 	attribute === "true"	||
							attribute === "True"	||
							attribute === "1"		||
							attribute === true		||
							attribute ===  1
		}

		return trueValue;
	}

	function getIsEmptyStatus(attribute)
	{
		
				
		
		for(let i=0;i<attribute.length;i++)
		{
			
			return (getIsUndefined(attribute[i].VKBUR)===null ? true : attribute[i].VKBUR==="" ? true : false);
		}
		
	}
	function getIsEmptygiftCard(attribute)
	{
		
				
		
		for(let i=0;i<attribute.length;i++)
		{
			
			return (getIsUndefined(attribute[i].NUMPED)===null ? true : attribute[i].NUMPED==="" ? true : false);
		}
		
	}
	
	function getIsEmptySetStatus(attribute)
	{
		for(let i=0;i<attribute.length;i++)
		{
			return (getIsUndefined(attribute[i].flowId)===null ? true : attribute[i].flowId==="" ? true : false);
		}
	}

	/**
	 * Verify if JSon Attribute is an array
	 * @param {attribute} JSONAttribute
	 * @return Boolean
	 * Returns true/false 
	 * */
	function getIsArray(attribute) {
		return getIsUndefined(attribute) === null ? false : Object.prototype.toString.call(attribute) === '[object Array]';
	}


	/**
	 * Verify if JSon Attribute is customized field boolean
	 * @param {attribute} JSONAttribute
	 * @return attribute
	 * Returns attribute
	 * */
	function getBooleanCustom(attribute)
	{
		const INVALID_BOOELAN = "The value [" + attribute + "] doesn't valid, was expected 'Y' or 'N'.";
		const EMPTY_BOOELAN = "Customized field of type boolean is empty, was expected 'Y' or 'N'.";
		if(getIsEmpty(attribute))
		{
			throw Error(EMPTY_BOOELAN);
		}
		else
		{
			if(!(attribute.toString().contains('Y') ||
					attribute.toString().contains('N')))
			{
				throw Error(INVALID_BOOELAN);
			}
		}
		return attribute;
	}

	/**
 Converts any XSJS RecordSet object to a JSON Object
@param {object} rs - XSJS Record Set object
@param {optional String} rsName - name of the record set object in the JSON
@return {object} JSON representation of the record set data
	 */
	function recordSetToJSON(rs, rsName) {
		rsName = typeof rsName !== "undefined" ? rsName : "entries";

		var meta = rs.getMetaData();
		var colCount = meta.getColumnCount();
		var values = [];
		var table = [];
		var value = "";
		while (rs.next()) {
			for (var i = 1; i <= colCount; i++) {
				value = "\"" + meta.getColumnLabel(i) + "\" : ";
				switch (meta.getColumnType(i)) {
				case $.hdb.types.VARCHAR:
				case $.hdb.types.CHAR:
					value += "\"" + escapeSpecialChars(rs.getString(i)) + "\"";
					break;
				case $.hdb.types.NVARCHAR:
				case $.hdb.types.NCHAR:
				case $.hdb.types.SHORTTEXT:
					value += "\"" + escapeSpecialChars(rs.getNString(i)) + "\"";
					break;
				case $.hdb.types.TINYINT:
				case $.hdb.types.SMALLINT:
				case $.hdb.types.INT:
				case $.hdb.types.BIGINT:
					value += rs.getInteger(i);
					break;
				case $.hdb.types.DOUBLE:
					value += rs.getDouble(i);
					break;
				case $.hdb.types.DECIMAL:
					value += rs.getDecimal(i);
					break;
				case $.hdb.types.REAL:
					value += rs.getReal(i);
					break;
				case $.hdb.types.NCLOB:
				case $.hdb.types.TEXT:
					value += "\"" + escapeSpecialChars(rs.getNClob(i)) + "\"";
					break;
				case $.hdb.types.CLOB:
					value += "\"" + escapeSpecialChars(rs.getClob(i)) + "\"";
					break;
				case $.hdb.types.BLOB:
					value += "\"" + $.util.convert.encodeBase64(rs.getBlob(i)) + "\"";
					break;
				case $.hdb.types.DATE:
					//	var dateTemp = new Date();
					//	dateTemp.setDate(rs.getDate(i));
					var dateString = rs.getDate(i).toJSON();
					value += "\"" + dateString + "\"";
					break;
				case $.hdb.types.TIME:
					//	var dateTemp = new Date();
					//	dateTemp.setDate(rs.getTime(i));
					//var dateString = rs.getTime(i).toJSON();
					//value += "\"" + dateString + "\"";
					
					var dateString = null;
					if(rs.getTime(i) === null)
					{	
						value += null;
					}
					else{
						dateString = rs.getTime(i).toJSON();
						value += "\"" + dateString + "\"";
					}
					break;
				case $.hdb.types.TIMESTAMP:
					//	var dateTemp = new Date();
					//	dateTemp.setDate(rs.getTimestamp(i));
					var dateString = null;
					if(rs.getTimestamp(i)===null)
					{	
						value += null;
					}
					else{
						dateString = rs.getTimestamp(i).toJSON();
						value += "\"" + dateString + "\"";
					}
					break;
				case $.hdb.types.SECONDDATE:
					//	var dateTemp = new Date();
					//	dateTemp.setDate(rs.getSeconddate(i));
					var dateString = rs.getSeconddate(i).toJSON();
					value += "\"" + dateString + "\"";
					break;
				default:
					value += "\"" + escapeSpecialChars(rs.getString(i)) + "\"";
				}
				values.push(value);
			}
			table.push("{" + values + "}");
		}
		return JSON.parse("{\"" + rsName + "\" : [" + table + "]}");
	}

	/**
 Escape Special Characters in JSON strings
@param {string} input - Input String
@return {string} the same string as the input but now escaped
	 */
	function escapeSpecialChars(input) {
		if (typeof (input) !== "undefined" && input !== null) {
			return input
			.replace(/[\\]/g, "\\\\")
			.replace(/[\"]/g, "\\\"")
			.replace(/[\/]/g, "\\/")
			.replace(/[\b]/g, "\\b")
			.replace(/[\f]/g, "\\f")
			.replace(/[\n]/g, "\\n")
			.replace(/[\r]/g, "\\r")
			.replace(/[\t]/g, "\\t")
			//.replace(/[!@#$%š&*()=§ªº{}"''<>;.,¨¢£¢¬]/g,'')

		} else {

			return "";
		}
	}

	/**
 Escape Special Characters in Text strings (CSV and Tab Delimited)
@param {string} input - Input String
@return {string} the same string as the input but now escaped
	 */
	function escapeSpecialCharsText(input) {
		if (typeof (input) !== "undefined" && input !== null) {
			input.replace(/[\"]/g, "\"\"");
			if (input.indexOf(",") >= 0 ||
					input.indexOf("\t") >= 0 ||
					input.indexOf(";") >= 0 ||
					input.indexOf("\n") >= 0 ||
					input.indexOf("\"") >= 0) {
				input = "\"" + input + "\"";
			}

			return input;
		} else {

			return "";
		}
	}


//	function replaceSpecialChars(input){
//	if (typeof (input) !== "undefined" && input !== null) {
//	let output;
//	output = input.replace(/[!@#$%š&*]/g,'');

//	return input
//	.replace(/[#!]/g,'');


//	} else {

//	return "";
//	}
//	}


	exports.getPropertiesAndValues 	= getPropertiesAndValues;
	exports.getIsUndefined 			= getIsUndefined;
	exports.getIsEmpty 				= getIsEmpty;
	exports.getIsEmptyStatus        = getIsEmptyStatus;
	exports.getIsEmptySetStatus     = getIsEmptySetStatus;
	exports.getBooleanCustom 		= getBooleanCustom;
	exports.recordSetToJSON			= recordSetToJSON;
	exports.escapeSpecialChars		= escapeSpecialChars;
	exports.getIsArray				= getIsArray;
	exports.getIsTrueValue			= getIsTrueValue;
	exports.getIsEmptygiftCard      = getIsEmptygiftCard;

}(this));