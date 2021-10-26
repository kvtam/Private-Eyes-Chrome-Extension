function spaceToComma(string,target,replacement){ //Function to replace spaces in a string to commas
	let i = 0, length = string.length;//Get the lenght of the string and iterate through it to replace all of the instances of target
	for (i; i < length; i++) {
		string = string.replace(target, replacement);
	}
	return string;
}

function autofill(){ //autofill function fills in the name/ description and stuff automatically
	nameParser();//Call the function to parse and edit the name field
	let foo=document.getElementById('CatalogBoxName').value;//Set foo to the contents of the edited name element, then set the title element to the same thing
	document.getElementById('CatalogBoxTitle').value=document.getElementById('CatalogBoxPageTitle').value=document.getElementById('CatalogBoxEnPageTitle').value =foo;
	let fooKW=spaceToComma(foo," ",",");//Turns all of the spaces into commas then assigns it to fooKW
	fooKW=tagFormat(fooKW);//Format the tags and reassign
	let fooDes = fooKW; //copy fooKW into fooDes so that the description doesn't include the "Vintage Watch" tag
	fooKW+= ",Vintage Watch";
	document.getElementById('CatalogBoxKeywords').value= fooKW;//Inputs the tags into the fields
	document.getElementById('CatalogBoxEnKeywords').value= fooKW;
	/*let idNum= document.getElementById('CatalogBoxText1').value; //This section gets the ID Number for the watch  **DEPRICATED**
	idNum= idNum.slice(2);
	fooDes+=","+idNum;*/
	document.getElementById('CatalogBoxDescription').value= fooDes;
	document.getElementById('CatalogBoxEnDescription').value= fooDes;
	fieldsToCap(); //Capitalizes the first letter in select fields
	caseEditor(); //Edits the information in the "Case" fields
	dateTimeEdit();
	let jptext= document.getElementById('CatalogBoxHtml1').value;//Get the Japanese text to translate
	translator(jptext);//Translate the text
	
}

function dateTimeEdit(){ //Function to edit the year
	let input = window.prompt("BG color?");
	//let date= document.getElementById('datetime5').value;
	input=input.toUpperCase();
	switch(input){
		case 'B':
			document.getElementById('datetime5').value=date.replace("2021","2019");
			break;
		case 'W':
			document.getElementById('datetime5').value=date.replace("2021","2015");
			break;
		default:
			alert("Unrecogized BG color");
	}
	
}

function fieldsToCap(){//Function capitalizes the first letter of the first word in the fields below
	const _ENFields=[
	"CatalogBoxEnText8",
	"CatalogBoxEnText9",
	"CatalogBoxEnText11",
	"CatalogBoxEnText12",
	"CatalogBoxEnText13"
	];
	for(let i=0;i<_ENFields.length;i++){
		let temp=document.getElementById(_ENFields[i]).value;
		temp=temp.replace(/^[a-z]/,match=>match.toUpperCase());
		document.getElementById(_ENFields[i]).value=temp;
	}
}

