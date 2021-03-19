// add post to localstorage
let setPost = () => {
    const postTitle = document.querySelector('#postTitle');
    const postBody = document.querySelector('#postBody');
    const dates = document.querySelector('#date');

    const postDay = postDate();
    let postId = localStorage.length + 1;
    let numberOfDay = countDay();
    // add to card
    if (postTitle.value !== "" && postBody.value !== "" && dates.value !== "") {
        // set Post to local storage
        let post = {
            title: postTitle.value,
            body: postBody.value,
            day: postDay,
            borrowDate: numberOfDay,
        };
        if (numberOfDay >= 0) {
            localStorage.setItem('postId' + postId, JSON.stringify(post));
        }else {
            window.confirm("Cannot borrow book with past date!");
        }
    }

    // clear
    postTitle.value = "";
    postBody.value = "";

    // increment id
    postId++;
}

// display out put
let displayPost = () => {
    // get data from local storage
    let dataLength = localStorage.length;
    for (let i = 0; i < dataLength; i++) {
        let postId = localStorage.key(i);
        let post = localStorage.getItem(postId)
        let postObject = JSON.parse(post);

        // element 
        const postBox = document.querySelector('.postBox');
        const card = document.createElement('div');
        const cardTitle = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardFooter = document.createElement('div');
        const spanDate = document.createElement('span');
        const spanDelete = document.createElement('span');
        const spanDay = document.createElement('span');
        const trash = document.createElement('i');
        const spanPostId = document.createElement('span');
        const actionControl = document.createElement('div');

        // add class
        card.classList.add('post-card');
        cardTitle.classList.add('post-title');
        cardBody.classList.add('post-body');
        cardFooter.classList.add('post-date');
        trash.classList.add('fa');
        trash.classList.add('fa-trash-o');
        spanPostId.setAttribute('id', 'post-' + i);
        actionControl.classList.add('actionCtrl');
        spanDay.classList.add('day');

        // add to parent
        postBox.appendChild(card);
        card.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        card.appendChild(spanPostId);
        cardFooter.appendChild(spanDate);
        cardFooter.appendChild(actionControl);
        actionControl.appendChild(spanDay);
        actionControl.appendChild(spanDelete);
        spanDelete.appendChild(trash);

        // display on browser
        cardTitle.textContent = postObject.title;
        cardBody.textContent = postObject.body;
        spanDate.textContent = postObject.day;
        if (postObject.borrowDate !== 0) {
            spanDay.textContent = postObject.borrowDate + " days";
        }else {
            spanDay.textContent = "Today";
        }
        

    }
}

// Post date and time
let postDate = () => {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let year = today.getFullYear();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    if (hour < 12) {
        today = month + ' / ' + day + ' / ' + year + ' | ' + hour + " : " + minute + " : " + second + " AM";
    } else {
        today = month + ' / ' + day + ' / ' + year + ' | ' + hour + " : " + minute + " : " + second + " PM";
    }
    return today;
}

// Calcauate current date in current day
let getCurrentDates = () => {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let year = today.getFullYear();

    today = month + '/' + day + '/' + year;
    return today;
}

// Count day 
let countDay = () => {
    let currentDate = getCurrentDates();
    const dates = document.querySelector('#date');
    let day = dates.value.substring(8);
    let month = dates.value.substring(5, 7);
    let year = dates.value.substring(0, 4);
    let otherDate = month + "/" + day + "/" + year;

    let present = new Date(currentDate);
    let pastOrFuture = new Date(otherDate);
    let timeDiff = pastOrFuture.getTime() - present.getTime();
    let days = timeDiff / (1000 * 60 * 60 * 24);

   return days;
}


// clear all post
let clearPost = () => localStorage.clear();

// Delete post
let deletePost = (post) => {
    localStorage.removeItem(post);

    // reload page after post
    location.reload();
}

// add button
const btnPost = document.querySelector('#postAdd');
btnPost.addEventListener('click', (e) => {
    setPost();
    // reload page after post
    location.reload();
    e.preventDefault();
});

// clear button
const btnClear = document.querySelector('#postClear');
btnClear.addEventListener('click', (e) => {
    clearPost();

    // reload page after post
    location.reload();
    e.preventDefault();
});


// display post 
displayPost();


// Delete action
const deleteAction = document.querySelectorAll('.fa-trash-o');
for (let id in deleteAction) {
    if (!isNaN(id)) {
        deleteAction[id].addEventListener('click', () => {
            let postId = localStorage.key(id);
            deletePost(postId);
        });
    }
}