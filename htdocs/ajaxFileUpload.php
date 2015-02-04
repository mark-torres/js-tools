<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<title>Ajax File Upload</title>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<meta name="author" content="Mark Torres">
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<style type="text/css" media="screen">
	#holder {
		height: 210px;
		background-color: silver;
		overflow: auto;
	}
	.apu-img_preview {
		background-position: center;
		background-size: cover;
		background-color: gainsboro;
		background-repeat: no-repeat;
		width:  100px;
		height: 75px;
		float: left;
		border: 1px solid gray;
		margin: 5px;
		position: relative;
	}
	.apu-btn_discard {
		position: absolute;
		top: 0px;
		right: 0px;
		background-color: firebrick;
		color: white;
		width:  15px;
		height: 15px;
		font-size: 13px;
		line-height: 12px;
		cursor: pointer;
		text-align: center;
	}
	.apu-img_preview .progress {
		position: relative;
		top: 50%;
	}
	</style>
</head>
<body>
	Drag files here to preview photos before uploading:
	<div id="holder"></div>
	<form id="files_form">
		Or select them here: 
		<input id="img_files" type="file" multiple accept="image/*"></input>
	</form>
	<input type="button" id="btn_clear" value="Clear files" onclick="apuClearFiles()"></input>&nbsp;&nbsp;
	<input type="button" id="btn_upload" value="Upload files" onclick="apuStartUpload()"></input>
<script type="text/javascript">	
var apuPicHolderId = 'holder';
var apuFilesFormId = 'files_form';
var apuFileInputId = 'img_files';
</script>
<script src="js/ajax-pic-upload.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
