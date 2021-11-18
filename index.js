$('.modal').hide();
$('#AddBtn').on('click', function () {
    $('.modal').show();
    $('.modal-dialog').animate({
        opacity: "0",
        top: '20px'
    },0);
    $('.modal-dialog').animate({
        opacity: "1",
        top: '50px'
    },500);
});
$('#modal_X').on('click', function () {
   $('.modal').hide();
});
$('#modal_close').on('click', function () {
   $('.modal').hide();
});


let listcnt = 0;
const modalForm = document.getElementById('modal-form');
const modalInput1 = document.getElementById('formGroupExampleInput1'); //url
const modalInput2 = document.getElementById('formGroupExampleInput2'); //title
const modalInput3 = document.getElementById('formGroupExampleInput4'); //type
const modalInput4 = document.getElementById('formGroupExampleInput3'); // desc
const mainlist = document.querySelector('.class-list');

let listarray = [];

modalForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (listcnt < 3) {
        addList(modalInput1.value, modalInput2.value, modalInput3.value, modalInput4.value,);
        listcnt++;
    }
    else {
        alert("Too many lists (up to 3)");
    }
    
});


function addList(item1,item2,item3,item4,) {
  if (item1 !== '' &&item2 !== '' &&item3 !== '' &&item4 !== '') {

    const content = {
        id: Date.now(),
        url: item1,
        title: item2,
        type:item3,
        desc: item4,
    };
    listarray.push(content);
      
    addToLocalStorage(listarray);
      
    modalInput1.value = "";
    modalInput2.value = "";
    modalInput3.value = "";
    modalInput4.value = "";
  }
}

function addToLocalStorage(contents) {
    localStorage.setItem('contents',JSON.stringify(contents));
    // console.log("before render");
    renderContents(contents);
    // console.log("after render");
}

function renderContents(contents) {
    mainlist.innerHTML = "";
    contents.forEach(function(item){

        const li = document.createElement('li');
        li.setAttribute('class','class-card');
        li.setAttribute('data-key',item.id);



        li.innerHTML = `<div class="trashcan-container">
                <i class="fas fa-trash-alt trashcan"></i>
            </div>
            <img src="${item.url}"  class="class-image">
            <div class="class-container">
                <div class="class-desc">
                    <div class="desc-title">${item.title}</div>
                    <div class="desc-detail">${item.type}</div>
                    
                </div>
                <div class="d-grid gap-2 d-md-block btncenter" >
                    <button class="btn btn-primary" style="border-radius: 20px;" type="button">${item.desc}</button>
                </div>
            </div>`;
        mainlist.append(li);
   });

}

function getFromLocalStorage() {
  const reference = localStorage.getItem('contents');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    listarray = JSON.parse(reference);
    renderContents(listarray);
  }
}
getFromLocalStorage();

mainlist.addEventListener('click', function(event) {
  // check if that is a delete-button
    if (event.target.classList.contains('trashcan')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteList(event.target.parentElement.parentElement.getAttribute('data-key'));
        listcnt--;
  }
});

function deleteList(id) {
  // filters out the <li> with the id and updates the todos array
    
    listarray = listarray.filter(function (item) {

    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(listarray);
}