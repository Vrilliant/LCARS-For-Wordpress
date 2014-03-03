/* -----------------------------------------------------------------------------
	File Name: 		LCARSFont.js
	Author: 		Brian Scott Gregory
	Date:			02/26/2014

	Dependencies:	NONE
	Description:	The LCARS FONT object, the base class for all fonts in the system
					
	Design Note:	I'm keeping this as a static container, and keeping event wiring at 
					the control level. 
					
	Arguments:		None 
----------------------------------------------------------------------------- */
function LCARSFont( fontName, fontSize, fontBold )
{
	var curName = fontName; var curSize= fontSize; var curBold = fontBold;
	 
	this.name = curName;
	this.size = curSize;
	this.bold = curBold;
}

