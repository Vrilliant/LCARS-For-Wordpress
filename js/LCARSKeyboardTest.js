/* -----------------------------------------------------------------------------
	File Name: 		LCARSKeyboardTest.js
	Author: 		Brian Scott Gregory
	Date:			03/03/2014

	Dependencies:	LCARSKeyboardTest.js					
	Arguments:		None 
	Description:	
						
	TODO:			Separate screen specific content from system wide default
					content. 
----------------------------------------------------------------------------- */

// Constants (there are no constants with javascript but let's pretend there is by not prefacing them with the var term)
// This font you can put anywhere you want. This is just a good reliable nice to have location
UIFONTNAME = "Trebuchet MS"

function loadIndexPage()
{
	var xDivisor = 0.00073, yDivisor = 0.00164192;
	var baseOffsetX =  100 * xDivisor; 
	var baseOffsetY = 100 * yDivisor;
	var KeyColor = LCARSColors[0][3];
	var keyArray = new Array(
								// Row 1
								new Array( 'ESC', 0, 0, 50, 25, false  ), 
								new Array( 'F1', 155, 0, 50, 25, false  ), 
								new Array( 'F2', 210, 0, 50, 25, false  ), 
								new Array( 'F3', 265, 0, 50, 25, false  ), 
								new Array( 'F4', 320, 0, 50, 25, false  ), 
								new Array( 'F5', 375, 0, 50, 25, false  ), 
								new Array( 'F6', 430, 0, 50, 25, false  ), 
								new Array( 'F7', 485, 0, 50, 25, false  ), 
								new Array( 'F8', 540, 0, 50, 25, false  ), 
								new Array( 'F9', 595, 0, 50, 25, false  ), 
								new Array( 'F10', 650, 0, 50, 25, false  ), 
								new Array( 'F11', 705, 0, 50, 25, false  ), 
								new Array( 'F12', 760, 0, 50, 25, false  ),
								
								// Row 2
								new Array( '~', 0, 50, 50, 40, false  ), 
								new Array( '1', 55, 50, 50, 40, false  ), 
								new Array( '2', 110, 50, 50, 40, false  ), 
								new Array( '3', 165, 50, 50, 40, false  ), 
								new Array( '4', 220, 50, 50, 40, false  ), 
								new Array( '5', 275, 50, 50, 40, false  ), 
								new Array( '6', 330, 50, 50, 40, false  ), 
								new Array( '7', 385, 50, 50, 40, false  ), 
								new Array( '8', 440, 50, 50, 40, false  ), 
								new Array( '9', 495, 50, 50, 40, false  ), 
								new Array( '-', 550, 50, 50, 40, false  ), 
								new Array( '=', 605, 50, 50, 40 , false ), 
								new Array( 'BACKSPACE', 660, 50, 150, 40 , false ),
								
								// Row 3
								new Array( 'TAB', 0, 95, 75, 40, false  ), 
								new Array( 'Q', 80, 95, 50, 40, false  ), 
								new Array( 'W', 135, 95, 50, 40, false  ), 
								new Array( 'E', 190, 95, 50, 40, false  ), 
								new Array( 'R', 245, 95, 50, 40, false  ), 
								new Array( 'T', 300, 95, 50, 40, false  ), 
								new Array( 'Y', 355, 95, 50, 40, false  ), 
								new Array( 'U', 410, 95, 50, 40, false  ), 
								new Array( 'I', 465, 95, 50, 40, false  ), 
								new Array( 'O', 520, 95, 50, 40, false  ), 
								new Array( 'P', 575, 95, 50, 40, false  ), 
								new Array( '[', 630, 95, 50, 40, false  ), 
								new Array( ']', 685, 95, 50, 40, false  ),
								new Array( '\\', 740, 95, 70, 40, false  ),
								
								// Row 4
								new Array( 'CAPS LOCK', 0, 140, 90, 40, true  ), 
								new Array( 'A', 95, 140, 50, 40, false  ), 
								new Array( 'S', 150, 140, 50, 40, false  ), 
								new Array( 'D', 205, 140, 50, 40, false  ), 
								new Array( 'F', 260, 140, 50, 40, false  ), 
								new Array( 'G', 315, 140, 50, 40, false  ), 
								new Array( 'H', 370, 140, 50, 40, false  ), 
								new Array( 'J', 425, 140, 50, 40, false  ), 
								new Array( 'K', 480, 140, 50, 40, false  ), 
								new Array( 'L', 535, 140, 50, 40, false  ), 
								new Array( ';', 590, 140, 50, 40, false  ), 
								new Array( '\'', 645, 140, 50, 40, false  ), 
								new Array( 'ENTER', 700, 140, 110, 40, false  ),
								
								// Row 5
								new Array( 'SHIFT', 0, 185, 125, 40, false  ), 
								new Array( 'Z', 133, 185, 50, 40, false  ), 
								new Array( 'X', 188, 185, 50, 40, false  ), 
								new Array( 'C', 243, 185, 50, 40, false  ), 
								new Array( 'V', 298, 185, 50, 40, false  ), 
								new Array( 'B', 353, 185, 50, 40, false  ), 
								new Array( 'N', 408, 185, 50, 40, false  ), 
								new Array( 'M', 463, 185, 50, 40, false  ), 
								new Array( ',', 518, 185, 50, 40, false  ), 
								new Array( '.', 573, 185, 50, 40, false  ), 
								new Array( '/', 628, 185, 50, 40, false  ), 
								new Array( 'SHIFT', 685, 185, 125, 40, false  ), 
								
								// Row 4
								new Array( 'CTRL', 0, 230, 90, 40, false  ), 
								new Array( 'FTN', 95, 230, 60, 40, false  ), 
								new Array( 'ALT', 160, 230, 60, 40, false  ), 
								new Array( '', 225, 230, 295, 40, false  ), 
								new Array( 'ALT', 525, 230, 60, 40, false  ), 
								new Array( 'FTN', 590, 230, 60, 40, false  ), 
								new Array( 'FNK', 655, 230, 60, 40, false  ), 
								new Array( 'CTRL', 720, 230, 90, 40, false  )
								
							   );
	
	var backColor = "#000000", foreColor = "#cf9f5f", textForeColor = "#cccccc";

	// The LCARS Page is intended for the 'plumbing', that is, communication between sources and simple page mechanics. 
	var lcarsPage = new LCARSPage( document );
	lcarsPage.setForeColor( foreColor );
	lcarsPage.setBackColor( backColor );
	lcarsPage.Initialize();
	lcarsPage.getLCARSDoc().clear();
	
	for( x=0;x<keyArray.length ;x++)
		{
		for( y=0;y<keyArray[x].length;y++ )
			{
			var btnText = keyArray[x][0];
			var xVal = ( baseOffsetX + ( keyArray[x][1] * xDivisor ) ) / xDivisor;
			var yVal = ( baseOffsetY + ( keyArray[x][2] * yDivisor ) ) / yDivisor;
			var widVal = ( keyArray[x][3] * xDivisor );
			var heightVal = ( keyArray[x][4] * yDivisor );
			var lcb = new LCARSButton( lcarsPage, btnText, xVal, yVal, widVal, heightVal );
			var font = new LCARSFont( UIFONTNAME, "16px", false );
			lcb.setFont( font );
			lcb.setDualState( keyArray[x][5] );
			lcb.setBackGroundColor( backColor );
			lcb.setForeGroundColor( KeyColor ); // 
			lcb.setTextColor( backColor );
			lcb.Initialize();
			lcarsPage.addChild( lcb ); // Binds the Button
			}
		}
}

loadIndexPage();
