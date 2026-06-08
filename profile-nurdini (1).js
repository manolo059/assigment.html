

//Show or hide on click(skill toggle)
document.querySelectorAll('.skill-point').forEach(function(point){
    point.addEventListener('click',function(){
        let details = this.querySelector('.skill-details');
        details.classList.toggle('hidden');
    });
});
//sorting Education table
let ascSort=true;
document.getElementById('sortBtn').addEventListener('click',function(){
    let tbody = document.querySelector('#edTable tbody');
    let rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function(x,y){
        yearX = parseInt(x.cells[2].textContent);
        yearY = parseInt(y.cells[2].textContent);
        //do sorting
        return ascSort? yearX-yearY:yearY-yearX;
    });
    rows.forEach(function(row){tbody.appendChild(row);});
    ascSort = !ascSort;
    document.getElementById('sortBtn').textContent = ascSort? 'Sort by Year ▲' : 'Sort by Year ▼';
});

//Read more or less in hobbies/interest
document.getElementById('readMoreBtn').addEventListener('click',function(){
    let content = document.getElementById('hobbiesContent');
    content.classList.toggle('hidden');
    this.textContent = content.classList.contains('hidden') ? 'Read More' : 'Read Less';
});

// Action of image lightbox
document.getElementById('profileImg').addEventListener('click', function() {
    let lbox = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = this.src;
    lbox.classList.add('active');
});
document.getElementById('lightboxClose').addEventListener('click', function() {
    document.getElementById('lightbox').classList.remove('active');
});

document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
});

// Scroll to up button
window.addEventListener('scroll',function(){
 let upscroll = document.getElementById('scrollTopBtn');
    upscroll.style.display = window.scrollY>200? 'block' : 'none';
});
 document.getElementById('scrollTopBtn').addEventListener('click',function(){
    window.scrollTo({top: 0, behavior:'smooth'});
});


// Dark mode toggling
document.getElementById('darkModeBtn').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    this.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});






