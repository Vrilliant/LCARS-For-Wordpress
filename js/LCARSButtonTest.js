/* -----------------------------------------------------------------------------
	File Name: 		LCARSButtonTest.js
	Author: 		Brian Scott Gregory
	Date:			02/26/2014

	Dependencies:	LCARSButtonTest.js					
	Arguments:		None 
	Description:	This the the primary LCARS interface 'Loader', which
					sets up system defaults and loads the framework.
					
	TODO:			Separate screen specific content from system wide default
					content. 
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
	
	for( x=0;x<4;x++)
		{
		for( y=0;y<8;y++ )
			{
			var dualstate = ((x % 2)==1)?true:false;
			var btnText = ( (dualstate)?'DS ':'' ) + 'Button ' + '(' + x + ',' + y + ')';
			var lcb = new LCARSButton( lcarsPage, btnText, (5+(x*15))/100, (5*(y+1))/100, 150, 35 );
			var font = new LCARSFont( UIFONTNAME, "16px", false );
			lcb.setFont( font );
			lcb.setDualState( dualstate );
			lcb.setBackGroundColor( backColor );
			lcb.setForeGroundColor( LCARSColors[x][y] );
			lcb.setTextColor( backColor );
			lcb.Initialize();
			lcarsPage.addChild( lcb ); // Binds the Button
			}
		}
}

loadIndexPage();
