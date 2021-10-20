	
	function spaceToComma(string,target,replacement){ //Function to replace spaces in a string to commas
		var i = 0, length = string.length;
		for (i; i < length; i++) {
			string = string.replace(target, replacement);
		}
		return string;
	}
	function autofill(){ //autofill function fills in the name/ description and stuff automatically
		nameParser();
		var foo=document.getElementById('CatalogBoxName').value;
		document.getElementById('CatalogBoxTitle').value=document.getElementById('CatalogBoxPageTitle').value=document.getElementById('CatalogBoxEnPageTitle').value =foo;
		var fooKW=spaceToComma(foo," ",",");
		fooKW=tagFormat(fooKW);
		var fooDes = fooKW;
		fooKW+= ",Vintage Watch";
		document.getElementById('CatalogBoxKeywords').value= fooKW;
		document.getElementById('CatalogBoxEnKeywords').value= fooKW;
		var idNum= document.getElementById('CatalogBoxText1').value;
		idNum= idNum.slice(2);
		fooDes+=","+idNum;
		document.getElementById('CatalogBoxDescription').value= fooDes;
		document.getElementById('CatalogBoxEnDescription').value= fooDes;
		var jptext= document.getElementById('CatalogBoxHtml1').value;
		fieldsToCap();
		caseEditor();
		
		
		
		translator(document.getElementById('CatalogBoxHtml1').value);	
		
		translator(document.getElementById('CatalogBoxHtml2').value);
		
		
	}
	function fieldsToCap(){
		const _ENFields=[
		"CatalogBoxEnText8",
		"CatalogBoxEnText9",
		"CatalogBoxEnText11",
		"CatalogBoxEnText12",
		"CatalogBoxEnText13"
		];
		for(i=0;i<_ENFields.length;i++){
			var temp=document.getElementById(_ENFields[i]).value;
			temp=temp.replace(/^[a-z]/,match=>match.toUpperCase());
			document.getElementById(_ENFields[i]).value=temp;
		}
	}
	function yearFormat(str){ //Function to parse and format the year properly
		//regexes
		var year = /^(\d{2,4}['|’|`]s?)|(\d{2,4}(?=s))/i;
		var multiYear=/^\d+-\d+['|’|`]?s?/i;
		var dec=/\d*/;
		var tick=/'|’|`/;
		//variables
		var yearCorrected;
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
			
			var yearStart = /\d{2,4}(?=-)/.exec(yearCorrected);
			
			var yearEnd = /(?<=-)\d{2,4}/.exec(yearCorrected);
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
		var steel = /(?<=\s)ss(?=\s|$)|S\.Steel/i;
		var water = /(?<=\s)w\/p(?=\s)/i;
		var WP= /Water\s?Proof/ig;
		var black = /\s?BK/g;
		var rose = /\s?RG/g;
		var yellow= /\s?YG(\s|$)/ig;
		var yGF=/\s?YGF/ig;
		var GF=/(?<!Y)GF/ig;
		var pink=/\s?PG/ig;
		var multi=/multi\s/ig;
		var overSize=/over size/ig;
		var toCap=/(?<=[\s])[a-z](?=[a-z]{2})/g;
		var BE=/Bull's Eye/;
		var toLow=/(?<=[A-Z])([A-Z])*(?=.)?/g;
		var IWC=/IWC/ig;
		var Ex=/\!/g;
		var fullRotate=/Full Rotating/gi;
		var screwBack=/Screw Back/gi;
		var artDeco=/art deco/gi;
		var PW =/P[,\.\/]?W/ig;
		var WRB=/W,\s?Rosch Bern/ig;
		
	
		
		
		
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
		/UFO/ig
		];
		
		var name = document.getElementById('CatalogBoxName').value;//get the text from the namebox
		name=name.replace(Ex,"");
		//Make all words start with a capital	
		name=name.replace(toCap,match => match.toUpperCase());
		name=yearFormat(name);
		
		for(i=0;i<rxTokens.length;i++){
			name=name.replace(rxTokens[i][0],rxTokens[i][1]);
		}
		//Lowercase the letters not at the start of a word
		name=name.replace(toLow,match => match.toLowerCase());
		for(i=0;i<rxAN.length;i++){
			name=name.replace(rxAN[i],match=>match.toUpperCase());
		}
		//At this point all of the tokens should have been replaced
		document.getElementById('CatalogBoxName').value=name;
	}
	function tagFormat(str){ //Function to format the tags
		//regexes
		var tagSteel = /Stainless,Steel/;
		var tagRose =/Rose,Gold/;
		var tagYellow= /Yellow,Gold(?=!Filled)?/;
		var tagPink=/Pink,Gold/;
		var tagWhite=/White,Gold/;
		var tagCaliber=/\d*mm,Caliber/i;
		var tagGilt=/Gilt,dial/i;
		var tagQuote=/["”“]/g;
		var tagSM300=/Seamaster,300/;
		var tagCross=/Cross,Design/;
		var tagAuto=/Automatic,Model/;
		var tagBH=/Birdie,Hour,/;
		var tagPD=/Panda,Design/;
		var tagSector=/Sector,Dial/;
		var tagCushion=/Cushion,Case/
		var tagBLD=/Box,Lug,Design/i;
		var tagYears=/(?<=\d{2,4})-(?=\d{2,4})/;
		var tagBox=/With,Box/;
		var tagLug=/\w*,Lug/;
		var tagSD=/Snail,Dial/;
		var tagWatch=/\w*,Watch/;
		var tagMD=/Mirror,Dial/;
		var tagYGF=/Yellow,Gold,Filled/;
		var tagScale=/\w*,Scale/i;
		var tagIndex=/\w*,Index/i;
		var tagBigBlue=/Big,Blue/;
		var tagSandDial=/Sandwich,Dial/;
		var tagAdmiral=/Admiralty,Model/i;
		var tagMarine=/Marine,Standard/i;
		var tagGF = /Gold,Filled/i;
		var tagCoax=/Co-axial,Chronograph/i;
		var tagWRB=/W.,Rosch,Bern/i;
		var tagSC=/Super,Contiki/i;
		var tagSB=/(Stepped,Bezel(?!,Chrono))|(Step,Bezel)/i;
		var tagSBC=/Stepped,Bezel,Chrono/i;
		var tagEP=/El,Primero/i;
		var tagTLCF=/Technicum,La,Chaude,Fonds/i;
		var tagWWC=/Wyler Watch,Co,/i;
		var tagRD=/Roman,Dial/;
		var tagMB=/Music,Box/;
		var tagKMS=/Kronometer,Stockholm/;
		var tagBD=/Bomb,Drop/;
		var tagCAR=/Cronografo,A,Ritorno/;
		var tagSplitSec=/Split,Second/;
		var tagNiCr=/Nickel,Chrome/;
		var tagPort=/Port,Royal/;
		var tagBEye=/Big,Eye/;
		var tagEBC=/Eberhard,&,Co/ig;
		var tagEFort=/Extra,Fort/i;
		var tagTudor=/Tudor,Oyster/;
		var tagUSN=/USN,BUSHIPS/;
		var tagMStar=/Marine,Star/;
		var tagSGuide=/Sherpa,Guide/;
		var tagWTime=/World,Time/;
		var tagRGrasp=/Royal,Grasp/ig;
		var tagEPark=/Excelsior,Park/;
		var tagLReverso=/Lady,Reverso/;
		var tagEGUB=/E,,Gubelin/;
		var tagALung=/Aqua,Lung/;
		var tagSeaSky=/Sea,Sky/;
		var tagHMC=/H.,Moser,&,Cie/;
		var tagEBorel=/Ernest,Borel/;
		var tagGSport=/Geneva,Sport/i;
		var tagFFAthoms=/Fifty,Fathoms/ig;
		
		
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
		[tagWhite,"White Gold"]
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
		var rmIn = /(?<=,)in,/ig;
		var rmWith= /(?<=,)with,/ig;
		var rmDesign=/(?<=,)design,|,Design(?=$)/ig;
		var rmRare=/(?<=,)rare,/ig;
		var rmComma=/(?<=,),*(?=$)?/g;
		var rmDial=/(?<=,)Dial,|,Dial(?=$)/ig;
		var rmModel=/(?<=,)Model,|,Model(?=$)/g;
		var rmBy =/(?<=,)By,/ig;
		var rmAmp=/(?<=,)&,/g;

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
	//TODO: make this function work
	
	function translator(inputText,outputField){ //Function to translate text and put into string using the deepL api 
		var url = "https://api-free.deepl.com/v2/translate";

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
			//return xhr.responseText;
			var reg=/(?<="text":").*(?=")/;
			 rx =xhr.responseText.match(reg);
			alert(rx);
				
		}
		};
		
		var data = "yourDeepLAPIKey&text="+inputText+"&target_lang=EN";//Put your own DeepL API key here, sign up on their website to recieve it.

		xhr.send(data);
			
	}
	
	function caseEditor(){ //Function to edit the 'case fields in both English and Japanese'
		//check the Japanese phrases
		var key = document.getElementById('CatalogBoxText11').value;
		var jpkey1= document.getElementById('CatalogBoxText9').value;
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
		}else{
			alert("Enter in the new key/Value for the Japanese case field Kyle");
		}
		if(jphrases.has(jpkey1)){
			document.getElementById('CatalogBoxText9').value=jphrases.get(jpkey1);
		}else{
			alert("text9 no key");
		}
		
		//check Eng phrases
		var key1 = document.getElementById('CatalogBoxEnText9').value;
		var key2 = document.getElementById('CatalogBoxEnText11').value;
		var key3 = document.getElementById('CatalogBoxEnText8').value;
		var key4 = document.getElementById('CatalogBoxEnText12').value;
		var key5 = document.getElementById('CatalogBoxEnText13').value;
		var key6 = document.getElementById('CatalogBoxEnText14').value;
		
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
	
