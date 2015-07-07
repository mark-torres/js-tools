## Javascript Error Logging

This *class* helps you log javascript client errors by sending a POST with the following fields:

* `file`: The file where the browser is getting the error.
* `line`: Line number in the file.
* `message`: The message displayed by the browser in the console.
* `referer`: The URL of the page where the error occurred.

### How to use

Include the source file in any page you want to track errors:

	<script src="js/js-error-logging.js" type="text/javascript" charset="utf-8"></script>

Then, create an instance with the URL you want to log to and initialize:

	var logger = new ErrorLogHelper("http://localhost/log-js-errors.php");
	logger.initLog();

This *class* uses a plain javascript, so it's dependency-free.

### References

* [You Really Should Log Client-Side Errors](http://openmymind.net/2012/4/4/You-Really-Should-Log-Client-Side-Error/)
* [AJAX Tutorial](http://www.w3schools.com/ajax/default.asp)