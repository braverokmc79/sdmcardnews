let totalData; //총 데이터 수
let dataPerPage; //한 페이지에 나타낼 글 수
let pageCount; //페이징 개수
let currentPage; //현재 페이지
let comment = {
     
    init: function() {  
        //this.list();  

		$("#commentAdd").on("click", function(e){
				comment.commentAdd();			
		});
	
	
		$(".comment-delete").on("click", function(e){
			comment.commentDelete(e.target);			
		});
		
		$("#flexSwitchCheckChecked").on("click", function(e){
			$("#comment-add-list").toggle();
			$("#pagingul").toggle();
			
		});
		  
    },
 
    list: function(page) {
        if (page == undefined || page == "") {
            page = 1;
        }
 		const data= {
			'nttId':$("#nttId").val(),
			'page': ""+page,
			'subPageIndex':page
		}
 		//console.log(data);
	
	
		$.ajax({
			url:'/portal/comment/selectArticleCommentList.do',
			type:'post',
			contentType:'application/json;charset=UTF-8',
			data:JSON.stringify(data),
			dataType:"json",
			success:function(res){
				//console.log(res);
	            totalData = res.resultCnt;
	            dataPerPage = res.paginationInfo.recordCountPerPage;
	            pageCount = res.paginationInfo.totalPageCount;
	            currentPage = res.paginationInfo.currentPageNo;
	 				
				//{item.wrterId}
				//console.log(totalData);
				//console.log(dataPerPage);
				//console.log(pageCount);
				//console.log(currentPage);
				const LoginUniqId=$("#LoginUniqId").val();
				
					$("#totalData").text('댓글('+totalData+")");	
					$("#modal-commentTotCnt").text(totalData);	
			
		            if (res.resState=="success") {
		                let html = "";
		                res.resultList.forEach(function(item) {
			
		 html +=`
						<div class="col-md-12 mb-2" >
                    <div class="card p-3 ">
                        <div class="d-flex justify-content-between align-items-left">
                      <div class="user d-flex flex-row align-items-left">
                        <span><small class="font-weight-bold  comment-user"><b style="color:#000">${item.frstRegisterNm}</b></small> 
                            <small class="font-weight-bold comment-text" id="comment-text-${item.commentNo}" >${item.commentCn}</small>	
                        </span>                          
                      </div>

                      <small>${item.frstRegisterPnttm}</small>
                      </div>


					<div id="update-comment-textarea-${item.commentNo}" class="mt-3" style="display:none;">
						<textarea class="form-control update-comment-textarea" data-id="updateComment-${item.commentNo}"  onkeyup="fn_checkByte(this)" >${item.commentCn}</textarea>
						 <sup class="supComment-left" id="sup-updateComment-${item.commentNo}"></sup>
					</div>
		`;
		
		
		var  html2 =`
		
                      <div class="action mt-2 " style="text-align:right" >                                              
						  <div class="reply px-4" style="display:inherit">	                  
                      
						 <div class="icons align-items-center comment-btn" 
					 id="commentUpdateFormBtn-${item.commentNo}"   data-id='${item.commentNo}'   onclick="comment.commentUpdateForm(this)">
                            <i class="fa fa-trash text-default"></i>
                            수정                    
                        </div> 
 
                       <div class="icons align-items-center  comment-btn"  style="display:none;" id="commentUpdateBtn-${item.commentNo}"  data-id='${item.commentNo}' onclick="comment.commentUpdate(this)">
                            <i class="fa fa-trash text-default success"></i>
                            수정 하기                  
                        </div> 
  
                       <div class="icons align-items-center comment-btn comment-delete" style=" margin-left: 10px;"	
						 data-id='${item.commentNo}'   onclick="comment.commentDelete(this)">
                            <i class="fa fa-trash text-default"></i>
                            삭제                    
                        </div>  
					</div>
			`	;	
           
	
				if(item.wrterId==LoginUniqId){
						html +=html2;
				}
	
			html +=`             
                      </div>
                    </div> 	
				</div>
					`;	



		                });
		 
		 
		               $("#comment-add-list").html(html);
		            }
		 
		            //페이징 표시 호출
		            comment.paging();
		             
		            //삭제 이벤트 추가
		   /*         let fileDeletes=document.querySelectorAll(".fileDeleteBtn");            
		            for(let i=0; i<fileDeletes.length; i++){
		                fileDeletes[i].addEventListener("click", function(e){
		                        fileList.fileDelete(e.target.getAttribute("data-id"));  
		                });
		            }
		             */
             				
				
			},
			error:function(res){
				console.log("error");
				console.log(res);	
			}
					
		});
			


 
    },
 

	commentAdd:function(){
			const commentContent =$("#commentContent").val();
					const nttId=$("#nttId").val();
					
					if(commentContent==""){
						tWarning("댓글을 입력해 주세요.");
						$("#commentContent").focus();
						return;
					}
					
					const param={
						"commentCn":commentContent,
						"nttId":nttId
					}
					
					
					$.ajax({
						url:'/portal/comment/insertArticleComment.do',
						type:'post',
						contentType:'application/json;charset=UTF-8',
						data:JSON.stringify(param),
						success:function(res){
							if(res=="success"){
								$("#commentContent").val("");
								$("#sup-commentContent").html("[0자 / 150]");
								comment.list();	
							}
							
						},
						error:function(res){
							console.log("error");
							console.log(res);	
						}
								
					});
						
	},


	commentDelete:function(e){
		
		if(confirm("정말 삭제 하시겠습니까?")){
				 const commentNo =$(e).attr("data-id");
				 console.log(commentNo);				
				  const param={
						"commentNo":commentNo
				   }
								
				$.ajax({
					url:'/portal/comment/deleteArticleComment.do',
					type:'post',
					contentType:'application/json;charset=UTF-8',
					data:JSON.stringify(param),
					success:function(res){
						if(res=="success"){							
							comment.list();	
							tInfo("삭제 처리 되었습니다.");
						}
						
					},
					error:function(res){
						console.log("error");
						console.log(res);	
					}
							
				});						
		}		
		
	},


	commentUpdateForm:function(e){
			 const commentNo =$(e).attr("data-id");
			// console.log(commentNo);
			 $("#comment-text-"+commentNo).css("display","none");
			 $("#update-comment-textarea-"+commentNo).show();	
		
		 	 $("#commentUpdateFormBtn-"+commentNo).css("display","none");
			 $("#commentUpdateBtn-"+commentNo).show();
			 $("#update-comment-textarea-"+commentNo +" textarea").focus();	
						
	} ,


		//업데이트 처리
	commentUpdate:function(e){
		    const commentNo =$(e).attr("data-id");
			const commentCn=$("#update-comment-textarea-"+commentNo +" textarea").val();
			const nttId=$("#nttId").val();
			if(commentCn==""){
				 tWarning("내용을 입력해 주세요.");	
				 $("#update-comment-textarea-"+commentNo +" textarea").focus();		
				return;
			}
			
			
			const param={
						"commentCn":commentCn,
						"commentNo":commentNo,
						"nttId":nttId
			}
			
		   $.ajax({
					url:'/portal/comment/updateArticleComment.do',
					type:'post',
					contentType:'application/json;charset=UTF-8',
					data:JSON.stringify(param),
					success:function(res){
						if(res=="success"){							
							 $("#comment-text-"+commentNo).css("display","block");
							 $("#update-comment-textarea-"+commentNo).hide();	
						
						 	 $("#commentUpdateFormBtn-"+commentNo).css("display","inline");
							 $("#commentUpdateBtn-"+commentNo).hide();
						   	 $("#comment-text-"+commentNo).text(commentCn);
							 tInfo("업데이트 처리 되었습니다.")
						}						
					},
					error:function(res){
						console.log("error");
						console.log(res);	
					}
							
				});				
			
		
;		
			 				
	} ,



	flexSwitchCheckChecked:function(){
		
	},



    // 페이징 표시 함수 
     //function(totalData, dataPerPage, pageCount, currentPage)
    paging: function(){
       // console.log("currentPage : " + currentPage);
 
        totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 수
 
        if (totalPage < pageCount) {
            pageCount = totalPage;
        }
 
        let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹
        let last = pageGroup * pageCount; //화면에 보여질 마지막 페이지 번호
 
        if (last > totalPage) {
            last = totalPage;
        }
 
        let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
        let next = last + 1;
        let prev = first - 1;
 
        let pageHtml = "";
 
        if (prev > 0) {
            pageHtml += "<li><a href='#' id='prev'> « </a></li>";
        }
 
        //페이징 번호 표시 
        for (var i = first; i <= last; i++) {
 
            if (currentPage == i) {
                pageHtml +=
                    "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
            } else {
                pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
            }
        }
 
 
        if (last < totalPage) {
            pageHtml += "<li><a href='#' id='next'> » </a></li>";
        }
 
 		
	
        document.querySelector("#pagingul").innerHTML = pageHtml;
 
       // let displayCount = "";
       // displayCount = "현재 1 - " + totalPage + " (" + currentPage + "페이지) / " + totalData + "건";
       // document.querySelector("#displayCount").innerText = displayCount;
 
 
        //페이징 번호 클릭 이벤트 
        const paginationClass = document.querySelectorAll("#pagingul li a");
        for (let i = 0; i < paginationClass.length; i++) {
            paginationClass[i].addEventListener("click", function(e) {
                e.preventDefault();
 
                let $id = this.getAttribute("id")
                selectedPage = this.innerText;
 
                console.log("선택한 페이지 ", selectedPage);
                if ($id == "next") selectedPage = next;
                if ($id == "prev") selectedPage = prev;
                comment.list(selectedPage);
            });
        }
 
    },




 
}
 
 

//textarea 바이트 수 체크하는 함수
function fn_checkByte(obj){   
	var id=$(obj).attr("data-id");
	var strValue = obj.value;
	var strLen = strValue.length;
	var str = "";
	str += '[' + strLen + '자 / 150]';
	if(strLen > 149){
		alert("제한 글자를 초과하였습니다.");
		$(obj).val(strValue.substring(0, 148));
	}
	
	$("#sup-"+id).html(str);
   
}

 
comment.init();