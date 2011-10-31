#!/bin/sh
HOST=localhost
PORT=9110
PASSWORD=password
java -cp lib/union.jar:lib/mariner.jar net.user1.union.core.UnionMain $HOST $PORT $PASSWORD a5
