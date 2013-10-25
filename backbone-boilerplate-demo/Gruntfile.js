module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        // Wipe out previous builds and test reporting.
        clean: ['dist/', 'test/reports'],

        // Run your source code through JSHint's defaults.
        jshint: {
            all: ['Gruntfile.js', 'public/js/**/*.js', 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js'],
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/js/libs/**/*.js']
            }
        },

        bower: {
            install: {
                options: {
                    copy: false,
                    cleanTargetDir: true
                }
            }
        },

        copy: {
            dependencies: {
                files: [
                    {
                        'public/js/libs/require.js': 'vendor/bower/requirejs/require.js',
                        'public/js/libs/jquery.js': 'vendor/bower/jquery/jquery.js',
                        'public/js/libs/json2.js': 'vendor/lib/json2.js',
                        'public/js/libs/underscore.js': 'vendor/bower/lodash/dist/lodash.underscore.js',
                        'public/js/libs/backbone.js': 'vendor/bower/backbone/backbone.js',
                        'public/js/libs/jquery-ui.js': 'vendor/bower/jquery-ui/ui/jquery-ui.js',
                        'public/js/libs/jquery.dateFormat.js': 'vendor/lib/jquery.dateFormat.js'
                    },
                ]
            },
            resources: {
                files: [{expand: true, src: ['vendor/**/images/**'], dest: 'dist'}]
            }
        },

        // This task uses James Burke's excellent r.js AMD builder to take
        // modules and concatenate them into a single file.
        requirejs: {
            options: grunt.file.readJSON('public/optimizer.json'),
            optimize: {
                options: {
                    fileExclusionRegExp: /less|optimizer\.json/
                }
            }
        },

        // This task simplifies working with CSS inside Backbone Boilerplate
        // projects.  Instead of manually specifying your stylesheets inside the
        // HTML, you can use `@imports` and this task will concatenate only those
        // paths.
        styles: {
            // Out the concatenated contents of the following styles into the below
            // development file path.
            'dist/css/common.css': {
                prefix: "./public/less/",

                // Point this to where your `index.css` file is location.
                src: 'public/less/common.less',

                // Rewrite image paths during release to be relative to the `./` directory.
                forceRelative: '../'
            },
            'dist/css/index.css': {
                prefix: "./public/less/",
                src: 'public/less/index-wrapper.less',
                forceRelative: '../'
            }
        },

        // Minfiy the distribution CSS.
        cssmin: {
            release: {
                files: {
                    'dist/css/common.min.css': ['dist/css/common.css'],
                    'dist/css/index.min.css': ['dist/css/index.css']
                }
            }
        },

        processhtml: {
            release: {
                files: {
                    'dist/index.html': ['public/index.html']
                }
            }
        },

        server: {
            options: {
                host: '0.0.0.0',
                port: 8000
            },

            development: {},

            release: {
                options: {
                    prefix: 'dist'
                }
            },

            test: {
                options: {
                    forever: false,
                    port: 8001
                }
            }
        },

        compress: {
            release: {
                options: {
                    archive: 'dist/source.min.js.gz'
                },
                files: ['dist/source.min.js']
            }
        },

        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: process.cwd(),
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,
                logLevel: 'ERROR',

                reporters: ['progress', 'coverage'],
                browsers: ['PhantomJS'],

                // Change this to the framework you want to use.
                frameworks: ['mocha'],

                plugins: [
                    'karma-mocha',
                    'karma-phantomjs-launcher',
                    'karma-coverage'
                ],

                preprocessors: {
                    'public/js/**/*.js': 'coverage'
                },

                coverageReporter: {
                    type: 'lcov',
                    dir: 'test/coverage'
                },

                files: [
                    // You can optionally remove this or swap out for a different expect.
                    'vendor/bower/chai/chai.js',
                    'vendor/bower/requirejs/require.js',
                    'test/runner.js',

                    { pattern: 'public/js/**/*.*', included: false },
                    // Derives test framework from Karma configuration.
                    {
                        pattern: 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js',
                        included: false
                    },
                    { pattern: 'vendor/**/*.js', included: false }
                ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        },

        coveralls: {
            options: {
                coverage_dir: 'test/coverage/PhantomJS 1.9.2 (Linux)/'
            }
        }
    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bower-task');

    // Third-party tasks.
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-processhtml');

    // Grunt BBB tasks.
    grunt.loadNpmTasks('grunt-bbb-server');
    grunt.loadNpmTasks('grunt-bbb-styles');

    // Requirejs tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // When running the default Grunt command, just lint the code.
    grunt.registerTask('dist', [
        'clean',
        'jshint',
        'bower',
        'copy:dependencies',
        'requirejs',
        'copy:resources',
        'styles',
        'cssmin',
        'processhtml'
    ]);

    grunt.registerTask('default', ['dist']);

    grunt.registerTask('test', ['karma:run']);
};
