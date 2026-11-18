// The only JavaScript on the site. Three small, independent parts.
// Each part does nothing on pages that don't have the matching element.
// Without JavaScript the site still works: gallery links open the photo,
// the map has a plain link, and the form posts normally.


// 1. Gallery lightbox (listing pages)
//    Click a photo -> opens it large. Arrows / arrow keys = previous / next.
const gallery = document.querySelector('.gallery');
const lightbox = document.querySelector('.lightbox');

if (gallery && lightbox) {
  const links = [...gallery.querySelectorAll('a')];
  const bigImage = lightbox.querySelector('img');
  let current = 0;

  function show(index) {
    current = (index + links.length) % links.length;   // wrap around
    bigImage.src = links[current].href;
    bigImage.alt = links[current].querySelector('img').alt;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', event => {
      event.preventDefault();
      show(index);
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());

  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // clicking the dark area around the photo closes it
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
}


// 2. Google Maps: load the map only after the visitor clicks the button,
//    so Google sets no cookies before that (privacy / GDPR).
document.querySelectorAll('.map button').forEach(button => {
  button.addEventListener('click', () => {
    const map = button.closest('.map');
    map.innerHTML = `<iframe src="${map.dataset.src}" title="Google Maps" allowfullscreen
                      referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  });
});


// 3. Contact form: send in the background and show a message on the same page.
//    The texts come from the form's data-success / data-error attributes,
//    so each language page shows its own message.
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button');
    button.disabled = true;
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);

      form.reset();
      status.textContent = form.dataset.success;
    } catch (error) {
      status.textContent = form.dataset.error;
    }

    button.disabled = false;
  });
});
