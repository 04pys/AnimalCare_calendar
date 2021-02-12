


$(document).ready(function() {

	var delay = 2000; //milliseconds
	var isSlide = false;
	var sevent = undefined; 

	// $.get("/getawards", function(res) {
	// 	var i = 0;
	// 	for (var data in res) {
	// 		i++;
	// 		var people = res[data].people.replace(/(?<=.{1})./, "🍎");
	// 		$('.awardtable').append('<tr><td><strong>'+i+'</strong></td><td>'+res[data].name+'</td><td>'+people+'</td><td>'+res[data].type+'</td><td>'+res[data].date+'</td></tr>');
	// 	}
	// });

	refreshAwardList();

	$(".badge").click(function(event) {
		$('#exampleView').modal('show');
		$('#exampleViewLabel').text(event.target.text);
		$('#exampleViewBody').html(`
		<div class="spinner-border text-danger" role="status">
			<span class="sr-only">Loading...</span>
	  	</div>
	  `);
		$.get("/GetCode?type="+event.target.text, function(response) {
			$('#exampleViewBody').html(response);
			
		});
	});

	$('#add_upload').click(function(){
		var token = $("#award_token").val();
		var people = $("#award_people").val();
		var name = $("#award_name").val();
		var type = $("#award_type").val();
		var date = $("#award_date").val();
		$("#award_token").css('borderColor', '#ced4da');
		$("#award_people").css('borderColor', '#ced4da');
		$("#award_name").css('borderColor', '#ced4da');
		$("#award_type").css('borderColor', '#ced4da');
		$("#award_date").css('borderColor', '#ced4da');
		if(token == "") {
			$("#award_token").css('borderColor', 'red');
			return;
		} 
		if(people == "") {
			$("#award_people").css('borderColor', 'red');
			return;
		} 
		if(name == "") {
			$("#award_name").css('borderColor', 'red');
			return;
		} 
		if(type == "") {
			$("#award_type").css('borderColor', 'red');
			return;
		} 
		if(date == "") {
			$("#award_date").css('borderColor', 'red');
			return;
		}
		
		

		$("#addAwardForm").modal('hide');
		$.get("/Addaward?token="+token+"&people="+people+"&name="+name+"&type="+type+"&date="+date, function(response) {
			$("#award_token").val('');
			$("#award_people").val('');
			$("#award_name").val('');
			$("#award_type").val('');
			$("#award_date").val('');
			if(response == "올ㅋ") {
				addPOPUP("등록 성공했습니다.");
				refreshAwardList();
			} else {
				addPOPUP("등록 실패했습니다.");
			}
		});
	});

	// $.get("/post", function(response) {
	// 	$(".post1").html(response[0].message.replace(/\n/g,"<br>"));
	// 	$(".post2").html(response[1].message.replace(/\n/g,"<br>"));
	// 	$(".post3").html(response[2].message.replace(/\n/g,"<br>"));
	// 	$(".post1date").text(formatDate(response[0].created_time));
	// 	$(".post2date").text(formatDate(response[1].created_time));
	// 	$(".post3date").text(formatDate(response[2].created_time));
	// })
	// $.get("/postIMGURI", function(response) {
	// 	$(".post1img").attr('src', response[0].full_picture);
	// 	$(".post2img").attr('src', response[1].full_picture);
	// 	$(".post3img").attr('src', response[2].full_picture);
	// })

	$('.toast').toast('show');

	$('#fullpage').fullpage({
		//options here
		autoScrolling:true, 	
		scrollOverflow: true,
		scrollBar: false,
		keyboardScrolling: false,
		recordHistory: false, 
		

		anchors: ['main','software', 'media', 'record', 'outputs'],
		menu: '#menu',	
		// normalScrollElements: '.curriculem-box, .modal, .aw, .poster',
		normalScrollElements: '.modal, .aw, .poster',

		navigation: true,
        navigationPosition: 'right',
		navigationTooltips: ['App:ple PI','Introduce', '디자인 커리큘럼', '수상실적', '작품']
				
		
	});

	function addPOPUP(message) {
		var ranid = makeid(5);
		$(".popup").append(`
				<div class="toast" role="alert" aria-live="polite" aria-atomic="true" id="AR`+ranid+`" data-delay="5000">
					<div class="toast-header">
					  <strong class="mr-auto">애플파이</strong>
					  <small class="text-muted">방금</small>
					  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					  </button>
					</div>
					<div class="toast-body">
					`+message+`
					</div>
				  </div>
				</div>`);
		$("#AR"+ranid).toast('show');
	}

	function makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	 }

	 function refreshAwardList() {
		 $(".awardtable").append(`
			 <tr>
			 <td><div class="spinner-border text-primary text-center" role="status"></div></td>
			 <td><div class="spinner-border text-primary text-center" role="status"></div></td>
			 <td><div class="spinner-border text-primary text-center" role="status"></div></td>
			 <td><div class="spinner-border text-primary text-center" role="status"></div></td>
			 <td><div class="spinner-border text-primary text-center" role="status"></div></td>
			 </tr>
		   `);
		$(".awardtable").empty();
		$.get("/Getawards", function(response) {
			var i = 0;
			var data;
			var keys = new Array();
			for (data in response) {
				// var people = response[data].people.replace(/(?<=.{1})./, "🍎"); Safari에서 정규표현식 사용 불가
				keys[i] = data;
				i++;
			}
			for (data of keys.reverse()) {
				var peoples = '';
				for(p of response[data].people.split(',')) {
					peoples += '<span class="people_index badge badge-info" >'+p.trim()+'</span>';
				}
				$('.awardtable').append('<tr><td><strong style="color:#888888; font-weight:550; font-size:12px;">'+i+'</strong></td><td style="font-weight:550; font-size:14px;">'+response[data].name+'</td><td>'+peoples+'</td><td style="font-size:14px;">'+response[data].type+'</td><td style="color:#888888; font-size:14px;">'+response[data].date+'</td></tr><hr>');		
				i--;
			}
		});
	 }

	 function remainTime() {
		var now = new Date().getTime();
		var arr = "2020-06-05 23:59:59".split(/[- :]/),
    	end = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);	
		var RemainDate = end - now;
		 
		console.log(RemainDate);

		var hours = Math.floor((RemainDate / (1000*60*60)));
		var miniutes = Math.floor((RemainDate % (1000 * 60 * 60)) / (1000*60));
		var seconds = Math.floor((RemainDate % (1000 * 60)) / 1000);

		$("#left_time").text(hours + "시간 " + miniutes + "분 "+ seconds+"초");
		
		if(RemainDate < 0) {
			clearInterval(remainTimer);
		}
	 }
	 var remainTimer = setInterval(remainTime, 1000);
 
});
