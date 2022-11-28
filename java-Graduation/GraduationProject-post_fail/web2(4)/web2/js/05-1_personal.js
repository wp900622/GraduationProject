$(document).ready(() => {
    $(".after-edit").hide();
    $(".before-edit").show();
    if (token == undefined || token == '') {
        window.location.href = "00-2_home.html";
    }
})

function showHideDivPsn(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'edit-stdbtn': //編輯個人資料
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'submit-stdbtn': //確認變更個人資料
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
        case 'edit-volbtn': //編輯個人資料
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'submit-volbtn': //確認變更個人資料
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
        case 'edit-schbtn': //編輯個人資料
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'submit-schbtn': //確認變更個人資料
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
    }
}