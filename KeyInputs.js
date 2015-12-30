//Key Input Functions

function left_arrow() {
    switch (screen_type) {
        case 1:
            switch (button_phase.level) {
                case 0:
                    if (current_layout.select_pos[0] != 0) {
                        current_layout.select_pos[0] -= 1;
                        selected_draw(current_layout.select_pos);
                    }
                    break;
                case 1:
                    if (current_layout.move_pos[0] != 0) {
                        current_layout.move_pos[0] -= 1;
                        grabbed_draw(current_layout.move_pos);
                    }
                    break;
                case 2:
                    break;
                case 3:
                    if (current_layout.move_pos[0] != 0) {  
                        current_layout.attack_pos[1] = current_layout.move_pos[1];
                        current_layout.attack_pos[0] = current_layout.move_pos[0] - 1;
                        grabbed_draw(current_layout.attack_pos);
                    }
                    break;
            }
            break;
    }
}

function right_arrow() {
    switch (screen_type) {
        case 1:
            switch (button_phase.level) {
                case 0:
                    if (current_layout.select_pos[0] < current_layout.select_pos[2] - 1) {
                        current_layout.select_pos[0] += 1;
                        selected_draw(current_layout.select_pos);
                    }
                    break;
                case 1:
                    if (current_layout.move_pos[0] < current_layout.move_pos[2] - 1) {
                        current_layout.move_pos[0] += 1;
                        grabbed_draw(current_layout.move_pos);
                    }
                    break;
                case 2:
                    break;
                case 3:
                    if (current_layout.move_pos[0] < current_layout.move_pos[2] - 1) {
                        current_layout.attack_pos[1] = current_layout.move_pos[1];
                        current_layout.attack_pos[0] = current_layout.move_pos[0] + 1;
                        grabbed_draw(current_layout.attack_pos);
                    }
                    break;
            }
            break;
    }
}

function up_arrow() {
    switch (screen_type) {
        case 0:
            if (menu_select.title > 1) {
                menu_select.title -= 1;
                level_highlight();
            }
            break;
        case 1:
            switch (button_phase.level) {
                case 0:
                    if (current_layout.select_pos[1] != 0) {
                        current_layout.select_pos[1] -= 1;
                        selected_draw(current_layout.select_pos);
                    }
                    break;
                case 1:
                    if (current_layout.move_pos[1] != 0) {
                        current_layout.move_pos[1] -= 1;
                        grabbed_draw(current_layout.move_pos);
                    }
                    break;
                case 2: //Upgrade this to handle multiple options in the action menu (more than just wait and attack...)
                    if (menu_select.action == 1 && current_layout.attack_range == 1) {
                        $('.action_button').removeClass('button_selected');
                        $('.wait_action_button').addClass('button_selected');
                        menu_select.action = 0;
                    }
                    break;
                case 3:
                    if (current_layout.move_pos[1] != 0) {
                        current_layout.attack_pos[0] = current_layout.move_pos[0];
                        current_layout.attack_pos[1] = current_layout.move_pos[1] - 1;
                        grabbed_draw(current_layout.attack_pos);
                    }
                    break;
            }
            break;
    }
}

function down_arrow() {
    switch (screen_type) {
        case 0:
            if (menu_select.title < 2) {
                menu_select.title += 1;
                level_highlight();
            }
            break;
        case 1:
            switch (button_phase.level) {
                case -1:
                    
                case 0:
                    if (current_layout.select_pos[1] < current_layout.select_pos[2] - 1) {
                        current_layout.select_pos[1] += 1;
                        selected_draw(current_layout.select_pos);
                    }
                    break;
                case 1:
                    if (current_layout.move_pos[1] < current_layout.move_pos[2] - 1) {
                        current_layout.move_pos[1] += 1;
                        grabbed_draw(current_layout.move_pos);
                    }
                    break;
                case 2:
                    if (menu_select.action == 0 && current_layout.attack_range == 1) { //Upgrade this too to work with 3 or more buttons on the menu.
                        $('.action_button').removeClass('button_selected');
                        $('.attack_action_button').addClass('button_selected');
                        menu_select.action = 1;
                    }
                    break;
                case 3:
                    if (current_layout.move_pos[1] < current_layout.move_pos[2] - 1) {
                        current_layout.attack_pos[0] = current_layout.move_pos[0];
                        current_layout.attack_pos[1] = current_layout.move_pos[1] + 1;
                        grabbed_draw(current_layout.attack_pos);
                    }
                    break;
            }
            break;
    }
}

