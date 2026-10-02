// Every page opens at the top, unless the link points to a place on the page.
(function(){
  try{ if('scrollRestoration' in history) history.scrollRestoration='manual'; }catch(e){}
  function top(){ if(!location.hash) window.scrollTo(0,0); }
  top();
  window.addEventListener('DOMContentLoaded',top);
  window.addEventListener('load',top);
  window.addEventListener('pageshow',top);
})();
