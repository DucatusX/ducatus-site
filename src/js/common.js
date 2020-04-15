var scrollPosY = window.pageYOffset | document.body.scrollTop;
var navBar = document.getElementsByClassName('header')[0];

if (scrollPosY > 100) {
    navBar.classList.add('header-scroll');
} else if (scrollPosY <= 100) {
    navBar.classList.remove('header-scroll');
}

var bottomMenu = document.getElementsByClassName('footer-menu');

for (var i = 0; i < bottomMenu.length; i++) {
    bottomMenu[i].onclick = function(e) {

        if (e.toElement.classList.contains('footer-menu')) {

            if (e.toElement.parentElement.classList.contains('footer-menu-same') && !e.toElement.parentElement.classList.contains('footer-menu-same-open')) {
                e.toElement.parentElement.classList.add('footer-menu-same-open');
                return;
            } else if (e.toElement.parentElement.classList.contains('footer-menu-same') && e.toElement.parentElement.classList.contains('footer-menu-same-open')) {
                e.toElement.parentElement.classList.remove('footer-menu-same-open');
                return;
            }

            if (e.toElement.classList.contains('footer-menu-open')) {
                e.toElement.classList.remove('footer-menu-open');
            } else {
                e.toElement.classList.add('footer-menu-open');
            }

        }
    }
};

// scroll menu

window.onscroll = function changeNav() {
    var scrollPosY = window.pageYOffset | document.body.scrollTop;
    var navBar = document.getElementsByClassName('header')[0];

    if (scrollPosY > 100) {
        navBar.classList.add('header-scroll');
    } else if (scrollPosY <= 100) {
        navBar.classList.remove('header-scroll');
    }
};


// $('.section-cookie-buttons-item').click(function () {
// 	$('.section-cookie').remove();
// });

// checkCookie('cookie_accept', '.section-cookie');

// $('#accept_cookie').click(function () {
// 	setCookie('cookie_accept', '1', 90);
// })

// function setCookie(cname, cvalue, exdays) {
// 	var d = new Date();
// 	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
// 	var expires = "expires=" + d.toUTCString();
// 	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
// 	var name = cname + "=";
// 	var decodedCookie = decodeURIComponent(document.cookie);
// 	var ca = decodedCookie.split(';');
// 	for (var i = 0; i < ca.length; i++) {
// 		var c = ca[i];
// 		while (c.charAt(0) == ' ') {
// 			c = c.substring(1);
// 		}
// 		if (c.indexOf(name) == 0) {
// 			return c.substring(name.length, c.length);
// 		}
// 	}
// 	return "";
// }

// function checkCookie(cookiename, elementTo) {
// 	var cookienames = getCookie(cookiename);
// 	if (cookienames) {
// 		if (cookienames != "") {
// 			if (cookienames === '0') {
// 				$(elementTo).show();
// 			}
// 		} else {
// 			if (cookienames != "" && cookienames != null) {
// 				$(elementTo).show();
// 			}
// 		}
// 	} else {
// 		$(elementTo).show();
// 	}
// }


window.onload = function() {
    // slider
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
};


// top menu toggle

// document.getElementsByClassName('header-menu-toggle')[0].addEventListener("click", function (e) {
// 	if (document.getElementsByClassName('header-menu-toggle')[0].classList.contains('open-menu')) {
// 		document.getElementsByClassName('header-menu-toggle')[0].classList.remove('open-menu');
// 		document.getElementsByClassName('header-menu-block')[0].classList.remove('menu-open');
// 	} else {
// 		document.getElementsByClassName('header-menu-toggle')[0].classList.add('open-menu');
// 		document.getElementsByClassName('header-menu-block')[0].classList.add('menu-open');
// 	}
// }, false);


// bottom menu toggle