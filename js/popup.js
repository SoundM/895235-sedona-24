		var link = document.querySelector(".button-hotel-search"); 
		
		var popup = document.querySelector(".modal-hotel-search-form"); 
		
		var form = popup.querySelector("form");
		var dateOfArrival = popup.querySelector("[name=date-of-arrival-at-the-hotel]");
		var dateOfDeparture = popup.querySelector("[name=date-of-departure-from-the-hotel]");
		var adults = popup.querySelector("[name=number-of-adults]");
		var children = popup.querySelector("[name=number-of-children]");
		
		var isStorageSupport = true; 
		var storageAdults = "";
		var storageChildren = "";
		
		popup.classList.remove("modal-noscript");
  
		try {
			storageAdults = localStorage.getItem("adults");
			storageChildren = localStorage.getItem("children");
		} catch (err) {
			isStorageSupport = false;
		}
		
		
		link.addEventListener("click", function (evt) { 
			evt.preventDefault(); 
			popup.classList.toggle("modal-show"); 
			
			if (!popup.classList.contains("modal-show")) {
				popup.classList.remove("modal-error");
			}
			
			if (popup.classList.contains("modal-show")) {
				dateOfArrival.focus(); 
			}
			
			if (storage) {
				adults.value = storageAdults;
				children.value = storageChildren;
			}
			
			
		});
		
		form.addEventListener("submit", function (evt) { 
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