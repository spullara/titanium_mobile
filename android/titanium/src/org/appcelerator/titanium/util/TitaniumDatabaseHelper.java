/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

package org.appcelerator.titanium.util;

import org.appcelerator.titanium.config.TitaniumConfig;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteStatement;


public class TitaniumDatabaseHelper extends SQLiteOpenHelper
{
	private static final String LCAT = "TiDbHelper";
	@SuppressWarnings("unused")
	private static final boolean DBG = TitaniumConfig.LOGD;

	private static final String name = "Titanium";
	private static final int version = 1;

	public TitaniumDatabaseHelper(Context context)
	{
		super(context,name,null,version);
	}
	public void setPlatformParam (String key, String value)
	{
		String platformSQL = "insert into platform values (?,?)";
		SQLiteDatabase db = getWritableDatabase();
		try
		{
			SQLiteStatement platformInsertStatement = db.compileStatement(platformSQL);
			platformInsertStatement.bindString(1,key);
			platformInsertStatement.bindString(2,value);
			platformInsertStatement.executeInsert();
			platformInsertStatement.close();
		}
		finally
		{
			db.close();
		}
	}
	public String getPlatformParam (String key, String def)
	{
		String platformSQL = "select value from platform where name = ?";
		SQLiteDatabase db = getReadableDatabase();
		try
		{
			SQLiteStatement platformSelectStatement = db.compileStatement(platformSQL);
			platformSelectStatement.bindString(1,key);
			String result = platformSelectStatement.simpleQueryForString();
			platformSelectStatement.close();
			if (result == null)
			{
				return def;
			}
			return result;
		}
		catch (Exception e)
		{
			Log.e(LCAT, "Problem retrieving data from platform: ", e);
		}
		finally
		{
			db.close();
		}
		return def;
	}
	public void onCreate(SQLiteDatabase db)
	{
		String platformSQL = "create table platform(name TEXT,value TEXT)";
		db.execSQL(platformSQL);
	}
	public void onOpen(SQLiteDatabase db)
	{
	}
	public void onUpgrade(SQLiteDatabase db,int from,int to)
	{
	}
}