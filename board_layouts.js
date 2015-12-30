//This is a list of Global Variables
var turn_num = 1;
var current_team = 1;
//I don't use this yet, only a thought.
var field_info = {
    def: {
        grass: 1,
        road: 0,
        mntn: 4
    },
    terrain_speed: {
        grass: 2,
        road: 1,
        mntn: 4,
        water: -1
    }
};

//Determines which option on a menu is selected. All menus are set to -1 when not in use.
var menu_select = {
    //Determines if the player selected "Wait" or "Attack" on the action_menu
    action: 0,
    title: 0
};


//Button trackers. Ensures the key pressed does what is expected based on prior events.
var button_phase = {
    level: 0
};

var screen_type = 0; // Title Screen = 0 , Level Screen = 1

//Upon loading a level the level's layout is stored in current_layout
var current_layout = {};
//Level 1 Map Layout
var level1_layout = {
    field: [
        ["grass", "mntn_small", "grass_mntn", "mntn_small", "grass_mntn",
        "tree", "tree", "water_left", "water", "water"] //Row 1
		, ["water_top_left", "water_top", "water_top_right", "water_top_left",
        "water_top", "water_top", "water_top", "marsh", "water", "water"]//Row 2
		, ["water_left", "marsh", "water_right", "water_left", "water", "water",
        "water", "water", "water", "water"] //Row 3
		, ["water_left", "water", "water_bottom_right", "water_left", "water",
        "water", "water", "water", "water", "water"] //Row 4
		, ["water_left", "water_bottom_right", "tree", "water_bottom_left",
        "water_bottom", "water", "water", "water", "water", "water"] //Row 5
		, ["water_left", "water_top_right", "grass", "water_top_left",
        "water_top", "water", "water", "water", "water", "water_bottom"] //Row 6
		, ["water_left", "water", "water_top", "water", "water", "water",
        "water_bottom", "water_bottom", "water_bottom_right", "grass"] //Row 7
		, ["water_bottom_left", "water_bottom", "water_bottom", "water_bottom",
        "water_bottom", "water_bottom_right", "grass", "grass", "grass", "grass"] //Row 8
		, ["grass", "grass", "grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass"]//Row 9
		, ["road_h", "road_h", "road_h", "road_h", "road_h", "road_h",
        "road_h", "road_h", "road_h", "road_h"]//Row 10
    ],
    
    unit: [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, { team: 1, image: 'transport_heli_left', max_hp: 8, cur_hp: 8, dmg: 2, used: 0 }], //used is boolean to know if the player went this turn.
    [{}, {}, {}, {}, {}, {}, {}, { team: 1, image: 'soldier_left', max_hp: 10, cur_hp: 10, dmg: 3, used: 0 }, { team: 1, image: 'soldier_left', max_hp: 10, cur_hp: 10, dmg: 3, used: 0 }, {}],
    [{}, {}, {}, {}, {}, {}, {}, { team: 2, image: 'tank_left', max_hp: 12, cur_hp: 12, dmg: 4, used: 0 }, { team: 2, image: 'tank_left', max_hp: 12, cur_hp: 12, dmg: 4, used: 0 }, {}]
    ],

    //x,y array to define what the player has selecting, moving, or attacking
    //Starting position of selector
    select_pos: [3, 0],  //3rd position is the width of the level
    move_pos: [],
    attack_pos: [],
    //Boolean to determine if an enemy unit is within range
    attack_range : 0

};

var level2_layout = {
    field: [
        ["grass", "mntn_small", "grass_mntn", "mntn_small", "grass_mntn",
        "tree", "tree", "grass", "grass", "grass"] //Row 1
		, ["grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass", "grass", "grass"]//Row 2
		, ["grass", "grass", "grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass"] //Row 3
		, ["grass", "grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass", "grass"] //Row 4
		, ["grass", "grass", "tree", "grass",
        "grass", "grass", "grass", "grass", "grass", "grass"] //Row 5
		, ["grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass", "grass", "grass"] //Row 6
		, ["grass", "grass", "grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass"] //Row 7
		, ["grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass", "grass", "grass"] //Row 8
		, ["grass", "grass", "grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass"]//Row 9
		, ["grass", "grass", "grass", "grass", "grass", "grass",
        "grass", "grass", "grass", "grass"]//Row 10
    ],

    unit: [
    [{ team: 2, image: 'transport_heli_left', max_hp: 8, cur_hp: 8, dmg: 2, used: 0 }, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{ team: 2, image: 'soldier_left', max_hp: 10, cur_hp: 10, dmg: 3, used: 0 }, { team: 2, image: 'soldier_left', max_hp: 10, cur_hp: 10, dmg: 3, used: 0 }, {}, {}, {}, {}, {}, {}, {}, {}],
    [{ team: 2, image: 'tank_left', max_hp: 12, cur_hp: 12, dmg: 4, used: 0 }, { team: 2, image: 'tank_left', max_hp: 12, cur_hp: 12, dmg: 4, used: 0 }, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, { team: 1, image: 'transport_heli_left', max_hp: 8, cur_hp: 8, dmg: 2, used: 0 }],
    [{}, {}, {}, {}, {}, {}, {}, { team: 1, image: 'soldier_left', max_hp: 10, cur_hp: 10, dmg: 3, used: 0 }, { team: 1, image: 'soldier_left', max_hp: 10, cur_hp: 10, dmg: 3, used: 0 }, {}],
    [{}, {}, {}, {}, {}, {}, {}, { team: 1, image: 'tank_left', max_hp: 12, cur_hp: 12, dmg: 4, used: 0 }, { team: 1,image: 'tank_left', max_hp: 12, cur_hp: 12, dmg: 4, used: 0 }, {}]
    ],

    //x,y array to define what the player has selecting, moving, or attacking
    //Starting position of selector
    select_pos: [6, 4],  //3rd position is the width of the level
    move_pos: [],
    attack_pos: [],
    attack_range: 0

};
