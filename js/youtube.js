//로딩 완료시 유튜브 데이터 호출
$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType:"jsonp", 
    data:{
        part:"snippet", 
        key:"AIzaSyDOSnqALQfHxM4ffPCF7DwTOBnzaNHmlNM", //api키값 
        maxResults : 6, //호출 갯수 
        playlistId: "PL7hVQ41w3GSlVLbpnyVfCrkahRjo10718" // 플레이리스트 아이디 
    }
})
.success(function(data){
    var items = data.items;
    //반복해서 만들 DOM문자열이 저장될 빈 문자열 전역변수 생성
    var result = "";

    //데이터 갯수만큼 방복
    $(items).each(function(index, data){
        console.log(data);

        var title = data.snippet.title;
        if(title.length > 50){
            title = title.substr(0,50) + "...";
        };

        var contents = data.snippet.description;
        if(contents.length > 100){
            contents = contents.substr(0,70) + "...";
        };

        var date = data.snippet.publishedAt;
        date = date.split("T")[0];
        
        //빈 문자열에 계속해서 아래 문자코드를 중첩해서 더함
        result += `
            <article>
                <a href=${data.snippet.resourceId.videoId} class="pic">
                    <img src=${data.snippet.thumbnails.high.url}>
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${contents}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;
    });
    //반복되며 충첩된 dom생선 문자결과값을 .vidList에 삽입해서 DOM 생성
    $(".vidList").append(result);
})
.error(function(err){
    console.error(err)
});

$("body").on("click",".vidList article", function(e){
    e.preventDefault();
    var vidSrc = $(this).find(".pic").attr("href");
    console.log(this);
    $(".vidPop").fadeIn();
    $(".vidPop .inner").append(
        $("<iframe>").attr({
            src : "https://www.youtube.com/embed/"+vidSrc,
            frameborder : 0,
            allowfullscreen : true,
            width: "90%",
            height: "90%"
        })
    );
});

$("body").on("click", ".vidPop span", function(){
    $(this).parent().fadeOut(400, function(){
        $(this).find("iframe").remove();
    });
})
