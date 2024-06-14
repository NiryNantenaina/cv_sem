//PDFs
const pdfViewer = document.getElementById('pdf-viewer');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const fileInput = document.getElementById('file-input');//playPauseButton
const playPauseButton = document.getElementById('playpause-button');//

const DT_head = ["head_of_data", "business_developer", "team_management", "sales", "product_management", "data", "account_executive", "full-stack_developer", "product_manager_or_equivalent", "customer_service", "Skills_in_Python", "javascript", "Experience_in_sales", "Knowledge_of_CRM_tools", "Team_management", "Fluent_in_english", "Worked_in_multicultural_or_international_environment", "Knowledge_in_agile_methods", "Knowledge_in_data_science", "hospitality", "public_sector", "health_sector", "tech_industry", "unicorns_or_scale-ups", "Leadership", "Interpersonal_Communication"];
let pdfFiles = [];
let pdfNames = [];
let currentPdfIndex = 0;
let Anwers = [];
let timmers = [];
let curentTimmer = 0;
let playtime = false;

document.addEventListener('DOMContentLoaded', function() {
	// Your function to be executed after DOMContentLoaded
	/*if (localStorage.cs_semantik) {
		const data_cur = JSON.parse(localStorage.cs_semantik);
		pdfFiles = data_cur.pdfFiles;
		pdfNames = data_cur.pdfNames;
		Anwers = data_cur.Anwers;
		timmers = data_cur.timmers;
		currentPdfIndex = data_cur.currentPdfIndex;
		document.querySelector('.import_files').style.display = 'none';
		document.querySelector('.viewer').style.display = 'flex';
		document.querySelector('.contents').style.display = 'block';
		loadPDF(pdfFiles[currentPdfIndex]);
		updateButtons();
		playtime = true;
	} else {
		alert("New")
	}*/
});


// Fonction pour charger un fichier PDF
function loadPDF(url) {
	console.log('load data n '+currentPdfIndex)
	pdfViewer.data = url;
	init_Ans_view(currentPdfIndex)
}

// Fonction pour charger le fichier PDF suivant
function nextPDF() {
	save_all_ans(currentPdfIndex)
	if (currentPdfIndex < pdfFiles.length - 1) {
		currentPdfIndex++;
		loadPDF(pdfFiles[currentPdfIndex]);
		updateButtons();
	}
}

// Fonction pour charger le fichier PDF précédent
function previousPDF() {
	save_all_ans(currentPdfIndex)
	if (currentPdfIndex > 0) {
		currentPdfIndex--;
		loadPDF(pdfFiles[currentPdfIndex]);
		updateButtons();
		//init_Ans_view(currentPdfIndex);
	}
}

// Fonction pour mettre à jour les boutons "Suivant" et "Précédent"
function updateButtons() {
	previousButton.disabled = currentPdfIndex === 0;
	nextButton.disabled = currentPdfIndex === pdfFiles.length - 1;
}
function ArraySameValue(tableau1, tableau2) {
	//tableau1.sort();
	//tableau2.sort();
	return JSON.stringify(tableau1) === JSON.stringify(tableau2);
}
// Fonction pour gérer l'importation de fichiers PDF
function handleFileSelect(event) {
	pdfFiles = [];
	pdfNames = [];
	timmers = [];
	Anwers = [];
	currentPdfIndex = 0;
	console.log('change pdf datas')
	for (const file of event.target.files) {
		if (file.type === 'application/pdf') {
			pdfFiles.push(URL.createObjectURL(file));
			pdfNames.push(file.name)
			var ansi = {}
			for (var i = 0; i < DT_head.length; i++) {
				ansi[DT_head[i]] = 0;
			}
			Anwers.push(ansi)
			timmers.push(0)
		} else {
			localStorage.removeItem("cs_semantik");
		}
	}

	if (pdfFiles.length > 0) {
		document.querySelector('.import_files').style.display = 'none';
		document.querySelector('.viewer').style.display = 'flex';
		document.querySelector('.contents').style.display = 'block';
		const data_cur = JSON.parse(localStorage.cs_semantik);
		if (ArraySameValue(pdfNames,data_cur.pdfNames)) {
			timmers = data_cur.timmers;
			Anwers = data_cur.Anwers;
			currentPdfIndex = data_cur.currentPdfIndex;
		} else {};

		loadPDF(pdfFiles[currentPdfIndex]);
		updateButtons();
		nextButton.disabled = false; // Activer le bouton "Suivant" après l'importation
		playtime = true;
	}
}
function intToBool(n) {
  return !!n;
}
function resizePDFViewer(width, height) {
  var pdfViewer = document.getElementById("pdf-viewer");
  pdfViewer.style.width = width + "px";
  pdfViewer.style.height = height + "px";
}

