//varaibles
const courses = document.querySelector('#courses-list'),
shoppingContent = document.querySelector('#cart-content tbody'),
 clearCart = document.querySelector('#clear-cart');




// event listeners

clickEventListener();

function clickEventListener(){

    courses.addEventListener('click', newCourse)

    // click remove button
    shoppingContent.addEventListener('click', removeCourse);

    clearCart.addEventListener('click', clearBtn);

    //
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

// functions
function newCourse(e){

e.preventDefault();
// use delegation to finf course

if(e.target.classList.contains('add-to-cart')){
    
    const course = e.target.parentElement.parentElement;

    getCourseInfo(course);
    
}
}

function getCourseInfo(course){

    // create course object 
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price : course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
// insert into shopping cart
addIntoCart(courseInfo);

}

// display selected into shopping cart

function addIntoCart(course){
    // create a <tr>
   const row = document.createElement('tr');

    // build template

    row.innerHTML = `
    <tr>
    <td>
    <img href="#" src="${course.image}" width=100px>
    </td>
    <td>"${course.title}"</td>
    <td>"${course.price}"</td>
    <td>
    <a href="#" class="remove" data-id="${course.id}"  >X</a>
    </td>

    </tr>
    
    `;
    // add into shopping content
    shoppingContent.appendChild(row);

// add course into storage

    saveIntoStorage(course);

}

// add course into local storage

function saveIntoStorage(course){

let courses = getCourcesFromStorage();
// convert strings

courses.push(course)
    localStorage.setItem('courses', JSON.stringify(courses));

}

function getCourcesFromStorage(){
    let courses;
    // if somethings exist value or empty array 
    if(localStorage.getItem('courses') === null){
        courses= [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}

// remove courser from dom

function removeCourse(e){
    let course, courseId;
        if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
            course = e.target.parentElement.parentElement; 
            courseId = course.querySelector('a').getAttribute('data-id');
       };
    
    // remove from local storage
    removeFromLocalStorage(courseId);
}

// remove from LS 
function removeFromLocalStorage(id){
    // get ls data
    let coursesLS = getCourcesFromStorage();

    // loop through and find index
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index, 1);
        }
    });
// add rest array
localStorage.setItem('courses', JSON.stringify(coursesLS));    
}
// clear shopping cart
function clearBtn(){
    // shoppingContent.innerHTML ='';

    while(shoppingContent.firstChild){
        shoppingContent.removeChild(shoppingContent.firstChild) ;
    }

    clearLocalStorage();

}

function clearLocalStorage(){
    localStorage.clear();
}

// load when document ready print courses into cart
function getFromLocalStorage(){
    let coursesLS = getCourcesFromStorage();

    // loop through courses and print into cart
    coursesLS.forEach(function(course){

        // create <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
        <tr>
            <td>
            <img href="#" src="${course.image}" width=100>
            </td>
            <td>"${course.title}"</td>
            <td>"${course.price}"</td>
            <td>
            <a href="#" class="remove" data-id="${course.id}"  >X</a>
            </td>

        </tr>
        `;
        shoppingContent.appendChild(row);
     })
    
}
