

let mobileNavButton = document.querySelector('.mobile-nav-button');
let mobileNavIcon = document.querySelector('.mobile-nav-button__icon');
let overlay = document.querySelector('.mobile-nav-overlay');
let mobileNav = document.querySelector('.mobile-nav');

function calcFullScrollHeight() {
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
}

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};

// Включение мобильной навигации
// Клик по кнопке
mobileNavButton.addEventListener('click', function () {
	// Анимация кнопки
	mobileNavIcon.classList.toggle('active');
    // Расположение кнопки после нажатия
    mobileNavButton.classList.toggle('move');
	// Анимация оверлея
	overlay.classList.toggle('visible');
	// Анимация появления навигации
	mobileNav.classList.toggle('visible');
	// Запрещаем скролл внутри страницы
	document.body.classList.toggle('no-scroll');

	// Решаем проблему с прыгающим контентом, когда исчезает скролл
	if ( calcFullScrollHeight() > window.innerHeight && !isMobile.any()) {
		document.body.classList.toggle('fix-scroll-jump');
	}

});

// Клик по оверлею вокруг навигации
overlay.addEventListener('click', function () {
	turnOffMobileNav();
});

// Закрываем моб навигацию при клике на ссылки внутрии нее
mobileNav.querySelectorAll('a').forEach(function (link) {
	link.addEventListener('click', function () {
		turnOffMobileNav();
	});
});

// Функция выключения мобильной навигации
function turnOffMobileNav() {
	// Выключаем иконку
	if (mobileNavIcon.classList.contains('active')) {
		mobileNavIcon.classList.remove('active');
	}

    //Выключаем расположение кнопки после нажатия
    if (mobileNavButton.classList.contains('move')) {
		mobileNavButton.classList.remove('move');
	}

	// Выключаем оверлей
	if (overlay.classList.contains('visible')) {
		overlay.classList.remove('visible');
	}

	// Выключаем панель с меню
	if (mobileNav.classList.contains('visible')) {
		mobileNav.classList.remove('visible');
	}

	// Выключаем замок на скролл для всей страницы
	if (document.body.classList.contains('no-scroll')) {
		document.body.classList.remove('no-scroll');
	}

	// Выключаем класс fix-scroll-jump
	if (document.body.classList.contains('fix-scroll-jump')) {
		document.body.classList.remove('fix-scroll-jump');
	}
}

// Show nav on scroll
window.addEventListener('scroll', function () {
	const mobile = document.querySelector('.mobile');
	mobile.classList.toggle('sticky', window.scrollY > window.innerHeight);
});

// back-top icon

const backTopBtn = document.querySelector('#backtop');

backTopBtn.style.opacity = 0;

document.addEventListener('scroll', () => {
	if (window.pageYOffset > 400) {
		backTopBtn.style.opacity = 1;
	} else {
		backTopBtn.style.opacity = 0;
	}
});

    // plagin pageNav
$(document).ready(function(){
	
    $('#nav__list').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });

});

// remove bag pageNav
const navListItem = document.querySelector(".nav__list-item");

	document.addEventListener('scroll', () => {
		if (window.pageYOffset < 200) {
			navListItem.classList.remove('active')
		}
	
	});

// mixItUp //

$(document).ready(function(){
	
   const containerEL = document.querySelector('#mix-cards');

   const mixer = mixitup(containerEL);

});

 //FORM VALIDATE
$(document).ready(function () {


	$('.form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "http://ck71607.tmweb.ru/portfolio/php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".form").slideUp(800);
				$('#answer').html(html); 
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

});

