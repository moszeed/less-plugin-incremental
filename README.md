[![NPM version](https://badge.fury.io/js/less-plugin-incremental.svg)](http://badge.fury.io/js/less-plugin-incremental) [![Dependencies](https://david-dm.org/less/less-plugin-incremental.svg)](https://david-dm.org/less/less-plugin-incremental) [![devDependency Status](https://david-dm.org/less/less-plugin-incremental/dev-status.svg)](https://david-dm.org/less/less-plugin-incremental#info=devDependencies) [![optionalDependency Status](https://david-dm.org/less/less-plugin-incremental/optional-status.svg)](https://david-dm.org/less/less-plugin-incremental#info=optionalDependencies)

# less-plugin-incremental
incremental rebuild for less

rebuild only if something has changed, otherwise do nothing.

## how it works
`less-plugin-incremental` saves the checksum of the src (in a `.lessCache` file) and compares them on next run

## how to install
to install with [npm](https://npmjs.org):

```
$ npm install less-plugin-incremental
```

## how to use
on the command line,

```
lessc file.less --incremental
```


##### Support

[Buy me a Coffee](https://www.patreon.com/moszeed)
