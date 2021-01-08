git add socket_network/*
git commit -m 'update socket server'
git subtree split --prefix socket_network --branch socket_network

#clear stuff
git checkout socket_network
#rm -r app/
#rm -r desktop-control

# push to github
git add *
git commit -m 'update server'
git push https://github.com/R4ph3rd/interactops.git socket_network
git checkout master