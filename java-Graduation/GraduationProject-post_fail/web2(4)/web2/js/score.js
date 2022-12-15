$(document).ready(() => {
    
})

function initScore(scores,para){

    scores.forEach(sc=>{
        let semester = sc.semester;
        let subject = sc.subject;
        let score = sc.scores;
        //if(para.academicyear == sc.academicyear){
            appendScore(semester,subject,score);
        //}
    })
}

function appendScore(semester,subject,score){
    $(".list-apd-score-item").empty();
    let sub;
    switch(subject){
        case '國文':
            sub = 'chn';
            break;
        case '英文':
            sub = 'en';
            break;
        case '數學':
            sub = 'math';
            break;
        case '社會':
            sub = 'social';
            break;
        case '自然':
            sub = 'science';
            break;
    }
    let find = `#score-${sub}-sem${semester}`
    console.log(find);
    $(find).append(`<li class="list-group-item apd-score"><span>段考</span><span id="" class="float-end">${score}<span>分</li>`)

}