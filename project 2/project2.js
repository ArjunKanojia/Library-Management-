
console.log("hey")
// shownotes();
// constructor
function Book(name,author,type){
    this.name = name;
    this.author = author;
    this.type = type;
}

// display
function DISPLAY(){
    console.log("hey")
}
DISPLAY.prototype.Add = function(book){
// console.log("hey")
  let table = document.getElementById('tablebody');
 let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                          <td><button type="button" class="btn btn-secondary btn-sm" id='delbtn'>Delete</button></td>
                        </tr>`;
        table.innerHTML += uiString;
}
DISPLAY.prototype.clear = function(){
    let libraryform = document.getElementById("libraryform")
    libraryform.reset();
}
DISPLAY.prototype.validate = function(book){
if(book.name.length<2||book.author.length<2)
{

    return false
}
    else{
        return true
    }
}
DISPLAY.prototype.show = function(type,a){
    let message = document.getElementById('msg')
     message.innerHTML=`
    <div class="alert alert${type} alert-dismissible fade show" role="alert">
  <strong>${a}</strong> You have ${a}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
    `
    setTimeout(() => {
        message.innerHTML = " "
        
    }, 2000);
}

 let libraryform = document.getElementById("libraryform").addEventListener('submit',formsubmit);
 function formsubmit(e){
   shownotes();
    //  e.preventDefault();
     console.log('you have submitted')
     let names = document.getElementById('inputname').value
     let author =document.getElementById('authorname').value
     let type 
     let fiction =document.getElementById('Fiction')
     let comic = document.getElementById('Comic')
     let romcom = document.getElementById('RomCom')
     if (fiction.checked){
         type = fiction.value
     }
     else if (comic.checked){
        type = comic.value
    }
     else if (romcom.checked){
        type = romcom.value
    }

      let book = new Book(names,author,type) 
    //   console.log(addbook)
      let display = new DISPLAY();
      if(display.validate(book))
      {
        display.Add(book);
        display.clear(); 
        display.show('succes',' succes')
        let myobj = {
            newname: names ,
           newauthor: author,
            newtype: type
        }
        let notes = localStorage.getItem("notes");
        if (notes == null) {
          notesObj = [];
        } else {
          notesObj = JSON.parse(notes);
        }
        notesObj.push(myobj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
         shownotes();
         function shownotes(){
          let table = document.getElementById('tablebody');
          let notes = localStorage.getItem("notes");
        if (notes == null) {
        notesObj = [];
        } else {
        notesObj = JSON.parse(notes);
        }
        let html = " ";
        notesObj.forEach(function(element, index) {
        html +=  `<tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button type="button" class="btn btn-secondary btn-sm" id='delbtn'>Delete</button></td>
        </tr>`;        

        });
        }
         
        
      }
      else{
      display.validate(book);
      display.show('Danger','Failed ') 
      }
 }



