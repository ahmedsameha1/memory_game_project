"use strict";
const symbol_files = ["img/ic_account_balance_black_24px.svg",
    "img/ic_build_black_24px.svg", "img/ic_extension_black_24px.svg",
    "img/ic_hearing_black_24px.svg", "img/ic_language_black_24px.svg",
    "img/ic_lock_black_24px.svg", "img/ic_shopping_basket_black_24px.svg",
    "img/ic_visibility_black_24px.svg" ];
    const show_img = function(td, id) {
        $(td).append(`<img src="${card_symbol[parseInt(id)]}">`);
    }
    let card_symbol = [];
    let count_of_moves = 0;
    let one_card_flipped = -1;

    const dist_symbols_on_cards = function () {
        for ( let i = 0; i < symbol_files.length; i++ ) {
            for (let k = 0; k < 2; k++) {
                let rand_try;
                do {
                    rand_try = Math.floor(Math.random() * 16);
                } while ( card_symbol[rand_try] !== undefined );
                card_symbol[rand_try] = symbol_files[i];
            }
        }
    }

    $("table").on("click", "td", function (event) {
        const id = $(this).attr("id");
        if ( one_card_flipped !== id ) {
            show_img(this, id);
            one_card_flipped = id;
        }
    });
    dist_symbols_on_cards();
