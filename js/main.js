(function(){
  let check = {
    count: 0,
    pwd:'',
    init: function(){
      this.cacheDOM();
      this.bindEvents();
      this.bars();
    },
    cacheDOM: function(){
      this.input = document.querySelectorAll('.input-form');
      this.submit = document.querySelector('#submit');
      this.password = document.querySelector('#pwd');
      this.confirm = document.querySelector('#pwd-confirm');
      this.ruleList = document.querySelector('.rule-list');
    },
    bindEvents: function(){
      for(let i = 0; i < this.input.length; i++){
        let input = this.input[i];
        input.addEventListener('focus', this.inputFocus);
        input.addEventListener('blur', this.inputBlur);        
      };
      this.password.addEventListener('keyup', this.pwdKeyup);
      this.password.addEventListener('blur', this.savePwd);
      this.confirm.addEventListener('keyup', this.checkPwdConfirm);
    },
    savePwd: function(e){
      check.pwd = e.target.value;
    },
    inputFocus: function(e){
      e.target.parentElement.childNodes[1].className = 'outside';
    },
    inputBlur: function(e){
      if(e.target.value === ''){e.target.parentElement.childNodes[1].className = '';}
      
    },
    pwdKeyup: function(e){
      let input = e.target.value;
      check.minChar(input);      
      check.Upper(input);
      check.Num(input);
      check.special(input);
    },
    minChar: function(input){
      let data = input;
      let rule = /^.{8,}$/;
      let ruleMin = document.querySelector('#min-dig');
      this.updateUI(ruleMin, rule, data);
    },
    Upper: function(input){
      let data = input;
      let rule = /[A-Z]/;
      let ruleUpper = document.querySelector('#uppercase');
      this.updateUI(ruleUpper, rule, data);
    },
    Num: function(input){
      let data = input;
      let rule = /[0-9]/;
      let ruleNum = document.querySelector('#number-pwd');
      this.updateUI(ruleNum, rule, data);
    },
    special: function(input){
      let data = input;
      let rule = /[^A-Za-z0-9]/;
      let ruleSpecial = document.querySelector('#special-char');
      this.updateUI(ruleSpecial, rule, data);
    },
    bars: function(){
      classes = ['one-rule', 'two-rules', 'three-rules', 'four-rules'];
      let barList = document.querySelectorAll('.bar');
      let password = this.password;
      let pwdClass = 'all-good';
      switch(this.count){
        case 0:
          this.removeClass(barList, classes);
          this.removeClass(password, pwdClass);
          break;
        case 1:
          this.removeClass(barList, classes);
          this.removeClass(password, pwdClass);
          barList[0].classList.add('one-rule');
          break;
        case 2:
          this.removeClass(barList, classes);
          this.removeClass(password, pwdClass);
          barList[0].classList.add('two-rules');
          barList[1].classList.add('two-rules');
          break;
        case 3:
          this.removeClass(barList, classes);
          this.removeClass(password, pwdClass);
          barList[0].classList.add('three-rules');
          barList[1].classList.add('three-rules');
          barList[2].classList.add('three-rules');
          break;
        case 4:
          this.removeClass(barList, classes);
          this.removeClass(password, pwdClass);
          barList[0].classList.add('four-rules');
          barList[1].classList.add('four-rules');
          barList[2].classList.add('four-rules');
          barList[3].classList.add('four-rules');
          password.classList.add('all-good')
          break;
      }
    },
    removeClass: function(element, classes){
      for(let i = 0; i < element.length; i++){
        for(let j = 0; j <classes.length; j++){
          element[i].classList.remove(classes[j]);
        }
      };
      if(element.type){
        element.classList.remove(classes);
      }
    },
    checkPwdConfirm: function(e){
      let pwdConfirm = e.target.value;
      if(pwdConfirm == check.pwd){
        check.allCool();
      }
    },
    updateUI: function(element, rule, input){
      if(rule.test(input)){
        element.firstChild.className = 'fa fa-check';
      }else{
        element.firstChild.className = 'fa fa-times';
      }
      this.countRules();
    },
    countRules: function(){
      let lists = this.ruleList.children;
      number = 0;
      for(let i = 0; i < lists.length; i++){
        if(lists[i].children[0].classList.contains('fa-check')){number++;}
      }
      this.count = number;
      this.bars();
    },
    allCool: function(){
      this.confirm.classList.add('all-good');
      this.submit.classList.add('ok');
    }
  }
  
  check.init();
})()