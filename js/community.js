//게시글 json데이터 위치 전역변수에 저장
const url = "data/board.json";
//동적으로 생성할 테이블의 위치 전역변수에 저장
const frame = $(".community .inner");

//callData함수에 주소값을 호출한뒤 나온
//데이터 배열을 변수 resultData에 저장
const resultData = callData(url);

//createTable함수에 타겟위치와, 배열데이터를 인수로 넣어서
//동적으로 테이블 생성완료
createTable(frame, resultData);


//json데이터로부터 게시글 내용을 배열로 반환해주는 함수 정의
function callData(url){  
    //배열값을 저장할 빈 변수인 result생성 
    let result;

    //실시간으로 외부서버의 데이터 가져옴
    $.ajax({
        url : url,
        dataType : "json",
        async : false //무조건 ajax구문이 끝나야 다음 구문이 순차적으로 실행되게 하는 구문
    })
    .success((data)=>{
        //불러온 데이터 덩어리 안쪽에서 배열만 위쪽에 만든
        //빈 변수 result에 저장
        result = data.board;    
    })
    .error((err)=>{
        console.error(err);
    });
  
    //배열이 담겨있는 변수 result를 함수 외부로 내보냄
    return result;
}


//대상위치와 배열을 인수로 받아서 동적으로 테이블 생성해주는 함수 정의
function createTable(target, data){
    //table과 그안에 caption, thead, tbody 하나만 생성
    target.append(
        $("<table>")
            .attr("summary", "자유게시판의 글번호, 제목, 작성자")
            .append(
                $("<caption class='hidden'>").text("자유게시판"),
                $("<thead>")
                    //thead안쪽에 tr을 하나만 만듬
                    .append(
                        //다시 제목줄 안쪽에는 첫번쨰 th만 하나 만듬
                        $("<tr>")
                            .append('<th scope="col">No</th>')
                    ),
                //tbody 도 하나만 만듬
                "<tbody>"
            )
    );
    
    //제목줄에 나머지 th태그 3개를 객체 하나의 키값을 갯수만큼 
    //반복을 돌면서 key값의 이름을 th의 제목으로 설정
    for(let key in data[0]){
        console.log(key);

        target.find("thead tr")
            .append(
                $("<th scope='col'>").text(key)
            )
    }

    
    //tbody안쪽에서 이번에는 배결의 갯수만큼 반복을 돌면서 
    //tr생성하고 그 안쪽 td도 생성
    for(let i=0; i<data.length; i++){           
        //tbody를 찾은뒤
        target.find("tbody")
            //tr생성을 해서 prepend로 위쪽에 삽입
            //나중에 작성된 최신글이 게시글 상단에 있어야 되기때문)
            .prepend(
                $("<tr>")
                    .append(
                        //i값 증가시켜서 글번호 생성
                        $("<td>").text(i+1),
                        //객 반복을 도는 배열안의 객체값을 활용해서 
                        //나머지 td값을 생성
                        $("<td>")                        
                            .append(
                                $("<a>").attr("href","#").text(data[i].title)
                            ),
                        $("<td>").text(data[i].writer),
                        $("<td>").text(data[i].date)                        
                    )
            )
    }
}
