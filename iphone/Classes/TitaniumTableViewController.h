/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import <UIKit/UIKit.h>
#import "TitaniumContentViewController.h"

typedef enum {
	TitaniumTableActionIndexed			=0x100,

	TitaniumTableActionDeleteRow		=0x101,
	TitaniumTableActionInsertBeforeRow	=0x102,
	TitaniumTableActionInsertAfterRow	=0x103,
	TitaniumTableActionUpdateRow		=0x104,
	TitaniumTableActionAppendRow		=0x105,

	TitaniumTableActionReload			=0x200,
	TitaniumTableActionReloadData		=0x201,
	TitaniumGroupActionReloadSections	=0x202,

	TitaniumTableActionSectionRow		=0x400,
	TitaniumGroupActionInsertBeforeRow	=0x401,
	TitaniumGroupActionDeleteRow		=0x402,
	TitaniumGroupActionUpdateRow		=0x403,

	TitaniumTableActionSection			=0x800,
	TitaniumGroupActionInsertBeforeGroup=0x801,
	TitaniumGroupActionDeleteGroup		=0x802,
	TitaniumGroupActionUpdateGroup		=0x803,
	
} TitaniumTableAction;

@interface TitaniumTableActionWrapper : NSObject
{
	TitaniumTableAction kind;
	int index;
	int section;
	int row;
	NSDictionary * sectionData;
	NSDictionary * rowData;
	NSArray * replacedData;
	UITableViewRowAnimation animation;
	NSURL * baseUrl;
}

@property(nonatomic,assign)	TitaniumTableAction kind;
@property(nonatomic,assign)	int index;
@property(nonatomic,assign)	int section;
@property(nonatomic,assign)	int row;
@property(nonatomic,copy)	NSDictionary * sectionData;
@property(nonatomic,copy)	NSDictionary * rowData;
@property(nonatomic,copy)	NSArray * replacedData;
@property(nonatomic,copy)	NSURL * baseUrl;
@property(nonatomic,assign)	UITableViewRowAnimation animation;

- (void) getBaseUrl;
- (void) setAnimationDict: (NSDictionary *) animationDict;

@end



@interface TitaniumTableViewController : TitaniumContentViewController<UITableViewDelegate,UITableViewDataSource,UIWebViewDelegate> {
	UITableViewStyle tableStyle;
	CGFloat tableRowHeight;
//	BOOL	useRowHeightCallback;
	
	NSLock * sectionLock;
	NSMutableArray * sectionArray;
	NSString * callbackWindowToken;
	NSString * callbackProxyPath;

	NSIndexPath * blessedPath;
	UITableView * tableView;
	
	NSLock * actionLock;
	NSMutableArray * actionQueue;
}

- (void)enqueueAction: (TitaniumTableActionWrapper *) newAction;

@end
