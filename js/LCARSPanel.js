/* -----------------------------------------------------------------------------
	File Name: 		LCARSPanel.js
	Author: 		Brian Scott Gregory
	Date:			02/24/2014

	Description:	The LCARS Panel object
					
	Arguments:		None 
----------------------------------------------------------------------------- */
function LCARSPanel(lcarsPage, text, xVar, yVar, widVar, heightVar) 
{
	var that = this;
	var page = lcarsPage;
	var xVal = xVar, yVal = yVar, widthVal = widVar, heightVal = heightVar;

	// Create a disassociated control, the only real quasi/unique value being the name
	var registeredControl = new LCARSControl( "LCARSPanel" );
	// Not attach the control to the page given the dimensions passed in 
	registeredControl.initialize( page, xVal, yVal, widthVal, heightVal );
	
    // optional parameters - user can adjust later
    this.Alignment = "right";
    this.ForeGroundColor = "black";
    this.BackGroundColor = "white";
	this.TextColor = "white";
	this.Text = text;
		
	this.Refresh = function ()
	{
		// Always reinitialize the control, height or width may have changed. 
		registeredControl.initialize( lcarsPage, xVal, yVal, widthVal, heightVal);

		// I'm finding I like separating embedded javascript commands into multiple lines. much easier.
		var curPage = registeredControl.getPage();
		var curDoc = curPage.getLCARSDoc();
				 
		// First get the width of the text based on the information requested
		var fontSize = registeredControl.getHeight()+ "px";
		
	 	// Since the rectangle is offset from the curvature, we calculate those values. 
	 	var rectX =  registeredControl.getLeft() + (registeredControl.getHeight() / 2)-1; 
	 	var rectWidth = registeredControl.getWidth() - registeredControl.getHeight() + 2; 

		// This section creates the title bar 
	 	curDoc.setColor(this.ForeGroundColor); 
		curDoc.fillRect(rectX, registeredControl.getTop(), rectWidth, registeredControl.getHeight());
		curDoc.fillArc( registeredControl.getLeft(), registeredControl.getTop(), registeredControl.getHeight(), registeredControl.getHeight(), 90.0, 270.0 ); // left end cap
		curDoc.fillArc( registeredControl.getLeft() + rectWidth-1, registeredControl.getTop(), registeredControl.getHeight(), registeredControl.getHeight(), 270, 90.0 ); // right end cap
		curDoc.paint();
		
		curDoc.setColor(this.BackGroundColor);

		// Initialize the title box information
		var titleBoxLeft = 0;  
		var titleBoxTop = registeredControl.getTop(); 
		var titleBoxHeight = registeredControl.getHeight();
		var textDimensions = curPage.getStringDimensionsByFont( this.Text, UIFONTNAME, fontSize);
		var titleboxWidth = textDimensions[ 0 ] + 20; // 10 px padding on corners at all times for text objects
		var titleBoxTextHeight = textDimensions[ 1 ];

		if( this.Alignment == "left" )
			titleBoxLeft = rectX;  
		else if( this.Alignment == "middle" )
			titleBoxLeft = rectX + (rectWidth/2) - (titleboxWidth/2); 
		else
			titleBoxLeft = rectX + rectWidth - titleboxWidth;

 		// Fill the rectangle with 10px breathing room on both sides  
		curDoc.fillRect(titleBoxLeft, titleBoxTop, titleboxWidth, titleBoxHeight);
		curDoc.paint();

	 	curDoc.setColor(this.TextColor); 
		curDoc.setFont(UIFONTNAME,fontSize,Font.NORMAL);

	 	curDoc.drawString( this.Text, titleBoxLeft + 10, titleBoxTop-4 );
		curDoc.paint();
	}
	
	this.OnRefresh = function( event )
	{
		this.Refresh();
	}
	
	this.Initialize = function()
			{ 
			this.Refresh(); 
			};

	return this;
}
	