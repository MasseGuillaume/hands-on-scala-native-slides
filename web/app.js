document.addEventListener("DOMContentLoaded", function(event) {
  Reveal.initialize({
    width: 1024,
    height: 700,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 1.5,

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