// getting variables for login & create Acct


// sign pet btn
let signpetBtn = $('#signpet');
// create pet btn
let createpetBtn =  $("[id='chcks']");
// input val for user login name
let nameVal = $('#newName');
// input val for user login passwd
let passVal = $('#passwd');
// signin form
let signIn = $('#signIn');
// input val for admin login passwd
let adpassVal = $('#passwds');
// input val for admin name val
let adsignIn = $('#adsignIn');
// input val for login name
let adnameVal = $('#newNames');
// create acct form
let creates = $('#createA');
// input val for user create passwd
let passValAcct = $('#passwdS');
// input val for user login name
let nameValAcct = $('#newNameS');
// CREATE ACCOUNT AS AN ADMIN
// input val for admin login passwd
let adpassValA = $('#passwdsA');
// input val for admin name val
let adsignInA = $('#createAd');
// input val for login name
let adnameValA = $('#newNamesA');


// login variables ended

// add petition variables started
// add pet form
let addpetForm = $('#formAddPet');
// title of pet 
let petTitle = $('#petTitle');
// name of pet creator
let petCreator = $('#usernamePet');
// body of pet 
let petBody = $('#petDesc');

// add petition variables ended

// arrays
// array to hold the created petitions
let petitionsArray = [];
// array tto hold the specific petition clicked on
let singlePet = [];

// initialize variables 
// object for petition from ls
let newPet;
// btn for veiw pet
let btnVeiwpet;

// function for create account as a user
creates.on('submit', function (){
  if(localStorage.getItem("userNames") == null && localStorage.getItem("passWords") == null){
    localStorage.setItem("userNames", nameValAcct.val());
   localStorage.setItem("passWords", passValAcct.val());
   alert(`Welcome ${nameValAcct.val()}, You are now a Member`)
   creates.attr('action', '/index.html');
   
   }
})

// function for login

// login form for user
signIn.on('submit',function() {

if(localStorage.getItem("userNames") == nameVal.val() && localStorage.getItem("passWords") == passVal.val())
{
alert(`Welcome ${nameVal.val()}`)
signIn.attr('action', '/index.html');
} 
else if (localStorage.getItem("userNames") == null && localStorage.getItem("passWords") == null){
  alert( 'No Information found, Pls create an account');
}
else{
alert( 'Incorrect details, Pls try again')
}
});

// function for admin sign up as an admin
// admin 6 digit key
let adkey = 233444
adsignInA.on('submit', function(){
  if(adpassValA.val() == adkey && localStorage.getItem("aduserName") == null){
    localStorage.setItem("aduserName", adnameValA.val());
   localStorage.setItem("adpassWord", adpassValA.val());
   alert(`Welcome ${adnameValA.val()}`)
   adsignInA.attr('action', '/pages/admins.html');
  } else {
   alert(`Please use the unique key to create an account as an admin`)

  }
})
// login form for admin


adsignIn.on('submit',function() {
if(adpassVal.val()== adkey && localStorage.getItem("aduserName") == adnameVal.val() ){
alert(`Welcome ${adnameVal.val()}`)
adsignIn.attr('action', '/pages/admins.html');

} 
else if (localStorage.getItem("aduserName") == null){
  alert( 'No Information found, Pls create an account');
}
else{
alert( 'Incorrect details, Pls try again')
}
});

// get image upload from add petitob form
$('#myImg').on('change', function(){
let reader = new FileReader();

let imaging = $('#myImg')[0].files[0]
reader.readAsDataURL(imaging)
$(reader).on('load', function (){
  if(this.result)    {
    localStorage.setItem('imgs', this.result);
  }
 
});
});

// create petition function

// add pet new pet
addpetForm.on('submit',function() {
// store all the input value of the form in alocal storage
localStorage.setItem("petCreator", petCreator.val());
localStorage.setItem("petTitle",petTitle.val());
localStorage.setItem("petBody",petBody.val()) ;
localStorage.setItem("id",Math.random());

// set the local storage content to an object
newPet = {
    names: localStorage.getItem("petCreator"),
    title: localStorage.getItem("petTitle"),
    message: localStorage.getItem("petBody"),
    id: localStorage.getItem('id'),
    img:localStorage.getItem('imgs')
}
// add new pet
 addPet()
addpetForm.attr('action', '/index.html?#listpet');

})

// on load
$(function() {
  
//  update local storage if it is not empty
  if (JSON.parse(localStorage.getItem("petitionsArray")) != null)
  petitionsArray = JSON.parse(localStorage.getItem("petitionsArray"));
// display function 
  display ()

  // username
let uName = localStorage.getItem('aduserName')
$('#uname').text(uName)
});

// add new pet
function addPet() {
    // if there is a value in the form
  if (petCreator.val() != "") {
    //   add the pet obj to the array
  petitionsArray.unshift(newPet);
//   if local storage is empty set the new item and if not still set the new item
    if (localStorage.getItem("petitionsArray") == null) {
      localStorage.setItem("petitionsArray", JSON.stringify(petitionsArray));
    } else {
      localStorage.setItem("petitionsArray", JSON.stringify(petitionsArray));
    }
    display ()
  }
}

