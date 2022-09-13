function PostData(url , data){
    return fetch(url,{
        body: JSON.stringify(data),
        
        headers: {
            'header-agent': 'Example',
            'content-type' : 'application/json'
        },
        method: 'POST',
       
       
    }).then(response=> response.json)
}
function submit(){
    const validationServer01 = document.getElementById('validationServer01').value;
    const validationServer02 = document.getElementById('validationServer02').value;
    const validationServer03 = document.getElementById('validationDefault03').value;
    const validationServer04 = document.getElementById('validationDefault04').value;
    const validationServer05 = document.getElementById('validationDefault05').value;
    const validationServer06 = document.getElementById('validationDefault06').value;
    const validationServer07 = document.getElementById('validationDefault07').value;
    const validationServer08 = document.getElementById('validationDefault08').value;
    const data = {'school_account':validationServer01 ,'pwd': validationServer02,'school_account':validationServer03,'telephone':validationServer04,
        'address_county':validationServer05,'address_district':validationServer06,'address':validationServer07,'mail':validationServer08}; 
    console.log(data);
   const uri = 'http://140.134.24.157:53008/schoolpost';
    PostData(uri, data.String).then(
        console.log(data.result)
    )
    

    
}
