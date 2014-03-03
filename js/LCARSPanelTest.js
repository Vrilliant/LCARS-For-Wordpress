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
	
	var lcp = new LCARSPanel( lcarsPage, "My First Panel", 10, 10, 0.90, 0.10 );
	lcp.TextColor = textForeColor;
	lcp.ForeGroundColor = foreColor;
	lcp.BackGroundColor = backColor;
	lcp.Text = "VRILLIANT.COM";
	lcp.Initialize();
	lcarsPage.addChild( lcp ); // Binds the Button

}

loadIndexPage();
