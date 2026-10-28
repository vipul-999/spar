
(function(){
  var d=document,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
  var mb=$('.menu-btn'),nav=$('#nav');
  if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o);d.documentElement.classList.toggle('menu-open',o)});}
  $$('.sub-btn').forEach(function(b){b.addEventListener('click',function(){b.parentNode.classList.toggle('sub-open')})});
  $$('.nolink').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();if(window.innerWidth<=1180)a.parentNode.classList.toggle('sub-open')})});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){if(nav&&nav.classList.contains('open'))mb.click();var lb=$('.lb');if(lb&&!lb.hidden)lb.hidden=true}});
  // slider
  var s=$('[data-slider]');
  if(s){var sl=$$('.slide',s),dots=$$('.dot',s),i=0,t;
    function go(n){i=(n+sl.length)%sl.length;sl.forEach(function(x,k){x.classList.toggle('on',k===i)});dots.forEach(function(x,k){x.classList.toggle('on',k===i)});clearInterval(t);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)t=setInterval(function(){go(i+1)},6500)}
    $('.hs-prev',s).addEventListener('click',function(){go(i-1)});$('.hs-next',s).addEventListener('click',function(){go(i+1)});
    dots.forEach(function(x,k){x.addEventListener('click',function(){go(k)})});go(0);}
  // reveal
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});$$('.rv').forEach(function(x){io.observe(x)});}else $$('.rv').forEach(function(x){x.classList.add('in')});
  // counters
  function run(el){var to=+el.getAttribute('data-count'),suf=el.getAttribute('data-suf')||'',t0=null;function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1300,1);p=1-Math.pow(1-p,3);el.textContent=Math.round(to*p)+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  var cs=$$('[data-count]');
  if('IntersectionObserver' in window){var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);co.unobserve(e.target)}})},{threshold:.6});cs.forEach(function(x){co.observe(x)})}
  // case filter
  var g=$('[data-cases]');
  if(g){$$('.chip').forEach(function(c){c.addEventListener('click',function(){$$('.chip').forEach(function(x){x.classList.remove('on')});c.classList.add('on');var f=c.getAttribute('data-f');$$('.case',g).forEach(function(card){var ok=f==='all'||(card.getAttribute('data-cats')||'').indexOf(f)>-1;card.hidden=!ok})})})}
  // forms -> mail client
  $$('form.enquiry').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var n=f.elements.name.value.trim(),m=f.elements.email.value.trim(),g=f.elements.message?f.elements.message.value.trim():'',ok=$('[data-ok]',f);
    if(!n||!/^\S+@\S+\.\S+$/.test(m)){ok.textContent='Please add your name and a valid e-mail.';ok.className='form-note err';return}
    ok.textContent='Thank you, '+n+'. Your mail app will open with the message ready to send.';ok.className='form-note ok';
    location.href='mailto:info@spargrp.com?subject='+encodeURIComponent(f.id==='news'?'Newsletter subscription':'Enquiry from website')+'&body='+encodeURIComponent('Name: '+n+'\nE-mail: '+m+'\n\n'+g)})});
  // image lightbox
  var lb=$('.lb');
  if(lb){var li=$('img',lb);$$('.prose img').forEach(function(im){im.style.cursor='zoom-in';im.addEventListener('click',function(){li.src=im.src;li.alt=im.alt;lb.hidden=false})});lb.addEventListener('click',function(){lb.hidden=true})}
})();
