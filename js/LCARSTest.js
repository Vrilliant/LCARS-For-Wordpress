/* -----------------------------------------------------------------------------
	File Name: 		LCARSTest.js
	Author: 		Brian Scott Gregory
	Date:			03/07/2014

	Dependencies:	LCARSTest.js					
	Arguments:		None 
	Description:	Used for testing the title code
					
----------------------------------------------------------------------------- */

// Constants (there are no constants with javascript but let's pretend there is by not prefacing them with the var term)
// This font you can put anywhere you want. This is just a good reliable nice to have location
UIFONTNAME = "Trebuchet MS"

function loadIndexPage( event )
{
	var backColor = "#000000"
	var textForeColor = "#cccccc"; // "#99CCFF"; // #cccccc
		
	// The LCARS Page is intended for the 'plumbing', that is, communication between sources and simple page mechanics. 
	var lcarsPage = new LCARSPage( document );
	lcarsPage.setBackColor( backColor );
	lcarsPage.Initialize();
	lcarsPage.getLCARSDoc().clear();
	
	var lch = new LCARSTitle( lcarsPage, 0, 5, 0.999, 50, "left");
	lch.TextColor = textForeColor;
	lch.ForeGroundColor = LCARSColors[0][2];
	lch.BackGroundColor = backColor;
	lch.Text = "VRILLIANT.COM";
	lch.Initialize();
	lcarsPage.addChild( lch ); // Binds the Button
	
	var lcp = new LCARSPanel( lcarsPage, "Menu", 5, 60, 350, 500 );
	lcp.TextColor = textForeColor;
	lcp.ForeGroundColor = LCARSColors[2][2];
	lcp.BackGroundColor = backColor;
	lcp.borders.left = 0;
	lcp.borders.top = 30;
	lcp.borders.right = 20;
	lcp.borders.bottom = 0;
	lcp.Alignment = "left";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

}

loadIndexPage();

document.onresize = loadIndexPage(); 