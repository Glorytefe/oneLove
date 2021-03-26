// get variables for forms

// signin forms for user
// signin btn
let signInBtn = $('#signin');
// signinform for user
let signInForm = $('#signInForm');
// signin username input for user
let nameOfUser = $('#nameuser');
// signin password input for user
let passOfUser = $('#passwords');
// signin form for ADMIN
let adminSignForm = $('#adminSign');
// signin username input admin
let adminUser = $('#adminnameuser');
// signin password input admin
let adminPass = $('#adminpasswords');

// REgister form for user
// signinform for user
let signInFormUser = $('#signInFormUser');
// signin username input for user
let nameOfUserUser = $('#nameuserUser');
// signin password input for user
let passOfUserUser = $('#passwordsUser');

// register form for admin
let adminSignFormAdmin = $('#adminSignAdmin');
// signin username input admin
let adminUserAdmin = $('#adminnameuserAdmin');
// signin password input admin
let adminPassAdmin = $('#adminpasswordsAdmin');

// add cause form

let causeForm = $('#createCauseForm');
// creat cause btn
let creatCause = $( "[id = 'createcause']");  
// creator of cause
let creators = $('#username');
// title of cause
let causeTit = $('#causename');
// description of cause
let causeDesc = $('#Desc');
// img of cause
let causeImg = $('#file');
// arrays
// array for all causes

let causes = [];
// array for individual causes

let onecause = []

// object to hold cause from input local store

let localcause;

// initiators


// FUNCTIONS

// onload
$(function (){
    // check if there is any stored cause in ls; if yes, update it
    if(JSON.parse(localStorage.getItem('causes')) != null){
        causes = JSON.parse(localStorage.getItem('causes'))
    }
    // call the show function
    show()
})

// register for user
signInFormUser.on('submit', function(){
      // if first time save to local store
      if ( localStorage.getItem('nameOfUser') == null &&  localStorage.getItem('passOfUser')== null){
        localStorage.setItem('nameOfUser', nameOfUserUser.val())
        localStorage.setItem('passOfUser', passOfUserUser.val())
            alert(`Welcome ${nameOfUserUser.val()}, Thanks for signing Up`)
            // direct user to landing page
            signInFormUser.attr('action', "/index.html")
        
        } 
        else if(nameOfUserUser.val() == localStorage.getItem('nameOfUser') && passOfUserUser.val() == localStorage.getItem('passOfUser')){
            alert(`${nameOfUserUser.val()}, You are already a member`);
            signInFormUser.attr('action', "/index.html")

        }
        else{
            alert(`There is an active member already registered here`)
        }
})

// login authentication for users
signInForm.on('submit', function(){
    // if first time save to local store

    if ( localStorage.getItem('nameOfUser') == null &&  localStorage.getItem('passOfUser')== null){
   
        alert(`No information found. Please Register to become a Member`)
   
    
    } 
    // check if users info is in local storage

    else if  (nameOfUser.val() == localStorage.getItem('nameOfUser') && passOfUser.val() == localStorage.getItem('passOfUser')){
        alert(`Welcome ${nameOfUser.val()}`);
        // direct user to landing page
        signInForm.attr('action', "/index.html")


    }
    else{
        alert('Incorrect details. Please try again')
    }
})

// Register form for admin 
let tokens = 334546
adminSignFormAdmin.on('submit', function(){
       // check if users info is in local storage
       if( localStorage.getItem('adminUser') == null &&  adminPassAdmin.val() == tokens){
        localStorage.setItem('adminUser', adminUserAdmin.val())
        localStorage.setItem('adminPass', adminPassAdmin.val())
         alert(`Welcome ${adminUserAdmin.val()}.. You are now an Admin`);
            // direct user to admin page
           adminSignFormAdmin.attr('action', "/component/dashboard.html")
    
        } 
        else if (adminUserAdmin.val() == localStorage.getItem('adminUser') && adminPassAdmin.val() == localStorage.getItem('adminPass')){
            alert(` ${adminUserAdmin.val()},You are already an Admin`);
           adminSignFormAdmin.attr('action', "/component/dashboard.html")

        }
        else{
            alert(`Please use your token as password`);
        }
})

// login authentication for admin

adminSignForm.on('submit', function(){
    // check if users info is in local storage
    if(adminUser.val() == localStorage.getItem('adminUser') && adminPass.val() == localStorage.getItem('adminPass')){
    alert(`Welcome ${adminUser.val()}`);
        // direct user to admin page
      adminSignForm.attr('action', "/component/dashboard.html")

    } 
    // if first time save to local store
    else if ( localStorage.getItem('adminUser') == null){

       alert(`No information found. Please Register to become an Admin`)
   

    } else{
        alert('Incorrect details. Please try signing in as a user')
    }
})


// getting img uploads from create cause form
causeImg.on('change', function(){
    let reader = new FileReader();
    let imgCause = causeImg[0].files[0];
    reader.readAsDataURL(imgCause)
    $(reader).on('load', function (){
        if(this.result && localStorage){
            localStorage.setItem('imgCause', this.result)
        }
    })
})

