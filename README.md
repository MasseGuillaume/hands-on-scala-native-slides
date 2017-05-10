# Hands On Scala Native Presentation

This is the repository for the slides

see https://github.com/MasseGuillaume/hands-on-scala-native for the code

Develop:

```bash
npm install
npm install bower gulp
node node_modules/bower/bin/bower install
node node_modules/gulp/bin/gulp.js

# open http://localhost:5443
```

Deploy:

```
node node_modules/gulp/bin/gulp.js buildServe
git add -A
git commit -m "."
git push origin master

# open https://github.com/MasseGuillaume/hands-on-scala-native
```

Print PDF:

https://github.com/hakimel/reveal.js/#pdf-export