function yearFormat(str){ //Function to parse and format the year properly
	//regexes
	let year = /^(\d{2,4}['|’|`]s?)|(\d{2,4}(?=s))/i;
	let multiYear=/^\d+-\d+['|’|`]?s?/i;
	let dec=/\d*/;
	let tick=/'|’|`/;
	//letiables
	let yearCorrected;
	if(!multiYear.test(str)){//If it's not a multi year do this
		yearCorrected= year.exec(str);//format the year correctly
		if(!(/(19|18)/.test(yearCorrected))){
			//if year doesn't start with 19 then add 19 to the front
			yearCorrected = "19"+yearCorrected;
			
		}
		if(tick.test(yearCorrected)&&/s/.test(yearCorrected)){//if the year has an apostrophe remove it
				yearCorrected=dec.exec(yearCorrected);
				yearCorrected+="s";
			
		}else{

			yearCorrected=dec.exec(yearCorrected);
		}
		if(/\d{3}!0/.test(yearCorrected)){//if the year doesn't end with a 0 then remove the 's'
			yearCorrected=yearCorrected.replace('s','');
		}
		return str.replace(year,yearCorrected);
	}else{
		yearCorrected=multiYear.exec(str);
		
		let yearStart = /\d{2,4}(?=-)/.exec(yearCorrected);
		
		let yearEnd = /(?<=-)\d{2,4}/.exec(yearCorrected);
					if(!/19/.test(yearStart)){
			yearStart='19'+yearStart;
		}
		if(!/19/.test(yearEnd)){
			yearEnd='19'+yearEnd;
		}
		yearCorrected=yearStart+'-'+yearEnd;
	}
	return str.replace(multiYear,yearCorrected);
	
}

function nameParser(){ //Function to parse and format the 'name' box on the Peyes webpage
	//Regexes here
	let steel = /(?<=\s)ss(?=\s|$)|S\.Steel/i;
	let water = /(?<=\s)w\/p(?=\s)/i;
	let WP= /Water\s?Proof/ig;
	let black = /\s?BK/g;
	let rose = /\s?RG/g;
	let yellow= /\s?YG(\s|$)/ig;
	let yGF=/\s?YGF/ig;
	let GF=/(?<!Y)GF/ig;
	let pink=/\s?PG/ig;
	let multi=/multi\s/ig;
	let overSize=/over size/ig;
	let toCap=/(?<=[\s])[a-z](?=[a-z]{2})/g;
	let BE=/Bull's Eye/;
	let toLow=/(?<=[A-Z])([A-Z])*(?=.)?/g;
	let IWC=/IWC/ig;
	let Ex=/\!/g;
	let fullRotate=/Full Rotating/gi;
	let screwBack=/Screw Back/gi;
	let artDeco=/art deco/gi;
	let PW =/P[,\.\/]?W/ig;
	let WRB=/W,\s?Rosch Bern/ig;
	
	//Array to store tokens
	const rxTokens = [
	[steel,"Stainless Steel"],
	[water,"Water-resistant"],
	[WP,"Water-resistant"],
	[black," Black"],
	[rose," Rose Gold"],
	[yellow," Yellow Gold "],
	[yGF," Yellow Gold Filled"],
	[pink," Pink Gold"],
	[multi, "Multi-"],
	[overSize,"Oversize"],
	[BE,"Bullseye"],
	[fullRotate,"Full-Rotating"],
	[screwBack,"Screw-back"],
	[GF,"Gold Filled"],
	[artDeco,"Art-deco"],
	[IWC,"IWC"],
	[PW,"Pocket Watch"],
	[WRB,"W. Rosch Bern"]
	];
	
	const rxAN=[
	/USN BUSHIPS/ig,
	/USA/ig,
	/IWC/ig,
	/UFO/ig,
	/PVD/ig
	];
	
	let name = document.getElementById('CatalogBoxName').value;//get the text from the namebox
	name=name.replace(Ex,"");
	//Make all words start with a capital	
	name=name.replace(toCap,match => match.toUpperCase());
	name=yearFormat(name);
	
	for(let i=0;i<rxTokens.length;i++){
		name=name.replace(rxTokens[i][0],rxTokens[i][1]);
	}
	//Lowercase the letters not at the start of a word
	name=name.replace(toLow,match => match.toLowerCase());
	for(let i=0;i<rxAN.length;i++){
		name=name.replace(rxAN[i],match=>match.toUpperCase());
	}
	//At this point all of the tokens should have been replaced
	document.getElementById('CatalogBoxName').value=name;
}

function tagFormat(str){ //Function to format the tags
	//regexes
	let tagSteel = /Stainless,Steel/;
	let tagRose =/Rose,Gold/;
	let tagYellow= /Yellow,Gold(?=!Filled)?/;
	let tagPink=/Pink,Gold/;
	let tagWhite=/White,Gold/;
	let tagCaliber=/\d*mm,Caliber/i;
	let tagGilt=/Gilt,dial/i;
	let tagQuote=/["”“]/g;
	let tagSM300=/Seamaster,300/;
	let tagCross=/Cross,Design/;
	let tagAuto=/Automatic,Model/;
	let tagBH=/Birdie,Hour,/;
	let tagPD=/Panda,Design/;
	let tagSector=/Sector,Dial/;
	let tagCushion=/Cushion,Case/
	let tagBLD=/Box,Lug,Design/i;
	let tagYears=/(?<=\d{2,4})-(?=\d{2,4})/;
	let tagBox=/With,Box/;
	let tagLug=/\w*,Lug/;
	let tagSD=/Snail,Dial/;
	let tagWatch=/\w*,Watch/;
	let tagMD=/Mirror,Dial/;
	let tagYGF=/Yellow,Gold,Filled/;
	let tagScale=/\w*,Scale/i;
	let tagIndex=/\w*,Index/i;
	let tagBigBlue=/Big,Blue/;
	let tagSandDial=/Sandwich,Dial/;
	let tagAdmiral=/Admiralty,Model/i;
	let tagMarine=/Marine,Standard/i;
	let tagGF = /Gold,Filled/i;
	let tagCoax=/Co-axial,Chronograph/i;
	let tagWRB=/W.,Rosch,Bern/i;
	let tagSC=/Super,Contiki/i;
	let tagSB=/(Stepped,Bezel(?!,Chrono))|(Step,Bezel)/i;
	let tagSBC=/Stepped,Bezel,Chrono/i;
	let tagEP=/El,Primero/i;
	let tagTLCF=/Technicum,La,Chaude,Fonds/i;
	let tagWWC=/Wyler Watch,Co,/i;
	let tagRD=/Roman,Dial/;
	let tagMB=/Music,Box/;
	let tagKMS=/Kronometer,Stockholm/;
	let tagBD=/Bomb,Drop/;
	let tagCAR=/Cronografo,A,Ritorno/;
	let tagSplitSec=/Split,Second/;
	let tagNiCr=/Nickel,Chrome/;
	let tagPort=/Port,Royal/;
	let tagBEye=/Big,Eye/;
	let tagEBC=/Eberhard,&,Co/ig;
	let tagEFort=/Extra,Fort/i;
	let tagTudor=/Tudor,Oyster/;
	let tagUSN=/USN,BUSHIPS/;
	let tagMStar=/Marine,Star/;
	let tagSGuide=/Sherpa,Guide/;
	let tagWTime=/World,Time/;
	let tagRGrasp=/Royal,Grasp/ig;
	let tagEPark=/Excelsior,Park/;
	let tagLReverso=/Lady,Reverso/;
	let tagEGUB=/E,,Gubelin/;
	let tagALung=/Aqua,Lung/;
	let tagSeaSky=/Sea,Sky/;
	let tagHMC=/H.,Moser,&,Cie/;
	let tagEBorel=/Ernest,Borel/;
	let tagGSport=/Geneva,Sport/i;
	let tagFFAthoms=/Fifty,Fathoms/ig;
	let tagUNardin=/Ulysse,Nardin/ig;
	let tagJJ=/Jules,Jurgensen/ig;
	let tagBB=/Baby,Chrono/ig;
	let tagSWolf=/Sea,Wolf/;
	let tagMTissot=/Mathey,Tissot/;
	
	
	//Array to hold the tag tokens
	const rxTokens_tags = [
	[tagQuote,''],
	[tagSteel,"Stainless Steel"],
	[tagRose,"Rose Gold"],
	[tagYellow,"Yellow Gold"],
	[tagCaliber,"30mm Caliber"],
	[tagGilt, "Gilt Dial"],
	[tagSM300,"Seamaster-300"],
	[tagCross,"Cross Design"],
	[tagAuto,"Automatic Model"],
	[tagAdmiral,"Admiralty Model"],
	[tagBH,"Birdie Hour "],
	[tagPD,"Panda Design"],
	[tagSector,"Sector Dial"],
	[tagCushion,"Cushion Case"],
	[tagBLD,"Box Lug Design"],
	[tagYears,","],
	[tagBox,"With,Box"],
	[tagPink,"Pink Gold"],
	[tagSD,"Snail Dial"],
	[tagMD,"Mirror Dial"],
	[tagBigBlue,"Big Blue"],
	[tagSandDial,"Sandwich Dial"],
	[tagMarine,"Marine Standard"],
	[tagGF, "Gold Filled"],
	[tagYGF, "Yellow Gold Filled"],
	[tagCoax, "Co-axial Chronograph"], 
	[tagWRB, "W. Rosch Bern"],
	[tagSC,"Super Contiki"],
	[tagSB,"Stepped Bezel"],
	[tagSBC,"Stepped Bezel Chrono"],
	[tagEP, "El Primero"],
	[tagTLCF,"Technicum La Chaude Fonds"],
	[tagWWC,"Wyler Watch Co.,"],
	[tagRD,"Roman Dial"],
	[tagMB,"Music Box"],
	[tagBD,"Bomb Drop"],
	[tagKMS,"Kronometer Stockholm"],
	[tagCAR,"Cronografo A Ritorno"],
	[tagSplitSec,"Split Second"],
	[tagNiCr,"Nickel Chrome"],
	[tagPort,"Port Royal"],
	[tagBEye,"Big Eye"],
	[tagEBC,"Eberhard & Co."],
	[tagEFort,"Extra Fort"],
	[tagTudor,"Tudor Oyster"],
	[tagUSN,"USN BUSHIPS"],
	[tagMStar,"Marine Star"],
	[tagSGuide,"Sherpa Guide"],
	[tagWTime, "World Time"],
	[tagRGrasp,"Royal Grasp"],
	[tagEPark,"Excelsior Park"],
	[tagLReverso,"Lady Reverso"],
	[tagEGUB,"E. Gubelin"],
	[tagALung,"Aqua Lung"],
	[tagSeaSky,"Sea Sky"],
	[tagHMC, "H. Moser & Cie"],
	[tagEBorel,"Ernest Borel"],
	[tagGSport,"Geneva Sport"],
	[tagFFAthoms,"Fifty Fathoms"],
	[tagWhite,"White Gold"],
	[tagUNardin,"Ulysse Nardin"],
	[tagJJ,"Jules Jurgensen"],
	[tagBB, "Baby Chrono"],
	[tagSWolf,"Sea Wolf"],
	[tagMTissot,"Mathey Tissot"]
	];
	//Functions for commonly modified nouns
	if(tagWatch.test(str)){
		str=str.replace(/,Watch/g," Watch");
	}
	if(tagLug.test(str)){
		str=str.replace(/,Lug/," Lug");
	}
	if(tagScale.test(str)){
		str=str.replace(/,Scale/," Scale");
	}
	if(tagIndex.test(str)){
		str=str.replace(/,Index/," Index");
	}
	if(/(?<=,)Case/.test(str)){
		str=str.replace(/,Case/," Case");
	}
	if(/(?<=,)Military/.test(str)){
		str=str.replace(/,Military/," Military");
	}
	
		
	for(i=0;i<rxTokens_tags.length;i++){//Replace tags here
		str=str.replace(rxTokens_tags[i][0],rxTokens_tags[i][1]);
	}
	
	return tagRemove(str);
}

function tagRemove(str){ //Function to Remove bad tags
	// Regexes
	let rmIn = /(?<=,)in,/ig;
	let rmWith= /(?<=,)with,/ig;
	let rmDesign=/(?<=,)design,|,Design(?=$)/ig;
	let rmRare=/(?<=,)rare,/ig;
	let rmComma=/(?<=,),*(?=$)?/g;
	let rmDial=/(?<=,)Dial,|,Dial(?=$)/ig;
	let rmModel=/(?<=,)Model,|,Model(?=$)/g;
	let rmBy =/(?<=,)By,/ig;
	let rmAmp=/(?<=,)&,/g;

	//Array of tokens to remove
	const rmTokens=[
	rmIn,
	rmWith,
	rmDesign,
	rmRare,
	rmDial,
	rmModel,
	rmComma,
	rmBy,
	rmAmp
	]
	for(i=0;i<rmTokens.length;i++){
		str=str.replace(rmTokens[i],'');
	}
	
	return str;
}

function translator(inputText){ //Function to translate text and put into string using the deepL api 
	let url = "https://api-free.deepl.com/v2/translate";
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
			//return xhr.responseText;
			let reg=/(?<="text":").*(?=")/;
			 rx =xhr.responseText.match(reg);
			 rx=rx.toString();
			 rx=rx.replace(/\\["]/g,"\"");
			alert(rx);		
		}
	};
	
	let data = "auth_key=&text="+inputText+"&target_lang=EN";//Put your own DeepL API key here, sign up on their site
	xhr.send(data);
}
	
function caseEditor(){ //Function to edit the 'case fields in both English and Japanese'
	//check the Japanese phrases
	let key = document.getElementById('CatalogBoxText11').value;
	let jpkey1= document.getElementById('CatalogBoxText9').value;
	const jphrases = new Map();
	jphrases.set("Screw back Water Proof","スクリューバック防水");
	jphrases.set("Snap back water proof","スナップバック　防水");
	jphrases.set("Snap back Water Proof","スナップバック　防水");
	jphrases.set("Snap-back, water-resistant","スナップバック　防水");
	jphrases.set("Snapback, non-waterproof","スナップバック　非防水");
	jphrases.set("Snap back, non-waterproof","スナップバック　非防水");
	jphrases.set("Snap back non water proof","スナップバック　非防水");
	jphrases.set("Snap back non Water Proof","スナップバック　非防水");
	jphrases.set("Snap back Non Water Proof","スナップバック　非防水");
	jphrases.set("Snap back non w/p","スナップバック　非防水");
	jphrases.set("Snap-back case, non-waterproof","スナップバック　非防水");
	jphrases.set("Screw back water proof","スクリューバック防水");
	jphrases.set("Screw-back, water-resistant","スクリューバック防水");
	jphrases.set("Screw-back,Waterproof","スクリューバック防水");
	jphrases.set("Screw-back case, water-resistant","スクリューバック防水");
	jphrases.set("Snap-back, non-waterproof","スナップバック　非防水");
	jphrases.set("Water Proof","防水");
	jphrases.set("Snap-back case (non-waterproof)","スナップバック　非防水");
	jphrases.set("Screw-back case (waterproof)","スクリューバック防水");
	jphrases.set("Original","オリジナル");
	jphrases.set("Steel back","ｽﾃｨｰﾙバック");
	jphrases.set("Screw non W/P","スクリューバック 非防水");
	jphrases.set("Screw back w/proof","スクリューバック 防水");
	jphrases.set("Snap-back,non-waterproof","スナップバック　非防水");
	jphrases.set("Snap-back,Non-Waterproof","スナップバック　非防水");
	jphrases.set("Snap-Back,Non-Waterproof","スナップバック　非防水");
	jphrases.set("Snap-back Waterproof","スナップバック　防水");
	jphrases.set("Snap-back (water-resistant)","スナップバック　防水");
	jphrases.set("Screw back w/p","スナップバック　防水");
	jphrases.set("Screw back W/proof","スナップバック　防水");
	
	if(jphrases.has(key)){
		document.getElementById('CatalogBoxText11').value=jphrases.get(key);
	}
	if(jphrases.has(jpkey1)){
		document.getElementById('CatalogBoxText9').value=jphrases.get(jpkey1);
	}
	//check Eng phrases
	let key1 = document.getElementById('CatalogBoxEnText9').value;
	let key2 = document.getElementById('CatalogBoxEnText11').value;
	let key3 = document.getElementById('CatalogBoxEnText8').value;
	let key4 = document.getElementById('CatalogBoxEnText12').value;
	let key5 = document.getElementById('CatalogBoxEnText13').value;
	let key6 = document.getElementById('CatalogBoxEnText14').value;
	
	const enphrases = new Map();
	enphrases.set("Screw back Water Proof","Screw back Water-resistant");
	enphrases.set("Stainless steer","Stainless steel");
	enphrases.set("Snap back water proof","Snap back Water-resistant");
	enphrases.set("Snap back non water proof","Snap back Non-Water-resistant");
	enphrases.set("Snap-back case (non-waterproof)","Snap back Non-Water-resistant");
	enphrases.set("Snap back non Water Proof","Snap back Non-Water-resistant");
	enphrases.set("Snap back Non Water Proof","Snap back Non-Water-resistant");
	enphrases.set("Screw back water proof","Screw back Water-resistant");
	enphrases.set("Screw-back,Waterproof","Screw back Water-resistant");
	enphrases.set("Screw-back case, water-resistant","Screw back Water-resistant");
	enphrases.set("Screw-back, water-resistant","Screw back Water-resistant");
	enphrases.set("Screw-back case (waterproof)","Screw back Water-resistant");
	enphrases.set("Snap-back, non-waterproof","Snap back Non-Water-resistant");
	enphrases.set("Snap-back case, non-waterproof","Snap back Non-Water-resistant");
	enphrases.set("Water Proof","Waterproof");
	enphrases.set("スナップバック 非防水","Snap back Non-Water-resistant");
	enphrases.set("スナップバック 防水","Snap back Water-resistant");
	enphrases.set("スクリューバック 防水","Snap back Water-resistant");
	enphrases.set("手巻","Manual Wind");
	enphrases.set("プリント","Print");
	enphrases.set("ステイブライト","Staybrite");
	enphrases.set("ステンレススチールケース","Stainless steel");
	enphrases.set("ステンレススチール","Stainless steel");
	enphrases.set("ステンレススティール","Stainless steel");
	enphrases.set("オリジナル","Original");
	enphrases.set("ルミナス","Luminescent");
	enphrases.set("アップライド","Applied");
	enphrases.set("アップライド & ルミナス","Applied & Luminescent");
	enphrases.set("ノン オリジナル （ベルト幅：17mm）","Non-original (Lug width: 17mm)");
	enphrases.set("ノン オリジナル （ベルト幅：16mm）","Non-original (Lug width: 16mm)");
	enphrases.set("ノン オリジナル （ベルト幅：16mm） ","Non-original (Lug width: 16mm)");
	enphrases.set("ノン オリジナル （ベルト幅：18mm）","Non-original (Lug width: 18mm)");
	enphrases.set("ノンオリジナル （ベルト幅：18mm）","Non-original (Lug width: 18mm)");
	enphrases.set("ノンオリジナル （ベルト幅：20mm）","Non-original (Lug width: 20mm)");
	enphrases.set("ノン オリジナル （ベルト幅：20mm）","Non-original (Lug width: 20mm)");
	enphrases.set("ノン オリジナル （ベルト幅：18mm） / パリス式","Non-original (Lug width: 18mm) / Paris style");
	enphrases.set("ノン オリジナル （ベルト幅：20mm） / オリジナル尾錠","Non-original (Lug width: 20mm) /Original Buckle");
	enphrases.set("ノン オリジナル （ベルト幅：18mm）/ GF Type-2","Non-original (Lug width: 18mm) /GF Type-2");
	enphrases.set("ノン オリジナル （ベルト幅：18mm） / GF Type-2","Non-original (Lug width: 18mm) /GF Type-2");
	enphrases.set("ノン オリジナル （ベルト幅：16mm） /  GF Type-4","Non-original (Lug width: 16mm) /GF Type-4");
	enphrases.set("Snapback, non-waterproof","Snap back Non-Water-resistant");
	enphrases.set("Snap back, non-waterproof","Snap back Non-Water-resistant");
	enphrases.set("Snap-back,non-waterproof","Snap back Non-Water-resistant");
	enphrases.set("Snap back non w/p","Snap back Non-Water-resistant");
	enphrases.set("Screw non W/P","Screw Back Non-Water-resistant");
	enphrases.set("Screw back w/proof","Screw Back Water-resistant");
	enphrases.set("Snap-Back,Non-Waterproof","Snap back Non-Water-resistant");
	enphrases.set("Snap-back Waterproof","Snap back Water-resistant");
	enphrases.set("Screw back w/p","Screw back Water-resistant");
	enphrases.set("Screw back W/proof","Screw back Water-resistant");
	
	
	if(enphrases.has(key1)){
		document.getElementById('CatalogBoxEnText9').value=enphrases.get(key1);
	}
	if(enphrases.has(key3)){
		document.getElementById('CatalogBoxEnText8').value=enphrases.get(key3);
	}
	if(enphrases.has(key4)){
		document.getElementById('CatalogBoxEnText12').value=enphrases.get(key4);
	}
	if(enphrases.has(key5)){
		document.getElementById('CatalogBoxEnText13').value=enphrases.get(key5);
	}
	if(enphrases.has(key6)){
		document.getElementById('CatalogBoxEnText14').value=enphrases.get(key6);
	}
	if(enphrases.has(key2)){
		document.getElementById('CatalogBoxEnText11').value=enphrases.get(key2);
	}else{
		alert("Enter in the new key/Value for the English case field Kyle");
	}
}
	autofill();
	
