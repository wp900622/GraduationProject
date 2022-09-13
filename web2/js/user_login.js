function submit() {
    const exampleInputEmail1 = document.getElementById("exampleInputEmail1").value;
    const exampleInputPassword1 = document.getElementById("exampleInputPassword1").value;
    const exampleInputidentity = document.getElementById("exampleInputidentity").value;
    const data = [exampleInputEmail1, exampleInputPassword1, exampleInputidentity];
    console.log(data);
    const name = 'oxxo';
    const age = 18;
    var mail_pass = 0;
    var pwd_pass = 0;
    if (exampleInputidentity == 1) {
        
         // 有興趣的可以使用下方的網址測試
        const uri = `http://140.134.24.157:53008/student`;
        
        fetch(uri, {method:'GET'})
        .then(res => {
            return res.json();   // 使用 text() 可以得到純文字 String
        }).then(result => {
            console.log(result);
            for(i = 0  ; i < result.length ; i++){
                if(result[i].mail === exampleInputEmail1){
                    mail_pass = 1;
                    break;
                }
            }
            if(mail_pass == 0){
                document.getElementById("login").innerHTML = "此帳號不存在"
             }
             if(result[i].pwd === exampleInputPassword1){
                document.getElementById("login").innerHTML = "密碼正確"
                window.location.href = 'student.html'

             }else{
                document.getElementById("login").innerHTML = "密碼不正確"
             }
             // 得到「你的名字是：oxxo，年紀：18 歲。」
        });
       
       
    } else if (exampleInputidentity == 2) {//志工
        

    } else if (exampleInputidentity == 3) {//學校

    }
}