$(document).ready(function (){
	var sviUnosi = [];
	var bijeloDugme = $('button.add-task').first();
	var crnaRuza = $('button.del-task1').first();

	$.cookie.raw = true;
	// ##### Ovaj dio pri 'reload'-ovanju stranice čita vrednosti 'cookie'-a i pravi 'li' elemente, smeštajući vrednosti u niz 'sviUnosi' ##### //
	var keksi = JSON.stringify($.cookie()).slice(1,-1);
	var parovi = keksi.split(',');
	if (parovi!="") {
		$.each(parovi, function(index, value){
			var vrednost = value.split(':')[1].slice(1,-1);
			var ime = value.split(':')[0].slice(1,-1);
			sviUnosi[ime] = vrednost;
			$('ul').append('<li><input type="checkbox"name="tasks"value="'+ime+'">'+vrednost+'<button type="button"class="del-task"value="Delete">Delete</button></li>');
		  brisiTask();
		});
	}

	// Ova funkcija se okida pri kliku na dugme 'delete' koje je pored 'li' elementa, i briše pojedinačni 'li' element
	function brisiTask () {
		$('button.del-task').click(function(){
			var ime = $(this).prev().val();
	  	$.removeCookie(ime);
			$(this).parent().remove();
		});
	}

	// Ova funkcija se okida kad se klikne na dugme 'add task' i vrednost unosa smešta u iz 'sviUnosi' a zatim i u cookie, nakon čega pravi 'li' element 
	bijeloDugme.click(function(){
		var unos = $('input#task-field').val();
		if(unos.length==0){
			alert('Polje za unos Taska ne smije biti prazno.');
		}
		else {
			sviUnosi.push(unos);
			var ime = sviUnosi.length-1;
			$.cookie(ime, unos);
			$('ul').append('<li><input type="checkbox"name="tasks"value="'+ime+'">'+unos+'<button type="button"class="del-task"value="Delete">Delete</button></li>');
			$('input#task-field').val('');
			brisiTask();
			//console.log($.cookie());
			//console.log(sviUnosi);
		}
	});

	// Ova funkcija se okida na klin dugmeta 'clear finished' i briše 'check'-ovane 'li' elemente, kao i njihovu vrijednost iz 'cookie'-ja
	crnaRuza.click(function(){
	  $.each($('input:checked'), function(){
	  	var ime = $(this).val();
	  	$.removeCookie(ime);
	  	//console.log(ime);
	  });
		$('input:checked').parent().remove();
	});

});

