console.log(apuPicHolderId);
console.log(apuFilesFormId);
console.log(apuFileInputId);

var apuPicHolder = document.getElementById(apuPicHolderId),
	apuFilesForm = document.getElementById(apuFilesFormId),
	apuFileInput = document.getElementById(apuFileInputId);
	
var apuPicFiles = [];
var apuMaxFiles = 15;
var apuMaxSize = 1048576 * 2;
var apuFileSupport = false;
var apuIsUploading = false;
var apuCurrentFile = false;
var apuUploadInterval = false;
	
apuFileInput.onchange = function () {
	if(apuFileInput.files.length > 0)
	{
		apuLoadFiles(apuFileInput.files);
		apuFilesForm.reset();
	}
};

apuFileSupport = (typeof window.FileReader != 'undefined');

function apuAddPreview(imgData, title, index)
{
	if(!apuFileSupport || apuIsUploading) {return false;}
	if(typeof title == 'undefined') var title = 'image';
	var fileCount = apuPicFiles.length;
	var picDiv = document.createElement('div');
	var prog = document.createElement('div');
	var progBar = document.createElement('div');
	var btnDiscard = document.createElement('div');
	btnDiscard.className = 'apu-btn_discard';
	btnDiscard.setAttribute('onclick', 'apuDiscardPic('+index+')');
	btnDiscard.innerHTML = '&times;';
	prog.className = 'progress';
	progBar.setAttribute('role','progressbar');
	progBar.setAttribute('aria-valuenow','0');
	progBar.setAttribute('aria-valuemin','0');
	progBar.setAttribute('aria-valuemax','100');
	progBar.style.width = '0%';
	progBar.className = 'progress-bar';
	progBar.innerHTML = '0%';
	prog.id = 'prog_bar_' + index;
	prog.style.visibility = 'hidden';
	prog.appendChild(progBar);
	picDiv.title = title;
	picDiv.className ='apu-img_preview';
	picDiv.id = 'thumb_' + index;
	picDiv.style.backgroundImage = 'url('+imgData+')';
	picDiv.appendChild(prog);
	picDiv.appendChild(btnDiscard);
	apuPicHolder.appendChild(picDiv);
} // - - - - - - end of function apuAddPreview - - - - - -

function apuClearFiles()
{
	if(!apuFileSupport || apuIsUploading) {return false;}
	files = [];
	apuPicHolder.innerHTML = "";
} // - - - - - - end of function apuClearFiles - - - - - -

// read a FileList of local files
function apuLoadFiles(fileList)
{
	if(!apuFileSupport) {return false;}
	for(var i in fileList)
	{
		var file = fileList[i];
		if(typeof file == 'object' 
			&& file.type.match(/image\/(gif|jpe?g|png)/) 
			&& file.size < apuMaxSize
			&& apuPicFiles.length < apuMaxFiles)
		{
			var reader = new FileReader();	
			reader.file = file;
			reader.onload = function (event) {
				if(apuPicFiles.length < apuMaxFiles)
				{
					apuAddPreview(event.target.result, event.target.file.name, apuPicFiles.length);
					apuPicFiles.push(event.target.file);
				}
			};
			reader.readAsDataURL(file);
		}
	}
} // - - - - - - end of function apuLoadFiles - - - - - -

// progress on transfers from the server to the client (downloads)
function apuUpdateProgress(oEvent) {
	if (oEvent.lengthComputable) {
		var percentComplete = Math.ceil(oEvent.loaded / oEvent.total * 100);
		var picIndex = (typeof oEvent.target.picIndex != 'undefined')? oEvent.target.picIndex : 'x';
		apuSetProgress('prog_bar_'+picIndex, percentComplete);
	}
}

function apuSetProgress(barId, progValue)
{
	var prog = document.getElementById(barId);
	prog.children[0].setAttribute('aria-valuenow', progValue);
	prog.children[0].innerHTML = progValue + '%';
	prog.children[0].style.width = progValue + '%';
} // - - - - - - end of function apuSetProgress - - - - - -

