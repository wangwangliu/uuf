var express = require('express');
const path = require('path');
var app = express();
var assign = require("object.assign");
// var soap = require('soap');

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

const api = `http://120.27.141.218:9269/ufc-data/data/`;

var UFCProductGloves = `${api}UFC-Product-Gloves.json`;



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
        path: '/product/:id/:type?',
        html: 'product',
        data: {
            act: 1,
            data: {
                title: ['UFC产品', '拳击手套', '护具', '健身器材', "其他", "25周年纪念款", "主推产品", '沙袋', '绷带'],
                // subtitle: { "1": ["25周年纪念款主推产品"], "2": ['沙袋', '绷带'] }
            }
        }
    },
    {
        path: '/video/:id?',
        html: 'video',
        data: {
            act: 2,
            data: {
                title: ['官方视频', '品牌宣传', '教学视频', '品牌故事']
            }
        }
    },
    {
        path: '/know/:id?',
        html: 'know',
        data: {
            act: 3,
            data: {
                title: ['认识UFC', 'UFC名人', 'UFC故事', 'UFC赛事']
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
    {
        path: '/pdetail/:id/',
        html: 'detail',
        data: {
            act: 1,
            data: {
                title: ['']
            }
        }
    },
    {
        path: '/qa/:id?',
        html: 'qa',
        data: {
            act: 0,
            data: {
                title: ['电商常见问题']
            }
        }
    },
    {
        path: '/channel/:id?',
        html: 'channel',
        data: {
            act: 0,
            data: {
                title: ['购买渠道']
            }
        }
    },
];

routes.forEach((item) => {
    router.get(item.path, function(req, res) {
        var paramsid = req.params.id || 0;
        item.data = assign({}, item.data, { hdmain: `${req.protocol}://${req.headers.host}`, paramsid: paramsid });

        res.render(item.html, item.data);
    })
})
app.use("/", router)

app.listen(9014, () => {
    console.log(`启动port 9014`)
});