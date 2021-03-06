var Generator = require('yeoman-generator')
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.props = { fields: [] }
    this.attr
  }
  async prompting() {

    let myquestions = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'your package name',
        default: 'com.bee'
      },
      {
        type: 'input',
        name: 'designPath',
        message: 'what is your domain design path',
        default: 'design.json'    
      }
  ]
    await this.prompt(myquestions).then(function (answers) {
      this.props.basePath = answers.packageName.replace(/\./g, '/')
      this.props.packageName = answers.packageName
      this.props.name = answers.name
      this.props.designPath= answers.designPath
    }.bind(this), function () {
      console.log('this is a unknow error')
    })
    var designObj = this.fs.readJSON(this.props.designPath,{})
      
    // for(var i = 0,len = domanList.length;i<len; i++){
    //   console.log(domanList[i])
    // }
    var temp = designObj.doman;
    let convert = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      temp[index].upName = convert(element.name)
      var tempFields = temp[index].fields;
      for (let j = 0; j < tempFields.length; j++) {
        const element = tempFields[j];
        element.upName= convert(element.name)
        
      }
    }
    console.log(temp)
    this.props.domanList = temp
  } 
  writing() {
    //function
    let convert = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
    )
    this.fs.copyTpl(
      this.templatePath('build.gradle'),
      this.destinationPath('build.gradle'),
      // { title: 'Templating with Yeoman' }
    )
    this.fs.copyTpl(
      this.templatePath('settings.gradle'),
      this.destinationPath('settings.gradle'),
      { name: this.props.name }
    )
    this.fs.copyTpl(
      this.templatePath('gradlew'),
      this.destinationPath('gradlew'),
      // { title: 'Templating with Yeoman' }
    )
    this.fs.copyTpl(
      this.templatePath('gradlew.bat'),
      this.destinationPath('gradlew.bat'),
    )
    this.fs.copyTpl(
      this.templatePath('src/main/java/com/bee/DemoApplication.java'),
      this.destinationPath('src/main/java/' + this.props.basePath + '/' + convert(this.props.name) + 'Application.java'),
      { name: convert(this.props.name), packageName: this.props.packageName }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/resources/application.properties'),
      this.destinationPath('src/main/resources/application.properties'),
      {name:this.props.name}
    );
    this.fs.copy(
      this.templatePath('gradle/wrapper/gradle-wrapper.jar'),
      this.destinationPath('gradle/wrapper/gradle-wrapper.jar'),
    );
    this.fs.copyTpl(
      this.templatePath('gradle/wrapper/gradle-wrapper.properties'),
      this.destinationPath('gradle/wrapper/gradle-wrapper.properties'),
    );
    this.fs.copy(
      this.templatePath('src/main/java/com/bee/common'),
      this.destinationPath('src/main/java/com/bee/common')
    );
    this.fs.copy(
      this.templatePath('src/main/java/com/bee/config'),
      this.destinationPath('src/main/java/com/bee/config')
    );
    this.fs.copy(
      this.templatePath('src/main/java/com/bee/domain'),
      this.destinationPath('src/main/java/com/bee/domain')
    );
    this.fs.copy(
      this.templatePath('src/main/java/com/bee/repository'),
      this.destinationPath('src/main/java/com/bee/repository')
    );
    this.fs.copy(
      this.templatePath('src/main/java/com/bee/controller'),
      this.destinationPath('src/main/java/com/bee/controller')
    );
    var domanList = this.props.domanList;
    for(var i = 0,len = domanList.length;i<len; i++){
      const element = domanList[i]
      this.fs.copyTpl(
        this.templatePath('temp/tempDomain.java'),
        this.destinationPath('src/main/java/com/bee/domain/'+element.upName+'.java'),
        domanList[i]
      )
    }
    for(var i = 0,len = domanList.length;i<len; i++){
      const element = domanList[i]
      this.fs.copyTpl(
        this.templatePath('temp/tempRepository.java'),
        this.destinationPath('src/main/java/com/bee/repository/'+element.upName+'Repository.java'),
        domanList[i]
      )
    }
    for(var i = 0,len = domanList.length;i<len; i++){
      const element = domanList[i]
      this.fs.copyTpl(
        this.templatePath('temp/tempController.java'),
        this.destinationPath('src/main/java/com/bee/controller/'+element.upName+'Controller.java'),
        domanList[i]
      )
    }
    
  }
};
