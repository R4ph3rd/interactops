git add socket_network
git commit -m 'update socket server'
git subtree split -P socket_network --b network

#clear stuff
git checkout socket_network
#rm -r app/
#rm -r desktop-control

# push to github
git add *
git commit -m 'update server'
git push https://github.com/R4ph3rd/interactops.git network
git checkout master