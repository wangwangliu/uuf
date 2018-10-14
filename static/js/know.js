var rootUrl = "http://120.55.41.76";
var loopIndex = 0;
var UFCKnowStory = [];
$(function() {
    var pathname = window.location.pathname;
    var id = pathname.substr(pathname.length - 1, pathname.length);
    if (id == 1) {
        loadFamous();
    } else if (id == 2) {
        loadStorys();

    } else if (id == 3) {
        loadEvent();
    }
});

function bindDetail() {
    $(".know-item").click(function() {
        var url = $(this).attr("data-url");
        $(".know-content").load(rootUrl + url);
    });
}

function loadFamous() {
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Know-Famous.json",
        dataType: "json",
        success: function(data) {
            var str = '';
            $.each(data, function(i, n) {
                str += '<div class="know-item">';
                str += '<div class="know-item-intro">' + n.level + '</div>';
                if (i == 0) {
                    str += '<img class="know-item-img border1" src="' + (rootUrl + n.mainImg) + '" />';
                } else {
                    str += '<img class="know-item-img" src="' + (rootUrl + n.mainImg) + '" />';
                }
                str += '<div class="know-item-intro-name">' + n.name + '</div>';
                str += '<div class="know-item-intro1">' + n.score + '(W-L-D)</div>';
                // str += '<div class="xiangxi-btn" data-id =' + n.id + '></div>'
                str += "</div>";
            });
            $(".know-content").html(str);

        }
    });
}


function loadEvent() {
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Know-Event.json",
        dataType: "json",
        success: function(data) {
            var str = '';
            $.each(data, function(i, n) {
                str += '<div class="know-item" data-url="' + n.url + '">';
                str += '<img class="know-item-img" src="' + (rootUrl + n.mainImg) + '" />';
                str += '<div class="know-item-intro">' + n.title + '</div>';
                str += "</div>";
            });
            $(".know-content").html(str);
            bindDetail();
        }
    });
}

var bg = hdomain + "/images/h-bg.png";

function cutstr(str, len) {
    if (!str) {
        str = '';
    }
    if (!len) {
        len = 20;
    }
    var str_length = 0;
    var str_len = 0,
        str_cut = new String(),
        str_len = (str || '').length;
    for (var i = 0; i < str_len; i++) {
        var a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}



function loadStorys() {
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Know-Story.json",
        dataType: "json",
        success: function(data) {
            var str = '<div class="img-box">';
            UFCKnowStory = [data[0], data[0], data[0], data[0]];
            loopIndex = 0;
            var arr = []
            arr.push(data[0]);
            $.each(arr, function(i, n) {
                str += '<div class="know-item1"  data-url="' + n.url + '">';
                str += '<img class="know-item-img2" src="' + (rootUrl + n.mainImg) + '" />';
                str += '<div class="know-item-intro3"  style="background:url(' + bg + ');background-repeat:repeat">' + cutstr(n.title, 120) + '<a href="' + n.url + '"> >>阅读全文</a>' + '</div>';
                str += "</div>";
            });
            str += "</div>"
            var l = hdomain + "/images/left.png";
            var r = hdomain + "/images/right.png";
            var rl = '<div class="leftp"><img src="' + l + '"></div><div class="rightp"><img src="' + r + '"></div>';
            $(".know-content").html(str + rl);
            loopImg();
            bindDetail();
        }
    });
}

function loopImg() {
    var leftp = $('.leftp>img'),
        rightp = $('.rightp>img'),
        UFCKnowStoryLen = UFCKnowStory.length;
    leftp.click(() => {
        if (loopIndex == 0) {
            loopIndex = UFCKnowStoryLen - 1;
        } else {
            loopIndex--;
        }
        $(".img-box").html(tpl(UFCKnowStory, loopIndex));
    });
    rightp.click(() => {
        if (loopIndex == (UFCKnowStoryLen - 1)) {
            loopIndex = 0;
        } else {
            loopIndex++;
        }
        $(".img-box").html(tpl(UFCKnowStory, loopIndex));
    })
}

function tpl(data, index) {
    var str = '';
    var arr = []
    arr.push(data[0]);
    $.each(arr, function(i, n) {
        str += '<div class="know-item1"  data-url="' + n.url + '">';
        str += '<img class="know-item-img2" src="' + (rootUrl + n.mainImg) + '" />';
        str += '<div class="know-item-intro3"  style="background:url(' + bg + ');background-repeat:repeat">' + cutstr(n.title, 120) + '<a href="' + n.url + '"> >>阅读全文</a>' + '</div>';
        str += "</div>";
    });

    return str
}

function golink(url) {
    location.href = url;
}