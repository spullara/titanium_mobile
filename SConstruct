#!/usr/bin/env python
#
# Top level scons script
#
import os, shutil, platform, os.path as path
import package
import SCons.Variables
import SCons.Environment
from SCons.Script import *

# read version from the build folder
# this is used by other python scripts too
cwd = os.path.abspath(os.path.dirname(sys._getframe(0).f_code.co_filename))
sys.path.append(path.join(cwd,"build"))
import titanium_version
version = titanium_version.version

# allow it to be overriden on command line or in env
if os.environ.has_key('PRODUCT_VERSION'):
	version = os.environ['PRODUCT_VERSION']
elif ARGUMENTS.get('PRODUCT_VERSION', 0):
	version = ARGUMENTS.get('PRODUCT_VERSION')

# we clean at the top-level but do incremental at the specific folder level
if os.path.exists('iphone/build'):
	shutil.rmtree('iphone/build')

if os.path.exists('android/titanium/bin'):
	shutil.rmtree('android/titanium/bin')
	
#
# this is messy, but i don't care, scons makes it too
# hard to include python after an external SConscript
#

build_dirs = ['android/titanium']
if platform.system() == "Darwin":
	build_dirs.append('iphone')

flags = ''

if ARGUMENTS.get('COMPILER_FLAGS', 0):
	flags = ARGUMENTS.get('COMPILER_FLAGS')

for dir in build_dirs:
	d = os.getcwd()
	os.chdir(dir)
	try:
		os.system("scons PRODUCT_VERSION=%s COMPILER_FLAGS='%s'" % (version,flags))	
	finally:
		os.chdir(d)

package.Packager().build('dist',version)
