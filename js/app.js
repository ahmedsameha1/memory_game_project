"use strict";
const symbol_files = ["img/ic_account_balance_black_24px.svg",
    "img/ic_build_black_24px.svg", "img/ic_extension_black_24px.svg",
    "img/ic_hearing_black_24px.svg", "img/ic_language_black_24px.svg",
    "img/ic_lock_black_24px.svg", "img/ic_shopping_basket_black_24px.svg",
    "img/ic_visibility_black_24px.svg" ];

    const cards = [];
    let count_of_moves = 0;
    let previous_clicked_card_id = null;
    const completed_cards = []
    let while_hiding = false;

    const show_symbol = function(td, id) {
        $(td).append(`<img src="${cards[parseInt(id)].symbol_file}">`);
    };

    const hide_symbol = function(id) {
        $(`td[id=${id}]`).empty();
    };

    const check_same_symbol = function(id1, id2){
        return cards[parseInt(id1)].symbol_file ===
            cards[parseInt(id2)].symbol_file
    };

    const set_completed = function (id1, id2) {
        cards[parseInt(id1)].completed = true;
        cards[parseInt(id2)].completed = true;
    };

    const check_grid_completed = function() {
        for ( card in cards ) {
            if ( !card.completed ) return false;
        }
        return true;
    };

    const check_card_completed = function(id) {
        return cards[parseInt(id)].completed;
    };


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
        if ( id !== previous_clicked_card_id
            && !while_hiding
            && !check_card_completed(id) ) {
            console.log("is not the previous clicked card");
            if ( previous_clicked_card_id === null ) {
                console.log("previous clicked card id is null");
                console.log("show symbol & save this card in the previous");
                show_symbol(this, id);
                previous_clicked_card_id = id;    // To compare in the next click
            } else {
                console.log("previous clicked card id isn't null");
                count_of_moves++;
                show_symbol(this, id);
                if ( check_same_symbol(id, previous_clicked_card_id) ) {
                    console.log("the two cards are have the same symbol");
                    set_completed(id, previous_clicked_card_id);
                } else {
                    console.log("the two cards doesn't have the same symbol,suppose to hide symbols");
                    // Hide symbols
                    while_hiding = true;
                    const temp_previous = previous_clicked_card_id;
                    setTimeout(function() {
                        hide_symbol(id);
                        hide_symbol(temp_previous);
                        while_hiding = false;
                        console.log("After hiding symbols");
                    }, 1000);
                }
                previous_clicked_card_id = null;
            }
        }
    });
    dist_symbols_on_cards();
