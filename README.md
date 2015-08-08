## Overview

Montage Data is a framework that allows
[Montage](https://github.com/montagejs/montage) applications to easily exchange
data with servers. It maps server data to model objects accessible in
application code, allowing complex server operations to be performed with simple
queries and reading and writing of model object properties.

When the servers accessed are relational database servers this would be called
Object Relational Mapping (ORM). Since the servers can also offer REST or other
type of non-relational services this could be called Object Service Mapping
(OSM).

## Documentation

Documentation for Montage Data can be generated with

    jsdoc -c .jsdoc.conf.json

## Testing

The Montage Data Tests can be run by executing the following in the `test`
subdirectory and then loading `test/run.html` through a web server:

    npm install
