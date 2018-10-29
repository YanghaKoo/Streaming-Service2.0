"use strict";

var videoUrl = "http://192.168.35.96:1935/vod/mp4:sample.mp4/manifest.mpd";
var videoId = "video_sample";

function thumbnailPlay(videoUrl, videoId) {
  var vid1 = document.getElementById('vid1');
  vid1.addEventListener('mouseover', function (e) {

    console.log('Video preview made');
    var video = document.createElement('video');
    video.setAttribute("id", videoId);
    video.setAttribute("class", "video-js vjs-default-skin");
    var a = document.createAttribute('controls');
    video.setAttributeNode(a);
    var a = document.createAttribute('autoplay');
    video.setAttributeNode(a);
    video.setAttribute("preload", "auto");
    video.setAttribute("width", "300");
    video.setAttribute("height", "150");
    video.setAttribute("data-setup", '{}');

    var source = document.createElement('source');
    // source.setAttribute('src', "http://192.168.35.96:1935/live/myStream/manifest.mpd")
    source.setAttribute('src', videoUrl);
    source.setAttribute('type', "application/dash+xml");
    video.appendChild(source);

    var preview = document.getElementById('preview');
    preview.appendChild(video);
    var player = videojs(video); /// 이걸 안써서..

    preview.addEventListener('mouseout', function (e) {
      preview.removeChild(document.getElementById(videoId));
    });
  });
}
thumbnailPlay(videoUrl, videoId);