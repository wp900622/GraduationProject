
function fillCities() {
    let cities = getCities();
    let count = 0;
    for (let city of cities) {
        if (count == 0) {
            $('#studentCitySelect').append('<option value="' + city + '" selected>' + city + '</option>');
            $('#volunteerCitySelect').append('<option value="' + city + '" selected>' + city + '</option>');
            $('#schoolCitySelect').append('<option value="' + city + '" selected>' + city + '</option>');
            fillAreas(city, 'student');
            fillAreas(city, 'volunteer');
            fillAreas(city, 'school');
        } else {
            $('#studentCitySelect').append('<option value="' + city + '">' + city + '</option>');
            $('#volunteerCitySelect').append('<option value="' + city + '">' + city + '</option>');
            $('#schoolCitySelect').append('<option value="' + city + '">' + city + '</option>');
        } 
        count++;       
    }    
}

function fillAreas(city, type) {
    let areas = getAreas(city);
    let count = 0;

    let elmId = 'studentAreaSelect';

    if (type === 'student') {
        elmId = '#studentAreaSelect';
    } else if (type === 'volunteer') {
        elmId = '#volunteerAreaSelect';
    } else if (type === 'school') {
        elmId = '#schoolAreaSelect';
    }

    $(elmId).html("");
    for (let area of areas) {
        if (count == 0) {
            $(elmId).append('<option value="' + area + '" selected>' + area + '</option>');
        } else {
            $(elmId).append('<option value="' + area + '">' + area + '</option>');
        } 
        count++;       
    }        
}