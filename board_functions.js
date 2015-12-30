/****Ideas****
1. Field Def applies to combat.
2. Field Info
3. Create a unit_see function that runs every move action, instead of just individually moving one unit. All units will be redrawn.
4. Unit Info
5. Fog of War, unit vision
6. Implement Turns.
    6b. Implement 2 players.
7. Move Range limiter
8.!!Create a new Header with Day & Team that slides to the left or right based on selector position.
*/

//Shows the title screen.
function title_screen() {
    $('#title_board').append('<div>"Title Screen"</div>').append('<div>Select a Level and Press X</div>').append('<br />').append('<div class="lvl1">Level 1</div>').append('<div class="lvl2">Level 2</div>');
}

//Changes the focus of the title screen levels. Change is based on up and down arrow keys.
function level_highlight() {
    switch (menu_select.title) {
        case 1:
            $('*').removeClass('selected');
            $('.lvl1').addClass('selected');
            break;
        case 2:
            $('*').removeClass('selected');
            $('.lvl2').addClass('selected');
            break;
    }
}

//Calls the load_level function based on which level was selected.
function level_select() {
    switch (menu_select.title) {
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
    screen_type = 1;
    $('#title_board').hide();
    $('#turn_info').show();
    see_map();
    see_units();
    current_layout.select_pos[2] = current_layout.field[0].length;
    current_team = 2;
    new_turn();
    selected_draw(current_layout.select_pos);
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
    current_layout.move_pos = jQuery.extend(true, [], current_layout.select_pos);
}

//This function operates all key press events
function keyinput() {
    $(document).keydown(function (event) {
        event.preventDefault();
        switch (event.which) {
            case 37: 
                left_arrow();
                break;
            case 38: 
                up_arrow();
                break;
            case 39: 
                right_arrow();
                break;
            case 40: 
                down_arrow();
                break;
            case 88: 
                x_key();
                break;
            case 67: //'c' key , this operates like the 'B' button on Gameboy. Clears or reverts to the previous action.
                c_key();
                break;
        }
    });
}

//WIP
function unit_info() {
    var unit_type = current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]];
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
    var m = current_layout.move_pos;
    var s = current_layout.select_pos;
    var u = current_layout.unit;
    u[m[1]][m[0]] = u[s[1]][s[0]];
    u[s[1]][s[0]] = {};
    unit_exhausted();
    $('.grabbed').addClass('' + u[m[1]][m[0]].image + ' faded');
    $('.unit:nth-of-type(' + div_counter(s) + ')').removeClass('' + u[m[1]][m[0]].image + '');
    show_hp();
    $('.unit').removeClass('grabbed');
    selected_draw(current_layout.move_pos);
}

//This is what the 'cancel' key will call to cancel a unit that has been assigned a new tile but the player didn't want to move there.
function unit_restore() {
    var u = current_layout.unit;
    var s = current_layout.select_pos;
    var m = current_layout.move_pos;
    u[s[1]][s[0]] = u[m[1]][m[0]];
    u[m[1]][m[0]] = {}; 
    $('.selected').removeClass('' + u[s[1]][s[0]].image + ' faded');
    $('.unit:nth-of-type(' + div_counter(s) + ')').addClass('' + u[s[1]][s[0]].image + '');
    show_hp();
    $('.unit').removeClass('selected');
    grabbed_draw(current_layout.move_pos);
    selected_draw(current_layout.select_pos);
    u[s[1]][s[0]].used = 0;
}

//This checks if a grabbed unit can attack any adjacent enemies. If so the attack option will appear in the action_menu.
function targets_in_range() {
    var x = current_layout.move_pos[0];
    var y = current_layout.move_pos[1];
    //There exists a bug, when I try to check if the object unit[y+1][x] is empty it throws an error because it doesn't know how to look up the x'th position of an undefined array. 
    //I created an if statement to get around this problem. But is there a better solution?
    if (current_layout.move_pos[2] - 1 == y) {
        if ((!jQuery.isEmptyObject(current_layout.unit[y - 1][x]) && !same_team(current_layout.unit[y - 1][x], current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]]))
            || (!jQuery.isEmptyObject(current_layout.unit[y][x + 1]) && !same_team(current_layout.unit[y][x + 1], current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]]))
            || (!jQuery.isEmptyObject(current_layout.unit[y][x - 1]) && !same_team(current_layout.unit[y][x - 1], current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]]))) {

            current_layout.attack_range = 1;
        }
        else {
            current_layout.attack_range = 0;
        }

    }
    else {
        if ((!jQuery.isEmptyObject(current_layout.unit[y + 1][x]) && !same_team(current_layout.unit[y + 1][x], current_layout.unit[y][x])) 
            || (!jQuery.isEmptyObject(current_layout.unit[y - 1][x]) && !same_team(current_layout.unit[y - 1][x], current_layout.unit[y][x]))
            || (!jQuery.isEmptyObject(current_layout.unit[y][x + 1]) && !same_team(current_layout.unit[y][x + 1], current_layout.unit[y][x]))
            || (!jQuery.isEmptyObject(current_layout.unit[y][x - 1]) && !same_team(current_layout.unit[y][x - 1], current_layout.unit[y][x]))) {
            
            current_layout.attack_range = 1;
        }
        else {
            current_layout.attack_range = 0;
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

function clear_action_menu() {
    $('.action_button').remove();
    $('#action_menu').hide();
}

function unit_action_menu() {
    $('#action_menu').append('<div class="action_button wait_action_button button_selected">Wait</div>');
    if (current_layout.attack_range == 1) {
        $('#action_menu').append('<div class="action_button attack_action_button">Attack</div>');
    }
    $('#action_menu').show();
}

function tile_action_menu() {
    $('#action_menu').append('<div class="action_button button_selected">End Turn</div>');
    $('#action_menu').show();
}

function same_team(unit1,unit2) {
    if (unit1.team == unit2.team) {
        return true;
    }
    else {
        return false;
    }
}

function new_turn() {
    if (current_team == 1) {
        current_team = 2;
    }
    else {
        current_team = 1;
    }
    for (y = 0; y < current_layout.unit.length; y++) {
        for (x = 0; x < current_layout.unit[0].length; x++) {
            if (!jQuery.isEmptyObject(current_layout.unit[y][x]) && current_layout.unit[y][x].team == current_team) {
                current_layout.unit[y][x].used = 0;
                var num = div_counter([x, y, current_layout.unit[0].length]);
                $('.unit:nth-of-type(' + num + ')').removeClass('faded');
            }
        }
    }
    $('#turn_info').text('Day: ' + turn_num + '');
}

function unit_exhausted() {
    current_layout.unit[current_layout.move_pos[1]][current_layout.move_pos[0]].used = 1;
}

function unit_selectable() {
    if (!jQuery.isEmptyObject(current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]]) 
        && current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]].used == 0
        && current_layout.unit[current_layout.select_pos[1]][current_layout.select_pos[0]].team == current_team) {
        return true;
    }
    else {
        return false;
    }
}