// diplaying petition list on landing page and admin page

// petion list page display

function display (){
  // if there are no pettin
if(petitionsArray.length == 0){
  let noP = $(`<h6 class = "card navsec py-2"> No Petition is currently Available</h6>`)
    $('#ava').append(noP);
}
// else display all available pet 
else {
  // loop start
    for (let i =0; i<petitionsArray.length; i++){
    // create html elements with bootstrap classes
    // row
  let divRow = $(` <div class="row align-items-center my-5 thrd p-3"  key=${i}> `)
// col 1
  let divCol = $('<div class="col-md-3 col-lg-3 col-sm-12">');
//   col 2
  let divCola = $('<div class="col-md-7 col-lg-7 col-sm-12" id="petLists">')
//   col 3
  let divColb = $('<div class="col-md-2 col-lg-2 col-sm-12">')

// create img element
let petImg = $(`<img src=${petitionsArray[i].img} alt="Petition" class="img-responsive imgb"/>`)
// append to appropriate col
divCol.append(petImg);
//   elements containing petitions created 
// title
   let ttlePet =  $('<h4>' +petitionsArray[i].title + '</h4>');
//    message
   let mssPet =  $('<p class="text-truncate pc">' + petitionsArray[i].message+ '</p>');
// create ul class to hold creator's detail
   let ulL= $('  <ul class="lis">');
//    name of creator
   let liL = $('<li>' +'Created by' + ' | ' + petitionsArray[i].names+ '</li>' )
//    veiw btn
// append li to ul
ulL.append([liL])
// append title, message & ul to appropriate column
divCola.append([ ttlePet, mssPet,  ulL])

// veiw petition btn
let btnVeiwpet = $(`<button class="btn btn-dark btv" id= ${petitionsArray[i].id}> View </button>`)
// append to appropriate col
divColb.append(btnVeiwpet)
// append all columns to row
divRow.append([divCol, divCola, divColb])
// append row to html container
$('#contsList').append(divRow)

// user display ends
// ADMIN STARTS
// for admin page repeat to render petition list on admin dashboard

const addisplay = () =>{


//  create table row for body
let trr = $(`<tr>`)
// icon &
// name
let tdsname = $(`<td> <img src='../img/blueuser.png' class="img-responsive imgiconi" alt="petition"/> ${petitionsArray[i].names}</td>`);
// title and veiw btn
let tdTitle = $(`<td class=""> ${petitionsArray[i].title} <br>  <a class="vws con pl-5" id= ${petitionsArray[i].id}> View </a></td>`);
// delete btn
let tds = $(`<td colspan="1">`)
let Dels = $(`<a href="/pages/admins.html" class="del btn btn-danger " id= ${petitionsArray[i].id}> Delete </a>`)
tds.append([ Dels]);

// append to table row
trr.append([tdsname, tdTitle, tds]);
// append to row tbody
$('#tbod').append(trr)
}

addisplay()

// admin display function
// function for veiw petition
function veiw(e){
  // if the clicked btn has the same id as the petition in display
if(e.target.id == petitionsArray[i].id && petitionsArray){
let urls = '/pages/petition.html'
// push the exact pet to singlePet array
  singlePet.push(petitionsArray[i])

// set array to localstore
  localStorage.setItem('singlePet', JSON.stringify(singlePet))
// change location to the petition detail page to access petition in details
window.location.href = urls;

} 
}

// event listener for veiw btn, call the function veiw() on landing page for veiw btn
btnVeiwpet.on('click', veiw);

// event listener for veiw btn, call the function veiw() on admin page for veiw btn
$('.vws').on('click', veiw);


// function for delete on admin page
function deletd (e){
   // if the clicked btn has the same id as the petition in display
    if(e.target.id == petitionsArray[i].id && e.target.classList.contains('del')){
      // get array from ls
    let pets = JSON.parse(localStorage.getItem("petitionsArray"))
    // remove the array
    pets.splice(i, 1);
    // update ls by setting the new array
    localStorage.setItem('petitionsArray', JSON.stringify(pets))
    }
   
}
// call the delete function whem the delete btn is clicked
$('.del').on('click', deletd);
}

}
// loop ends
}
// function display end


// function for create pet btn
createpetBtn.on('click', function (){
  // if there is no username when the create btn is clicked
    if(localStorage.getItem("userNames") == null && localStorage.getItem("aduserNames") == null){
      // alert them and redirect them to the login page
        alert('Please Create an Account');
        window.location.href = '/pages/createAccount.html';
       
    } 
    // else if username exists, take them to their desired route
  
        else{
          window.location.href = '/pages/addPet.html';

        }
})

// admin link on nav bar
$('#adlogg').on('click', function(){
   // if there is no username 
       if(localStorage.getItem("aduserName") == null){
         // alert them and redirect them to the login page
        alert('Please Create an admin account');
        window.location.href = '/pages/createAdmin.html';
      
    } 
      // else if username exists, take them to their desired route
    else{
        window.location.href = '/pages/admins.html'

    }
})