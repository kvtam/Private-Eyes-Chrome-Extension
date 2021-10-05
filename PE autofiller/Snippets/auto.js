<script type="text/javascript">
	function spaceToComma(string,target,replacement){
		var i = 0, length = string.length;
		for (i; i < length; i++) {
			string = string.replace(target, replacement);
		}
		return string;
	}
	function autofill(){
		var foo=document.getElementById('CatalogBoxName').value;
		document.getElementById('CatalogBoxTitle').value=document.getElementById('CatalogBoxPageTitle').value=document.getElementById('CatalogBoxEnPageTitle').value =foo;
		var fooKW=spaceToComma(foo," ",",");
		fooKW+= ",Vintage";
		document.getElementById('CatalogBoxKeywords').value= fooKW;
		document.getElementById('CatalogBoxEnKeywords').value= fooKW;
		var idNum= document.getElementById('CatalogBoxText1').value;
		idNum= idNum.slice(2);
		var fooDes=fooKW+","+idNum;
		document.getElementById('CatalogBoxDescription').value= fooDes;
		document.getElementById('CatalogBoxEnDescription').value= fooDes;
	}
	autofill();
	
</script>