function init_Ans_view(ind){
	//.exp_value
	console.log('Init ans n '+ind)
	document.querySelector('#cur_file').innerHTML = 'PDF['+(ind+1)+' / ' + pdfFiles.length + ']: '+pdfNames[ind];
	wd = document.querySelector('.viewer').offsetWidth;
	ht = document.querySelector('.viewer').offsetHeight - document.querySelector('#nav-buttons').offsetHeight
	resizePDFViewer(wd,ht)
	document.querySelector('.exp_value').reset();
	loade_all_ans(currentPdfIndex)
}

function loade_all_ans(indexx){
	console.log(indexx)
	for (var j = 0; j < DT_head.length; j++) {
		var ansss =j<6 ? Anwers[indexx][DT_head[j]] : intToBool(Anwers[indexx][DT_head[j]]);
		//console.log(DT_head[j]+': '+ ansss)
		if (j<6) {
			document.querySelector('#'+DT_head[j]).value = ansss;
		} else {
			document.querySelector('#'+DT_head[j]).checked = ansss;
		}
		
	}
}

function save_all_ans(indexx){
	console.log(indexx)
	for (var j = 0; j < DT_head.length; j++) {
		var ansss = j<6? Number(document.querySelector('#'+DT_head[j]).value) : Number(document.querySelector('#'+DT_head[j]).checked);
		Anwers[indexx][DT_head[j]] = ansss;
		//console.log(DT_head[j] + ': '+Anwers[indexx][DT_head[j]])
		//console.log(DT_head[j] + ': '+ ansss)
	}
}

function savetolocalstorage(){
	const data_cur = {
		"pdfFiles": pdfFiles,
		"pdfNames": pdfNames,
		"Anwers": Anwers,
		"timmers": timmers,
		"currentPdfIndex": currentPdfIndex
	}
	var temp = JSON.stringify(data_cur)
	//console.log(data_cur)
	localStorage.setItem('cs_semantik', temp);
}

function updateTime(){
	if (pdfFiles.length>0) {
		var t = timmers[currentPdfIndex];
		if (playtime) {
			timmers[currentPdfIndex] = t+1;
		}
		document.querySelector('#cur_time').innerHTML = (timmers[currentPdfIndex]/10).toFixed(1) + ' seconds';
		if (t<3000) {
			document.querySelector('#cur_time').style.color  = "green";/*backgroundColor*/
		} else if (t<3600) {
			document.querySelector('#cur_time').style.color  = "orange";
		} else {
			document.querySelector('#cur_time').style.color  = "red";
		}
		savetolocalstorage()
	}
}
setInterval(updateTime, 100)

function downloadAsFile(text, filename) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url); // Libérer l'URL après le téléchargement
}

function download_CV_Sementik(){
	var txt = "CV FILE;WorkTime(sec)";
	for (var i = 0; i < DT_head.length; i++) {
		/*if (i==0) {txt = DT_head[i];}else{txt += ";" + DT_head[i];}*/
		txt += ";" + DT_head[i];
	}

	for (var j = 0; j < pdfFiles.length; j++) {
		//pdfFiles[j]
		for (var k = 0; k < DT_head.length; k++) {
			//DT_head[k]
			if (k==0) {
				txt += "\n" + pdfNames[j] + ";" + timmers[j] + ";" + Anwers[j][DT_head[k]];
			}else{
				txt += ";" + Anwers[j][DT_head[k]];
			}
		}
	}
	console.log(txt)
	const now = new Date();
	const jour = now.getDate().toString().padStart(2, '0');
	const mois = (now.getMonth() + 1).toString().padStart(2, '0');
	const annee = now.getFullYear();
	const hh = now.getHours().toString().padStart(2, '0');
	const mm = now.getMinutes().toString().padStart(2, '0');
	const ss = now.getSeconds().toString().padStart(2, '0');
	const dateTimeString = `${jour}-${mois}-${annee} ${hh}:${mm}:${ss}`;
	filenamenow = "CV_Sementik_"+ dateTimeString + ".csv";
	downloadAsFile(txt,filenamenow)
}
function playtime_click(){
	if (playtime) {
		playtime = false;
		playPauseButton.innerHTML = "Play";
	} else {
		playtime = true;
		playPauseButton.innerHTML = "Pause";
	}
}
function reset_all(){
	localStorage.removeItem("cs_semantik");
	pdfFiles = [];
	pdfNames = [];
	currentPdfIndex = 0;
	Anwers = [];
	timmers = [];
	curentTimmer = 0;
	playtime = false;
	document.querySelector('.viewer').style.display = 'none';
	document.querySelector('.contents').style.display = 'none';
	document.querySelector('.import_files').style.display = 'block';
}
fileInput.addEventListener('change', handleFileSelect);
previousButton.addEventListener('click', previousPDF);
nextButton.addEventListener('click', nextPDF);
playPauseButton.addEventListener('click', playtime_click);