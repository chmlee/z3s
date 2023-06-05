npm run build
cd dist

echo 'z3s.chmlee.com' > CNAME

git add -A
git commit -m 'deploy'

git push origin dist
