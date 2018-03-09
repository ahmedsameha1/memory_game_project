"use strict";
const symbol_files = ["img/ic_account_balance_black_24px.svg",
    "img/ic_build_black_24px.svg", "img/ic_extension_black_24px.svg",
    "img/ic_hearing_black_24px.svg", "img/ic_language_black_24px.svg",
    "img/ic_lock_black_24px.svg", "img/ic_shopping_basket_black_24px.svg",
    "img/ic_visibility_black_24px.svg" ];

    const cards = [];
    const star2 = 24, star3 = 16;
    let star2_changed = false, star3_changed = false;
    let count_of_moves = 0;
    let previous_clicked_card_id = null;
    const completed_cards = []
    let while_hiding = false;
    let after_success_move = false;
    let start_time, total_time, interval_id;

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
    };

    const increment_moves = function () {
        count_of_moves++;
        $(".count-of-moves").html((count_of_moves).toString());
        set_stars();
    };

    const set_stars = function () {
        if ( count_of_moves > star2 && !star2_changed ) {
            $("#star2").attr("src", "img/ic_star_border_black_24px.svg");
            star2_changed = true;
        } else if (count_of_moves > star3 && !star3_changed ) {
            $("#star3").attr("src", "img/ic_star_border_black_24px.svg");
            star3_changed = true;
        }
    };

    const start_timer = function() {
        let start = new Date;
        start_time = start;

        interval_id = setInterval(function() {
            $('.timer').text(parseInt((new Date - start) / 1000));
        }, 1000);
    };

    $("table").on("click", "td", function (event) {
        const id = $(this).attr("id");
        if ( id !== previous_clicked_card_id
            && !while_hiding
        && !check_card_completed(id)
        && !after_success_move ) {
            console.log("is not the previous clicked card");
            if ( previous_clicked_card_id === null ) {
                console.log("previous clicked card id is null");
                console.log("show symbol & save this card in the previous");
                show_symbol(this, id);
                previous_clicked_card_id = id;    // To compare in the next click
            } else {
                console.log("previous clicked card id isn't null");
                increment_moves();
                show_symbol(this, id);
                if ( check_same_symbol(id, previous_clicked_card_id) ) {
                    console.log("the two cards are have the same symbol");
                    set_completed(id, previous_clicked_card_id);
                    after_success_move = true;
                    setTimeout(function(){
                        after_success_move = false;
                    }, 2000);
                    if ( check_grid_completed() ) {
                        total_time = new Date() - start_time;
                    }
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
    start_timer();
