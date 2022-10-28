let stat = $("#ddl-loginflag").attr("value");
$(document).ready(() => {
    statInit('1', 0);
    initLesTable()
    initHiddenDiv();
})

function initHiddenDiv(){
    $(".after-edit").hide();

}

function showHideDivStd(divId) { //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch (divId) {
        case 'bar-student-home':
            if (stat == 0) {
                window.location.href = 'newhome.html';
            }
            else {
                $(".div-block").hide();
                $("#home-div").show();
            }
            break;
        case 'bar-student-index':
            $(".div-block").hide();
            $("#std-index-div").show();
            break;
        case 'bar-student-score':
            $(".div-block").hide();
            $("#std-score-div").show();
            break;
        case 'stdddl-personal':
            $(".div-block").hide();
            $("#std-personal-div").show();
            break;
        case 'edit-stdbtn':
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'submit-stdbtn':
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
    }
}

function initLesTable() {

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById("lesson-table").appendChild(table);

    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "一";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "二";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "三";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "四";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "五";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    thead.appendChild(row_1);


    // Creating and adding data to second row of the table
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "1";
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "MON1";
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "TUE1";
    let row_2_data_4 = document.createElement('td');
    row_2_data_4.innerHTML = "WED1";
    let row_2_data_5 = document.createElement('td');
    row_2_data_5.innerHTML = "THR1";
    let row_2_data_6 = document.createElement('td');
    row_2_data_6.innerHTML = "FRI1";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);
    row_2.appendChild(row_2_data_5);
    row_2.appendChild(row_2_data_6);
    tbody.appendChild(row_2);


    // Creating and adding data to third row of the table
    let row_3 = document.createElement('tr');
    let row_3_data_1 = document.createElement('td');
    row_3_data_1.innerHTML = "2";
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = "MON2";
    let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = "TUE2";
    let row_3_data_4 = document.createElement('td');
    row_3_data_4.innerHTML = "WED2";
    let row_3_data_5 = document.createElement('td');
    row_3_data_5.innerHTML = "THR2";
    let row_3_data_6 = document.createElement('td');
    row_3_data_6.innerHTML = "FRI2";

    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    row_3.appendChild(row_3_data_3);
    row_3.appendChild(row_3_data_4);
    row_3.appendChild(row_3_data_5);
    row_3.appendChild(row_3_data_6);
    tbody.appendChild(row_3);

    let row_4 = document.createElement('tr');
    let row_4_data_1 = document.createElement('td');
    row_4_data_1.innerHTML = "3";
    let row_4_data_2 = document.createElement('td');
    row_4_data_2.innerHTML = "MON3";
    let row_4_data_3 = document.createElement('td');
    row_4_data_3.innerHTML = "TUE3";
    let row_4_data_4 = document.createElement('td');
    row_4_data_4.innerHTML = "WED3";
    let row_4_data_5 = document.createElement('td');
    row_4_data_5.innerHTML = "THR3";
    let row_4_data_6 = document.createElement('td');
    row_4_data_6.innerHTML = "FRI3";

    row_4.appendChild(row_4_data_1);
    row_4.appendChild(row_4_data_2);
    row_4.appendChild(row_4_data_3);
    row_4.appendChild(row_4_data_4);
    row_4.appendChild(row_4_data_5);
    row_4.appendChild(row_4_data_6);
    tbody.appendChild(row_4);

    let row_5 = document.createElement('tr');
    let row_5_data_1 = document.createElement('td');
    row_5_data_1.innerHTML = "4";
    let row_5_data_2 = document.createElement('td');
    row_5_data_2.innerHTML = "MON4";
    let row_5_data_3 = document.createElement('td');
    row_5_data_3.innerHTML = "TUE4";
    let row_5_data_4 = document.createElement('td');
    row_5_data_4.innerHTML = "WED4";
    let row_5_data_5 = document.createElement('td');
    row_5_data_5.innerHTML = "THR4";
    let row_5_data_6 = document.createElement('td');
    row_5_data_6.innerHTML = "FRI4";

    row_5.appendChild(row_5_data_1);
    row_5.appendChild(row_5_data_2);
    row_5.appendChild(row_5_data_3);
    row_5.appendChild(row_5_data_4);
    row_5.appendChild(row_5_data_5);
    row_5.appendChild(row_5_data_6);
    tbody.appendChild(row_5);

    let row_6 = document.createElement('tr');
    let row_6_data_1 = document.createElement('td');
    row_6_data_1.innerHTML = "5";
    let row_6_data_2 = document.createElement('td');
    row_6_data_2.innerHTML = "MON5";
    let row_6_data_3 = document.createElement('td');
    row_6_data_3.innerHTML = "TUE5";
    let row_6_data_4 = document.createElement('td');
    row_6_data_4.innerHTML = "WED5";
    let row_6_data_5 = document.createElement('td');
    row_6_data_5.innerHTML = "THR5";
    let row_6_data_6 = document.createElement('td');
    row_6_data_6.innerHTML = "FRI5";

    row_6.appendChild(row_6_data_1);
    row_6.appendChild(row_6_data_2);
    row_6.appendChild(row_6_data_3);
    row_6.appendChild(row_6_data_4);
    row_6.appendChild(row_6_data_5);
    row_6.appendChild(row_6_data_6);
    tbody.appendChild(row_6);

    let row_7 = document.createElement('tr');
    let row_7_data_1 = document.createElement('td');
    row_7_data_1.innerHTML = "6";
    let row_7_data_2 = document.createElement('td');
    row_7_data_2.innerHTML = "MON6";
    let row_7_data_3 = document.createElement('td');
    row_7_data_3.innerHTML = "TUE6";
    let row_7_data_4 = document.createElement('td');
    row_7_data_4.innerHTML = "WED6";
    let row_7_data_5 = document.createElement('td');
    row_7_data_5.innerHTML = "THR6";
    let row_7_data_6 = document.createElement('td');
    row_7_data_6.innerHTML = "FRI6";

    row_7.appendChild(row_7_data_1);
    row_7.appendChild(row_7_data_2);
    row_7.appendChild(row_7_data_3);
    row_7.appendChild(row_7_data_4);
    row_7.appendChild(row_7_data_5);
    row_7.appendChild(row_7_data_6);
    tbody.appendChild(row_7);

    let row_8 = document.createElement('tr');
    let row_8_data_1 = document.createElement('td');
    row_8_data_1.innerHTML = "7";
    let row_8_data_2 = document.createElement('td');
    row_8_data_2.innerHTML = "MON7";
    let row_8_data_3 = document.createElement('td');
    row_8_data_3.innerHTML = "TUE7";
    let row_8_data_4 = document.createElement('td');
    row_8_data_4.innerHTML = "WED7";
    let row_8_data_5 = document.createElement('td');
    row_8_data_5.innerHTML = "THR7";
    let row_8_data_6 = document.createElement('td');
    row_8_data_6.innerHTML = "FRI7";

    row_8.appendChild(row_8_data_1);
    row_8.appendChild(row_8_data_2);
    row_8.appendChild(row_8_data_3);
    row_8.appendChild(row_8_data_4);
    row_8.appendChild(row_8_data_5);
    row_8.appendChild(row_8_data_6);
    tbody.appendChild(row_8);

    let row_9 = document.createElement('tr');
    let row_9_data_1 = document.createElement('td');
    row_9_data_1.innerHTML = "8";
    let row_9_data_2 = document.createElement('td');
    row_9_data_2.innerHTML = "MON8";
    let row_9_data_3 = document.createElement('td');
    row_9_data_3.innerHTML = "TUE8";
    let row_9_data_4 = document.createElement('td');
    row_9_data_4.innerHTML = "WED8";
    let row_9_data_5 = document.createElement('td');
    row_9_data_5.innerHTML = "THR8";
    let row_9_data_6 = document.createElement('td');
    row_9_data_6.innerHTML = "FRI8";

    row_9.appendChild(row_9_data_1);
    row_9.appendChild(row_9_data_2);
    row_9.appendChild(row_9_data_3);
    row_9.appendChild(row_9_data_4);
    row_9.appendChild(row_9_data_5);
    row_9.appendChild(row_9_data_6);
}
