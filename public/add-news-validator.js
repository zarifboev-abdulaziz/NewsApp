let addNewsForm = document.getElementById('add-news-form');
let title = document.getElementById('title');


addNewsForm.addEventListener('submit', e => {
    if(title.value.trim() == ''){
        e.preventDefault()
        alert("Title should not be Empty")
    }
})