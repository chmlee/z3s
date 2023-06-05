npm run build
cd dist

echo 'z3s.chmlee.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f origin dist