// Upload file
function apuUploadFile(file, index)
{
	if((file instanceof File) != true) return false;
	var prog = document.getElementById('prog_bar_'+index);
	prog.style.visibility = 'visible';
	var formData = new FormData();
	formData.append('photo', file, file.nameup);
	var xhr = new XMLHttpRequest();
	xhr.fileIndex = index;
	// add pregress event listener BEFORE open()
	if(typeof xhr.onprogress != 'undefined')
	{
		xhr.picIndex = index;
		xhr.onprogress = apuUpdateProgress;
	}
	if(typeof xhr.upload.onprogress != 'undefined')
	{
		xhr.upload.picIndex = index;
		xhr.upload.onprogress = apuUpdateProgress;
	}
	// Open the connection.
	xhr.open('POST', location.pathname, true);
	xhr.onload = function () {
		if (xhr.status === 200)
		{
			// clear file
			apuPicFiles[this.fileIndex] = false;
		}
	};
	xhr.send(formData);
} // - - - - - - end of function apuUploadFile - - - - - -

// Check if all files are uploaded
function apuCheckFiles()
{
	var allDone = true;
	if(apuPicFiles.length == 0)
	{
		allDone = true;
	}
	else
	{
		for (var i = 0; i < apuPicFiles.length; i++)
		{
			if(typeof apuPicFiles[i] != 'boolean')
				allDone = false;
		}
	}
	return allDone;
} // - - - - - - end of function apuCheckFiles - - - - - -

// Get local files when dropped
function apuOnDropFiles(e)
{
	if(!apuFileSupport || apuIsUploading) {return false;}
	// this.className = '';
	e.preventDefault();
	if(e.dataTransfer.files.length > 0)
	{
		apuLoadFiles(e.dataTransfer.files);
	}
	return false;
} // - - - - - - end of function apuOnDropFiles - - - - - -

function apuStartUpload()
{
	if(!apuIsUploading && !apuCheckFiles())
	{
		apuIsUploading = true;
		apuFileInput.disabled = true;
		apuCurrentFile = 0;
		apuHideDiscardBtn();
		apuUploadFile(apuPicFiles[apuCurrentFile], apuCurrentFile);
		apuUploadInterval = setInterval(apuCheckUploadProgress, 500);
	}
} // - - - - - - end of function starUpload - - - - - -

function apuCheckUploadProgress()
{
	if(apuCheckFiles())
	{
		clearInterval(apuUploadInterval);
		apuIsUploading = false;
		apuFileInput.disabled = false;
		apuClearFiles();
	}
	else
	{
		if((apuPicFiles[apuCurrentFile] instanceof File) != true)
		{
			apuCurrentFile++;
			apuUploadFile(apuPicFiles[apuCurrentFile], apuCurrentFile);
		}
	}
} // - - - - - - end of function apuCheckUploadProgress - - - - - -

function apuHideDiscardBtn()
{
	var btns = document.getElementsByClassName('apu-btn_discard');
	for(var i in btns)
	{
		var btn = btns[i];
		if(typeof btn == 'object')
		{
			btn.style.visibility = 'hidden';
		}
	}
} // - - - - - - end of function apuHideDiscardBtn - - - - - -

function apuDiscardPic(index)
{
	if(typeof apuPicFiles[index] != 'undefined')
	{
		apuPicFiles.splice(index, 1);
		document.getElementById('thumb_'+index).remove();
		apuArrangePics();
	}
} // - - - - - - end of function apuDiscardPic - - - - - -

function apuArrangePics()
{
	var index = 0;
	for(var i in apuPicHolder.children)
	{
		var thumb = apuPicHolder.children[i];
		if(typeof thumb == 'object')
		{
			thumb.id = 'thumb_'+index;
			for(var j in thumb.children)
			{
				var child = thumb.children[j];
				if(typeof child == 'object')
				{
					if(child.className == 'progress')
					{
						child.id = 'prog_bar_'+index;
					}
					if(child.className == 'apu-btn_discard')
					{
						child.setAttribute('onclick', 'apuDiscardPic('+index+')');
					}
				}
			}
		}
		index++;
	}
} // - - - - - - end of function apuArrangePics - - - - - -

apuPicHolder.ondragover = function () { this.className = 'hover'; return false; };
apuPicHolder.ondragend = function () { this.className = ''; return false; };
apuPicHolder.ondrop = apuOnDropFiles;

