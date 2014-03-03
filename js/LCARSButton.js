/* -----------------------------------------------------------------------------
	File Name: 		LCARSButton.js
	Author: 		Brian Scott Gregory
	Date:			02/24/2014

	Dependencies:	LCARSControl.js					
	Arguments:		None 
	Description:	The LCARS Button object

	Design Notes:	xVar, yVar, widVar, heightVar are all percentages OR pixel values.
					if less than or equal to one, then it's a percentage, if greater 
					than one, then it's a pixel value.  
----------------------------------------------------------------------------- */
function LCARSButton(lcarsPage, text, xVar, yVar, widVar, heightVar) {
	var that = this;
	var resetEvent = null;
	// Create a disassociated control, the only real quasi/unique value being the name
	var registeredControl = new LCARSControl( "LCARSButton" );
	// Not attach the control to the page given the dimensions passed in 
	registeredControl.initialize( lcarsPage, xVar, yVar, widVar, heightVar );
	// Finally, Register this with the page we're on
	lcarsPage.RegisterControl( this );

	// Public Property get/sets with internal variables
	// Why? Debug and find out why
	var text;
	this.getText = function(){ return text; }; 
	this.setText = function(value){ text = value; }; 

	var font = new LCARSFont( UIFONTNAME, "12px", false );
	this.getFont = function(){ return font };
	this.setFont = function( value ){ font = value; };

	var fgcolor = LCARSColors[4][1];
	this.getForeGroundColor = function(){ return fgcolor; };
	this.setForeGroundColor = function( value ){ fgcolor = value ; };

	var bgcolor = LCARSColors[4][0];
	this.getBackGroundColor = function(){ return bgcolor; };
	this.setBackGroundColor = function( value ){ bgcolor = value ; };

	var tglfgcolor = "#cccccc";
	this.getToggleForeGroundColor = function(){ return tglfgcolor; };
	this.setToggleForeGroundColor = function( value ){ tglfgcolor = value ; };

	var tglbgcolor = "#cccccc";
	this.getToggleBackGroundColor = function(){ return tglbgcolor; };
	this.setToggleBackGroundColor = function( value ){ tglbgcolor = value ; };

	var textcolor = LCARSColors[4][1];
	this.getTextColor = function(){ return textcolor; };
	this.setTextColor = function( value ){ textcolor = value ; };

	var tgltextcolor = "white";
	this.getToggleTextColor = function(){ return tgltextcolor; };
	this.setToggleTextColor = function( value ){ tgltextcolor = value ; };

	var dualstate = false;
	this.getDualState = function(){ return dualstate; };
	this.setDualState = function( value ){ dualstate = value ; };

	var istoggled = false;
	this.getIsToggled = function(){ return istoggled; };
	this.setIsToggled = function( value ){ istoggled = value ; };

    this.Refresh = function( toggleColors = false )
	{
		var fc, bc, tc; // Used for storing colors, and flexibility for other coloring to be put in
		if( toggleColors == false )
			{
			fc = fgcolor;
			bc = bgcolor;
			tc = textcolor;
			}
		else
			{
			fc = tglfgcolor;
			bc = tglbgcolor;
			tc = tgltextcolor;
			}
			
		var curPage = registeredControl.getPage();
		var curDoc = curPage.getLCARSDoc();
				 
		// This section creates the button 
	 	curDoc.setColor(fc);
	 	
	 	// Since the rectangle is offset from the curvature, we calculate those values. 
	 	var rectX =  registeredControl.getLeft() + (registeredControl.getHeight() / 2) -1; 
	 	var rectWidth = registeredControl.getWidth() - registeredControl.getHeight(); 
	 	
		curDoc.fillRect(rectX, registeredControl.getTop(), rectWidth+2, registeredControl.getHeight());
		curDoc.fillArc( registeredControl.getLeft(), registeredControl.getTop(), registeredControl.getHeight(), registeredControl.getHeight(), 90.0, 270.0 ); // left end cap
		curDoc.fillArc( registeredControl.getLeft() + rectWidth, registeredControl.getTop(), registeredControl.getHeight(), registeredControl.getHeight(), 270, 90.0 ); // right end cap
		
		// Initialize the title box information
		var textDimensions = getStringDimensionsByFont( text, font.name, font.size);
		var titleTextLeft = registeredControl.getLeft() + ( (registeredControl.getWidth()/2 ) - (textDimensions[ 0 ] / 2) );
		var titleTextTop = registeredControl.getTop() + ( (registeredControl.getHeight()/2 ) - (textDimensions[ 1 ] / 2) );

	 	curDoc.setColor(tc); 
		curDoc.setFont(UIFONTNAME,font.size,Font.NORMAL);
	 	curDoc.drawString( text, titleTextLeft, titleTextTop );
		curDoc.paint();
	};
	
	this.Initialize = function() { this.Refresh( false ); };

	// Bubble to base class
	this.getLeft = function() { return registeredControl.getLeft(); };
	this.getTop = function() { return registeredControl.getTop(); };
	this.getWidth = function() { return registeredControl.getWidth(); };
	this.getHeight = function() { return registeredControl.getHeight(); };

	this.setFont = function( curFont ) { font = curFont; };
	this.getFont = function() { return font; };
	
	this.OnRedraw = function( event )
	{
		this.Refresh( false );
	}
	
	this.toggleButton = function()
	{
		clearTimeout(resetEvent);
		that.Refresh( false );
	}
	
	this.OnClickEvent = function ( event )
	{
		this.Refresh( (istoggled)? false: true ); // toggle the colors 

		var curPage = registeredControl.getPage();
		curPage.getSoundPlayer().playSound( LCARSSOUNDARRAY[1][0] );
		
		if( dualstate == true )
			this.setIsToggled( (this.getIsToggled())? false: true );
		else
			{ 
			resetEvent = window.setTimeout(function() { that.toggleButton(); }, 500);
			}
	};

	return this;
}

