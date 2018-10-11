var express = require('express');
const path = require('path');
var app = express();
var assign = require("object.assign");
// var ejs = require('ejs');
const router = express.Router();
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// console.log(path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

const routes = [{
        path: '/',
        html: 'index',
        data: {
            act: 0,
            data: {
                title: ['UFC官网']
            }
        }
    },
    {
        path: '/product/:id?',
        html: 'product',
        data: {
            act: 1,
            data: {
                title: ['UFC产品', '拳击手套', '护具', '健身器材', 'UFC产品', "其他"]
            }
        }
    },
    {
        path: '/video/:id?',
        html: 'video',
        data: {
            act: 2,
            data: {
                title: ['认识UFC', 'UFC名人', 'UFC故事', 'UFC赛事']
            }
        }
    },
    {
        path: '/know/:id?',
        html: 'know',
        data: {
            act: 3,
            data: {
                title: ['最新资讯']
            }
        }
    },
    {
        path: '/news/:id',
        html: 'news',
        data: {
            act: 4,
            data: {
                title: ['最新资讯', "最新活动", "最新赛事", "最新产品"]
            }
        }
    },
];

routes.forEach((item) => {
    router.get(item.path, function(req, res) {
        var paramsid = req.params.id || 0;
        item.data = assign({}, item.data, { paramsid: paramsid })
        res.render(item.html, item.data);
    })
})
app.use("/", router)

app.listen(9014, () => {
    console.log(`启动port 9014`)
});