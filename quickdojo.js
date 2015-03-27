//
// <credit> simple code editor for Coderdojo by @dingledojo </credit>
// free Opensource. free from from commercial favor. honor the credit.
//

var ftoken; //derived from the email address; used for folder name.
var email; //returned by G+ API
var rob;
if (!window.console) console = {log: function() {}}; //IE
var gpath = 'D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\';
var n = window.location.href;

if (n.indexOf("www.") > 0 ) {
n= n.replace("www.","");
window.location.href =n;
document.reload;
}

function cFolder () {
var ws = getUrlVars()["r"];
if (ws == "websummit"){
ftoken = "websummit";
email = "websummit";
var path= 'D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\' + ftoken;
showDivs();
var el = document.getElementById('loginok'); 
el.innerHTML = "<a href='#' onclick='logout()'><span class='button big' title=''>" + ftoken + "</span></a>";
toggleElement('loginok');

}
}

function logo(robo) {
toggleElement("logo");
document.getElementById('logo').title=robo;
}

function load() {
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
    document.getElementById("code").value=xmlhttp.responseText;}
    }
    
    var fpath="http://quickdojo.com/pages/" + ftoken + "/" + document.getElementById('file').value; + "?t=" + Math.random();
    xmlhttp.open('GET', fpath, true);
    xmlhttp.send();

}

function publish() {
if (!ftoken) {    
    if (localStorage.qdvisit)
    { localStorage.qdvisit=Number(localStorage.qdvisit)+1; }
    else { localStorage.qdvisit=1; } 
    if (Number(localStorage.qdvisit) <= 99)
    {
    file =guid(file)+'.html';
    }
    else {alert('Login with Google for dedicated folders :D');}

var path= 'D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\';
var fpath='http://quickdojo.com/pages/' + file;
}//endif 

if (ftoken) {
var file= document.getElementById('file').value;
var path= 'D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\' + ftoken + '\\';
var fpath='http://quickdojo.com/pages/' + ftoken + '/' + file;
}

if (file) {
var code= document.getElementById('code').value;

if (code.search(/phpinfo/i)!==-1){
code="<center><p>Here is Edward Bear,<br>coming downstairs now,<br>bump, bump, bump, bump,<br>on the back of his head,<br>behind Christopher Robin.</p></center>";  
}

if (code == '') {
code="<center><p><img src='http://quickdojo.com/blankhtml.png'></p></center>";
}

if (code.search(/UTF/i) == -1){
code = "<meta charset='UTF-8'>\n" + code;
}

/* code = code+="<style> details {border: 2px solid black;width:50%;}</style>"; */

$.ajax({
type: 'POST',    
url:'http://quickdojo.com/createfp.php',
data:{
'gpath': gpath,
'file': path + file,
'code': code
},
success: function(){
openTab(fpath);
logo('You rock !');
}
}); //endajax

} //endif

} //endfn


function openTab(url)
{
//
// if ipad or iphone show in same window; otherwise open in a new window.
//
var ipad = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
var target='_self';
if (!ipad) {target='_blank';}
if (window.chrome) {target='_newtab';}

url= url + "?t=" + guid(); // Show non-cached version

var win=window.open(url, target);
win.focus();
}


function guid() {
return ((Math.random()*Math.pow(36,6) << 0).toString(36)).substr(-6);
}

function login(authResult) {
    if (authResult) {
      if (authResult['error'] == undefined){
        gapi.auth.setToken(authResult); // Store the returned token.
        getEmail(); 
        showDivs();                    // Trigger request to get the email address.
      } else {
        console.log('An error occurred');
      }
    } else {
      console.log('Empty authResult');  // Something went wrong
    }
  }
  
function getEmail(){
    // Load the oauth2 libraries to enable the userinfo methods.
    gapi.client.load('oauth2', 'v2', function() {
          var request = gapi.client.oauth2.userinfo.get();
          request.execute(getEmailCallback);
        });
  }
  
  
function getEmailCallback(obj) {
var el = document.getElementById('email'); 
var email = '';
if (obj['email'])
{
    email = obj['email'];
}
var n=email.indexOf("@");
ftoken=email.slice(0,n); //!important

var path='D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\' + ftoken;

$.ajax({
type: 'POST',    
url:'http://quickdojo.com/mkdirp.php',
data:{
'dir': path
},

success: function(){
}

}); //endajax

var el = document.getElementById('loginok'); 
el.innerHTML = "<a href='#' onclick='logout()'><span class='button big' title=''>" + ftoken + "</span></a>";
toggleElement('loginok');

}

function logout() {
openTab('https://accounts.google.com/Logout');
location.reload();
}



function showDivs () {
toggleElement('signinButton'); 
toggleElement('filename');
toggleElement('load');
toggleElement('showDir');
}


function toggleElement(id) {
    var el = document.getElementById(id);
    if (el.getAttribute('class') == 'hide') {
      el.setAttribute('class', 'show');
    } else {
      el.setAttribute('class', 'hide');
    }
}

function showDir() {
path='http://quickdojo.com/pages/'+ftoken+'/';
url='http://quickdojo.com/dir.php?dir='+'D:\\Hosting\\'+ /*your domain number goes here*/+'\\html\\quickdojo\\pages\\'+ftoken+'&path='+path;
$("#showpages").load(url).scrollTop(0).dialog({modal:true}); 
}//endfn

/* Return URL parameter; example: var rb = getUrlVars()["rb"]; */
function getUrlVars()
{var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
	if (hash[1]) {localStorage.ntuser = hash[1]}; /* Store visitor name for welcome series */
    return vars;
}
