module.exports = function (grunt) {
    var conf=grunt.file.readJSON('./conf.json');
    grunt.loadNpmTasks('grunt-replace');
    grunt.initConfig({
        replace: {
            dist:
            {
                options: {
                    patterns: [
                        {
                            json: grunt.file.readJSON('conf.json')
                        }
                    ]
                },
                files: [
                    {src: ['src/public/apidocs/json/index.json.template'], dest: 'src/public/apidocs/json/index.json'},
                    {src: ['config/L_SystemConfig.js'], dest: 'config/SystemConfig.js'}
                ]
            }
        }

    });
    grunt.registerTask('default', 'replace');
};