
let like={
	
	init:function(){
		
		$(".like-icon").off("click"); 		 
		$(".like-icon").on("click", function (e) {
              like.likeAction(this);
 		 });

	},
	
	
	likeAction:function(e){
	
		console.log("likeAction   ->");
		console.log(e);
	
		const nttId =$(e).attr("data-nttId");
		console.log(nttId);
		
		const param={
			'nttId':nttId
		}

		$.ajax({
				url:'/portal/like/likeAction.do',
				type:'post',
				contentType:'application/json;charset=UTF-8',
				data:JSON.stringify(param),
				success:function(res){						
					//console.log(res);
					$(e).removeClass("like-active");
					
					let cnt=$(e).children("span").text();
					//console.log("0좋아요갯수:"+ cnt);
					
					cnt=cnt.replace(/\n/g, "");
					cnt=cnt.replace(/\s*/g, "");	
					cnt=Number(cnt);
					cnt=parseInt(cnt);

										
					if(res=="1"){
						$(e).addClass("like-active");	
						cnt++;					
			            tInfo("좋아요!","");
					}else{
						tWarning("좋아요 취소!");
						cnt--;
			            $(e).removeClass("like-active");
					}	
					
					$(e).children("span").text(cnt);
									
				},
				error:function(res){
		/*			console.log("error");
					console.log(res);*/	
				}
						
			});
	}		
}


like.init();

