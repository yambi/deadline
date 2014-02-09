var limit;
var params = {};


$(function(){
    var searches = location.search.substring(1).split("&");
    while(searches.length){
        var p=searches.pop().split("=");
        params[p[0]]=decodeURI(p[1]);
    }
    document.title=params["title"]+"タイマー";
    limit = $.exDate(params["date"],"yyyy/mm/dd;hh:mi");
    var tid=setInterval(count,100);
});

function count(){
   var date = new Date();
   var ctime = Date.parse(date)
   var remain = Math.floor((limit-ctime)/1000);
   var day = Math.floor(remain/60/60/24);
   var rday = remain-day*60*60*24;
   var hour = Math.floor(rday/60/60);
   var rhour = rday-hour*60*60;
   var min = Math.floor(rhour/60);
   var sec = rhour-min*60;

   $("#midashi").text(params["title"]+"まで");
   if(remain>0) {
      $("#count").text("残り："+day+"日"+hour+"時間"+min+"分"+sec+"秒");
   }
   else{
      $("#count").text("Time Limit Exceeded!!");
   }
   $("#ntime").text("現在："+date.toLocaleString());
   $("#limit").text("期限："+limit.toLocaleString());
   $("#min").text("分："+Math.floor(remain/60));
   $("#sec").text("秒："+remain);
}


function format(s){
    s=""+s;
    if(s.length==1)return "0"+s;
    else return s;
}

function tomorrow(){
    var midnight = new Date();
    midnight.setHours(24,0,0,0);
   location.href="?title=明日&date="+midnight.getFullYear()+"/"+format(midnight.getMonth()+1)+"/"+format(midnight.getDate())+";00:00";
}
