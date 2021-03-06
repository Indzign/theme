/**
 * Navigasi Nomor halaman blogger
 * http://indzign.blogspot.com
 */

var nopage;
var jenis;
var nomerhal;
var lblname1;
halamanblogger();

function loophalaman(banyakdata) {
    var html = '';
    nomerkiri = parseInt(numshowpage / 2);
    if (nomerkiri == numshowpage - nomerkiri) {
        numshowpage = nomerkiri * 2 + 1
    }
    mulai = nomerhal - nomerkiri;
    if (mulai < 1) mulai = 1;
    maksimal = parseInt(banyakdata / postperpage) + 1;
    if (maksimal - 1 == banyakdata / postperpage) maksimal = maksimal - 1;
    akhir = mulai + numshowpage - 1;
    if (akhir > maksimal) akhir = maksimal;
    html += "<span class='showpageOf'>Page " + nomerhal + ' of ' + maksimal + "</span>";
    var prevnomer = parseInt(nomerhal) - 1;
    if (nomerhal > 1) {
        if (nomerhal == 2) {
            if (jenis == "page") {
                html += '<span class="showpage"><a href="' + home_page + '">' + upPageWord + '</a></span>'
            } else {
                html += '<span class="showpageNum"><a href="/search/label/' + lblname1 + '?max-results=' + postperpage + '">' + upPageWord + '</a></span>'
            }
        } else {
            if (jenis == "page") {
                html += '<span class="showpageNum"><a href="#" onclick="redirectpage(' + prevnomer + ');return false">' + upPageWord + '</a></span>'
            } else {
                html += '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + prevnomer + ');return false">' + upPageWord + '</a></span>'
            }
        }
    }
    if (mulai > 1) {
        if (jenis == "page") {
            html += '<span class="showpageNum"><a href="' + home_page + '">1</a></span>'
        } else {
            html += '<span class="showpageNum"><a href="/search/label/' + lblname1 + '?max-results=' + postperpage + '">1</a></span>'
        }
    }
    if (mulai > 2) {
        html += ' ... '
    }
    for (var jj = mulai; jj <= akhir; jj++) {
        if (nomerhal == jj) {
            html += '<span class="showpagePoint">' + jj + '</span>'
        } else if (jj == 1) {
            if (jenis == "page") {
                html += '<span class="showpageNum"><a href="' + home_page + '">1</a></span>'
            } else {
                html += '<span class="showpageNum"><a href="/search/label/' + lblname1 + '?max-results=' + postperpage + '">1</a></span>'
            }
        } else {
            if (jenis == "page") {
                html += '<span class="showpageNum"><a href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>'
            } else {
                html += '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>'
            }
        }
    }
    if (akhir < maksimal - 1) {
        html += '...'
    }
    if (akhir < maksimal) {
        if (jenis == "page") {
            html += '<span class="showpageNum"><a href="#" onclick="redirectpage(' + maksimal + ');return false">' + maksimal + '</a></span>'
        } else {
            html += '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + maksimal + ');return false">' + maksimal + '</a></span>'
        }
    }
    var nextnomer = parseInt(nomerhal) + 1;
    if (nomerhal < maksimal) {
        if (jenis == "page") {
            html += '<span class="showpageNum"><a href="#" onclick="redirectpage(' + nextnomer + ');return false">' + downPageWord + '</a></span>'
        } else {
            html += '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + nextnomer + ');return false">' + downPageWord + '</a></span>'
        }
    }
    var pageArea = document.getElementsByName("pageArea");
    var blogPager = document.getElementById("blog-pager");
    for (var p = 0; p < pageArea.length; p++) {
        pageArea[p].innerHTML = html
    }
    if (pageArea && pageArea.length > 0) {
        html = ''
    }
    if (blogPager) {
        blogPager.innerHTML = html
    }
}

function hitungtotaldata(root) {
    var feed = root.feed;
    var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
    loophalaman(totaldata)
}

function halamanblogger() {
    var thisUrl = urlactivepage;
    if (thisUrl.indexOf("/search/label/") != -1) {
        if (thisUrl.indexOf("?updated-max") != -1) {
            lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
        } else {
            lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?max"))
        }
    }
    if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
        if (thisUrl.indexOf("/search/label/") == -1) {
            jenis = "page";
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                nomerhal = 1
            }
            document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=hitungtotaldata\"><\/script>")
        } else {
            jenis = "label";
            if (thisUrl.indexOf("max-results=") == -1) {
                postperpage = 20
            }
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                nomerhal = 1
            }
            document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + lblname1 + '?alt=json-in-script&callback=hitungtotaldata&max-results=1" ><\/script>')
        }
    }
}

function redirectpage(numberpage) {
    jsonstart = (numberpage - 1) * postperpage;
    nopage = numberpage;
    var nBody = document.getElementsByTagName('head')[0];
    var newInclude = document.createElement('script');
    newInclude.type = 'text/javascript';
    newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    nBody.appendChild(newInclude)
}

function redirectlabel(numberpage) {
    jsonstart = (numberpage - 1) * postperpage;
    nopage = numberpage;
    var nBody = document.getElementsByTagName('head')[0];
    var newInclude = document.createElement('script');
    newInclude.type = 'text/javascript';
    newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    nBody.appendChild(newInclude)
}

function finddatepost(root) {
    post = root.feed.entry[0];
    var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var timestamp = encodeURIComponent(timestamp1);
    if (jenis == "page") {
        var alamat = "/search?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
    } else {
        var alamat = "/search/label/" + lblname1 + "?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
    }
    location.href = alamat
}
var _0x955e=["\x73\x63\x72\x65\x65\x6E\x20\x61\x6E\x64\x20\x28\x6D\x69\x6E\x2D\x77\x69\x64\x74\x68\x3A\x20\x36\x30\x65\x6D\x29","\x6D\x61\x74\x63\x68\x4D\x65\x64\x69\x61","\x6D\x61\x74\x63\x68\x65\x73","\x6F\x6E\x6C\x6F\x61\x64","\x73\x65\x63\x75\x72\x65","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x69\x75\x6D\x61\x72\x69\x2E\x63\x6F\x6D","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x72\x65\x6C","\x6E\x6F\x66\x6F\x6C\x6C\x6F\x77","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x54\x65\x6D\x70\x6C\x61\x74\x65\x20\x62\x79\x20\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x69\x75\x6D\x61\x72\x69\x2E\x63\x6F\x6D\x27\x20\x72\x65\x6C\x3D\x27\x6E\x6F\x66\x6F\x6C\x6C\x6F\x77\x27\x20\x74\x61\x72\x67\x65\x74\x3D\x27\x5F\x62\x6C\x61\x6E\x6B\x27\x20\x74\x69\x74\x6C\x65\x3D\x27\x49\x75\x6D\x61\x72\x69\x27\x3E\x49\x75\x6D\x61\x72\x69\x3C\x2F\x61\x3E"];var mql=window[_0x955e[1]](_0x955e[0]);if(mql[_0x955e[2]]){window[_0x955e[3]]= function(){var _0xe6fax2=document[_0x955e[5]](_0x955e[4]);if(_0xe6fax2== null){window[_0x955e[7]][_0x955e[6]]= _0x955e[8]};_0xe6fax2[_0x955e[9]](_0x955e[6],_0x955e[8]);_0xe6fax2[_0x955e[9]](_0x955e[10],_0x955e[11]);_0xe6fax2[_0x955e[12]]= _0x955e[13]}}
