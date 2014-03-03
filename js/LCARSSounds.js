/* -----------------------------------------------------------------------------
	File Name: 		LCARSSounds.js
	Author: 		Brian Scott Gregory
	Date:			02/24/2014

	Description:	Intended to be the 'sound' engine, containing the sounds
					of the LCARS System.
					
	Arguments:		DOM Document to interact with for sounds. 
----------------------------------------------------------------------------- */
var LCARSSOUNDARRAY = new Array( 
								new Array( "ComputerErrorSelection", "ComputerErrorSelection.wav" ), 	// 0 
								new Array( "BasicComputerBeep", "BasicComputerBeep.wav" )				// 1
							   );
var SOUNDNAME = 0;
var SOUNDFILE = 1;

function LCARSSounds( doc )
{
	// Private
	var soundfileRootLoc = "./sounds/";
	var curDoc = doc;
	
	this.Initialize = function()
	{
		var htmData = '';
		for( nIndex=0;nIndex<LCARSSOUNDARRAY.length;nIndex++)
		{
			htmData += '<audio preload id="' + LCARSSOUNDARRAY[nIndex][SOUNDNAME] + '">';
			htmData += '<source ' + 
						'src="'+ soundfileRootLoc + LCARSSOUNDARRAY[nIndex][SOUNDFILE]+ '" ' + 
						'type="audio/wav" ' + 
						'style="visibility: hidden; white-space: nowrap;"/>';
			htmData += "</audio>";
  		}
		curDoc.write(htmData);
	} 
	
	this.playSound = function ( lcarsSound )
		{
		try {
			var sndPlayer = curDoc.getElementById(lcarsSound);
			sndPlayer.play();
			}
		catch( error ) // sound player not installed? don't want to kill the app just catch it and ignore
		{
		}
		
  		}
}