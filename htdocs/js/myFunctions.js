function myGet(elementId)
{
	return document.getElementById(elementId);
}//------------------------

function htmlEntities(theValue)
{
	if(typeof theValue == 'string')
		return theValue.replace(/'/g,"&apos;").replace(/"/g,"&quot;");
	else
		return theValue.toString().replace(/'/g,"&apos;").replace(/"/g,"&quot;");
}//------------------------

function strToDOCName(theName, namePrefix)
{
	if((typeof namePrefix == 'undefined') || (namePrefix.length == 0))
		namePrefix = 'id';
	if(typeof theName == 'undefined')
		return false;
	var DOCName = theName.toLowerCase().replace(/[^a-z]/gi,'_');
	return [namePrefix, DOCName].join('_');
}//------------------------

function myTrim(stringToTrim)
{
	if(stringToTrim == null)
		return '';
	if(typeof stringToTrim == 'string')
		return stringToTrim.replace(/(^\s+)|(\s+$)/g,'');
	else
		return stringToTrim.toString().replace(/(^\s+)|(\s+$)/g,'');
}//------------------------

function myURIParameter(paramName)
{
	if(typeof paramName == 'undefined' || paramName.length == 0)
		return false;
	var uri = window.location.href;
	var patParam = new RegExp(paramName+'=([^&#]+)');
	var matches = patParam.exec(uri);
	if(matches == null)
		return false;
	else
		return matches[1];
}// end of function 'myURIParameter' ------------------------

function myRand(maxVal)
{
	if(typeof maxVal != "number")
	{
		var rand = parseInt(Math.random() * maxVal, 10);
		return rand;
	}
	else
	{
		return 0;
	}
}//------------------------

function toNumber(number)
{
	var patInt = /^-?[\d]+$/;
	var patFloat = /^-?[\d]+[.][\d]+$/;
	if(patFloat.test(number))
	{
		return parseFloat(number, 10);
	}
	else
	if(patInt.test(number))
	{
		return parseInt(number, 10);
	}
	else
	{
		return 0;
	}
}//------------------------

function toInt(number)
{
	var patInt = /^[\d]+$/;
	// remove spaces
	if(typeof number == 'string')
		number = number.replace(/(^\s+)|(\s+$)/g,'');
	if(patInt.test(number))
	{
		return parseInt(number, 10);
	}
	else
	{
		return 0;
	}
}//------------------------

function toFloat(number)
{
	var patFloat = /^[\d]+[.][\d]+$/;
	// remove spaces
	if(typeof number == 'string')
		number = number.replace(/(^\s+)|(\s+$)/g,'');
	if(patFloat.test(number))
	{
		return parseFloat(number, 10);
	}
	else
	{
		return 0;
	}
}//------------------------

function getNumber(word)
{
	if(typeof word == 'string')
	{
		word = word.replace(/[^\d.]/g,'');
		var patInt = /^[\d]+$/;
		var patFloat = /^[\d]+[.][\d]+$/;
		if(patFloat.test(word))
		{
			return parseFloat(word, 10);
		}
		else
		if(patInt.test(word))
		{
			return parseInt(word, 10);
		}
		else
		{
			return 0;
		}
	}
	else
	if(typeof word == 'number')
		return word;
	else
		return 0;
}//------------------------

function empty(variable)
{
	if(variable === null)
		return true;
	if(typeof variable.length == 'number' && variable.length == 0)
		return true;
	if(variable === false)
		return true;
	if(variable == 0)
		return true;
	return false;
}// end of function 'empty' ------------------------

function isDate(dateString)
{
	var pattDate = /^\d+\/\d+\/\d+$/i;
	if(!pattDate.test(dateString))
		return false;
	var dateParts = dateString.split('/');
	var month = toNumber(dateParts[0]);
	var day = toNumber(dateParts[1]);
	var year = toNumber(dateParts[2]);
	if(typeof console.log == 'function') console.log([month, day, year]);
	var today = new Date();
	var thisYear = today.getFullYear();
	if(year < thisYear)
		year += 2000;
	var theDay = new Date(year, month-1 , day, 0, 0, 0, 0);
	if(typeof console.log == 'function') console.log(theDay);
	if(year != theDay.getFullYear())
		return false;
	if(month != (theDay.getMonth()+1))
		return false;
	if(day != theDay.getDate())
		return false;
	// now, check if is past date
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	if(typeof console.log == 'function') console.log(today);
	if(today > theDay)
		return false;
	return true;
}// end of function 'isDate' ------------------------

function getPathInfo()
{
	var path = location.pathname.split('?');
	path = path[0];
	var patPath = /\/([\w-]+)\/([\w-.]+\.[a-z]+)$/;
	var pathInfo = {directory: false, file: false};
	var matches = patPath.exec(path);
	if(matches != null)
	{
		pathInfo.directory = matches[1];
		pathInfo.file = matches[2];
	}
	return pathInfo;
}//------------------------

function isIPv4(ip)
{
	isValidIp = false;
	var patIP = /^\d+\.\d+\.\d+\.\d+$/;
	if(patIP.test(ip))
	{
		var ipNums = ip.split('.');
		var allOk = true;
		for(var i in ipNums)
		{
			var num = parseInt(ipNums[i], 10);
			if(num < 0 || num > 255)
			{
				allOk = false;
			}
		}
		isValidIp = allOk;
	}
	return isValidIp;
}//------------------------

function supports_canvas()
{
	return !!document.createElement('canvas').getContext;
}



