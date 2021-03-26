

// view cause variables
let causeDescr = $('#descr');
let causeTopic = $('#topics');
let causeUser = $('#user');
let causeImgn = $('#imgn');




// sign cause variables
// form
let causeFormSign = $('#signature');
// input for name
let signer = $('#namep');



// create array to hold each pet signer 
let causeSigner = [];
// initialize variables
let causeSign; 
let id;
 // initialize i to 0
let i =0;
// initialize counter to 0
let counter = 0;

// get singlePet array from create cause in ls
let causeList;

// on load

$(function() {
// cause details
causeList =JSON.parse(localStorage.getItem('onecause'));
// display cause det

causeImgn.attr('src', causeList[i].imgCause)
// cause title
causeTopic.text(causeList[i].causeTit)
//cause creator name
causeUser.text(causeList[i].creators)

// description
causeDescr.text(causeList[i].description)

// asign id value
id = causeList[i].id;

// update pet signer localstore
// if the ls is not empty 
 if (JSON.parse(localStorage.getItem("causeSigner")) != null)
//  get the signers
  {
       causeSigner = JSON.parse(localStorage.getItem("causeSigner"));
  }
// function display signer

 displayCauseSigner()

    



// on submit signpet form
function signpets (){
     // if there is no username when the sign btn is clicked
     if(localStorage.getItem("nameOfUser") == null && localStorage.getItem("adminUser") == null){
        // alert them and redirect them to the login page
          alert('Please Sign In');
          
causeFormSign.attr('action', '/component/createAcct.html');
         
      } 
 else{
        // store fullnmame to ls
    localStorage.setItem('names', signer.val());
    // object to hold individusl name of pet signer
 
   causeSign = {
        names: localStorage.getItem('names'),
        id:id,
        counter:counter
    }
    alert(`Congrats ${signer.val()}! You just signed this petiton`);

// add new pet signer
    newSigner ()
 }

};

causeFormSign.on('submit', signpets ) 

function newSigner (){
    if(signer.val() != '' ){
        causeSigner.unshift(causeSign)
    if(localStorage.getItem('causeSigner') == null){
        localStorage.setItem('causeSigner', JSON.stringify(causeSigner))
    } else {
        localStorage.setItem('causeSigner', JSON.stringify(causeSigner))

    }
// function display signer

   displayCauseSigner()
    }
}

// display cause signers

function displayCauseSigner(){

    for (i; i<causeSigner.length; i++ ){
     
        if(causeSigner[i].id == id && causeSigner){

      
        let avatar = $(`<li class="py-2 border-top"><img src="../img/Group 12.png" alt="user icon" class="me-2" /> ${causeSigner[i].names}</li>`)    
        // let lin = $('<li>' + causeSigner[i].names + '</li>')
   

        $('#holder').append(avatar)
       counter = counter +  1;

        $('#counting').text(`${counter}`)
        $('#disk_c').val(counter)

        }
        
   
    }
}

// sharing function 
let postur = encodeURI(document.location.href);
let postTitles = encodeURI("Please sign this Cause");
// for twitter
$('#twt').attr('href', `https://twitter.com/share?url=${postTitles} ${postur}`);
// facebopok
$('#fb').attr('href', `https://www.facebook.com/sharer.php?u=${postur}`);
// whatsapp
$('#whats').attr('href', `https://api.whatsapp.com/send?text=${postTitles} ${postur}`)


})



