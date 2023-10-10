/// <reference path="jquery-3.1.1.min.js" />

// let section = document.querySelectorAll('section');
// let pages = document.querySelectorAll('a');


// window.onscroll=()=>{
//     section.forEach(sec=>{
//         let top = window.scrollY;
//         let offset = sec.offsetLeft;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute('id');

//         if(top=>offset&&top<offset+height){
//             pages.forEach(links=>{
//                 links.classList.remove('active');
//                 document.querySelector('aside a[href*='+id+']').classList.add('active');
//             });
//         };
//     });
// };

// function loadHtml(id,filename){
//     let xhttp;
//     let element = document.getElementById(id);
//     let file = filename;

//     if(file){
//         xhttp= new XMLHttpRequest();
//         xhttp.onreadystatechange = function(){
//             if(this.readyState==4){
//                 if(this.status==200){element.innerHTML=this.responseText();}
//                 if(this.status==404){element.innerHTML="<h1>Not found</h1>";}
//             }
//         }
//         xhttp.open("GET","mainbody/${file}",true);
//         xhttp.send();
//         return;
//     }
// }

$(document).on('click', 'aside a', function(){
    $(this).addClass('active').siblings().removeClass('active');
});


window.onload=function(){
    document.getElementById("hm").click();
}

$(document).ready(function(){
    $('#sess').click(function(){
        $('#mainbody').load('/HTML/sessionStorage.html')
    })
})
$(document).ready(function(){
    $('#loc').click(function(){
        $('#mainbody').load('/HTML/localStorage.html')
    })
})
$(document).ready(function(){
    $('#ind').click(function(){
        $('#mainbody').load('/HTML/indexedDB.html')
    })
})

$(document).ready(function(){
    $('#webs').click(function(){
        $('#mainbody').load('/HTML/webSql.html')
    })
})

$(document).ready(function(){
    $('#hm').click(function(){
        $('#mainbody').load('/HTML/id.html')
    })
})