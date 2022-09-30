// маска для телефона
window.addEventListener("DOMContentLoaded", function() {
[].forEach.call( document.querySelectorAll('#phone'), function(input) {
var keyCode;
function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function(a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
    i = new_value.indexOf("_");
    if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
    }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function(a) {
            return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5)  this.value = ""
}
input.addEventListener("input", mask, false);
input.addEventListener("focus", mask, false);
input.addEventListener("blur", mask, true);
input.addEventListener("keydown", mask, false)
});
});

// Главная форма
if ($(".form-order form").length > 0) {
    // Подсветка блока при открытие modal
    $('.form-order form .block .choice:not(.accordion-last-count)').on('click',function () {
        $('.form-order form .block .choice').removeClass('expectation');
        $(this).addClass('expectation');
    });

    // Стандартные стили после закрытия modal
    var modelFormOrder = $('.modal.modalFormOrder')
    $('.modal.modalFormOrder button[data-bs-dismiss="modal"]').on('click', function () {
        $('.form-order form .block .choice').removeClass('expectation');
    });

    // Действия по кнопке Сохранить
    var fixed_offset = $('.main-bar').height() + 10;
    $('.modalFormOrder .modal-footer button.btn-success').on('click',function () {
        let id = $(this).attr('data-save'),
            content = $('.form-order form .block .choice[data-save="' + id + '"');
            contentModal = $('.modal.modalFormOrder[data-save="' + id + '"');

        var object = infoValInput()
        
        if (id == 1) {
            if (object.car !== undefined) {
                successBlock(content);
                if (!$('.form-order form .block .choice[data-save="2"').hasClass('successBlock')) {
                    $('html, body').animate({scrollTop: $('#modelBrand').offset().top - fixed_offset}, 1000);
                } else if (!$('.form-order form .block .choice[data-save="3"').hasClass('successBlock')) {
                    $('html, body').animate({scrollTop: $('#infoTrans').offset().top - fixed_offset}, 1000);
                } else {
                    $('html, body').animate({scrollTop: $('#infoPeopleForm').offset().top - fixed_offset}, 1000);
                }
            } else {
                errorBlock(content);
            }
        }
        if (id == 2) {
            successBlock(content);
            if (!$('.form-order form .block .choice[data-save="1"').hasClass('successBlock')) {
                $('html, body').animate({scrollTop: $('#typeAuto').offset().top - fixed_offset}, 1000);
            } else if (!$('.form-order form .block .choice[data-save="3"').hasClass('successBlock')) {
                $('html, body').animate({scrollTop: $('#infoTrans').offset().top - fixed_offset}, 1000);
            } else {
                $('html, body').animate({scrollTop: $('#infoPeopleForm').offset().top - fixed_offset}, 1000);
            }
        }
        if (id == 3) {
            if (object.fromCity != '' && object.toCity != '' && object.date != '') {
                successBlock(content);
                if (!$('.form-order form .block .choice[data-save="1"').hasClass('successBlock')) {
                    $('html, body').animate({scrollTop: $('#typeAuto').offset().top - fixed_offset}, 1000);
                } else if (!$('.form-order form .block .choice[data-save="2"').hasClass('successBlock')) {
                    $('html, body').animate({scrollTop: $('#modelBrand').offset().top - fixed_offset}, 1000);
                } else {
                    $('html, body').animate({scrollTop: $('#infoPeopleForm').offset().top - fixed_offset}, 1000);
                }
            } else {
                errorBlock(content)
            }
        }
        checkInfoOrder(object.car, object.brand, object.model, object.fromCity, object.toCity, object.date);
    });

    // Получение данных
    function infoValInput() {
        var car = $('input[name="car"]:checked').val(),
            brand = $('input[name="brand"]').val(),
            model = $('input[name="model"]').val(),
            fromCity = $('input[name="from"]').val(),
            toCity = $('input[name="to"]').val(),
            date = $('input[name="date"]').val();
        var objInfo = {car, brand, model, fromCity, toCity, date}
        return objInfo;
    }
    infoValInput();
    checkInfoOrder();

    // Проверка при отправке формы
    $('.accordion-last-count .accordion-body .form-group .btn_form_order button').on('click', function() {
        var object = infoValInput()
        checkInfoOrder(object.car, object.brand, object.model, object.fromCity, object.toCity, object.date);
        var namePeople = $('.accordion-last-count .accordion-body .form-group-auto input[name="name"]').val(),
            phonePeople = $('.accordion-last-count .accordion-body .form-group-auto input[name="phone"]').val();
            checkPeople = $('.accordion-last-count .accordion-body .form-group .checkbox-data input[type="checkbox"]').is(':checked');
            console.log(checkPeople)
        if (error != '') {
            // $('#count-collapseOne').collapse('toggle');
            if (!$('.form-order form .block .choice[data-save="1"').hasClass('successBlock')) {
                $('html, body').animate({scrollTop: $('#typeAuto').offset().top - fixed_offset - 10}, 1000);
                $('.form-order form .block .choice[data-save="1"').addClass('errorBlock');
            } else if (!$('.form-order form .block .choice[data-save="2"').hasClass('successBlock')) {
                $('html, body').animate({scrollTop: $('#modelBrand').offset().top - fixed_offset - 10}, 1000);
            } else {
                $('html, body').animate({scrollTop: $('#infoTrans').offset().top - fixed_offset - 10}, 1000);
                $('.form-order form .block .choice[data-save="3"').addClass('errorBlock');
            }
        } else if (namePeople=='' || phonePeople=='' || phonePeople.length !=17 || checkPeople == false) {
            alert('Заполните обязательные поля')
        } else {
            alert('Отправлено')
        }
    });

    // Проверка основных данных формы
    var error = '';
    function checkInfoOrder(car, brand, model, fromCity, toCity, date) {
        if (car !== undefined && fromCity != '' && toCity != '' && date != '') {
            $('.form-order form .block .info-block-main .info span').html(`${car} ${brand} ${model} из г.${fromCity} в г.${toCity}. Желаемая дата отправки: ${date}`);
            error = '';
        } else {
            $('.form-order form .block .info-block-main .info span').html('<div class="btn btn-danger">Заполните обязательные поля</div>');
            error = '1';
        }
    }
    // Подсветка блоков зеленым цветом
    function successBlock(content) {
        content.removeClass('errorBlock');
        content.addClass('successBlock');
        contentModal.modal('toggle');
    };
    // Подсветка блоков красным цветом
    function errorBlock(content) {
        content.removeClass('successBlock');
        content.addClass('errorBlock');
        alert('Заполните обязательные поля');
    }
}

// проверки полей обратного звонка
$(".callback #btnContactPhone").click(() => {
    if ($('.callback .phoneContact').val() == '' || $('.callback .phoneContact').val().length != 17) {
        $('.callback .phoneContact').addClass('empty');
        alert('Номер телефона не заполнен, либо заполнен неверно')
    } else {
        // var objContact = {
        //     data: {
        //         'phone': $('.phoneContact').val()
        //     },
        //     "form_kind": "navbar"
        // }
        $('.callback .phoneContact').removeClass('empty');
        // sendAjaxRequestModal(objContact);
        alert('Отправлено');
    }
    return false;
});

// href
// var fixed_offset = $('.main-bar').height();
// $("body").on('click', '[href*="#"]', function (e) {
//     $('html,body').stop().animate({
//         scrollTop: $(this.hash).offset().top - 500
//     }, 1000);
//     e.preventDefault();
// });
// if (window.location.hash!='') {
//     window.hashName = window.location.hash;
//     window.location.hash = '';
//     $(document).ready(function() {
//         $('html').animate({scrollTop: $(window.hashName).offset().top}, 1500);
//     });
// }
