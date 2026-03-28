
    const openBtn    = document.getElementById('openDrawerBtn');
    const drawer     = document.getElementById('loginDrawer');
    const overlay    = document.getElementById('overlay');

  
    openBtn.addEventListener('click', function(event) {
      event.preventDefault();  
      openDrawer();
    });

    function openDrawer() {
      drawer.classList.add('active');  
      overlay.classList.add('active');  
    }

    function closeDrawer() {
      drawer.classList.remove('active');  
      overlay.classList.remove('active'); 
    }

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    });
