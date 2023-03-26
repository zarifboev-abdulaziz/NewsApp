let updateNewsForm = document.getElementById('update-news-form');
let title = document.getElementById('title');


updateNewsForm.addEventListener('submit', e => {
    if(title.value.trim() == ''){
        alert("Title should not be Empty")
        return
    }

    e.preventDefault()

    let formData = new FormData(updateNewsForm)

    fetch(`/news/update/${e.target.dataset.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: Object.fromEntries(formData)})
    })
    .then(res => res.json())
    .then(data => {
        window.location = '/news'
    })
})