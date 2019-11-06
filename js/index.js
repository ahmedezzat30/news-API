
var news ;
var term;
var category = 'general';
var links = document.getElementsByClassName("nav-link");
var searchInp = document.getElementById("searchInp");
var startSearch =document.getElementById("startSearch");

http();


// to select category from navbar
for (var i=0; i<links.length ;i++)
{
    links[i].addEventListener("click",function(e)
    {
        category = e.target.innerHTML;
        http();
    })
}


// to start search 
startSearch.addEventListener("click",function()
{
    term = searchInp.value;
    search();
})


// xmlhttprequest to get news in egypt
function http()
{
    var req ;

    if (window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();
    }
    else
    {
        req = new ActiveXObject("Microsoft.XMLHTTP")
    }

    var url =`https://newsapi.org/v2/top-headlines?country=eg&category=`+category+`&apiKey=d34d49ce3a794aca80d1ae821239b0eb`;

    req.open("GEt",url)

    req.onreadystatechange= function()
    {
        if(req.status==200 && req.readyState== 4)
        {
            news = JSON.parse( req.response);
            news = news.articles
            display();
        }
    }
    req.send();

}

// display news in grid system
function display()
{
    var temp="";
    for (var i=0;i<news.length; i++)
    {
        temp +=`<div class=" col-md-3 my-3 text-center">
                    <div class="adv">
                    <img src=`+news[i].urlToImage+` class="img-fluid"/>
                        <h4 class="text-danger text-bold">`+news[i].title+`</h4>
                        <p>`+news[i].description+`</p>
                    </div>
                </div>`
    }
    document.getElementById("newRow").innerHTML= temp;
}


//function to can search easy
function search()
{
    var req ;

    if (window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();
    }
    else
    {
        req = new ActiveXObject("Microsoft.XMLHTTP")
    }

    var url =`https://newsapi.org/v2/everything?q=`+term+`&from=2019-10-06&sortBy=publishedAt&apiKey=48a29c146d904b0989666fe7ee47885a`

    req.open("GEt",url)

    req.onreadystatechange= function()
    {
        if(req.status==200 && req.readyState== 4)
        {
            news = JSON.parse( req.response);
            news = news.articles
            display();
        }
    }
    req.send();

}
