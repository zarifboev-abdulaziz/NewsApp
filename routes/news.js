let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('news', { newsList: getAll('news')})
})

router.get('/get/:id', (req, res) => {
    let id = req.params.id

    let newsList = getAll('news')
    let news = newsList.find(news => news.id == id)
    let idx = newsList.indexOf(news)
    newsList[idx].watched += 1
    saveAll('news', newsList)

    res.render('news-detail', { news: news})
})

router.get('/like/increment/:id', (req, res) => {
    let id = req.params.id

    let newsList = getAll('news')
    let news = newsList.find(news => news.id == id)
    let idx = newsList.indexOf(news)
    newsList[idx].likes += 1
    saveAll('news', newsList)

    res.json( { clicked: true})
})


router.route('/create')
    .get((req, res) => {
        res.render('create-news', { topics: getAll('topics')})
    })
    .post((req, res) => {
        let newsList = getAll('news')

        newsList.push({
            id: uniqid(),
            title: req.body.title,
            pubDate: req.body.pub_date,
            shortContent: req.body.short_content,
            imgUrl: req.body.img_url,
            topicId: req.body.topic,
            fullContent: req.body.full_content,
            watched: 0,
            likes: 0
        })

        saveAll('news', newsList)

        res.redirect('/news')
    })




router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let news = getAll('news').find(news => news.id == id)
        res.render('create-news', { news: news, topics: getAll('topics') })
    })
    .put((req, res) => {
        let id = req.params.id

        let newsList = getAll('news')

        let news = newsList.find(news => news.id == id)

        let idx = newsList.indexOf(news)

        newsList[idx].title = req.body.data.title
        newsList[idx].pubDate = req.body.data.pub_date
        newsList[idx].shortContent = req.body.data.short_content
        newsList[idx].imgUrl = req.body.data.img_url
        newsList[idx].topicId = req.body.data.topic
        newsList[idx].fullContent = req.body.data.full_content

        saveAll('news', newsList)

        res.json({ updated: true })
    })



router.delete('/delete', (req, res) => {

    let newsList = getAll('news')

    console.log(req.body.id)
    let filteredNews = newsList.filter(news => news.id != req.body.id)

    saveAll('news', filteredNews)

    res.json({ deleted: true })
})

module.exports = router



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}