// create cause form submission
 causeForm.on('submit', function(){
    //  set info gotten from user via form to local store
    // creator's name
    localStorage.setItem('creators', creators.val());
    // title of cause
    localStorage.setItem('causeTit', causeTit.val().toUpperCase());
    // descriptn
    localStorage.setItem('description', causeDesc .val());
    // id
    localStorage.setItem('id', Math.random())
    // obtain individual info from store and set them to object for holding
    localcause = {
        creators: localStorage.getItem('creators'),
        causeTit: localStorage.getItem('causeTit'),
        description: localStorage.getItem('description'),
        imgCause: localStorage.getItem('imgCause'),
        id: localStorage.getItem('id')
    }
    // add created cause to causeArray
    causeCreator();
    // upon creating cause redirect user to landing page to veiw created cause
    causeForm.attr('action', '/index.html?#loc')
 })

// ADD NEW CAUSE TO LOCALSTORE
function causeCreator (){
    // if the input field in create cause form is not empty
    if(creators.val() != ''){
        // add the object to the array at the front
        causes.unshift(localcause);
        // if local store is empty set it
        if(localStorage.getItem('causes') == null){
            localStorage.setItem('causes', JSON.stringify(causes))
        } 
        // if not still  set it to ls
        else {
            localStorage.setItem('causes', JSON.stringify(causes))
        }
        // call the show function 
        show()
    }
}

// show function for landing page and dashboard
     function show(){
        //  if ls is empty
         if(causes.length == 0){
             let avail= $(`<p class="bggs py-4 px-1">No cause Available</p>`)
             $('#noa').append(avail)
         }
        //  if not show; contents
         else{
            // loop starts
        for(let i = 0; i < causes.length; i++){
            // DISPLAY ON LANDING PAGE STARTS
            // create bootstrap col
            let colDiv = $(`  <div class="col-md-4 col-lg-4 col-sm-12 my-2" id="cols">`)
            // bootstrap card
           let cardDiv = $(`<div class="card cd">`)
        //    image from ls
           let imgDiv = $(` <div class="imgdiv"> <img src=${causes[i].imgCause} class="w-100" alt=""> </div>`);
        //    card body
           let cardBody = $(`<div class="card-body">`);
        //    name of creator
        let nameCre = $(`<h6><small>Created by: </small>${causes[i].creators}</h6>`)
        //    title of cause
           let titleP = $(`<p><b>${causes[i].causeTit}</b></p>`);
        //    sign btn
           let SignBtn = $(` <a id=${causes[i].id} class="yeltxt causeSign">Sign Cause <i class="fa fa-angle-right"></i> </a>`);
        //    append to appropriate elements
           cardBody.append([titleP, nameCre,  SignBtn]);
           cardDiv.append([imgDiv, cardBody]);
            colDiv.append(cardDiv)
            // append all to row 
            $('#rows').append(colDiv)

            // ADMIN  DISPLAY STARTS
    const adminShow = () =>{
           

            //  create table row for body
            let tRow = $(`<tr >`)
            // icon &
            // name
            let dimg = $(`<td class="text-center"> <img src="../img/Group 12.png" class="img-responsive" alt=""/> </td>`);
            let dName = $(`<td><p>${causes[i].creators}</p></td>`)
            // title and veiw btn
            let dTitle = $(`<td > ${causes[i].causeTit} <br><a class="veiws yeltxt" id= ${causes[i].id}> View <i class="fa fa-angle-right"></i> </a></td>`);
            // delete btn
            let td = $(`<td>`)
            let removeBtn = $(`<a href="/component/dashboard.html" class="remove btn btn-danger" id= ${causes[i].id}> Delete </a>`)
            td.append([ removeBtn]);

            // append to table row
            tRow.append([dimg, dName, dTitle, td]);
            // append to row tbody
            $('#contentsd').append(tRow)
}

    adminShow();

    // function for sign cause or view
    // function for veiw petition
function veiwCause(e){
  // if the clicked btn has the same id as the causes in display
if(e.target.id == causes[i].id && causes){
let urls = '/component/veiwCause.html'
// push the exact cause to onecause array
  onecause.push(causes[i])

// set array to localstore
  localStorage.setItem('onecause', JSON.stringify(onecause))
// change location to the cause detail page to access cause in details
window.location.href = urls;

} 
}
$('.causeSign').on('click', veiwCause);
$('.veiws').on('click', veiwCause);

// function for delete on admin page
function delCause (e){
   // if the clicked btn has the same id as the cause in display
    if(e.target.id == causes[i].id && e.target.classList.contains('remove')){
      // get array from ls
    let causeRemove= JSON.parse(localStorage.getItem("causes"))
    // remove the array
    causeRemove.splice(i, 1);
    // update ls by setting the new array
    localStorage.setItem('causes', JSON.stringify(causeRemove))
    }
   
}
// call the delete function whem the delete btn is clicked
$('.remove').on('click', delCause);
    }
}


//  loop ends
       
     }             
// function ends

// create cause btn routing

// function for create cause btn
creatCause.on('click', function (){
  // if there is no username when the create btn is clicked
    if(localStorage.getItem("nameOfUser") == null && localStorage.getItem("adminUser") == null){
      // alert them and redirect them to the login page
        alert('Please Register to become a member');
        window.location.href = '/component/userRegister.html';
       
    } 
    // else if username exists, take them to their desired route
    else{
            window.location.href = '/component/createCause.html';
        }
})





