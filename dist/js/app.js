"use strict";

$(document).ready(function () {
  $('.js-modal-number').on('click', function () {
    OffScroll();
    $('#lean_overlay').show();
    $('.modal-number').show();
  });
  $('.js-modal-massage').on('click', function () {
    OffScroll();
    $('#lean_overlay').show();
    $('.modal-massage').show();
    scroll();
  });
  $('.close-modal').on('click', function () {
    $('.modal-number, .modal-massage').hide();
    $('#lean_overlay').hide();
    $('body').css('overflow', 'auto');
    $('.modal__dropdown-list').getNiceScroll().resize(); 
  });

  function OffScroll() {
    $('body').css('overflow', 'hidden'); 
  }

  function fullnessCheck(error, element) {
    if (error === 0) {
      $(element).find('button').removeClass('disabled');
      $(element).parents('form').submit();
    }
  }

  $('.button_form').on('click', function (event) {
    var parent = $(this).parents('.agree-to-hand');
    var parent_container = $(this).parents('form');

    if (!$(parent).find('input[name="check"]').prop('checked')) {
      $(parent).find('label').addClass('error_red');
    } else {
      $(parent).find('label').removeClass('error_red');
    } 


    if ($(parent).siblings('.modal-form__wrap-input').find('input[name="name"]').val() === "") {
      $(parent).siblings('.modal-form__wrap-input').find('input[name="name"]').addClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('input[name="name"]').siblings('.input__error').show();
    } else {
      $(parent).siblings('.modal-form__wrap-input').find('input[name="name"]').removeClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('input[name="name"]').siblings('.input__error').hide();
    }

    if ($(parent).siblings('.modal-form__wrap-input').find('input[name="number"]').val() === "") {
      $(parent).siblings('.modal-form__wrap-input').find('input[name="number"]').addClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('input[name="number"]').siblings('.input__error').show();
    } else {
      $(parent).siblings('.modal-form__wrap-input').find('input[name="number"]').removeClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('input[name="number"]').siblings('.input__error').hide();
    }

    if ($(parent).siblings('.modal-form__wrap-input').find('input[name="email"]').val() === "") {
      $(parent).siblings('.modal-form__wrap-input').find('input[name="email"]').addClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('input[name="email"]').siblings('.input__error').css('display', 'block');
    } else {
      $(parent).siblings('.modal-form__wrap-input').find('input[name="email"]').removeClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('input[name="email"]').siblings('.input__error').css('display', 'none');
    }

    if ($(parent).siblings('.modal-form__wrap-input').find('textarea').val() === "") {
      $(parent).siblings('.modal-form__wrap-input').find('textarea').addClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('textarea').siblings('.input__error').css('display', 'block');
    } else {
      $(parent).siblings('.modal-form__wrap-input').find('textarea').removeClass('error_red');
      $(parent).siblings('.modal-form__wrap-input').find('textarea').siblings('.input__error').css('display', 'none');
    }

    var error = $(parent_container).find('.error_red').length;
    fullnessCheck(error, this);
  });
  $(document).keypress(function (e) {
    if (e.which == 13) {
      if ($('form').hasClass('disabled')) {
        e.preventDefault();
      }
    }
  });
  $('.modal-form__input[name="number"]').mask("+7(999) 999-9999");
  setInterval(function () {
    show_number();
  }, 3000);
  setTimeout(function () {
    setInterval(function () {
      hide_number();
    }, 4000);
  }, 3000);

  function show_number() {
    $('.call-button:nth-child(2)').css('z-index', 4);
  }

  function hide_number() {
    $('.call-button:nth-child(2)').css('z-index', 3);
  }

  $('.calling-modal-window').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).find('.call-button:nth-child(2)').animate({
        top: '0'
      });
      $(this).find('.call-button:nth-child(3)').animate({
        top: '0'
      });
      $(this).removeClass('active');
      $(this).find('.call-button').css('pointer-events', 'none');
    } else {
      $(this).find('.call-button:nth-child(2)').animate({
        top: '55'
      });
      $(this).find('.call-button:nth-child(3)').animate({
        top: '110'
      });
      $(this).addClass('active');
      $(this).find('.call-button').css('pointer-events', 'auto');
    }
  });
  $('.dropdown-button').on('click', function () {
    if ($(this).siblings('.dropdown-list').hasClass('active')) {
      $(this).siblings('.dropdown-list').hide();
      $(this).siblings('.modal__dropdown-list').removeClass('active');
      $('.modal__dropdown-list').getNiceScroll().resize();
    } else {
      scroll();
      $(this).siblings('.dropdown-list').show();
      $(this).siblings('.modal__dropdown-list').addClass('active');
    } 

  });
  $('.dropdown-list li').on('click', function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    var val = $(this).find('p').text();
    $('.modal__select-input').val(val);
    $(this).parents('.dropdown-list').siblings('.dropdown-button').find('p').text(val);
    $(this).parents('.dropdown-list').hide();
    $(this).parents('.dropdown-list').removeClass('active');
    $(this).parents('.dropdown-list').siblings('.dropdown-button').removeClass('active');
    $('.modal__dropdown-list').getNiceScroll().resize();
  });

  function scroll() {
    var list = $('.modal__dropdown-list');
    list.scrollTop(0); 

    list.getNiceScroll().show(); 

    list.getNiceScroll().resize(); 

    list.niceScroll({
      cursorcolor: "#8bc540",
      autohidemode: false,
      cursorwidth: 3,
      cursorborderradius: 0,
      background: "#a4a4a4" 

    });
  }

  scroll();
  autosize($('textarea'));
});