/* -----------------------------------------------------------------------------
	File Name: 		LCARSControl.js
	Author: 		Brian Scott Gregory
	Date:			02/24/2014

	Dependencies:	LCARSPage.js, LCARSObject.js
	Description:	The LCARS Control object, the base class for all 
					viewable controls.
					
					Design Philosophy:	A control is an autonomous object
										which has 'awareness' of it's spatial
										location and movement within a page, and 
										is responsible for rendering itself within the page.
										
										Similar to organic life. If the control
										'wants' to move, it has 'spatial' awareness and can
										move based on it's container awareness via direct 
										interactions with it. 


					Dev Note: NOT Intended to be instantiated directly, intended to be
							  inherited with all controls. 

	Design Note:	I'm keeping this as a static container, and keeping event wiring at 
					the control level. 
					
	Arguments:		None 
----------------------------------------------------------------------------- */
function LCARSControl(controlType)
{
    var ctlObjectBase	= new LCARSObject(); 
    var ctlType			= controlType;

    // Uninitialized by default.  
    var ctlPage, ctlLeft, ctlTop, ctlWidth, ctlHeight;
    var ctlPercX, ctlPercY, ctlPercWidth, ctlPercHeight;

    // Tests an object type to ascertain is this the type passed in?
    // ctl MUST equal ann LCARSControl, it's up to the caller to know this. 
    this.IsTypeOf = function( ctl ) { return  ctlType.typename == ctl.typename; };
    this.TypeName = function() { return  ctlType; };
    
    // Default values all controls carry, but do NOT have to implement.
    this.Enabled = true;
    this.Visible = true;
    
    this.initialize = function( lcarsPage,  xVar, yVar, widVar, heightVar) 
    	{
    	ctlPage = lcarsPage;
		
		if( xVar <= 1 )
		{
			ctlLeft = ctlPage.calcX( xVar );
			ctlPercX = xVar;
		}
		else
			ctlLeft = xVar;

		if( yVar <= 1 )
		{
			ctlTop = ctlPage.calcX( yVar );
		    ctlPercY = yVar;
		}
		else
			ctlTop = yVar;
			
		if( widVar <= 1 )
		{
			ctlWidth = ctlPage.calcX( widVar );
			ctlPercWidth =  widVar;
		}
		else
			ctlWidth = widVar;
			
		if( heightVar <= 1 )
		{
			ctlHeight = ctlPage.calcY( heightVar );
			ctlPercHeight = heightVar;
		}
		else
			ctlHeight = heightVar;
	    
    	}
    
    // "Properties" per se, used to exposed 'internal (instance level) variables  
    this.getLeft = function(){ return ctlLeft; };
    this.getTop = function(){ return ctlTop; };
    this.getWidth = function(){ return ctlWidth; };
    this.getHeight = function(){ return ctlHeight; };
    
    // Used to resize & positionally change control locations
    this.setLeftPerc = function( xPerc ){ ctlPercX = xPerc; this.resize(); }; 
    this.setTopPerc = function( yPerc ){ ctlPercX = yPerc; this.resize(); }; 
    this.setWidthPerc = function( percWidth ){ ctlPercWidth = percWidth; this.resize(); }; 
    this.setHeightPerc = function( percHeight ){ ctlPercHeight = percHeight; this.resize(); }; 

    // Obtains the page 
    this.getPage = function(){ return ctlPage; };

    return this;
}
