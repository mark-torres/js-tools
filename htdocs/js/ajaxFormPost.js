// check for console support
var consoleSupport = (typeof console != "undefined") ? true : false;

jQuery.fn.ajaxFormPost = function (options) {
	// Validation: action and callback are required
	if(typeof options == "undefined")
	{
		if (consoleSupport) console.log("ajaxFormPost: Missing options");
		return -1;
	}
	if("action" in options)
	{
		if (consoleSupport) console.log("ajaxFormPost: Missing action URL");
		return -1;
	}
	if("callback" in options)
	{
		if (consoleSupport) console.log("ajaxFormPost: Missing callback function");
		return -1;
	}
	// OPTIONAL PARAMS
	// data type: json, xml, text, html, etc
	// default: json
	var dataType = ("type" in options) ? options.type : "json";

	// bind submit event
	jQuery(this).submit(function (event) {
		var formData = jQuery(this).serialize();
		jQuery.post(options.action, formData, options.callback, dataType);
		event.preventDefault();
	});
}
