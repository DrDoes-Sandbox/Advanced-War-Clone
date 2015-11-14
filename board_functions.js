
var map_level1 = {
				fields:["grass", "mntn_small","grass_mntn", "mntn_small", "grass_mntn","tree","tree","water_left","water","water"//Row 1
			,"water_top_left","water_top","water_top_right","water_top_left","water_top","water_top","water_top","marsh","water","water"//Row 2
			,"water_left","marsh","water_right","water_left","water","water","water","water","water","water" //Row 3
			,"water_left","water","water_bottom_right","water_left","water","water","water","water","water","water" //Row 4
			,"water_left","water_bottom_right","tree","water_bottom_left","water_bottom","water","water","water","water","water" //Row 5
			,"water_left","water_top_right","grass","water_top_left","water_top","water","water","water","water","water_bottom" //Row 6
			,"water_left","water","water_top","water","water","water","water_bottom","water_bottom","water_bottom_right","grass" //Row 7
			,"water_bottom_left","water_bottom","water_bottom","water_bottom","water_bottom","water_bottom_right","grass","grass","grass","grass" //Row 8
			,"grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"//Row 9
			,"road_h","road_h","road_h","road_h","road_h","road_h","road_h","road_h","road_h","road_h"//Row 9
			],
				width:10,
				height:10
			};

			//This draws a view of the map, limited to an 8x8
function map_draw(map_data, pos_x, pos_y) {
    			for(y = pos_y; y < (pos_y +8);y++){
    				for(x=pos_x; x < (pos_x + 8);x++){
    					
    					i = map_data.width*y + x;
    					$('#board').append('<div class="tile '+map_data.fields[i]+'"></div>');																  ;
    				}
    			}
			}
			
			//This draws the entire map, used for map creation.
function map_see(map_data) {
    			for(y = 0; y < map_data.height;y++){
    				for(x=0; x < map_data.width;x++){
    					
    					i = map_data.width*y + x;
    					$('#board').append('<div class="tile '+map_data.fields[i]+'"></div>');																  ;
    				}
					$('#board').append('<br />');
    			}
			}	 
			