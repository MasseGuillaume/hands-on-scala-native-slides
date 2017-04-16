document.addEventListener("DOMContentLoaded", function(event) {
  Reveal.initialize({
    controls: false,
    slideNumber: 'c/t',
    history: true,
    dependencies: [
      { 
        src: 'reveal.js/plugin/highlight/highlight.js',
        async: true,
        callback: function() { hljs.initHighlightingOnLoad(); } 
      }
    ]
  });
});