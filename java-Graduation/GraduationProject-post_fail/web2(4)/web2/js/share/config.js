const apiUrl = 'http://140.134.24.157:53008/api/';
const schoolListUrl = apiUrl + 'school';
const matchUrl = apiUrl + 'match';
const NewsUrl = apiUrl + 'news';
const ExamUrl = apiUrl + 'exam';
const token = $.cookie('token');
const role = $.cookie('role').toLowerCase();
const username = $.cookie('username');
const id = $.cookie('id');