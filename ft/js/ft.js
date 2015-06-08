
	function radioSelect(){
		if(document.querySelector('input[name="op"]:checked').value=='e'){
			document.getElementById("btn").value="Encrypt";
		}else{
			document.getElementById("btn").value="Decrypt";
		}
	}

	function submitted(){
		if(document.querySelector('input[name="op"]:checked').value=='e'){
			encrypt();
		}else{
			decrypt();
		}
	}

	function encrypt(){
		if(document.getElementById("msg").value.length>0){
			var encrypted = CryptoJS.AES.encrypt(document.getElementById("msg").value, document.getElementById("pw_phrase").value);
			document.getElementById("msg").value = encrypted.toString();
		}else{
			document.getElementById("txtalert").innerHTML='The message cannot be empty';
			document.getElementById("txtalert").style.color='red';
			//swal("Error", "Message field cannot be empty", "error");
		}
	}

	function decrypt(){
		if(document.getElementById("msg").value.length>0){
			var decrypted = CryptoJS.AES.decrypt(document.getElementById("msg").value, document.getElementById("pw_phrase").value);
			if(decrypted.toString(CryptoJS.enc.Utf8).length>0){
				document.getElementById("msg").value = decrypted.toString(CryptoJS.enc.Utf8);
				document.getElementById("txtalert").innerHTML='';
			}else{
				document.getElementById("txtalert").innerHTML='Wrong password';
				document.getElementById("txtalert").style.color='red';
			}			
		}else{
			document.getElementById("txtalert").innerHTML='The message cannot be empty';
			document.getElementById("txtalert").style.color='red';
			//swal("Cancelled", "Your imaginary file is safe :)", "error");
		}
	}

	function pw_strength() {
	    var pw_phrase = document.getElementById("pw_phrase");
	    var strength = document.getElementById("strength");
	    var score = zxcvbn(pw_phrase.value).score;
	    if(pw_phrase.value.length == 0){
	    	strength.innerHTML = '';
			document.getElementById("btn").disabled = true;
	    	document.getElementById("btn").style.background='#CCCCCC';
	    }
	    else if(pw_phrase.value.length < 8){
	    	strength.innerHTML = 'Too short. Must be greater than 7 characters.';
	    	strength.style.color = 'black';
			document.getElementById("btn").disabled = true;
	    	document.getElementById("btn").style.background='#CCCCCC';
	    }else{
	    	document.getElementById("btn").disabled = false;
	    	document.getElementById("btn").style.background='#49E850';
	    	if (score == '0') {strength.innerHTML = 'Very Weak'; strength.style.color = 'red'; }
		    else if (score == '1') {strength.innerHTML = 'Weak'; strength.style.color = 'red'; }
		    else if (score == '2') {strength.innerHTML = 'So so'; strength.style.color = 'orange'; }
		    else if (score == '3') {strength.innerHTML = 'Okay'; strength.style.color = 'blue'; }
		    else if (score == '4') {strength.innerHTML = 'Strong'; strength.style.color = 'green'; }
		    else strength.innerHTML = '';	
	    }	    
	}
