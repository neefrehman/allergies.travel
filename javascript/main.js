// Collect all the portfolios into an array

const countryArray = [
  {
    "name": "Tribe",
    "url": "https://wearetribe.co/",
    "tidyurl": "wearetribe.co",
    "tags": "playground fund",
    "image": "images/team_assets/tribe_image.jpg",
    "logo": "images/team_assets/tribe_logo.png",
    "line": "Natural sports nutrition and an amazing community.",
    "copy": "We are a community of 50,000+ athletes brought together by a love of nature and a shared spirit for adventure. TRIBE was inspired by a 1,000 mile run across Europe to fight human trafficking. A journey that set us on a mission to change the world of sports nutrition."
  },
];


function kebabCase(string) {
  if (typeof string !== "string") {
    return string;
  }

  return string
    .trim()
    .replace(/\W|[_]/g, "-")
    .replace(/-{2,}/, "-")
    .toLowerCase();
};



function shufflePortfolioArray() {

  const a = portfolioArray;

  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

function createListElementsFromArray(a) {
  return a.map(function (el) {
    return "<li class='portfolio_item' data-filter='" + el.tags + "'><a target='_blank' href='#modal-" + kebabCase(el.name) + "'  rel='modal:open'>" + el.name + "</a></li>"
  });
}

function createModals() {
  var list = shufflePortfolioArray();

  return list.map(function(el) {
    return "<div id='modal-" + kebabCase(el.name) + "'><div class='modal-inner'><div class='modal-details'><h2>" + el.name + "</h2><a class='modal-site-link' href='" + el.url + "' target='_blank'>" + el.tidyurl + "</a><p class='line'>" + el.line + "</p><p class='copy'>" + el.copy + "</p></div><div class='modal-image'><img class='modal-image-background' src='' data-src='" + el.image + "' /><img class='modal-image-logo' src='" + el.logo + "' /></div></div></div>"
  });
}



$(document).ready(function () {

  const listElements = createListElementsFromArray(shufflePortfolioArray());
  $('ul#companies').html(listElements);
  $('div#modals').html(createModals());
  $("img").unveil();

  $('.portfolio_item').on('click',function() {
    setTimeout(function() {
      $(window).trigger('resize')
    }, 1);
  });

  $("img").trigger("unveil");

  $('a.filter-button-group').on('click', function (e) {

    var descriptor = $(e.target).data('descriptorstring')
    $('#descriptor').empty();
    $('#descriptor').append(descriptor);

    var filterString = $(e.target).data('filter');
    console.log(filterString);

    // cycle through all the items in the portfolio

    $('.portfolio_item').each(function (idx, el) {

      var fStrings = $(el).data('filter').split(' ');
      var shouldDisplay = fStrings.includes(filterString);

      if (filterString == "*") {
        shouldDisplay = true;
      }

      $(el).css('display', (shouldDisplay == true ? 'block' : 'none'));

    });

  });
});



$(".button").click(function(){
  $(".button").not(this).removeClass('is_checked');
  $(this).addClass("is_checked");
});


$(document).ready(function () {
  if (window.location.hash){
    var hash = window.location.hash.substring(1);
    if (!hash) return;
    var array = $(".button-group").find(`[data-filter='${hash.toLowerCase()}']`);
    if (!array || !array.length) return;
    var el = array[0];
    if (!el) return;
    el.click();
 }

  if (window.location.search){
    var query = window.location.search.substring(1);
    var parameters = query.split('&');
    var companyName, val;
    for (var i=0; i<parameters.length;i++) {
      val = parameters[i].split('=');
      if (val[0] == 'team') {
        companyName = val[1];
      }
    }
    if (!companyName) return;
    $('#modal-' + companyName ).modal()
  }

});


$(document).ready(function(){
  // if (window.location.search) return;
  if (window.location.pathname == "/") {
    history.replaceState( {} , 'allergies.travel', '/' );
  }
});
