!function(a){
    "use strict";
  
    function b(){}  // 빈 함수 정의
  
    function c(){   // 현재 활성화된 요소를 반환하는 함수 정의
      try{return document.activeElement}catch(a){}
    }
  
    function d(a,b){  // 배열 a에 b가 있는지 확인하는 함수
      for(var c=0,d=a.length;d>c;c++) 
        if(a[c]===b) return!0;
      return!1;
    }
  
    function e(a,b,c){  // 이벤트 리스너 추가 함수
      return a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):void 0;
    }
  
    function f(a,b){  // 텍스트 입력 포커스 위치 설정 함수
      var c;
      a.createTextRange?(c=a.createTextRange(),c.move("character",b),c.select()):
      a.selectionStart&&(a.focus(),a.setSelectionRange(b,b))
    }
  
    function g(a,b){  // 입력 필드의 타입을 변경하려고 시도하는 함수
      try{return a.type=b,!0}catch(c){return!1}
    }
  
    function h(a,b){  // 특정 요소나 그 자식 요소들에게 함수 b를 적용
      if(a&&a.getAttribute(B)) 
        b(a);
      else 
        for(var c,d=a?a.getElementsByTagName("input"):N,e=a?a.getElementsByTagName("textarea"):O,f=d?d.length:0,g=e?e.length:0,h=f+g,i=0;h>i;i++)
          c=f>i?d[i]:e[i-f],b(c);
    }
  
    function i(a){h(a,k)}  // 특정 요소들에 k 함수를 적용
  
    function j(a){h(a,l)}  // 특정 요소들에 l 함수를 적용
  
    function k(a,b){  // 플레이스홀더 비활성화 관련 로직
      var c=!!b&&a.value!==b,d=a.value===a.getAttribute(B);
      if((c||d)&&"true"===a.getAttribute(C)){
        a.removeAttribute(C),a.value=a.value.replace(a.getAttribute(B),""),
        a.className=a.className.replace(A,"");
        var e=a.getAttribute(I);
        parseInt(e,10)>=0&&(a.setAttribute("maxLength",e),a.removeAttribute(I));
        var f=a.getAttribute(D); return f&&(a.type=f),!0
      }
      return!1
    }
  
    function l(a){  // 플레이스홀더 활성화 관련 로직
      var b=a.getAttribute(B);
      if(""===a.value&&b){
        a.setAttribute(C,"true"),a.value=b,a.className+=" "+z;
        var c=a.getAttribute(I);
        c||(a.setAttribute(I,a.maxLength),a.removeAttribute("maxLength"));
        var d=a.getAttribute(D);
        return d?a.type="text":"password"===a.type&&g(a,"text")&&a.setAttribute(D,"password"),!0
      }
      return!1
    }
  
    function m(a){return function(){P&&a.value===a.getAttribute(B)&&"true"===a.getAttribute(C)?f(a,0):k(a)}}  // 포커스 이벤트
  
    function n(a){return function(){l(a)}}  // 블러 이벤트
  
    function o(a){return function(){i(a)}}  // 서브밋 이벤트
  
    function p(a){return function(b){return v=a.value,"true"===a.getAttribute(C)&&v===a.getAttribute(B)&&d(x,b.keyCode)?(b.preventDefault&&b.preventDefault(),!1):void 0}}  // 키다운 이벤트
  
    function q(a){return function(){k(a,v),""===a.value&&(a.blur(),f(a,0))}}  // 키업 이벤트
  
    function r(a){return function(){a===c()&&a.value===a.getAttribute(B)&&"true"===a.getAttribute(C)&&f(a,0)}}  // 클릭 이벤트
  
    function s(a){
      var b=a.form;
      b&&"string"==typeof b&&(b=document.getElementById(b),
      b.getAttribute(E)||(e(b,"submit",o(b)),b.setAttribute(E,"true")));
      e(a,"focus",m(a)),e(a,"blur",n(a)),
      P&&(e(a,"keydown",p(a)),e(a,"keyup",q(a)),e(a,"click",r(a))),
      a.setAttribute(F,"true"),a.setAttribute(B,T),(P||a!==c())&&l(a)
    }
  
    var t=document.createElement("input"),
        u=void 0!==t.placeholder;
  
    if(a.Placeholders={nativeSupport:u,disable:u?b:i,enable:u?b:j},!u){
      var v,
          w=["text","search","url","tel","email","password","number","textarea"],
          x=[27,33,34,35,36,37,38,39,40,8,46],
          y="#ccc",
          z="placeholdersjs",
          A=new RegExp("(?:^|\\s)"+z+"(?!\\S)"),
          B="data-placeholder-value",
          C="data-placeholder-active",
          D="data-placeholder-type",
          E="data-placeholder-submit",
          F="data-placeholder-bound",
          G="data-placeholder-focus",
          H="data-placeholder-live",
          I="data-placeholder-maxlength",
          J=100,
          K=document.getElementsByTagName("head")[0],
          L=document.documentElement,
          M=a.Placeholders,
          N=document.getElementsByTagName("input"),
          O=document.getElementsByTagName("textarea"),
          P="false"===L.getAttribute(G),
          Q="false"!==L.getAttribute(H),
          R=document.createElement("style");
  
      R.type="text/css";
      var S=document.createTextNode("."+z+" {color:"+y+";}");
      R.styleSheet?R.styleSheet.cssText=S.nodeValue:R.appendChild(S),K.insertBefore(R,K.firstChild);
  
      for(var T,U,V=0,W=N.length+O.length;W>V;V++)
        U=V<N.length?N[V]:O[V-N.length],
        T=U.attributes.placeholder,T&&(T=T.nodeValue,T&&d(w,U.type)&&s(U));
  
      var X=setInterval(function(){
        for(var a=0,b=N.length+O.length;b>a;a++)
          U=a<N.length?N[a]:O[a-N.length],
          T=U.attributes.placeholder,T?(T=T.nodeValue,T&&d(w,U.type)&&(U.getAttribute(F)||s(U),
          (T!==U.getAttribute(B)||"password"===U.type&&!U.getAttribute(D))&&("password"===U.type&&!U.getAttribute(D)&&g(U,"text")&&U.setAttribute(D,"password"),
          U.value===U.getAttribute(B)&&(U.value=T),U.setAttribute(B,T)))):U.getAttribute(C)&&(k(U),U.removeAttribute(B));
        Q||clearInterval(X)
      },J);
  
      e(a,"beforeunload",function(){M.disable()})
    }
  }(this);
   /*polyfill for the HTML5 placeholder attribute */
  (function(){
    //Login/Signup modal window - by CodyHouse.co
  function ModalSignin( element ) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
    this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a'); 
    this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
    this.hidePassword = this.element.getElementsByClassName('js-hide-password');
    this.init();
  };

  ModalSignin.prototype.init = function() {
    var self = this;
    //open modal/switch form
    for(var i =0; i < this.triggers.length; i++) {
      (function(i){
        self.triggers[i].addEventListener('click', function(event){
          if( event.target.hasAttribute('data-signin') ) {
            event.preventDefault();
            self.showSigninForm(event.target.getAttribute('data-signin'));
          }
        });
      })(i);
    }

    //close modal
    this.element.addEventListener('click', function(event){
      if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
        event.preventDefault();
        removeClass(self.element, 'cd-signin-modal--is-visible');
      }
    });
    //close modal when clicking the esc keyboard button
    document.addEventListener('keydown', function(event){
      (event.which=='27') && removeClass(self.element, 'cd-signin-modal--is-visible');
    });

    //hide/show password
    for(var i =0; i < this.hidePassword.length; i++) {
      (function(i){
        self.hidePassword[i].addEventListener('click', function(event){
          self.togglePassword(self.hidePassword[i]);
        });
      })(i);
    } 

    //IMPORTANT - REMOVE THIS - it's just to show/hide error messages in the demo
    this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function(event){
      event.preventDefault();
      self.toggleError(document.getElementById('signin-email'), true);
    });
    this.blocks[1].getElementsByTagName('form')[0].addEventListener('submit', function(event){
      event.preventDefault();
      self.toggleError(document.getElementById('signup-username'), true);
    });
  };

  ModalSignin.prototype.togglePassword = function(target) {
    var password = target.previousElementSibling;
    ( 'password' == password.getAttribute('type') ) ? password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
    target.textContent = ( 'Hide' == target.textContent ) ? 'Show' : 'Hide';
    putCursorAtEnd(password);
  }

  ModalSignin.prototype.showSigninForm = function(type) {
    // show modal if not visible
    !hasClass(this.element, 'cd-signin-modal--is-visible') && addClass(this.element, 'cd-signin-modal--is-visible');
    // show selected form
    for( var i=0; i < this.blocks.length; i++ ) {
      this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'cd-signin-modal__block--is-selected') : removeClass(this.blocks[i], 'cd-signin-modal__block--is-selected');
    }
    //update switcher appearance
    var switcherType = (type == 'signup') ? 'signup' : 'login';
    for( var i=0; i < this.switchers.length; i++ ) {
      this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'cd-selected') : removeClass(this.switchers[i], 'cd-selected');
    } 
  };

  ModalSignin.prototype.toggleError = function(input, bool) {
    // used to show error messages in the form
    toggleClass(input, 'cd-signin-modal__input--has-error', bool);
    toggleClass(input.nextElementSibling, 'cd-signin-modal__error--is-visible', bool);
  }

  var signinModal = document.getElementsByClassName("js-signin-modal")[0];
  if( signinModal ) {
    new ModalSignin(signinModal);
  }

  // toggle main navigation on mobile
  var mainNav = document.getElementsByClassName('js-main-nav')[0];
  if(mainNav) {
    mainNav.addEventListener('click', function(event){
      if( hasClass(event.target, 'js-main-nav') ){
        var navList = mainNav.getElementsByTagName('ul')[0];
        toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
      } 
    });
  }
  
  //class manipulations - needed if classList is not supported
  function hasClass(el, className) {
      if (el.classList) return el.classList.contains(className);
      else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
  function addClass(el, className) {
    var classList = className.split(' ');
     if (el.classList) el.classList.add(classList[0]);
     else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
     if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
  }
  function removeClass(el, className) {
    var classList = className.split(' ');
      if (el.classList) el.classList.remove(classList[0]);	
      else if(hasClass(el, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
      }
      if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
  }
  function toggleClass(el, className, bool) {
    if(bool) addClass(el, className);
    else removeClass(el, className);
  }

  //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  function putCursorAtEnd(el) {
      if (el.setSelectionRange) {
          var len = el.value.length * 2;
          el.focus();
          el.setSelectionRange(len, len);
      } else {
          el.value = el.value;
      }
  };
})();
/*Resource JavaScript*/

  (function(){
  //Login/Signup modal window - by CodyHouse.co
  function ModalSignin( element ) {
      this.element = element;
      this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
      this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a'); 
      this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
      this.hidePassword = this.element.getElementsByClassName('js-hide-password');
      this.init();
  };

  ModalSignin.prototype.init = function() {
      var self = this;
      //open modal/switch form
      for(var i =0; i < this.triggers.length; i++) {
          (function(i){
              self.triggers[i].addEventListener('click', function(event){
                  if( event.target.hasAttribute('data-signin') ) {
                      event.preventDefault();
                      self.showSigninForm(event.target.getAttribute('data-signin'));
                  }
              });
          })(i);
      }

      //close modal
      this.element.addEventListener('click', function(event){
          if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
              event.preventDefault();
              removeClass(self.element, 'cd-signin-modal--is-visible');
          }
      });
      //close modal when clicking the esc keyboard button
      document.addEventListener('keydown', function(event){
          (event.which=='27') && removeClass(self.element, 'cd-signin-modal--is-visible');
      });

      //hide/show password
      for(var i =0; i < this.hidePassword.length; i++) {
          (function(i){
              self.hidePassword[i].addEventListener('click', function(event){
                  self.togglePassword(self.hidePassword[i]);
              });
          })(i);
      } 

      //IMPORTANT - REMOVE THIS - it's just to show/hide error messages in the demo
      this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function(event){
          event.preventDefault();
          self.toggleError(document.getElementById('signin-email'), true);
      });
      this.blocks[1].getElementsByTagName('form')[0].addEventListener('submit', function(event){
          event.preventDefault();
          self.toggleError(document.getElementById('signup-username'), true);
      });
  };

  ModalSignin.prototype.togglePassword = function(target) {
      var password = target.previousElementSibling;
      ( 'password' == password.getAttribute('type') ) ? password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
      target.textContent = ( 'Hide' == target.textContent ) ? 'Show' : 'Hide';
      putCursorAtEnd(password);
  }

  ModalSignin.prototype.showSigninForm = function(type) {
      // show modal if not visible
      !hasClass(this.element, 'cd-signin-modal--is-visible') && addClass(this.element, 'cd-signin-modal--is-visible');
      // show selected form
      for( var i=0; i < this.blocks.length; i++ ) {
          this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'cd-signin-modal__block--is-selected') : removeClass(this.blocks[i], 'cd-signin-modal__block--is-selected');
      }
      //update switcher appearance
      var switcherType = (type == 'signup') ? 'signup' : 'login';
      for( var i=0; i < this.switchers.length; i++ ) {
          this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'cd-selected') : removeClass(this.switchers[i], 'cd-selected');
      } 
  };

  ModalSignin.prototype.toggleError = function(input, bool) {
      // used to show error messages in the form
      toggleClass(input, 'cd-signin-modal__input--has-error', bool);
      toggleClass(input.nextElementSibling, 'cd-signin-modal__error--is-visible', bool);
  }

  var signinModal = document.getElementsByClassName("js-signin-modal")[0];
  if( signinModal ) {
      new ModalSignin(signinModal);
  }

  // toggle main navigation on mobile
  var mainNav = document.getElementsByClassName('js-main-nav')[0];
  if(mainNav) {
      mainNav.addEventListener('click', function(event){
          if( hasClass(event.target, 'js-main-nav') ){
              var navList = mainNav.getElementsByTagName('ul')[0];
              toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
          } 
      });
  }
  
  //class manipulations - needed if classList is not supported
  function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);
        else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
  function addClass(el, className) {
      var classList = className.split(' ');
       if (el.classList) el.classList.add(classList[0]);
       else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
       if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
  }
  function removeClass(el, className) {
      var classList = className.split(' ');
        if (el.classList) el.classList.remove(classList[0]);	
        else if(hasClass(el, classList[0])) {
            var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
            el.className=el.className.replace(reg, ' ');
        }
        if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
  }
  function toggleClass(el, className, bool) {
      if(bool) addClass(el, className);
      else removeClass(el, className);
  }

  //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  function putCursorAtEnd(el) {
      if (el.setSelectionRange) {
            var len = el.value.length * 2;
            el.focus();
            el.setSelectionRange(len, len);
      } else {
            el.value = el.value;
      }
  };
})();