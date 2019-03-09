		var link = document.querySelector(".button-hotel-search"); /* Находим кнопку, клик по которой покажет модальное окно */
		
		var popup = document.querySelector(".modal-hotel-search-form"); /*Находим модальное окно в разметке и записываем его в переменную. Добавляем в стили класс, который будет отвечать за показ модального окна. .modal-show {display: block;} */
		
		var form = popup.querySelector("form");
		var dateOfArrival = popup.querySelector("[name=date-of-arrival-at-the-hotel]");
		var dateOfDeparture = popup.querySelector("[name=date-of-departure-from-the-hotel]");
		var adults = popup.querySelector("[name=number-of-adults]");
		var children = popup.querySelector("[name=number-of-children]");
		
		var isStorageSupport = true; /* Некоторые браузеры не имеют поддержку localStorage, или он может быть отключен, нам стоит учитывать такую возможность. */
		var storageAdults = "";
		var storageChildren = "";
		
		popup.classList.remove("modal-noscript");
  
		try {
			storageAdults = localStorage.getItem("adults");
			storageChildren = localStorage.getItem("children");
		} catch (err) {
			isStorageSupport = false;
		}
		
		
		link.addEventListener("click", function (evt) { /* Поймаем событие клика по этой кнопке. */
			evt.preventDefault(); /*Отменим стандартное действие ссылки при нажатии на неё. */
			popup.classList.toggle("modal-show"); /* С помощью метода classList.toggle добавляем этот класс к модальному окну по клику на ссылку, а при повторном клике убираем класс. т.е. он поочередно то добавляется, то исчезает */
			
			if (!popup.classList.contains("modal-show")) {
				popup.classList.remove("modal-error");
			}
			
			if (popup.classList.contains("modal-show")) {
				dateOfArrival.focus(); /* при открытии формы фокус автоматически устанавливался в поле ввода даты заезда в отель */
			}
			
			if (storage) {
				adults.value = storageAdults;
				children.value = storageChildren;
			}
			
			
		});
		
		form.addEventListener("submit", function (evt) { /* Отловим событие отправки формы и отменим его, если какое-то из полей незаполнено. */
			if (!dateOfArrival.value || !dateOfDeparture.value || !adults.value || !children.value) {
				evt.preventDefault();
				popup.classList.remove("modal-error");
				popup.offsetWidth = popup.offsetWidth;
				popup.classList.add("modal-error");
			} 	else {
				if (isStorageSupport) {
					localStorage.setItem("adults", adults.value);
					localStorage.setItem("children", children.value);
				}
			}
		});
		
		window.addEventListener("keydown", function (evt) {
			if (evt.keyCode === 27) {
				evt.preventDefault();
				if (popup.classList.contains("modal-show")) {
					popup.classList.remove("modal-show");
					popup.classList.remove("modal-error");
				}
			}
		});