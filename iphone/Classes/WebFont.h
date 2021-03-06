/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */


#import <UIKit/UIKit.h>

typedef struct {
	float	size;
	BOOL	isBold;
} TitaniumFontDescription;

BOOL UpdateFontDescriptionFromDict(NSDictionary * fontDict,TitaniumFontDescription * result);

UIFont * FontFromDescription(TitaniumFontDescription * inputDesc);

/*
Okay, time to think about this, seriously. Making fonts aren't too too expensive, but at the same time, we should cache them, right?

So should we cache them here, or elsewhere? More importantly, how do we make sure to alert them if there's a change?
So should we take in the old font as well as font dict for a default? Yeah. We should. And extract font properties from that...

Okay, cache the last requests, but not too many.

Or we could brute force this for now. Yeah, let's do that.



*/