function x_key() {
    switch (screen_type) {
        case 0:
            if (menu_select.title > 0) {
                level_select();
            }
            break;
        case 1:
            switch (button_phase.level) {
                case 0:
                    if (unit_selectable()) {
                        grab_tile();
                        button_phase.level = 1;
                    }
                    else {
                        tile_action_menu();
                        button_phase.level = 4;
                    }
                    break;
                case 1:
                    if (jQuery.isEmptyObject(current_layout.unit[current_layout.move_pos[1]][current_layout.move_pos[0]])) {
                        
                        unit_move();
                        targets_in_range();
                        
                        unit_action_menu();
                        button_phase.level = 2;
                    }
                    else if (current_layout.move_pos[0] == current_layout.select_pos[0] && current_layout.move_pos[1] == current_layout.select_pos[1]) {
                        $('.unit').removeClass('grabbed');
                        selected_draw(current_layout.select_pos);
                        targets_in_range();
                        unit_action_menu();
                        button_phase.level = 2;
                    }
                    break;
                case 2:
                    switch (menu_select.action) {
                        case 0:
                            current_layout.select_pos = current_layout.move_pos;
                            button_phase.level = 0;
                            break;
                        case 1:
                            current_layout.attack_pos = jQuery.extend(true, [], current_layout.move_pos);
                            button_phase.level = 3;
                            break;
                    }
                    clear_action_menu();
                    break;
                case 3:
                    //If a unit exists and is on the other team.
                    if (!jQuery.isEmptyObject(current_layout.unit[current_layout.attack_pos[1]][current_layout.attack_pos[0]]) && !same_team(current_layout.unit[current_layout.attack_pos[1]][current_layout.attack_pos[0]], current_layout.unit[current_layout.move_pos[1]][current_layout.move_pos[0]])) {
                        attack(current_layout.unit[current_layout.move_pos[1]][current_layout.move_pos[0]], current_layout.unit[current_layout.attack_pos[1]][current_layout.attack_pos[0]]);
                        unit_exhausted();
                        show_hp();
                        $('.unit').removeClass('grabbed');
                        menu_select.action = 0;
                        current_layout.attack_range = 0;
                        selected_draw(current_layout.move_pos);
                        current_layout.select_pos = current_layout.move_pos;
                        button_phase.level = 0;
                    }
                    break;
                case 4:
                    turn_num += 1;
                    clear_action_menu();
                    new_turn();
                    button_phase.level = 0;
                    break;
            }
            break;
    }
}

function c_key() {
    switch (screen_type) {
        case 1:
            switch (button_phase.level) {
                case 1: 
                    $('.unit').removeClass('grabbed');
                    selected_draw(current_layout.select_pos);
                    button_phase.level = 0;
                    break;
                case 2: //move unit back
                    unit_restore();
                    clear_action_menu();
                    menu_select.action = 0;
                    current_layout.attack_range = 0;
                    button_phase.level = 1;
                    break;
                case 3:
                    targets_in_range();
                    menu_select.action = 0;
                    $('.unit').removeClass('grabbed');
                    unit_action_menu();
                    button_phase.level = 2;
                    break;
                case 4:
                    button_phase.level = 0;
                    clear_action_menu();
                    break;
            }
            break;
    }
}