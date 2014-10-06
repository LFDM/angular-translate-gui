# angular-translate-gui

Simple GUI to produce translation files for angular-translate more efficiently and in a controlled way

## Install

Make sure you have node, bower and grunt installed!
You also need a running MongoDB server (right now it needs to be at port 27017, its default).

```
npm install
bower install
```

You can start building up translation files immediately if you run

```
grunt serve
```

This will open your browser at [http://localhost:9000](http://localhost:9000).

If you already have `angular-translate` locale files available you can
seed them to the database by using the `importer` script, accessible
from this repository's root directory.

```
node importer.js PATH_TO_THE_DIRECTORY_WITH_LOCALE_FILES
```
