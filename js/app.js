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
        $(td).append(`<img src="${cards[parseInt(id, 10)].symbol_file}">`);
    };

    const hide_symbol = function(ids) {
        for ( let id of ids ) {
            $(`td[id=${id}]`).empty();
            $(`td[id=${id}]`).removeClass("completed");
            $(`td[id=${id}]`).addClass("uncompleted");
        }
    };

    const check_same_symbol = function(id1, id2){
        return cards[parseInt(id1, 10)].symbol_file ===
            cards[parseInt(id2, 10)].symbol_file
    };

    const set_completed = function (ids) {
        for ( let id of ids ) {
            cards[parseInt(id, 10)].completed = true;
            cards[parseInt(id, 10)].completed = true;
        }
        $(`td[id=${ids[0]}]`).addClass("completed animated rubberBand").one("animationend", function() { $(this).removeClass("animated rubberBand"); });
        $(`td[id=${ids[1]}]`).addClass("completed animated rubberBand").one("animationend", function() {
            $(this).removeClass("animated rubberBand");
            after_success_move = false;
            if ( check_grid_completed() ) {
                clearInterval(interval_id);
                total_time = new Date() - start_time;
                console.log(total_time);
                show_modal();
            }
        });
    };

    const check_grid_completed = function() {
        for ( let card of cards ) {
            console.log(card.completed);
            if ( !card.completed ) {
                console.log("false");
                return false;
            }
        }
        return true;
    };

    const check_card_completed = function(id) {
        console.log(id);
        return cards[parseInt(id, 10)].completed;
    };


    const distribute_symbols_on_cards = function () {
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
            $('.timer').text(parseInt((new Date - start) / 1000, 10));
        }, 1000);
    };

    const show_modal = function() {
        let text = `You have completed the game in about ${Math.round(total_time / 1000)} seconds.`
        + `\nYou have earned ${star2_changed && star3_changed?"1 star":(star3_changed? "2 stars" : "3 stars")}.`
        $(".modal-body").text(text);
        console.log(text);
        $('#modal').modal("show");
    };

    const restart_game = function() {
        total_time = undefined;
        start_time = undefined;
        after_success_move = false;
        while_hiding = false;
        count_of_moves = 0;
        previous_clicked_card_id = null;
        star2_changed = false;
        star3_changed = false;
        cards.splice(0, cards.length);
        completed_cards.splice(0, completed_cards.length);
        reset_dom();
        distribute_symbols_on_cards();
        clearInterval(interval_id);
        start_timer();
    };

    const reset_dom = function() {
        $(".timer").html("");
        $(".count-of-moves").html("");
        $("#star2").attr("src", "img/ic_star_black_24px.svg");
        $("#star3").attr("src", "img/ic_star_black_24px.svg");
        $("td").empty();
        $("td").removeClass("completed");
        $("td").addClass("uncompleted");
    };

    const show_wrong = function(ids) {
        //for ( let id of ids ) {
        $(`td[id=${ids[0]}]`).addClass("wrong animated wobble").one("animationend", function() {
            $(this).removeClass("wrong completed animated wobble");
            $(this).empty();
            $(this).addClass("uncompleted");
        });
        $(`td[id=${ids[1]}]`).addClass("wrong animated wobble").one("animationend", function() {
            $(this).removeClass("wrong completed animated wobble");
            $(this).empty();
            $(this).addClass("uncompleted");
            while_hiding = false;
        });
        //}
    };

    $("table").on("click", "td", function(event) {
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
                $(this).addClass("first-card");
                while_hiding = true;
                $(this).addClass("animated flipInY").one("animationend", function() {
                    $(this).removeClass("animated flipInY");
                    while_hiding = false;
                });
                previous_clicked_card_id = id;    // To compare in the next click
            } else {
                console.log("previous clicked card id isn't null");
                increment_moves();
                show_symbol(this, id);
                $(`td[id=${previous_clicked_card_id}]`).removeClass("first-card");
                if ( check_same_symbol(id, previous_clicked_card_id) ) {
                    console.log("the two cards are have the same symbol");
                    set_completed([id, previous_clicked_card_id]);
                    after_success_move = true;
                } else {
                    console.log("the two cards doesn't have the same symbol,suppose to hide symbols");
                    // Hide symbols
                    while_hiding = true;
                    const temp_previous = previous_clicked_card_id;
                    show_wrong([id, temp_previous]);
                }
                previous_clicked_card_id = null;
            }
        } else {
            $(this).addClass("border");
            setTimeout(function() { $(`td[id=${id}]`).removeClass("border"); }, 150);
        }
    });

    $("#play-again").click(() => {
        restart_game();
        $("#modal").modal("hide");
    });

    $("#restart").click(() => { restart_game(); });

    distribute_symbols_on_cards();
    start_timer();
