function statInit(identity,stat){ //初始狀態
    console.log(identity,stat);
    switch(identity){
        case '1' :
            if(stat == 0){
                $(".div-block").hide();
                $("#std-login-div").show();
            }
            else{
                $(".div-block").hide();
                $("#std-home-div").show();
            }
            break;

        case '2' :
            
            break;

        case '3' :
            if(stat == 0){
                $(".div-block").hide();
                $("#sch-login-div").show();
            }
            else{
                $(".div-block").hide();
                $("#sch-home-div").show();
            }
            break;


    }
    

}