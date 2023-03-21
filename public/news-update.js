let updateNewsForm = document.getElementById('update-news-form');


updateNewsForm.addEventListener('submit', e => {
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