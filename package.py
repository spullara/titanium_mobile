#!/usr/bin/env python
#
# zip up the titanium mobile SDKs into suitable distribution formats
# 
import os, types, glob, shutil, sys, platform
import zipfile

cur_dir = os.path.abspath(os.path.dirname(sys._getframe(0).f_code.co_filename))
template_dir = os.path.join(cur_dir,'support')
all_dir = os.path.abspath(os.path.join(template_dir,'all'))
android_dir = os.path.abspath(os.path.join(template_dir,'android'))
iphone_dir = os.path.abspath(os.path.join(template_dir,'iphone'))
osx_dir = os.path.abspath(os.path.join(template_dir,'osx'))


def ignore(file):
    for f in ['.DS_Store','.git','.gitignore','libTitanium.a','titanium.jar']:
        if  file == f:
            return True
    return False 
        
def zip_it(dist_dir,osname,version):
    if not os.path.exists(dist_dir):
        os.makedirs(dist_dir)
    basepath = 'mobilesdk/%s/%s' % (osname,version)
    sdkzip = os.path.join(dist_dir,'mobilesdk-%s-%s.zip' % (version,osname))    
    zf = zipfile.ZipFile(sdkzip, 'w', zipfile.ZIP_DEFLATED)
    osdir = os.path.join(template_dir,osname)
    tiui = os.path.join(cur_dir,'tiui')
    for thedir in [all_dir,iphone_dir,android_dir,osdir,tiui]:
        for walk in os.walk(thedir):
            for file in walk[2]:
                file = os.path.join(walk[0], file)
                arcname = file.replace(thedir + os.sep, "")
                if ignore(arcname): continue
                e = os.path.splitext(file)
                if len(e)==2 and e[1]=='.pyc': continue
                if thedir != osdir and thedir != all_dir:
                    arcname = os.path.basename(thedir) + '/' + arcname
                zf.write(file, basepath + '/' + arcname)


    for f in os.listdir(template_dir):
        if ignore(f) or not os.path.isfile(os.path.join(template_dir,f)): continue
        e = os.path.splitext(f)
        if len(e)==2 and e[1]=='.pyc':continue
        zf.write(os.path.join(template_dir,f), basepath + '/' + f)
                

    android_jar = os.path.join(cur_dir,'android','titanium','bin','titanium.jar')
    zf.write(android_jar,'%s/android/titanium.jar' % basepath)
    
    if osname == "osx":
        sys.path.append(iphone_dir)
        import run,prereq
        
        #include our headers such that 3rd party modules can be compiled
        headers_dir=os.path.join(cur_dir,'iphone','Classes')
        for f in os.listdir(headers_dir):
            if os.path.isfile(os.path.join(headers_dir,f)) and os.path.splitext(f)[1]=='.h':
                zf.write(os.path.join(headers_dir,f),'%s/iphone/include/%s' % (basepath,f))
                
        for apiversion in prereq.get_sdks():
            iphone_lib = os.path.join(cur_dir,'iphone','build')
            for f in os.listdir(iphone_lib):
                v = "%s.a" % apiversion
                if os.path.isfile(os.path.join(iphone_lib,f)) and f.find(v)!=-1:
                    zf.write(os.path.join(iphone_lib,f),'%s/iphone/%s' % (basepath,f))
    zf.close()

class Packager(object):
    def __init__(self):
        pass

    def build(self,dist_dir,version):
        os_names = { "Windows":"win32", "Linux":"linux",  "Darwin":"osx" }
        zip_it(dist_dir,os_names[platform.system()], version)



