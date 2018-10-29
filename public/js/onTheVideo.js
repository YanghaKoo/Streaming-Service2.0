(function(videojs) {
  
  
  "use strict";
  videojs.plugin("starRating", function(opts) {
    var player = this;
    var _ss;

    // control-bar에 버튼 생성, 버튼과 별점 생성 연결
    var Button = videojs.getComponent("Button");
    var MyButton = videojs.extend(Button, {
      constructor: function constructor() {
        Button.apply(this, arguments);
        this.addClass("vjs-icon-circle");
      },
      handleClick: function handleClick() {
        console.log("grading process");
        toggleClass()
      }
    });
  
    // is-visible class를 toggle 함으로써 나타났다 사라졌다를 구현
    videojs.registerComponent("rating", MyButton);
    var player = videojs("vid1");
    player.getChild("controlBar").addChild("rating", {});
  
    var toggleClass = function toggleClass() {
      _ss.classList.toggle('is-visible')
    };

    // 별점 정보를 서버로 비 동기적으로 요청
    function sendRating(rating) {
      var formData = new FormData();
      
      var para = document.location.href.split("/");
      
      formData.append("rating", rating);
      formData.append('id',para[4])
      console.log(para[4])

      $.ajax({
        type: "POST",
        url: "/rank",
        data: formData,
        contentType: false,
        mimeType: "multipart/form-data",
        processData: false,
        success: function() {
          console.log("success!!");
        }
      })
        .done(function(res) {
          alert("평점 등록에 성공했습니다!");
        })
        .fail(function(e) {
          console.log(e);
          alert(
            "평점 등록에 실패했습니다. 페이지 새로고침 후 다시 시도해 주세요."
          );
        });
    }


    // 1~5점 전송
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
    
    // 여기가 화면으로 올리는 부분
    function constructstarRatingContent() {
      var _frag = document.createDocumentFragment();
      var _aside = document.createElement("aside");
      var _button;
      
      var empty = '<img src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/512/star-empty-icon.png" width="40px"/>'

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty
      _button.addEventListener("click", send1, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty
      _button.addEventListener("click", send2, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty
      _button.addEventListener("click", send3, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty
      _button.addEventListener("click", send4, false);
      _aside.appendChild(_button);

      _button = document.createElement("a");
      _button.className = "vjs-social-share-link";
      _button.innerHTML = empty
      _button.addEventListener("click", send5, false);
      _aside.appendChild(_button);


      // 여기에 mouseover, mouseout으로 별점 조정
      for(let i=0; i<5; i++){
        let tag = _aside.children[i]                      
        tag.addEventListener("mouseover",function(){          
          for(let j=0; j<=i; j++){          
            _aside.children[j].children[0].setAttribute('src','data:image/png;base64,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')            
          }
        })

        tag.addEventListener("mouseout",function(){
          for(let k=0; k<5; k++){
            _aside.children[k].children[0].setAttribute('src','http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/512/star-empty-icon.png')          
          }
        })
      }

      _aside.className = "vjs-social-share";
      _ss = _aside; // 전역변수로 뺌
      _frag.appendChild(_aside);

      player.el().appendChild(_frag);
    }

    // // attach VideoJS event handlers
    // player.on("mouseover", function() {
    //   // on hover, fade in the social share tools
    //   _ss.classList.add("is-visible");
    // });

    // player.on("mouseout", function() {
    //   // when not hovering, fade share tools back out
    //   _ss.classList.remove("is-visible");
    // });

    player.ready(function() {
      constructstarRatingContent();
    });
  });
})(window.videojs);
