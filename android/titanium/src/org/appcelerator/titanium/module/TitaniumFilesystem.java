/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

package org.appcelerator.titanium.module;

import java.io.File;
import java.io.IOException;

import org.appcelerator.titanium.TitaniumModuleManager;
import org.appcelerator.titanium.api.ITitaniumFile;
import org.appcelerator.titanium.api.ITitaniumFilesystem;
import org.appcelerator.titanium.api.ITitaniumInvoker;
import org.appcelerator.titanium.config.TitaniumConfig;
import org.appcelerator.titanium.module.fs.TitaniumFile;
import org.appcelerator.titanium.module.fs.TitaniumResourceFile;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TitaniumDelegate;
import org.appcelerator.titanium.util.TitaniumFileHelper;

import android.webkit.WebView;

class InternalFile {
	public File file;
	public String path;
	public InternalFile(File file, String path) {
		this.file = file;
		this.path = path;
	}
}

public class TitaniumFilesystem extends TitaniumBaseModule implements ITitaniumFilesystem
{
	private static final String LCAT = "TiFilesystem";
	private static final boolean DBG = TitaniumConfig.LOGD;

	public TitaniumFilesystem(TitaniumModuleManager moduleMgr, String name) {
		super(moduleMgr, name);
	}

	@Override
	public void register(WebView webView) {
		String name = getModuleName();
		if (DBG) {
			Log.d(LCAT, "Registering TitaniumFilesystem as " + name);
		}
		webView.addJavascriptInterface((ITitaniumFilesystem) this, name);
	}

	public ITitaniumFile createTempFile() throws IOException
	{
		File f = File.createTempFile("ti","tmp");
		return new TitaniumFile(f,f.getAbsolutePath(), false);
	}

	public ITitaniumFile createTempDirectory() throws IOException
	{
		String dir = String.valueOf(System.currentTimeMillis());
		File tmpdir = new File(System.getProperty("java.io.tmpdir"));
		File f = new File(tmpdir,dir);
		f.mkdirs();
		return new TitaniumFile(f,f.getAbsolutePath(), false);
	}

	private String formPath(String path, String parts[])
	{
		if (!path.endsWith("/") && parts.length > 1)
		{
			path+="/";
		}
		for (int c=1;c<parts.length;c++)
		{
			String part = parts[c];
			if (c+1<parts.length && !part.endsWith("/"))
			{
				path+="/";
			}
		}
		return path;
	}

	public boolean isExternalStoragePresent()
	{
		return android.os.Environment.getExternalStorageState().equals(android.os.Environment.MEDIA_MOUNTED);
	}

	private ITitaniumFile parseParts(String[] parts, boolean stream)
	{
		ITitaniumFile file = null;

		String initial = parts[0];
		if (DBG) {
			Log.d(LCAT,"creating initial: " + initial);
		}
		if (initial.startsWith("app://"))
		{
			String path = initial.substring(6);
			path = formPath(path,parts);
			file = new TitaniumResourceFile(this,getContext(),path);
		}
		else if (initial.startsWith("appdata://"))
		{
			String path = initial.substring(10);
			path = formPath(path,parts);
			if (path.charAt(0)=='/')
			{
				path = path.substring(1);
			}
			File f = new File(getDataDirectory(false),path);
			file = new TitaniumFile(f,"appdata://"+path, stream);
		}
		else if (initial.startsWith("appdata-private://"))
		{
			String path = initial.substring(18);
			path = formPath(path,parts);
			File f = new File(getDataDirectory(true),path);
			file = new TitaniumFile(f,"appdata-private://"+path, stream);
		}

		return file;
	}

	public ITitaniumFile getFile(String parts[]) throws IOException
	{
		if (parts==null)
		{
			throw new IOException("invalid file passed");
		}
		return parseParts(parts, false);
	}

	public ITitaniumInvoker getFileStream(String[] parts)  throws IOException
	{
		if (parts==null)
		{
			throw new IOException("invalid file passed");
		}
		return new TitaniumDelegate(parseParts(parts, true));
	}

	public ITitaniumFile getApplicationDirectory()
	{
		return null;
	}

	private File getDataDirectory (boolean privateStorage)
	{
		TitaniumFileHelper tfh = new TitaniumFileHelper(getContext());
		return tfh.getDataDirectory(privateStorage);
	}

	public ITitaniumFile getApplicationDataDirectory(boolean privateStorage)
	{
		if (privateStorage)
		{
			TitaniumFile f = new TitaniumFile(getDataDirectory(true),"appdata-private://", false);
			f.createDirectory(true);
			return f;
		}
		File f = getDataDirectory(false);
		return new TitaniumFile(f,"appdata://", false);
	}

	public ITitaniumFile getResourcesDirectory()
	{
		return null;
	}

	public ITitaniumFile getUserDirectory()
	{
		return null;
	}

	public void asyncCopy (String files[], String callback)
	{
	}
}