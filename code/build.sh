#!/bin/sh
if [ "$1" = "build" ];then
    mkdir /home/changsheng/project/project94756/project
    cp -a /home/changsheng/project/project94756/server/. /home/changsheng/project/project94756/project/
    cd /home/changsheng/project/project94756/project
    rm -rf /home/changsheng/project/project94756/server
    echo "执行成功"
fi
