'use strict';
 
module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
 
    grunt.initConfig({
       
        config: grunt.file.exists('Gruntconfig.json') ? grunt.file.readJSON('Gruntconfig.json') : grunt.file.readJSON('Gruntconfig.json.example'),
              
        exec: {
            ngBuild: {
                command: "ng build",
                stdout: true,
                stderr: true
                }
        },
        war: {
            target: {
                options: {
                    war_dist_folder: '<%= config.war %>',
                    war_name: 'ams-app-msc-<%= config.WarVersion %>',
                    webxml_welcome: 'index.html',
                    war_verbose: true,
                    webxml_display_name: 'Grunt WAR'
                },
                            files: [{
                               expand: true,
                               cwd: '<%= config.dist %>',
                               src: ['**']
                            //   dest: ''
                            }]
            }
        },
    //    background-image: url('src/assets/img/NIMITZ.png');
    replace: {
        basePath: {
            overwrite: true,
            src:  ['<%= config.dist %>/main.bundle.js'],
            replacements: [{
                from: /NODE_ENV/g,
                to: '<%= config.NODE_ENV %>'
            }]
        },
        fontAwesome: {
            overwrite: true,
            src:  ['<%= config.dist %>/styles.js'],
            replacements: [{
                from: /fontawesome-webfont/g,
                to: '/photoApp/fontawesome-webfont'
            }]
        },
        primeNg: {
            overwrite: true,
            src:  ['<%= config.dist %>/index.html'],
            replacements: [{
                from: /node_modules/g,
                to: '/photoApp/node_modules'
            }]
        },
     //   ImageUrl: "assets/testImages/image4.jpg", 
        testThumbnails: {
            overwrite: true,
            src:  ['<%= config.dist %>/testData/search.data.ts'],
            replacements: [{
                from: /"assets/g,
                to: '"/photoApp/assets'
            }]
        },
       
        images: {
            overwrite: true,
            src:  ['<%= config.dist %>/main.bundle.js'],
            replacements: [{
                from: /..\/..\/assets\/img/g,
                to: '/photoApp/assets/img'
            }]
        },
        configFiles: {
            overwrite: true,
            src:  ['<%= config.dist %>/main.bundle.js'],
            replacements: [{
                from: /..\/..\/assets\/config/g,
                to: '/photoApp/assets/config'
            }]
        },
        scriptDomainHtml: {
            overwrite: true,
            src:  ['<%= config.dist %>/*.html'],
            replacements: [{
                from: /src="/g,
                to: 'src="/photoApp/'
            }]
        },
        scriptDomainCss: {
            overwrite: true,
            src:  ['<%= config.dist %>/*.css'],
            replacements: [{
                from: /src="/g,
                to: 'src="/photoApp/'
            }]
        },
        scriptDomainJs: {
            overwrite: true,
            src:  ['<%= config.dist %>/*.js'],
            replacements: [{
                from: /src=\\"/g,
                to: 'src=\\"photoApp/'
            }]
        },
    },
 
      
        copy: {
            web: {
                files: [{
                    expand: true,
                    cwd: '<%= config.root %>',
                    src: [
                        '<%= config.WebInf %>/web.xml',
                        '<%= config.WebInf %>/weblogic.xml',
                        '<%= config.WebInf %>/web-application.xml'
                    ],
                    dest: '<%= config.dist %>'      
                }]
            },   
           
            primeNg: {
                files: [{
                    expand: true,
                    cwd: '<%= config.root %>',
                    src: [
                        '<%= config.root %>/node_modules/primeicons/primeicons.css',
                        '<%= config.root %>/node_modules/primeicons/fonts/primeicons.eot',
                        '<%= config.root %>/node_modules/primeicons/fonts/primeicons.svg',
                        '<%= config.root %>/node_modules/primeicons/fonts/primeicons.ttf',
                        '<%= config.root %>/node_modules/primeicons/fonts/primeicons.woff',
                        '<%= config.root %>/node_modules/primeng/resources/primeng.min.css',
                        '<%= config.root %>/node_modules/primeflex/primeflex.scss',
                        '<%= config.root %>/node_modules/@fullcalendar/core/main.min.css',
                        '<%= config.root %>/node_modules/@fullcalendar/daygrid/main.min.css',
                        '<%= config.root %>/node_modules/@fullcalendar/timegrid/main.min.css',
                    ],
                    dest: '<%= config.dist %>'      
                }]
            }  
        }
    });
 
      grunt.registerTask('show:configs', function () {
        var config = grunt.file.exists('Gruntconfig.json') ? grunt.file.readJSON('Gruntconfig.json') : grunt.file.readJSON('Gruntconfig.json.example');
 
        grunt.log.writeln("config.name = [" + config.name + "]");
    //    grunt.log.writeln("config.NODE_ENV = [" + config.NODE_ENV + "]");
        grunt.log.writeln("config.root = [" + config.root + "]");       
        grunt.log.writeln("config.app = [" + config.app + "]");
        grunt.log.writeln("config.dist = [" + config.dist + "]");
        grunt.log.writeln("config.tmp  = [" + config.tmp + "]");
        grunt.log.writeln("config.common.src  = [" + config.common.src + "]");
        grunt.log.writeln("config.common.dest = [" + config.common.dest + "]");
        grunt.log.writeln("config.classifier  = [" + config.classifier + "]");
        grunt.log.writeln("connect.options.hostname = [" + config.connect.options.hostname + "]");
        grunt.log.writeln("connect.options.livereload = [" + config.connect.options.livereload + "]");
        grunt.log.writeln("connect.options.port = [" + config.connect.options.port + "]");
        grunt.log.writeln("connect.proxies.context = [" + config.connect.proxies.context + "]");
        grunt.log.writeln("connect.proxies.host = [" + config.connect.proxies.host + "]");
        grunt.log.writeln("connect.proxies.port = [" + config.connect.proxies.port + "]");
        grunt.log.writeln("config.connect.proxies.context= [" + config.connect.proxies.context + "]");
    });
 
   /*  grunt.registerTask('ts', 'Convert transcript to javascript', function () {
       
        grunt.task.run([
            'typescript'
        ]);
    });     */

    grunt.registerTask('makewar', 'Convert transcript to javascript', function () {
       
        grunt.task.run([
            'war'
        ]);
    });   
 
    grunt.registerTask('deploy', 'Delete stuff', function () {
        
        grunt.task.run([
            'exec:ngBuild',
            'replace:basePath',
            'replace:scriptDomainHtml',
            'replace:scriptDomainCss',
            'replace:scriptDomainJs',
            'replace:primeNg',
            'replace:images',
            'replace:configFiles',
            'replace:testThumbnails',
            'replace:fontAwesome',           
            'copy:web',
            'copy:primeNg',
            'war'
        ]);
    });   
};  