/* -----------------------------------------------------------------------------
	File Name: 		LCARSPage.js
	Author: 		Brian Scott Gregory
	Date:			02/24/2014

	Description:	A superclass/subclass of the document, this serves
					the purpose of being a container for the window for 
					graphics and sound.
					
	Arguments:		(DOM) document:	The document to 'render' on 
----------------------------------------------------------------------------- */
 function LCARSPage( document )
{
	var lcarsSoundPlayer = new LCARSSounds( document );
	var doc = document;

	var forecolor, backcolor;
	var lcarsDoc = new jsGraphics(doc); // draw directly into document
	var lcarselements = new Array();
	
	// Initialize Sound Player
	this.getSoundPlayer = function() { return lcarsSoundPlayer; }; 
	
	this.calcX = function( xPerc ) { return window.innerWidth * xPerc ; }
	this.calcY = function( yPerc ) { return window.innerHeight * yPerc; }
	
	this.setForeColor = function ( fc )
		{
		forecolor = fc;
		} 

	this.setBackColor = function ( bc )
		{
		backcolor = bc;
		} 
		
	this.getLCARSDoc = function getLCARSDoc() { return lcarsDoc; }
	this.SoundPlayer = function () { return lcarsSoundPlayer; };
	
	// Makes it easy to pass events to a child element
	var elementInContext = null;
	
	OnMouseMoveEvent = function( event )
	{
		if( elementInContext != null )
		if( elementInContext.OnMouseOutEvent != undefined )
			{
			elementInContext.OnMouseOutEvent( event );
			elementInContext = null;
			}
				
  		// Get the position of each
  		var xPos = event.clientX;
  		var yPos = event.clientY;

		if( lcarselements != undefined )
			{
			for( nIndex=0 ; nIndex < lcarselements.length ; nIndex++ )
				{
				var curLCARSElement = lcarselements[nIndex];
				
				if( xPos >= curLCARSElement.getLeft() && xPos <= ( curLCARSElement.getLeft() + curLCARSElement.getWidth() ) )
					{
					if( yPos >= curLCARSElement.getTop() && yPos <= ( curLCARSElement.getTop() + curLCARSElement.getHeight() ) )
						{
						document.body.style.cursor='pointer';
						elementInContext = curLCARSElement;
						if( elementInContext.OnMouseOverEvent != undefined )
							elementInContext.OnMouseOverEvent( event );
							
						return;	
						}
					}
	    		}
			}

		document.body.style.cursor='default';

  		// Clear out the current element
		elementInContext = null;
	}
	
	OnClickEvent = function ( event )
	{
  		if( elementInContext != null )
  		{
  			if( elementInContext.OnClickEvent != undefined )
  				{
  					elementInContext.currentTarget = elementInContext;
  					elementInContext.OnClickEvent( event );
  				}
  			}		
	}

	OnMouseUpEvent = function ( event )
	{
  		if( elementInContext != null )
  			if( elementInContext.OnMouseUpEvent != undefined )
  				elementInContext.OnMouseUpEvent( event );
	}

	OnMouseDownEvent = function ( event )
	{
  		if( elementInContext != null )
  			if( elementInContext.OnMouseDownEvent != undefined )
  				elementInContext.OnMouseDownEvent( event );
	}

	OnResize = function ( event )
	{
		Refresh();
	}

	document.onclick = OnClickEvent;
	document.onmousemove = OnMouseMoveEvent;
	document.onmouseup = OnMouseUpEvent;
	document.onmousedown = OnMouseDownEvent;
	window.onresize = OnResize;
	
	this.RegisterControl = function( ctlToRegister )
	{
		// The control's just a pass through, we just add it to the collection
		this.addChild( ctlToRegister );
		return ctlToRegister;
	}
	
	this.getStringDimensionsByFont = function( text, UIFONTNAME, fontSize)
	{
		// Pass through to the wz function
		return getStringDimensionsByFont( text, UIFONTNAME, fontSize);
	}
	
	this.addChild = function( myItem )
	{
		lcarselements.push( myItem );
	}

	Refresh = function()
	{
		doc.body.style.foregroundColor = forecolor;  
		doc.body.style.backgroundColor = backcolor;
		if( lcarselements != undefined )
			{
			for( nIndex=0 ; nIndex < lcarselements.length ; nIndex++ )
				{
				var curLCARSElement = lcarselements[nIndex];
				if( curLCARSElement.OnRefresh != undefined )
					curLCARSElement.OnRefresh();
	    		}
			}
	}

	this.Initialize = function()
	{
		doc.body.style.foregroundColor = forecolor;  
		doc.body.style.backgroundColor = backcolor;
		lcarsSoundPlayer.Initialize(); 					// to prebuffer sounds
	}
	
}

