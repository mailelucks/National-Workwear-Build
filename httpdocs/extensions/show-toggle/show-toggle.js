/**
 * Toggle the `open` state of the global account box.
 */
(function () {
	var trigger = document.querySelector('[data-hook="x-show-toggle"]');

	if (trigger) {
		var relatedTarget = document.querySelector('[data-hook="' + trigger.getAttribute('data-target') + '"]');

		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			relatedTarget.classList.toggle('open');
		}, false);

		document.addEventListener('mousedown', function (event) {
			if (relatedTarget.classList.contains('open')) {
				if (!relatedTarget.contains(event.target) && event.target !== trigger) {
					relatedTarget.classList.toggle('open');
					trigger.classList.toggle('active');
				event.preventDefault();
				}
			}
		}, false);

		window.addEventListener('keydown', function (event) {
			if (event.defaultPrevented) {
				return;
			}

			switch (event.key) {
				case 'Escape':
					if (relatedTarget.classList.contains('open')) {
						relatedTarget.classList.toggle('open');
						trigger.classList.toggle('active');
					}
					break;
				default:
					return;
			}

			event.preventDefault();
		}, true);
	}
})();