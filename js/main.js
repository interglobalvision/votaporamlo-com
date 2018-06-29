/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr */

Site = {
  mobileThreshold: 601,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    _this.bindDodge();
    _this.bindClick();
    _this.bindFbShare();

    _this.documentHeight = $(document).height();

  },

  onResize: function() {
    var _this = this;

    _this.documentHeight = $(document).height();
  },

  fixWidows: function() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  },

  handleDodge: function(elem) {


    var height = $(elem).outerHeight(),
      width = $(elem).outerWidth(),
      currentY = $(elem).position().top,
      currentX = $(elem).position().left,
      nextY = currentY + ((Math.random() < 0.5 ? -1 : 1) * height),
      nextX = currentX + ((Math.random() < 0.5 ? -1 : 1) * width),
      speed = 200;

    $(elem).animate({ top: nextY + 'px', left: nextX + 'px' }, speed);
  },

  bindDodge: function() {
    var _this = this;

    $('#si').on('mouseenter', function() {
      _this.handleDodge('#no');
      $(this).off('mouseenter');
    });

    $('#no').on('mouseenter', function() {
      $(this).on('mousemove', function() {
        _this.handleDodge(this);
        $(this).off('mousemove');
      });
    });
  },

  bindClick: function() {
    var _this = this;

    $('#si').on('click', function() {
      _this.playAudio();
      _this.updateHeading();
      _this.showShareButtons();
      _this.animateFace();
      _this.vote();
    });
  },

  bindFbShare: function() {
    $('#compartir-fb').on('click', function() {
      FB.ui({
        method: 'share',
        display: 'popup',
        href: 'https://votaporamlo.club',
      }, function(response){});
    });
  },

  vote: function() {
    $('#vota').addClass('show');
  },

  playAudio: function() {
    $('audio')[0].play();
  },

  showShareButtons: function() {
    $('#compartir').addClass('show');
  },

  animateFace: function() {
    $('#amlo').addClass('animate');
  },

  updateHeading: function() {
    $('#heading').html('<p>¡No nos decepciones,Peje!</p><p>porfis</p>');
  }
};

jQuery(document).ready(function () {
  'use strict';

  // Load FB
  $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1033037236853127',
      version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    });
    //FB.getLoginStatus(updateStatusCallback);
  });

  Site.init();

});
