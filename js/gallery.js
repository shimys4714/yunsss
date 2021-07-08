var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var user = "193212950@N04"; //유저아이디 변수 생성

//사용자 아이디를 통해서 데이터 호출
$.ajax({
    url : url,
    dataType : "json",
    data : {
        api_key : "9d33df771d1d59016c37bd7c118d5b28",
        per_page : 40,
        format: "json",
        nojsoncallback : 1,
        user_id : user //호출 하고 싶은 유저 아이디 입력 > 변수
    }
})
//데이터 호출이 성공하면 html 구조 생성
.success(function(data){
    //변수 imgs에 이미지 배열형태의 자료를 뽑아서 저장
    console.log(data.photos.photo);
    var imgs = data.photos.photo;

    //배열의 갯수만큼 반복을 돌면서
    $(imgs).each(function(index, data){
        //각 이미지의 제목 저장
        var tit = data.title; 
        //각 이미지의 썸네일 주소 저장
        var imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
        //각 큰 이미지의 주소 저장
        var imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
        //반목하며 생성할 태그를 템플릿 리터럴(문자열) 형태로 미지정
        //변수가 들어갈 곳은 ${}
        var tags = `
            <article>
                <div class="inner">
                    <div class="pic" data-src=${imgSrcBig}>
                        <img src="${imgSrc}">
                    </div>
                    <h2>${tit}</h2>
                </div>
            </article>
        `;
        //갤러리 프레임 안쪽에 반복을 돌면서 위쪽의 태그구조를 동적으로 추가.
        $("#gallery").append(tags);

        // $("#gallery")
        //     .append(
        //         $("<article>")
        //             .append(
        //                 $("<div class='inner'>")
        //                     .append(
        //                         $("<div class='pic'>")
        //                     )
        //             )
        //     )

    })
})
.error(function(err){
    console.log(err);
});

//이미지 클릭하면 팝업 생성하기.
$("body").on("click", "#gallery article .pic", function(){
    var imgSrc = $(this).attr("data-src");

    var tags = `
        <aside id="imgPop">
            <div class="pic">
                <img src="${imgSrc}">
            </div>
            <span>CLOSE</span>
        </aside> 
    `;

    $("body").append(tags);

});
//close 클릭하면 닫히기.
$("body").on("click", "#imgPop span", function(){
    $(this).parent("#imgPop").remove();
})