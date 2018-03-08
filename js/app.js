"use strict";
const symbol_files = ["img/ic_account_balance_black_24px.svg",
    "img/ic_build_black_24px.svg", "img/ic_extension_black_24px.svg",
    "img/ic_hearing_black_24px.svg", "img/ic_language_black_24px.svg",
    "img/ic_lock_black_24px.svg", "img/ic_shopping_basket_black_24px.svg",
    "img/ic_visibility_black_24px.svg" ];
    const show_img = function(td, id) {
        $(td).append(`<img src="${cards[parseInt(id)].symbol_file}">`);
    }
    const check_same_symbol = function(id1, id2){
        if ( cards[parseInt(id1)].symbol_file ===
            cards[parseInt(id2)].symbol_file ) {
            return true;
        }
    }
    const cards = [];
    let count_of_moves = 0;
    let previous_clicked_card_id = null;
    const completed_cards = []

    const dist_symbols_on_cards = function () {
        for ( let i = 0; i < symbol_files.length; i++ ) {
            for (let k = 0; k < 2; k++) {
                let rand_try;
                do {
                    rand_try = Math.floor(Math.random() * 16);
                } while ( cards[rand_try] !== undefined );
                cards[rand_try] = {
                    symbol_file: symbol_files[i],
                    completed: false
                }
            }
        }
    }

    $("table").on("click", "td", function (event) {
        const id = $(this).attr("id");
        if ( id !== previous_clicked_card_id ) {
            if ( previous_clicked_card_id === null ) {
                //previous_clicked_card_id = id;    // To compare in the next click
            } else {
                count_of_moves++;
                previous_clicked_card_id = null;
                if ( /* is_the_same_symbol */ true ) {
                }
            }

        }
    });
    dist_symbols_on_cards();
