/* -----------------------------------------------------------------------------
	File Name: 		LCARSTitleTest.js
	Author: 		Brian Scott Gregory
	Date:			02/28/2014

	Dependencies:	LCARSTitleTest.js					
	Arguments:		None 
	Description:	Used for testing the title code
					
----------------------------------------------------------------------------- */

// Constants (there are no constants with javascript but let's pretend there is by not prefacing them with the var term)
// This font you can put anywhere you want. This is just a good reliable nice to have location
UIFONTNAME = "Trebuchet MS"

function loadIndexPage( event )
{
	var backColor = "#000000"
	var foreColor = "#cf9f5f" // #bb4411
	var textForeColor = "#cccccc"; // "#99CCFF"; // #cccccc
	var TestArray = new Array(
							 new Array( "left", textForeColor, foreColor, backColor ),
							 new Array( "middle", "white", LCARSColors[0][0], "black" ),
							 new Array( "left", LCARSColors[2][6], LCARSColors[3][6], "black" ),
							 new Array( "middle", LCARSColors[1][3], LCARSColors[0][7], backColor ),
							 new Array( "left", "black", LCARSColors[3][7], LCARSColors[2][4] ),
							 new Array( "middle", "#555555", "#cccccc", "black" ),
							 new Array( "right", "black", "#ff1111", "#ff1111" ),
							 new Array( "left", "#001100", "#003300", "#119911" )
							 );
		
	// The LCARS Page is intended for the 'plumbing', that is, communication between sources and simple page mechanics. 
	var lcarsPage = new LCARSPage( document );
	lcarsPage.setForeColor( foreColor );
	lcarsPage.setBackColor( backColor );
	lcarsPage.Initialize();
	lcarsPage.getLCARSDoc().clear();
	
	for( nIndex=0;nIndex < TestArray.length; nIndex ++ )
		{
		// separate functions for drawing the screen elements
		var lch = new LCARSTitle( lcarsPage, 0, 5 + (55* nIndex), 0.999, 50, TestArray[nIndex][0] );
		lch.TextColor = TestArray[nIndex][1];
		lch.ForeGroundColor = TestArray[nIndex][2];
		lch.BackGroundColor = TestArray[nIndex][3];
		lch.Text = "VRILLIANT.COM";
		lch.Initialize();
		lcarsPage.addChild( lch ); // Binds the Button
		}
	
}

loadIndexPage();

document.onresize = loadIndexPage(); 