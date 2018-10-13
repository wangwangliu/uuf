var rootUrl = "http://120.55.41.76";
$(function(){
  var pathname = window.location.pathname;
  var id = pathname.substr(pathname.length-1, pathname.length);
  if (id == 1 ) {
    loadFamous();
  }else if(id == 2){
    loadStorys();
  }else if(id == 3){
    loadEvent();
  }
});

function bindDetail(){
  $(".know-item").click(function(){
    var url = $(this).attr("data-url");
    $(".know-content").load(rootUrl+url);
  });
}

function loadFamous(){
  $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Know-Famous.json",
      dataType: "json",
      success: function(data){
          var str='';
          $.each(data,function(i,n){
              str+='<div class="know-item">';
              str+='<div class="know-item-intro">'+ n.level +'</div>';
              str+='<img class="know-item-img" src="'+ (rootUrl + n.mainImg) +'" />';
              str+='<div class="know-item-intro">'+ n.name +'</div>';
              str+='<div class="know-item-intro">'+ n.score +'(W-L-D)</div>';
              str+="</div>";
          });
          $(".know-content").html(str);
 
      }
  });
}

function loadEvent(){
  $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Know-Event.json",
      dataType: "json",
      success: function(data){
          var str='';
          $.each(data,function(i,n){
              str+='<div class="know-item" data-url="'+n.url+'">';
              str+='<img class="know-item-img" src="'+ (rootUrl + n.mainImg) +'" />';
              str+='<div class="know-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".know-content").html(str);
          bindDetail();
      }
  });
}


function loadStorys(){
  $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Know-Story.json",
      dataType: "json",
      success: function(data){
          var str='';
          $.each(data,function(i,n){
              str+='<div class="know-item" data-url="'+n.url+'">';
              str+='<img class="know-item-img" src="'+ (rootUrl + n.mainImg) +'" />';
              str+='<div class="know-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".know-content").html(str);
          bindDetail();
      }
  });
}