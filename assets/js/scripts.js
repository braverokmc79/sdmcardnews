/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    try {
        var navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector('#mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink')
            } else {
                navbarCollapsible.classList.add('navbar-shrink')
            }

        };
    } catch (error) {
        console.log(error);
    }


    // Shrink the navbar 
    try {
        navbarShrink();    
        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', navbarShrink);

        // Activate Bootstrap scrollspy on the main nav element
        const mainNav = document.body.querySelector('#mainNav');
        //console.log("mainNav :" +mainNav);
        if (mainNav) {

            new bootstrap.ScrollSpy(document.body, {
                target: '#mainNav',
                offset: 74,
            });
        };



        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.body.querySelector('.navbar-toggler');
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map(function (responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
        



});





//토스트 메시지 설정
/*
위치 설정
var toasts = [
    new Toast('error', 'toast-bottom-full-width', 'This is positioned in the bottom full width. You can also style the icon any way you like.'),
    new Toast('info', 'toast-top-full-width', 'top full width'),
    new Toast('warning', 'toast-top-left', 'This is positioned in the top left. You can also style the icon any way you like.'),
    new Toast('success', 'toast-top-right', 'top right'),
    new Toast('warning', 'toast-bottom-right', 'bottom right'),
    new Toast('error', 'toast-bottom-left', 'bottom left')
];
*/

//기본 옵션 설정
toastr.options.closeButton = true;
toastr.options.progressBar = true;
toastr.options.debug = false;
toastr.options.positionClass = "toast-top-right";
toastr.options.onclick = null;
toastr.options.fadeIn = 300;
toastr.options.fadeOut = 300;
toastr.options.timeOut = 1000;
toastr.options.extendedTimeOut = 1000;
toastr.options.preventDuplicates = true;
toastr.options.showMethod = 'slideDown'

//토스트 메시지 설정    
function tWarning(title, content, backgroundColor) {
    toastr.remove();
    toastr.clear();
    // toastr.options = {
    //     "preventDuplicates": true,
    //     closeButton: true,
    //     progressBar: true,
    //     "debug": false,
    //     "positionClass": "toast-top-right",
    //     "onclick": null,
    //     "fadeIn": 300,
    //     "fadeOut": 300,
    //     "timeOut": 1000,
    //     "extendedTimeOut": 1000,
    //     showMethod: 'slideDown'
    // }


    if (title == "") {
        toastr.warning(content);
    } else {
        toastr.warning(title, content);
    }

    if (backgroundColor != null && backgroundColor != "" && backgroundColor != undefined) {
        console.log(backgroundColor);
        $(".toast-warning").css("background-color", backgroundColor);
    } else {
        $(".toast-warning").css("background-color", "#F89406");
    }
}

function tInfo(title, content) {
    toastr.remove();
    toastr.clear();
    if (title == "") toastr.info(content);
    else toastr.info(title, content);
}

function tSuccess(title, content) {
    toastr.remove();
    toastr.clear();
    if (title == "") toastr.success(content);
    else toastr.success(title, content);
}

function tError(title, content) {
    toastr.remove();
    toastr.clear();
    if (title == "") toastr.error(content);
    else toastr.error(title, content);
}


function tConfirm(content) {
    toastr.remove();
    toastr.clear();

    toastr.warning(
        "<div class='text-center'><button type='button' id='confirmationRevertYes' class='mb-xs mt-xs mr-xs btn btn-sm btn-danger'>예</button>" +
        "&nbsp;&nbsp;&nbsp;<button type='button' id='confirmationRevertNo' class='mb-xs mt-xs mr-xs btn btn-sm btn-info'>아니오</button><div>",
        content,
        {
            closeButton: false,
            allowHtml: true,
            onShown: function (toast) {
                $("#confirmationRevertYes").click(function () {
                    alert("ok");
                });

                $("#confirmationRevertNo").click(function () {
                    alert("no");
                });
            }
        });
}









$(function(){
    $(".portfolio-hover-content" ).on("mouseover", function(){
        $(this).parent().parent().parent().effect('bounce',{ direction:'left', times:1, distance: 3},500, callback);
    });
        
    $(".portfolio-hover-content" ).on("mouseleave", function(){       
        $(this).parent().parent().parent().clearQueue();
    });

	$(".page-item.active .page-link").on("click", function(e){
		e.preventDefault();
	});




        
    $("#comment-switch").on("click", function(e){        
        if($(e.target).is(':checked')){           
               $("#comment-switch-text").text('댓글 "ON"');
            return;
        }else{
          $("#comment-switch-text").text('댓글 "OFF" ');
        }
    });

});


function callback() {
}

function fn_egov_select_noticeList(pageNo) {
        document.frm1.pageIndex.value = pageNo; 
        document.frm1.submit();  
}


function imgShow(){

	$("#fancy-0").click();
	
}

modalAction={
	init:function(){
		
		//클릭시 모달 오픈
		$(".portfolio-link").off("click");
				
	    $(".portfolio-link").on("click",function(e){
				modalAction.portfolioOpen(this);	
				//$("#page-top").hide();					
	    });


	},
	
	
	portfolioOpen:function(e){
		$("#topBtn").hide();
		
		$("#commentAdd").val("");
		const nttId=$(e).attr("data-nttid");
		//console.log(nttId);
		$("#nttId").val(nttId);
		
        let w=document.body.offsetWidth;
        let h=document.body.offsetHeight;
        //w=parseFloat(w)*68.75/100;
        w=parseFloat(w)*65/100; //1 첫번째 줄이기
        w=w*70/100; //2 두번째 줄이기

        h=parseFloat(h)*65/100;
        h=h*70/100;

        if(w>=h){
            h=w;
        }

 /* 		if(h>800){
            h=auto;
        }*/
      //  console.log("w2  - {}", w);
       console.log("h  - {}", h);

        let mW=$(".portfolio-modal").css("width");
        let modalContent=$("#modalContent").css("width");
       // console.log("portfolio-modal  - {}", mW);
             
        const html=  `<iframe name="Ifrm" id="Ifrm" style="width:${w}px; height:${h}px;"
        	scrolling="no" src="/portal/cardNews/SelectIframe.do?nttId=${nttId}"></iframe>       
           `;        
        $(".modal-body").html(html);
		$("#commentContent").focus();
		
		const param={
			'nttId':nttId	
		}
		
		$.ajax({
			url:'/portal/cardNews/selectImgList.do',
			type:'post',
			contentType:'application/json;charset=UTF-8',
			data:JSON.stringify(param),
			dataType:"json",
			success:function(res){				
				//res=JSON.parse(res);	
				//console.log(res);	
				
				$("#modal-h2").html(res.boardVO.nttSj);
				$("#modal-date").html(res.boardVO.frstRegisterPnttm);
				
				$("#modal-likeTotCnt").text(res.boardVO.likeTotCnt);
				$("#modal-inqireCo").text(res.boardVO.inqireCo);	
				$("#modal-commentTotCnt").text(res.boardVO.commentTotCnt);		
								
				$("#modal-like  .like-icon").attr("data-nttid", res.boardVO.nttId);				
				$("#modal-like  .like-icon").removeClass("like-active");				
				
				if(res.boardVO.likeCnt==0){
					$("#modal-like .like-icon").removeClass("like-active");					
				}else{
					$("#modal-like  .like-icon").addClass("like-active");
				}
						
				var html="";
				res.FileVOs.forEach((fileVO, i)=>{
				
				html +=					
					`				
<a data-fancybox="gallery" id="fancy-${i}"
href="/cmm/fms/getImage.do?atchFileId=${fileVO.atchFileId}&fileSn=${fileVO.fileSn}"  >
	<img src="/cmm/fms/getImage.do?atchFileId=${fileVO.atchFileId}&fileSn=${fileVO.fileSn}" alt="파일보기링크" />
</a>  		
`					
				});
				
					
				$("#imgList").html(html);
				
			},
			error:function(res){
				console.log("error");
				console.log(res);
			}
			
			
		});
		
		
		comment.list();
	}
	
}



modalAction.init();





