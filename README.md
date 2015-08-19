## Overview

Montage Data is a framework that allows
[Montage](https://github.com/montagejs/montage) applications to easily exchange
data with servers. It maps server data to model objects accessible in
application code, allowing complex server operations to be performed by reading
and writing the properties of model objects obtained with simple queries.

This is similar to Object Relational Mapping (ORM) except that it also works for
servers offering REST or other type of non-relational services, so it could be
called Object Service Mapping (OSM).

## Documentation

Documentation can be generated with

    jsdoc -c .jsdoc.conf.json

## Testing

Tests can be run by executing `npm install` in the `test` subdirectory and then
loading `test/run.html` through a web server.

Tests can be created by editing `test/run.js`.
