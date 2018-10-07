// Collect all the countries into an array

const countryArray = [
  {
    "country": "Afghanistan",
    "flag" "🇦🇫",
    "wikipedia": "https://en.wikipedia.org/wiki/Afghanistan",
    "tidywikipedia": "wikipedia.org/Afghanistan",
    "translate": "https://translate.google.co.uk/#auto/ps/I'm%20allergic%20to%20...",
    "tags": "nuts asia south",
    "line": "Natural sports nutrition and an amazing community.",
    "copy": "We are a community of 50,000+ athletes brought together by a love of nature and a shared spirit for adventure. TRIBE was inspired by a 1,000 mile run across Europe to fight human trafficking. A journey that set us on a mission to change the world of sports nutrition."
  },
  {
    "country": "Åland Islands",
    "flag" "🇦🇽",
    "wikipedia": "https://en.wikipedia.org/wiki/%C3%85land_Islands",
    "tidyurl": "wikipedia.org/Åland_Islands",
    "translate": "https://translate.google.co.uk/#auto/ps/I'm%20allergic%20to%20...",
    "tags": "nuts baltic finland",
    "line": "Natural sports nutrition and an amazing community.",
    "copy": "We are a community of 50,000+ athletes brought together by a love of nature and a shared spirit for adventure. TRIBE was inspired by a 1,000 mile run across Europe to fight human trafficking. A journey that set us on a mission to change the world of sports nutrition."
  }
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



function createListElementsFromArray(a) {
  return a.map(function (el) {
    return "<li class='portfolio_item' data-filter='" + el.tags + "'><a target='_blank' href='#modal-" + kebabCase(el.name) + "'  rel='modal:open'>" + el.name + "</a></li>"
  });
}

function createModals() {

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



$(document).ready(function () {
  if (window.location.hash){
    var hash = window.location.hash.substring(1);
    if (!hash) return;
    var array = $(".button-group").find(`[data-filter='${hash.toLowerCase()}']`);
    if (!array || !array.length) return;
    var el = array[0];
    var countryName, val;
    for (var i=0; i<parameters.length;i++) {
      val = parameters[i].split('=');
      if (val[0] == 'team') {
        countryName = val[1];
      }
    }
    if (!countryName) return;
    $('#' + countryName ).modal()
 }

  if (window.location.search){
    var query = window.location.search.substring(1);
    var parameters = query.split('&');
    // var countryName, val;
    // for (var i=0; i<parameters.length;i++) {
    //   val = parameters[i].split('=');
    //   if (val[0] == 'team') {
    //     countryName = val[1];
    //   }
    // }
    // if (!countryName) return;
    // $('#' + countryName ).modal()
  }

});
