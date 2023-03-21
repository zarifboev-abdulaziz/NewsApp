let likeIcon = document.getElementById('likeIcon')
let likeCount = document.getElementById('likeCount')


likeIcon.addEventListener('click', e => {
    fetch(`/news/like/increment/${e.target.dataset.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        if (data.clicked) {
            likeCount.innerHTML = likeCount.textContent * 1 + 1;
        }
    })
})
