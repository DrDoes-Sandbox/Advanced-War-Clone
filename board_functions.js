/****Ideas****
1. Field Def applies to combat.
2. Field Info
4. Unit Info
5. Fog of War, unit vision
6. Implement Turns.
    6b. Implement 2 players.
7. Move Range limiter
*/

//Shows the title screen.
function title_screen() {
    $('#title_board').append('<div>"Title Screen"</div>').append('<div>Select a Level and Press X</div>').append('<br />').append('<div class="lvl1">Level 1</div>').append('<div class="lvl2">Level 2</div>');
    create_action_menu();
}

//Changes the focus of the title screen levels. Change is based on up and down arrow keys.
function level_highlight() {
    switch (title_menu_select) {
        case 1:
            $('*').removeClass('selected');
            $('.lvl1').addClass('selected');
            button_title = 1;
            break;
        case 2:
            $('*').removeClass('selected');
            $('.lvl2').addClass('selected');
            button_title = 2;
            break;
    }
}

//Calls the load_level function based on which level was selected.
function level_select() {
    switch (button_title) {
        case 1:
            load_level(level1_layout);
            break;
        case 2:
            load_level(level2_layout);
            break;
    }
}

//Level Loader
function load_level(level_layout) {
    current_layout = level_layout;
    $('#title_board').hide();
    see_map();
    see_units();
    current_layout.start_pos[2] = current_layout.field[0].length;
    select_pos = current_layout.start_pos;
    selected_draw(select_pos);
}

//Reveals all units
function see_units() {
    for (y = 0; y < current_layout.unit.length; y++) {
        for (x = 0; x < current_layout.unit[y].length; x++) {
            var unit_type = current_layout.unit[y][x];
            if (jQuery.isEmptyObject(unit_type)) {
                $('#unit_layer').append('<div class="unit"></div>');
            }
            else {
                $('#unit_layer').append('<div class="unit ' + unit_type.image + '"></div>');
            }
        }
        $('#unit_layer').append('<br />');
    }
}

//Old. This draws a view of the map, limited to an 8x8. 
//TODO: insure that pos_y and pos_x can't be larger than the width - 8 or height - 8
/* OLD - Needs Update
function draw_map(field_layout, pos_x, pos_y) {
    for (y = pos_y; y < (pos_y + 8) ; y++) {
        for (x = pos_x; x < (pos_x + 8) ; x++) {
            $('#board').append('<div class="tile ' + field_layout[y][x] + '"></div>');
        }
        $('#board').append('<br />');
    }
}
*/

//This draws the entire map, used for map creation.
function see_map() {
    for (y = 0; y < current_layout.field.length; y++) {
        for (x = 0; x < current_layout.field[y].length; x++) {
            $('#board').append('<div class="tile ' + current_layout.field[y][x] + '"></div>');
        }
        $('#board').append('<br />');
    }
}

//Takes an array[x,y,z] where x = x-axis position, y = y-axis position, z = length of x-axis (# of x-units per row). 
//Then converts the x,y array into a single digit that is the corresponding div when using $('.unit:nth-of-type())
function div_counter(pos_array) {
    var num = pos_array[0] + pos_array[1] * pos_array[2] + 1;
    return num;
}

//Redraws the highlighted square (blue).
function selected_draw(pos_array) {
    var num = div_counter(pos_array);
    $('.unit').removeClass('selected');
    $('.unit:nth-of-type(' + num + ')').addClass('selected');
}

//Redraws the highlighted square (purple).
function grabbed_draw(pos_array) {
    var num = div_counter(pos_array);
    $('.unit').removeClass('grabbed');
    $('.unit:nth-of-type(' + num + ')').addClass('grabbed');
}

//Fills move_pos with a deep copy of select_pos. When a tile is grabbed move_pos is updated with the current location of the selector. 
//Then, while the player is navigating the move, the original select_pos remains unchanged while move_pos takes over.
function grab_tile() {
    $('.selected').addClass('grabbed');
    //$('.unit').removeClass('selected'); Commenting this out allows the blue 'selected' tile to remain while moving the unit to a new position.
    move_pos = jQuery.extend(true, [], select_pos);
}

