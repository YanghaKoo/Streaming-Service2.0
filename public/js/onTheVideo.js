"use strict";

(function (videojs) {

  "use strict";

  videojs.plugin("starRating", function (opts) {
    var player = this;
    var _ss;

    // control-bar에 버튼 생성, 버튼과 별점 생성 연결
    var Button = videojs.getComponent("Button");
    var MyButton = videojs.extend(Button, {
      constructor: function constructor() {
        // Button 초기화, 버튼에 모양 배정
        Button.apply(this, arguments);
        this.addClass("vjs-icon-circle");
      },
      handleClick: function handleClick() {
        console.log("grading process");
        toggleClass();
      }
    });

    // is-visible class를 toggle 함으로써 나타났다 사라졌다를 구현
    videojs.registerComponent("rating", MyButton);
    var player = videojs("vid1");
    player.getChild("controlBar").addChild("rating", {});

    var toggleClass = function toggleClass() {
      _ss.classList.toggle('is-visible');
    };

    // 별점 정보를 서버로 비 동기적으로 요청
    function sendRating(rating) {
      var formData = new FormData();

      var para = document.location.href.split("/");

      // 비 동기적 요청을 위해 formData객체 사용
      formData.append("rating", rating);
      formData.append('id', para[4]);
      console.log(para[4]);

      // ajax와 promise를 활용해 비동기적 post요청을 보내고 성공,실패시의 내용을 경고창으로 띄워줌
      $.ajax({
        type: "POST",
        url: "/rank",
        data: formData,
        contentType: false,
        mimeType: "multipart/form-data",
        processData: false,
        success: function success() {
          console.log("success!!");
        }
      }).done(function (res) {
        alert("평점 등록에 성공했습니다!");
      }).fail(function (e) {
        console.log(e);
        alert("평점 등록에 실패했습니다. 페이지 새로고침 후 다시 시도해 주세요.");
      });
    }

    // 1~5점 전송
    // 반복문을 돌려서 함수 5개를 만드려고 했는데, 아래에 보면 
    // _button.addEventListener("click", send2, false); 이런식으로 send2함수를 이름으로 넘겨줘서 
    // 매개변수를 주는 방법이 되질 않아서 5개를 따로 만들어 줬습니다.    
    function send1(e) {
      e.preventDefault();
      sendRating(1);
    }
    function send2(e) {
      e.preventDefault();
      sendRating(2);
    }
    function send3(e) {
      e.preventDefault();
      sendRating(3);
    }
    function send4(e) {
      e.preventDefault();
      sendRating(4);
    }
    function send5(e) {
      e.preventDefault();
      sendRating(5);
    }

    // html 컴포넌트를 화면으로 올리는 부분
    function constructstarRatingContent() {
      var _frag = document.createDocumentFragment();
      var _aside = document.createElement("aside");
      var _button;

      // 빈별 image
      var empty = '<img src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/512/star-empty-icon.png" width="40px"/>';

      // 5개의 평점 보낼 별 생성 (1~5점)
      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty;
      _button.addEventListener("click", send1, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty;
      _button.addEventListener("click", send2, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty;
      _button.addEventListener("click", send3, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty;
      _button.addEventListener("click", send4, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty;
      _button.addEventListener("click", send5, false);
      _aside.appendChild(_button);

      // 여기에 mouseover, mouseout으로 별점 조정
      // 별점에 마우스를 올리면 해당 별보다 앞에있는  빈별을 노란별로 바꿔줌

      var _loop = function _loop(i) {
        var tag = _aside.children[i];
        tag.addEventListener("mouseover", function () {
          for (var j = 0; j <= i; j++) {
            _aside.children[j].children[0].setAttribute('src', 'https://cdn3.iconfinder.com/data/icons/basic-flat-svg/512/svg06-512.png');
          }
        });
        // 노랑별에서 mouseout 시 모든 별을 빈별로 바꿔줌
        tag.addEventListener("mouseout", function () {
          for (var k = 0; k < 5; k++) {
            _aside.children[k].children[0].setAttribute('src', 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/512/star-empty-icon.png');
          }
        });
      };

      for (var i = 0; i < 5; i++) {
        _loop(i);
      }

      _aside.className = "vjs-social-share";
      _ss = _aside; // 전역변수로 빼냄
      _frag.appendChild(_aside);
      player.el().appendChild(_frag);
    }
    player.ready(function () {
      constructstarRatingContent();
    });
  });
})(window.videojs);