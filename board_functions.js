//Level 1 Map Layout
var level1_map = [
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
];

//Level 1 Unit Initilization - Kept it as an object to remind myself I can use other keys.
var level1_placement = {
    type: [["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "e", "e", "transport_heli"],
        ["e", "e", "e", "e", "e", "e", "e", "soldier", "soldier", "e"],
        ["e", "e", "e", "e", "e", "e", "e", "tank", "tank", "e"]
    ]
};

//Military Unit Objects
var m_unit = {
    soldier: {
        image: "soldier_left" 
    },
    tank: {
        image: "tank_left"
    },
    mech: {
        image: "mech_left"
    },
    transport_heli: {
        image: "transport_heli_left"
    }
};

//draw_units on the 8x8
function draw_units(unit_layout, pos_x, pos_y) {
    for (y = pos_y; y < (pos_y + 8); y++) {
        for (x = pos_x; x < (pos_x + 8); x++) {
            unit_type = unit_layout.type[y][x];
            if (unit_type == "e") {
                $('#unit_layer').append('<div class="unit"></div>');
            }
            else {
                $('#unit_layer').append('<div class="unit ' + m_unit[unit_type].image + '"></div>');
            }
        }
        $('#unit_layer').append('<br />');
    }
}

//reveal all units on level
function see_units(unit_layout) {
    for (y = 0; y < unit_layout.type.length; y++) {
        for (x = 0; x < unit_layout.type[y].length; x++) {
            unit_type = unit_layout.type[y][x];
            if (unit_type == "e") {
                $('#unit_layer').append('<div class="unit"></div>');
            }
            else {
                $('#unit_layer').append('<div class="unit ' + m_unit[unit_type].image + '"></div>');
            }
        }
        $('#unit_layer').append('<br />');
    }
}

//This draws a view of the map, limited to an 8x8. 
//TODO: insure that pos_y and pos_x can't be larger than the width - 8 or height - 8
function draw_map(field_layout, pos_x, pos_y) {
    for(y = pos_y; y < (pos_y +8);y++){
        for(x=pos_x; x < (pos_x + 8);x++){
            $('#board').append('<div class="tile ' + field_layout[y][x] + '"></div>');
        }	
        $('#board').append('<br />');
    }
}
			
//This draws the entire map, used for map creation.
function see_map(field_layout) {
    for (y = 0; y < field_layout.length; y++) {
        for (x = 0; x < field_layout[y].length; x++) {
            var txt = y+","+x;
            $('#board').append('<div class="tile ' + field_layout[y][x] + '"></div>');
            //$('.tile:last').text(txt);
        }
        $('#board').append('<br />');
    }
}	 
			