//This function operates all key press events
function keyinput() {
    $(document).keydown(function (event) {
        event.preventDefault();
        switch (event.which) {
            case 37: //Left Arrow
                switch (button_event) {
                    case 0:
                        if (select_pos[0] != 0) {
                            select_pos[0] -= 1;
                            selected_draw(select_pos);
                        }
                        break;
                    case 1:
                        if (move_pos[0] != 0) {
                            move_pos[0] -= 1;
                            grabbed_draw(move_pos);
                        }
                        break;
                    case 2:
                        break;
                    case 3:
                        if (move_pos[0] != 0) {
                            attack_pos[1] = move_pos[1];
                            attack_pos[0] = move_pos[0] - 1;
                            grabbed_draw(attack_pos);
                        }
                        break;
                }
                break;
            case 38: //Up Arrow
                switch (button_event) {
                    case -1:
                        if (title_menu_select > 1) {
                            title_menu_select -= 1;
                            level_highlight();
                        }
                        break;
                    case 0:
                        if (select_pos[1] != 0) {
                            select_pos[1] -= 1;
                            selected_draw(select_pos);
                        }
                        break;
                    case 1:
                        if (move_pos[1] != 0) {
                            move_pos[1] -= 1;
                            grabbed_draw(move_pos);
                        }
                        break;
                    case 2:
                        if (action_menu_select == 1 && attack_range == 1) {
                            $('.action_button').removeClass('button_selected');
                            $('.wait_action_button').addClass('button_selected');
                            action_menu_select = 0;
                        }
                        break;
                    case 3:
                        if (move_pos[1] != 0) {
                            attack_pos[0] = move_pos[0];
                            attack_pos[1] = move_pos[1] - 1;
                            grabbed_draw(attack_pos);
                        }
                        break;
                }
                break;
            case 39: //Right Arrow
                switch (button_event) {
                    case 0:
                        if (select_pos[0] < select_pos[2] - 1) {
                            select_pos[0] += 1;
                            selected_draw(select_pos);
                        }
                        break;
                    case 1:
                        if (move_pos[0] < move_pos[2] - 1) {
                            move_pos[0] += 1;
                            grabbed_draw(move_pos);
                        }
                        break;
                    case 2:
                        break;
                    case 3:
                        if (move_pos[0] < move_pos[2] - 1) {
                            attack_pos[1] = move_pos[1];
                            attack_pos[0] = move_pos[0] + 1;
                            grabbed_draw(attack_pos);
                        }
                        break;
                }
                break;
            case 40: //Down Arrow
                switch (button_event) {
                    case -1:
                        if (title_menu_select < 2) {
                            title_menu_select += 1;
                            level_highlight();
                        }
                    case 0:
                        if (select_pos[1] < select_pos[2] - 1) {
                            select_pos[1] += 1;
                            selected_draw(select_pos);
                        }
                        break;
                    case 1:
                        if (move_pos[1] < move_pos[2] - 1) {
                            move_pos[1] += 1;
                            grabbed_draw(move_pos);
                        }
                        break;
                    case 2:
                        if (action_menu_select == 0 && attack_range == 1) {
                            $('.action_button').removeClass('button_selected');
                            $('.attack_action_button').addClass('button_selected');
                            action_menu_select = 1;
                        }
                        break;
                    case 3:
                        if (move_pos[1] < move_pos[2] - 1) {
                            attack_pos[0] = move_pos[0];
                            attack_pos[1] = move_pos[1] + 1;
                            grabbed_draw(attack_pos);
                        }
                        break;
                }
                break;
            case 88: //'x' key
                switch (button_event) {
                    case -1:
                        if (title_menu_select > 0) {
                            level_select();
                            button_event = 0;
                        }
                        break;
                    case 0:
                        if (!jQuery.isEmptyObject(current_layout.unit[select_pos[1]][select_pos[0]])) {
                            grab_tile();
                            button_event = 1;
                        }
                        break;
                    case 1:
                        if (jQuery.isEmptyObject(current_layout.unit[move_pos[1]][move_pos[0]])) {
                            targets_in_range();
                            unit_move();
                            $('#action_menu').show();
                            button_event = 2;
                        }
                        else if (move_pos[0] == select_pos[0] && move_pos[1] == select_pos[1]) {
                            targets_in_range();
                            $('.unit').removeClass('grabbed');
                            selected_draw(select_pos);
                            $('#action_menu').show();
                            button_event = 2;
                        }
                        break;
                    case 2:
                        switch (action_menu_select) {
                            case 0:
                                select_pos = move_pos;
                                $('#action_menu').hide();
                                button_event = 0;

                                break;
                            case 1:
                                $('#action_menu').hide();
                                attack_pos = jQuery.extend(true, [], move_pos);
                                button_event = 3;
                                break;
                        }
                        $('.attack_action_button').remove();
                        break;
                    case 3:
                        //attack function here
                        if (!jQuery.isEmptyObject(current_layout.unit[attack_pos[1]][attack_pos[0]])) {
                            attack(current_layout.unit[move_pos[1]][move_pos[0]], current_layout.unit[attack_pos[1]][attack_pos[0]]);
                            //show_hp(level_layout.unit[move_pos[1]][move_pos[0]], move_pos);
                            //show_hp(level_layout.unit[attack_pos[1]][attack_pos[0]], attack_pos);
                            show_hp();
                            //This resets the action_menu for next time. (could make this a separate function to use for up arrow as well as here here.)
                            $('.action_button').removeClass('button_selected');
                            $('.wait_action_button').addClass('button_selected');
                            $('.unit').removeClass('grabbed');
                            action_menu_select = 0;
                            attack_range = 0;
                            selected_draw(move_pos);
                            select_pos = move_pos;
                            button_event = 0;
                        }
                        break;

                }
                break;
            case 67: //'c' key , this operates like the 'B' button on Gameboy. Clears or reverts to the previous action.
                switch (button_event) {
                    case 1: //Should this return the selector to the current position or the original grabbed tile?
                        $('.unit').removeClass('grabbed');
                        selected_draw(select_pos);
                        button_event = 0;
                        break;
                    case 2: //move unit back
                        unit_restore();
                        $('#action_menu').hide();
                        $('.attack_action_button').remove();
                        $('.action_button').removeClass('button_selected');
                        $('.wait_action_button').addClass('button_selected');
                        action_menu_select = 0;
                        attack_range = 0;
                        button_event = 1;
                        break;
                    case 3:
                        targets_in_range();
                        action_menu_select = 0;
                        $('.unit').removeClass('grabbed');
                        $('.wait_action_button').addClass('button_selected');
                        $('#action_menu').show();
                        button_event = 2;
                        break;
                }
                break;
        }
    });
}

