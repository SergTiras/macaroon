'use strict';

$(document).ready(function () {
    let burger=$('#burger')
    $('.mask-phone').mask('+7 (999) 999-99-99');
    //Переписал код для появления и скрытия меню
    burger.click(function () {
        $('#menu').addClass('open').css('display', 'flex');
        burger.css('display', 'none');
    })

    $('.menu-link').click(function () {
        $('#menu').removeClass('open').css('display', 'none');
        burger.css('display', 'block');
    })
    $('.close').click(function () {
        $('#menu').removeClass('open').css('display', 'none');
        burger.css('display', 'block');
    })

    //Валидация
    $('#submitOrder').click(function () {
        // Сброс предыдущих ошибок
        event.preventDefault();
        let input = $('input')
        let isValid = true;
        let itemInput = $('#itemInput');
        let nameInput = $('#nameInput');
        let phoneInput = $('#phoneInput');
        let loader = $('.loader')
        phoneInput.mask("+7(999) 999-9999");
        input.removeClass('error');
        // Проверка товара
        if (!itemInput.val()) {
            itemInput.css('margin', '0').css('border-color', 'red');
            $('#itemError').css('display', 'block');
            isValid = false;

        }

        // Проверка имени
        if (!nameInput.val()) {
            nameInput.css('margin', '0').css('border-color', 'red');
            $('#nameError').css('display', 'block');
            isValid = false;
        }

        // Проверка телефона
        if (!phoneInput.val()) {
            phoneInput.css('margin', '0').css('border-color', 'red');
            $('#phoneError').css('display', 'block');
            isValid = false;
        }
        // Если поле заполнено, убираем класс ошибки
        input.each(function() {
            if ($(this).val()) {
                $(this).css('border-color', 'rgb(130, 19, 40)').css('margin-bottom', '15px');
                $(this).next().css('display', 'none')// Убираем класс ошибки, если поле заполнено
            }
        });
        // Если все поля заполнены, можно отправить форму
        if (isValid) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: { product: itemInput.val(), name: nameInput.val(), phone: phoneInput.val() }
            })
                .done(function( msg ) {
                    loader.hide();
                    if (msg.success === 1){
                        $('.order-form-input').css('visibility', 'hidden');
                        $('.success').css('display', 'block');
                    }else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    });
})