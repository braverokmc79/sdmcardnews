let inFinitycurrentPageNo=1;
infinityScroll={
	init:function(){
		this.getList();
				
		//스크롤 바닥 감지
		window.onscroll = function(e) {
		    //window height + window scrollY 값이 document height보다 클 경우,
		    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {						
				infinityScroll.getList(inFinitycurrentPageNo);				
		    }
		};
				
	},
	
	
	getList:function(pageIndex){
		if(pageIndex==null || pageIndex==undefined || pageIndex=="" || pageIndex==0){
			pageIndex=1;
		}
		
		const menuActive = $("#menuActive").val();
		
		const param={
			'pageIndex':pageIndex,
			'menuActive':menuActive
		}
		
		$.ajax({
			url:'/portal/infiniteScroll.do',
			type:'post',
			contentType:'application/json;charset=UTF-8',
			data:JSON.stringify(param),
			dataType:"json",
			success:function(res){				
				//res=JSON.parse(res);	
				//console.log(res);
				
				//**** 서버에서 계산된 마지막 페이지 번호가  자사스크립트 currentPageNo 작을 경우 중단처리
				if(inFinitycurrentPageNo >res.paginationInfo.lastPageNo)return;									
				console.log("inFinitycurrentPageNo : currentPageNo  - ", inFinitycurrentPageNo , res.paginationInfo.lastPageNo);
				inFinitycurrentPageNo++;
				
				
				let html="";
				res.resultList.forEach(function(result){
					
									
						let likeActive="";
						if(result.likeCnt!="0"){
							likeActive='like-active';
						}
						
						
						html +=`
						
								                    <div class="col-lg-4 col-sm-6 mb-4">                 
						                        <div class="portfolio-item">
						                            <a class="portfolio-link"  data-bs-toggle="modal" href="#portfolioModal1" data-nttId="${result.nttId}">
						                                <div class="portfolio-hover">
						                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
						                                </div>
						                  		
											     <img class="img-fluid" 
													  src='/cmm/fms/getImage.do?atchFileId=${result.atchFileId}&fileSn=0"/>' 
													 alt="${result.frstRegisterNm}" />
						                                
						                            </a>
						                            <div class="portfolio-caption">
						                                <div class="portfolio-caption-heading">
															${result.nttSj}								
						                                </div>
						                                <div class="portfolio-caption-subheading text-muted">
						
						                      
						                                    <div class="row">
						                                        <div class="col-md-12">
					
						  
										 					 <span class="me-2 news-date"
										 					  data-bs-toggle="tooltip" data-bs-placement="top" title="등록일" >	
										 					 	<i class="fa fa-calendar" ></i> 		 					 	
										 					 	<span>${result.frstRegisterPnttm}</span>     
										 					 </span>
						  
						 		                             <span class="me-2 news-like like-icon ${likeActive}" data-nttId="${result.nttId}"		 		                             
						 		                              data-bs-toggle="tooltip" data-bs-placement="top" title="좋아요" >		 		                             		                                       
						                                        <i class="fa fa-heart heart" ></i>
						                                        <span>
						                                         	${result.likeTotCnt}   
						                                         </span>	                                     
						                                     </span>
							                                        
						                                     <span class="me-2 news-views"
						                                       data-bs-toggle="tooltip" data-bs-placement="top" title="조회수" >		                                        
						                                        <i class="fa fa-eye"></i>		                                     
						                                        <span>${result.inqireCo}</span>                                  		                                         
						                                     </span>
						                                     
						                                     <span class="me-2 news-comments"
						                                     	data-bs-toggle="tooltip" data-bs-placement="top" title="댓글수" >	
						                                     	<i class="fa fa-comments" id="fa-comments"></i> 
						                                     	<span>${result.commentTotCnt}</span>
						                                     </span>
						                                        
						                                        </div>
						                                    </div>
						                                </div>
						                            </div>
						                        </div>
						                    </div> 
						
						
						
						`;
		
		
		
					});//forEach
	
						
					if(res.resultCnt==0){//전체 게시물 갯수가 0이면
						html=`
							<div class="col-lg-12 col-sm-12 mb-12 text-center" >
						   		<h5>등록된 데이터가 없습니다.</h5>     				   	
					 		</div>
						`;
					}	
						
					$("#contentList").append(html);
					
					
					like.init();
					modalAction.init();				
					
					
					var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
					var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
					  return new bootstrap.Tooltip(tooltipTriggerEl)
					})
						
			},
			error:function(res){
				console.log("error");
				console.log(res);
			}
			
			
		});
		
		
	}
	
}


infinityScroll.init();


