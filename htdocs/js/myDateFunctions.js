function getMonthName(month)
{
	month = parseInt(month,10);
	if(isNaN(month))
		return false;
	var months = new Array(12);
	months[0] = 'Jan';
	months[1] = 'Feb';
	months[2] = 'Mar';
	months[3] = 'Apr';
	months[4] = 'May';
	months[5] = 'Jun';
	months[6] = 'Jul';
	months[7] = 'Aug';
	months[8] = 'Sep';
	months[9] = 'Oct';
	months[10] = 'Nov';
	months[11] = 'Dec';
	return months[month-1];
}

function getMonthFullName(month)
{
	month = parseInt(month,10);
	if(isNaN(month))
		return false;
	var months = new Array(12);
	months[0]  = 'January';
	months[1]  = 'February';
	months[2]  = 'March';
	months[3]  = 'April';
	months[4]  = 'May';
	months[5]  = 'June';
	months[6]  = 'July';
	months[7]  = 'August';
	months[8]  = 'September';
	months[9]  = 'October';
	months[10] = 'November';
	months[11] = 'December';
	return months[month-1];
}

// Get day name
function getDayName(dayIndex)
{
	dayIndex = parseInt(dayIndex,10);
	if(isNaN(dayIndex))
		return false;
	var weekdays = new Array(7);
	weekdays[0]="Sun";
	weekdays[1]="Mon";
	weekdays[2]="Tue";
	weekdays[3]="Wed";
	weekdays[4]="Thu";
	weekdays[5]="Fri";
	weekdays[6]="Sat";
	return weekdays[dayIndex];
}

function getDayFullName(dayIndex)
{
	dayIndex = parseInt(dayIndex,10);
	if(isNaN(dayIndex))
		return false;
	var weekdays = new Array(7);
	weekdays[0]="Sunday";
	weekdays[1]="Monday";
	weekdays[2]="Tuesday";
	weekdays[3]="Wednesday";
	weekdays[4]="Thursday";
	weekdays[5]="Friday";
	weekdays[6]="Saturday";
	return weekdays[dayIndex];
}

function getDayInfo(year, month, day)
{
	day = parseInt(day,10);
	if(isNaN(day))
		return false;
	month = parseInt(month,10);
	if(isNaN(month))
		return false;
	year = parseInt(year,10);
	if(isNaN(year))
		return false;
	var theDay = new Date();
	var today = new Date();
	theDay.setFullYear(year,month-1,day);
	var dy = theDay.getFullYear();
	var dm = theDay.getMonth()+1;
	if(dm<10) dm = '0'+dm;
	else dm = ''+dm;
	var dd = theDay.getDate();
	if(dd<10) dd = '0'+dd;
	else dd = ''+dd;
	var dayInfo = {
		stdDate: dy+'-'+dm+'-'+dd,
		strDate: getMonthName(dm)+' '+theDay.getDate()+', '+dy,
		weekday: theDay.getDay(),
		dateObj: theDay,
		past: (today > theDay)
	};
	return dayInfo;
}

// Get an array of days for specified month
function getMonthDays(year, month)
{
	var theDay = new Date();
	var monthDays = new Array();
	var inMonth = true;
	var lock = 0;
	month = parseInt(month,10);
	if(isNaN(month))
		return monthDays;
	year = parseInt(year,10);
	if(isNaN(year))
		return monthDays;
	theDay.setFullYear(year,month-1,1);
	while(inMonth && lock < 31)
	{
		if(theDay.getMonth()==month)
		{
			inMonth = false;
		}
		if(inMonth)
		{
			var day = getDayInfo(theDay.getFullYear(),theDay.getMonth()+1,theDay.getDate());
			monthDays.push( day );
		}
		// increase date
		theDay.setFullYear(year,month-1,theDay.getDate()+1);
		lock++;
	}
	return monthDays;
}

function validateDate(year,month,day)
{
	var patNumber = /^\d+$/;
	if(!patNumber.test(year))
		return false;
	if(!patNumber.test(month))
		return false;
	if(!patNumber.test(day))
		return false;
	year = parseInt(year,10);
	month = parseInt(month,10);
	day = parseInt(day,10);
	if(isNaN(year)) year = 0;
	if(isNaN(month)) month = 0;
	if(isNaN(day)) day = 0;
	var theDate = new Date(year, month - 1, day, 0, 0, 0, 0);
	var y = theDate.getFullYear();
	var m = theDate.getMonth() + 1;
	var d = theDate.getDate();
	if(y == year && m == month && d == day)
		return true;
	else
		return false;
}//------------------------
