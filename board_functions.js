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

//Level 1 Unit Initilization
var level1_placement = {
    team: ["ai","ai","ai","ai","ai"], //Determines if the unit should be left or right facing
    type: ["soldier","soldier","transport","tank","tank"], //Determines stats and image
    pos: [[2,3],[3,3],[5,5],[9,10],[8,10]]
};

//Military Unit Objects
var solider = {
    image: "soldier_left",
    health: 100
};

var tank = {
    image: "tank_left",
    health: 500
};

var mech = {
    image: "mech_left",
    health: 300
};

var transport_heli = {
    image: "transport_heli_left",
    health: 200
};

//draw_units - give each unit an UnitID

function huhtest(type) {

    return 
}

function draw_unit(unit_layout) {
    for(i=0;i<unit_layout.team.length;i++)
        var pic = unit_layout.type
        $('#board').append('div class="unit ' + mech.image
}

function draw_units(unit_layout, pos_x, pos_y) {
    for(y = pos_y;y < (pos_y +8);y++){
        if(unit_layout.pos)
        for (x = pos_x; x < (pos_x + 8) ; x++) {
            $('#board').append('<div class="unit ' + unit_layout[y][x] + '"></div>');
        }
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
            $('.tile:last').text(txt);
        }
        $('#board').append('<br />');
    }
}	 
			