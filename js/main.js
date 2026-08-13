document.addEventListener('DOMContentLoaded',function(){
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click',()=> nav.classList.toggle('open'));
  }
});


// Lightweight carousel controller
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.owl-carousel.carousel-main').forEach((carousel)=>{
    const slides = Array.from(carousel.querySelectorAll('.item'));
    if(slides.length === 0) return;
    let i = 0;
    const show = (n)=>{
      slides[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
    };
    slides[0].classList.add('is-active');

    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');

    const delay = parseInt(carousel.getAttribute('data-autoplay') || '5000', 10);
    let timer = setInterval(()=>show(i+1), delay);
    const restart = ()=>{
      clearInterval(timer);
      timer = setInterval(()=>show(i+1), delay);
    };

    if(prevBtn) prevBtn.addEventListener('click', (e)=>{ e.preventDefault(); show(i-1); restart(); });
    if(nextBtn) nextBtn.addEventListener('click', (e)=>{ e.preventDefault(); show(i+1); restart(); });

    carousel.addEventListener('mouseenter', ()=> clearInterval(timer));
    carousel.addEventListener('mouseleave', ()=> restart());
    carousel.addEventListener('touchstart', ()=> clearInterval(timer), {passive:true});
    carousel.addEventListener('touchend', ()=> restart());
  });
});
