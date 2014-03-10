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
	
	this.borders = new Object();
	this.borders.left = 20;
	this.borders.right = 20;
	this.borders.top = 40;
	this.borders.bottom = 20;
	
 	// Border variables 
	this.Refresh = function ()
	{
		// Always reinitialize the control, height or width may have changed. 
		registeredControl.initialize( lcarsPage, xVal, yVal, widthVal, heightVal);

		// I'm finding I like separating embedded javascript commands into multiple lines. much easier.
		var curPage = registeredControl.getPage();
		var curDoc = curPage.getLCARSDoc();
				 
		// First get the width of the text based on the information requested
		var fontSize = this.borders.top+ "px";
		
	 	// Since the rectangle is offset from the curvature, we calculate those values. 
	 	var rectWidth = registeredControl.getWidth() - ( this.borders.left / 2 ) - ( this.borders.right / 2 ); 
	 	
		// This section creates the title bar 
	 	curDoc.setColor(this.ForeGroundColor); 
		
		// Top Bar
	 	var bl = this.borders.left==0?this.borders.right: this.borders.left;
	 	var br = this.borders.right==0?this.borders.left: this.borders.right;
	 	var bt = this.borders.top==0?this.borders.bottom: this.borders.top;
	 	var bb = this.borders.bottom==0?this.borders.top: this.borders.bottom;

	 	curDoc.fillRect(	registeredControl.getLeft() + (bl/2)+1, 
	 						registeredControl.getTop(), 
	 						registeredControl.getWidth() - ((bl + br)/2),
	 						this.borders.top );
	 	
	 	// Right Bar
	 	curDoc.fillRect(	registeredControl.getLeft() + registeredControl.getWidth() - this.borders.right, 
	 						registeredControl.getTop() + (bt/2)+1, 
	 						this.borders.right, 
	 						registeredControl.getHeight() - ((bt + br)/2) );
	 	
	 	// Left Bar
	 	var bb = this.borders.bottom==0?this.borders.left: this.borders.bottom;
	 	curDoc.fillRect(	registeredControl.getLeft(), 
							registeredControl.getTop() + (bt/2), 
							this.borders.left, 
							registeredControl.getHeight() - ((bt + bb)/2));
	 	
	 	// Bottom Rectangle
	 	var br = this.borders.right==0?this.borders.bottom: this.borders.right;
	 	curDoc.fillRect( 	registeredControl.getLeft() + (bl/2) +1,
	 					 	registeredControl.getTop() + registeredControl.getHeight() - this.borders.bottom, 
	 					 	registeredControl.getWidth() - ((bl + br)/2), 
	 						this.borders.bottom );

	 	// Top left arc
	 	var bl = this.borders.left==0?this.borders.top: this.borders.left;
	 	var bt = this.borders.top==0?this.borders.left: this.borders.top;
	 	if( bl != 0 && bt != 0 )
	 	{
		 	curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft(), 
	 							registeredControl.getTop(),
	 							bl, 
	 							bt, 0, 360.0 );
	 	}
	 		
	 	// curvature of upper left interior 
	 	if( this.borders.left != 0 && this.borders.top != 0 )
	 	{
		 	curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillRect(	registeredControl.getLeft() + (bl/2), 
	 							registeredControl.getTop() + (bt/2), 
	 							bl, 
	 							bt);

		 	curDoc.setColor(this.BackGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft() + bl, 
	 							registeredControl.getTop() + bt,
	 							bl, 
	 							bt, 0, 360.0 );
	 	}
	 		
	 	// Top right arc
	 	var br = this.borders.right==0?this.borders.top: this.borders.right;
	 	bt = this.borders.top==0?this.borders.right: this.borders.top;
	 	if( br != 0 && bt != 0 )
	 		{
		 	curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft() + registeredControl.getWidth() - br, 
	 							registeredControl.getTop(),
	 							br, 
	 							bt, 0, 360.0 );
	 		}
	 	// curvature of upper right interior 
	 	if( this.borders.top != 0 && this.borders.right != 0 )
	 	{
		 	curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillRect(	registeredControl.getLeft() + registeredControl.getWidth() - (1.5*br), 
	 							registeredControl.getTop() + (bt/2), 
	 							br, 
	 							bt);

		 	curDoc.setColor(this.BackGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft() + registeredControl.getWidth() - br*2, 
	 							registeredControl.getTop() + bt,
	 							br, 
	 							bt, 0, 360.0 );
	 	}
	 		
	 	// bottom left arc
	 	var bl = this.borders.left==0?this.borders.bottom: this.borders.left;
	 	var bb = this.borders.bottom==0?this.borders.left: this.borders.bottom;
	 	if( bl != 0 && bb != 0 )
	 		{
	 		curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft(), 
	 							registeredControl.getTop() + registeredControl.getHeight() - bb,
	 							bl, 
	 							bb, 0, 360.0 );
	 		}
	 	// curvature of bottom left interior 
	 	if( this.borders.left != 0 && this.borders.bottom != 0 )
	 	{
		 	curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillRect(	registeredControl.getLeft() + (bl/2), 
	 							registeredControl.getTop() + registeredControl.getHeight() - (1.5*bb), 
	 							bl, 
	 							bb);

		 	curDoc.setColor(this.BackGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft() + bl, 
	 							registeredControl.getTop() + registeredControl.getHeight() - bb*2,
	 							bl, 
	 							bb, 0, 360.0 );
	 	}
	 		
	 	// bottom left arc
	 	br = this.borders.right==0?this.borders.bottom: this.borders.right;
	 	bb = this.borders.bottom==0?this.borders.right: this.borders.bottom;
	 	if( br != 0 && bb != 0 )
	 		{
	 		curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft() + registeredControl.getWidth() - br , 
	 							registeredControl.getTop() + registeredControl.getHeight() - bb,
	 							br, 
	 							bb, 0, 360.0 ); // right end cap
	 		}
	 	// curvature of bottom right interior 
	 	if( this.borders.right != 0 && this.borders.bottom != 0 )
	 	{
		 	curDoc.setColor(this.ForeGroundColor); 
	 		curDoc.fillRect(	registeredControl.getLeft() + registeredControl.getWidth() - (1.5*br) , 
	 							registeredControl.getTop() + registeredControl.getHeight() - (1.5*bb), 
	 							br, 
	 							bb);

		 	curDoc.setColor(this.BackGroundColor); 
	 		curDoc.fillArc( 	registeredControl.getLeft() + registeredControl.getWidth() - 2*br , 
	 							registeredControl.getTop() + registeredControl.getHeight() - 2*bb,
	 							br, 
	 							bb, 0, 360.0 );
	 	}
	 							
	 	//curDoc.fillArc( registeredControl.getLeft() + rectWidth-1, registeredControl.getTop(), registeredControl.getHeight(), registeredControl.getHeight(), 270, 90.0 ); // right end cap
		curDoc.paint();
		
		curDoc.setColor(this.BackGroundColor);

		// Initialize the title box information
		var titleBoxLeft = 0;  
		var titleBoxTop = registeredControl.getTop(); 
		var titleBoxHeight = this.borders.top;
		var textDimensions = curPage.getStringDimensionsByFont( this.Text, UIFONTNAME, fontSize);
		var titleboxWidth = textDimensions[ 0 ] + 20; // 10 px padding on corners at all times for text objects
		var titleBoxTextHeight = this.borders.top;

		if( this.Alignment == "left" )
			titleBoxLeft = registeredControl.getLeft() + this.borders.left + 10; // 10px standard offset for left from edge  
		else if( this.Alignment == "middle" )
			titleBoxLeft = registeredControl.getLeft() + ( registeredControl.getWidth() / 2 ) - (titleboxWidth /2 ); 
		else
			titleBoxLeft = registeredControl.getLeft() + registeredControl.getWidth() - this.borders.right - titleboxWidth - 10;

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

	this.border = function( arrayWidths )
	{
		for( nIndex=0;nIndex<arrayWidths.length;nIndex++)
			this.panelBorderWidths[nIndex] = arrayWidths[nIndex];
	}
	
	return this;
}
	