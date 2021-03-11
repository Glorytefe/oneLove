
// get variables from pet deatills
// title of pet
let titleOfPet = $('#titl');
// created by
let creatorOfPet = $('#creat');
// content of pet
let contentOfPet = $('#contentpet');
// img of pet
let imgOfPet = $('#imgd');

// get singlePet array from create petition in ls

let getPet; 

// get variables from sign pet form
// form 
let signForm = $('#signForm');
// full name
let fullName = $('#fullname');

// create array to hold each pet signer 
let petSigners = [];
// initialize variables
let petSigner; 
let ids;
 // initialize i to 0
let i =0;
// initialize counter to 0
let counter = 0;

// on load

$(function() {
   


// pet details
getPet =JSON.parse(localStorage.getItem('singlePet'));
// display pet det

imgOfPet.attr('src', getPet[i].img)
// pet title
titleOfPet.text(getPet[i].title)
// pet creator name
creatorOfPet.text(getPet[i].names)

// content
contentOfPet.text(getPet[i].message)

// asign id val
ids = getPet[i].id;

// update pet signer localstore
// if the ls is not empty 
 if (JSON.parse(localStorage.getItem("petSigners")) != null)
//  get the signers
  {
       petSigners = JSON.parse(localStorage.getItem("petSigners"));
  }
// function display signer

    displayPetSigner()

    // 



// on submit signpet form

signForm.on('submit', function (){
      // if there is no username when the create btn is clicked
      if(localStorage.getItem("userNames") == null && localStorage.getItem("aduserNames") == null){
        // alert them and redirect them to the login page
          alert('Please Sign In');
          signForm.attr('action', '/pages/signin.html');
         
      } else{
// store fullnmame to ls
localStorage.setItem('fullName', fullName.val());
// object to hold individusl name of pet signer

petSigner = {
    fullName: localStorage.getItem('fullName'),
    id:ids,
    counter:counter
}
alert(`Congrats ${fullName.val()}! You just signed this petiton`);

// add new pet signer
addSigner ()
      }

     
});

 // sharing function 
 let urls = encodeURI(document.location.href);
 let headTxt = encodeURI("Hi everyone, Pls sign this petition");
 // faceboook
 $('#fbs').attr('href', `https://www.facebook.com/sharer.php?u=${urls}`);
 // whatsapp
 $('#apps').attr('href', `https://api.whatsapp.com/send?text=${headTxt} ${urls}`)


}) 



function addSigner (){
    if(fullName.val() != '' ){
        petSigners.unshift(petSigner)
    if(localStorage.getItem('petSigners') == null){
        localStorage.setItem('petSigners', JSON.stringify(petSigners))
    } else {
        localStorage.setItem('petSigners', JSON.stringify(petSigners))

    }
// function display signer

    displayPetSigner()
    }
}

// display pet signers

function displayPetSigner(){

    for (i; i<petSigners.length; i++ ){
     
        if(petSigners[i].id == ids && petSigners){
            // flxs = counter
      
        let icons = $(`<li class="my-1"><img src="../img/blueuser.png" alt="icon" class="me-1"/>${petSigners[i].fullName}</li>`); 
    
        $('#flx').append([icons])
       counter = counter +  1;

        $('#counter').text(counter)
        }
        
   
    }
}