//WIP
function unit_info() {
    var unit_type = current_layout.unit[select_pos[1]][select_pos[0]];
    if (!jQuery.isEmptyObject(unit_type)) {
        $('#unit_info').show();
        unit_details(unit_type);
    }
    else {
        $('#unit_info').hide();
    }
}

/* //Unit Details need to switch to bottom left or bottom right depending on where select_pos is.
function unit_details(unit_type) {
    $('#unit_info').append('<div class ="unit_stat">' + m_unit[unit_type].max_hp + '</div>'); //Something like this, need to setup stats for the units. + m_unit[unit_type].max_hp +
}
*/

//Moves a unit. Both the image and the current_layout.unit variable are updated from the select_pos to the new move_pos.
function unit_move() {
    var m = move_pos;
    var s = select_pos;
    var u = current_layout.unit;
    u[m[1]][m[0]] = u[s[1]][s[0]];
    u[s[1]][s[0]] = {};
    $('.grabbed').addClass('' + u[m[1]][m[0]].image + '');
    $('.unit:nth-of-type(' + div_counter(s) + ')').removeClass('' + u[m[1]][m[0]].image + '');
    show_hp();
    $('.unit').removeClass('grabbed');
    selected_draw(move_pos);
}

//This is what the 'cancel' key will call to cancel a unit that has been assigned a new tile but the player didn't want to move there.
function unit_restore() {
    var u = current_layout.unit;
    var s = select_pos;
    var m = move_pos;
    u[s[1]][s[0]] = u[m[1]][m[0]];
    u[m[1]][m[0]] = {};
    $('.selected').removeClass('' + u[s[1]][s[0]].image + '');
    $('.unit:nth-of-type(' + div_counter(s) + ')').addClass('' + u[s[1]][s[0]].image + '');
    show_hp();
    $('.unit').removeClass('selected');
    grabbed_draw(move_pos);
    selected_draw(select_pos);
}
//Test function
function create_action_menu() {
    $('#action_menu').append('<div class="action_button wait_action_button button_selected">Wait</div>');
}

//This checks if a grabbed unit can attack any adjacent enemies. If so the attack option will appear in the action_menu.
function targets_in_range() {
    var x = move_pos[0];
    var y = move_pos[1];
    //There exists a bug, when I try to check if the object unit[y+1][x] is empty it throws an error because it doesn't know how to look up the x'th position of an undefined array. 
    //I created an if statement to get around this problem. But is there a better solution?
    if (move_pos[2] - 1 == y) {
        if (!jQuery.isEmptyObject(current_layout.unit[y - 1][x]) || !jQuery.isEmptyObject(current_layout.unit[y][x + 1]) || !jQuery.isEmptyObject(current_layout.unit[y][x - 1])) {
            $('#action_menu').append('<div class="action_button attack_action_button">Attack</div>');
            attack_range = 1;
        }
    }
    else {
        if (!jQuery.isEmptyObject(current_layout.unit[y + 1][x]) || !jQuery.isEmptyObject(current_layout.unit[y - 1][x]) || !jQuery.isEmptyObject(current_layout.unit[y][x + 1]) || !jQuery.isEmptyObject(current_layout.unit[y][x - 1])) {
            $('#action_menu').append('<div class="action_button attack_action_button">Attack</div>');
            attack_range = 1;
        }
    }

}

//A simple attack function.
function attack(attacker, defender) {
    defender.cur_hp -= attacker.dmg;
    attacker.cur_hp -= defender.dmg;
}

//Updates the hp numbers that are shown in the top right of unit's tile.
function show_hp() {
    for (y = 0; y < current_layout.unit.length; y++) {
        for (x = 0; x < current_layout.unit[0].length; x++) {
            var pos_array = [x, y, current_layout.field[0].length];
            num = div_counter(pos_array);
            if (current_layout.unit[y][x].cur_hp < 1) {
                $('.unit:nth-of-type(' + num + ')').text('');
                //Remove unit from play
                $('.unit:nth-of-type(' + num + ')').removeClass('' + current_layout.unit[y][x].image + '');
                current_layout.unit[y][x] = {};
            }
            else if (current_layout.unit[y][x].cur_hp < current_layout.unit[y][x].max_hp) {
                $('.unit:nth-of-type(' + num + ')').text('' + current_layout.unit[y][x].cur_hp + '');
            }
            else {
                $('.unit:nth-of-type(' + num + ')').text('');
            }
        }
    }
}

function dead_unit(unit) {

}