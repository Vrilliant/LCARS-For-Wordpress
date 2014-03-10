/* -----------------------------------------------------------------------------
	File Name: 		LCARSPanelTest.js
	Author: 		Brian Scott Gregory
	Date:			02/28/2014

	Dependencies:	LCARSPanelTest.js					
	Arguments:		None 
	Description:	LCARSPanel Test Suite
					
----------------------------------------------------------------------------- */

// Constants (there are no constants with javascript but let's pretend there is by not prefacing them with the var term)
// This font you can put anywhere you want. This is just a good reliable nice to have location
UIFONTNAME = "Trebuchet MS"

function loadIndexPage()
{
	var backColor = "#000000", foreColor = "#cf9f5f", textForeColor = "#cccccc";

	// The LCARS Page is intended for the 'plumbing', that is, communication between sources and simple page mechanics. 
	var lcarsPage = new LCARSPage( document );
	lcarsPage.setForeColor( foreColor );
	lcarsPage.setBackColor( backColor );
	lcarsPage.Initialize();
	lcarsPage.getLCARSDoc().clear();
	
	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 1", 60, 30, 400, 200 );
	lcp.TextColor = textForeColor;
	lcp.ForeGroundColor = foreColor;
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 20;
	lcp.borders.top = 30;
	lcp.borders.right = 0;
	lcp.borders.bottom = 0;
	lcp.Alignment = "left";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 2", 60, 300, 350, 200 );
	lcp.TextColor = textForeColor;
	lcp.ForeGroundColor = LCARSColors[2][5];
	lcp.BackGroundColor = "black";
	lcp.borders.left = 0;
	lcp.borders.top = 30;
	lcp.borders.right = 20;
	lcp.borders.bottom = 20;
	lcp.Alignment = "right";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 3", 500, 30, 400, 200 );
	lcp.TextColor = textForeColor;
	lcp.ForeGroundColor =  LCARSColors[2][2];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 20;
	lcp.borders.top = 30;
	lcp.borders.right = 10;
	lcp.borders.bottom = 10;
	lcp.Alignment = "left";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 4", 160, 130, 300, 100 );
	lcp.TextColor = LCARSColors[0][1];
	lcp.ForeGroundColor =  LCARSColors[2][3];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 10;
	lcp.borders.top = 20;
	lcp.borders.right = 8;
	lcp.borders.bottom = 8;
	lcp.Alignment = "right";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 5", 60, 250, 400, 250 );
	lcp.TextColor = LCARSColors[1][1];
	lcp.ForeGroundColor =  LCARSColors[3][7];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 0;
	lcp.borders.top = 25;
	lcp.borders.right = 10;
	lcp.borders.bottom = 0;
	lcp.Alignment = "right";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 6", 480, 250, 700, 250 );
	lcp.TextColor = LCARSColors[0][6];
	lcp.ForeGroundColor =  LCARSColors[2][6];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 40;
	lcp.borders.top = 50;
	lcp.borders.right = 0;
	lcp.borders.bottom = 0;
	lcp.Alignment = "middle";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "TEST Panel 7", 680, 350, 500, 150 );
	lcp.TextColor = "WHITE";
	lcp.ForeGroundColor =  LCARSColors[3][6];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 10;
	lcp.borders.top = 25;
	lcp.borders.right = 10;
	lcp.borders.bottom = 10;
	lcp.Alignment = "right";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

	var lcp = new LCARSPanel( lcarsPage, "A", 920, 30, 260, 200 );
	lcp.TextColor = "WHITE";
	lcp.ForeGroundColor =  LCARSColors[3][6];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 20;
	lcp.borders.top = 0;
	lcp.borders.right = 0;
	lcp.borders.bottom = 10;
	lcp.Alignment = "right";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button
}


loadIndexPage();
