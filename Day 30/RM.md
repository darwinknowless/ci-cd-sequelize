1. AWS Console
CI/CD (di AWS EC2)
>> Click EC2
>> Change region to Singapore (Beside next right to your name)
>> Network & security >> Security groups 
>> create new
>> inbound SSH & HTTP >> source type: anywhere
>> outbond : all trafic 
>> create

instances (di AWS EC2)
>> launch instances
>> Choose amazon machine image
>> choose ubuntu (because we use ubuntu)
>> free, next, next
>> 8 Gb for storage, next
>> on configure security group, choose select,

2. Terminal Linux Ubuntu
run ke server
>> ssh -i DarwinAWS.pem ubuntu@13.212.230.191
server AWS = ubuntu@13.212.230.191
tampilan terminal di ubuntu = "ubuntu@ip-172-31-33-255"

install Gitlab Runner di server aws 
>> sudo curl -L --output /usr/local/bin/gitlab-runner "https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64"
>> sudo chmod +x /usr/local/bin/gitlab-runner
>> sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
>> sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
>> sudo gitlab-runner start

install nodejs (14 LTS) di server aws
>> curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
>> sudo apt-get install -y nodejs
cek 
>> node -v
>> npm -v

install nodejs modules to support the server running our project!
>> sudo npm install -g forever

make project directory in our server! Create this!
>> sudo mkdir -p /var/www/project-ci

And make gitlab-runner user has permission able to read/write/execute the folder!
>> sudo setfacl -m user:gitlab-runner:rwx /var/www/project-ci

3. VS Code
>> copy day 30
>> .gitignore
>> create .env.example

4. to gitlab.com
>> project yang di buat (Contoh: CI CD Day 30)
>> Setting => CI/CD => Runner(expand)

5. to Terminal (server AWS, jika logout masuk lagi)
>> sudo gitlab-runner register
Enter the GitLab instance URL:
-- Copy from Gitlab paste to TERMINAL
>> https://gitlab.com/
-- lalu /=> ENTER

Enter the registration token:
-- Copy from Gitlab paste to TERMINAL
>> XxtQCXs7VEB8-ibZBQAd
-- lalu /=> ENTER

Enter a description for the runner:
-- just ENTER
>> [ip-172-31-33-255]: 
-- lalu /=> ENTER

Enter tags for the runner (comma-separated):
-- Type like this
>> ci-cd-afternoon
-- lalu /=> ENTER

Registering runner... succeeded                     runner=XxtQCXs7
Enter an executor: custom, docker, parallels, kubernetes, docker-ssh, shell, ssh, virtualbox, docker+machine, docker-ssh+machine:
>> shell
-- lalu /=> ENTER

NOTE : on gitlab.com refresh on CI/CD => Runner
-- u'll see the ci-cd-afternoon become green

6. VS Code => package.json
>> paste this on "scripts"
below "test" & "dev"
"stop": "NODE_ENV=production forever stop index.js || true",
"start": "NODE_ENV=production forever start index.js"

7. to gitlab.com
>> project yang di buat (Contoh: CI CD Day 30)
>> Setting => CI/CD => variables (expand)
>> add variable
-- Var : 01 --
key : PROJECT_DIR
value : /var/www/project-ci
type : (leave it)
environment scope : (leave it)
flags : uncheck all
>> NOTE : value base on mkdir u made before

-- Var : 02 --
key : ENVIRONMENT_TEST_MONGO_URI
value : (copy paste .env.test mongo_uri here)
type : (leave it)
environment scope : (leave it)
flags : uncheck all

-- Var : 03 --
key : ENVIRONMENT_TEST_JWT_SECRET
value : (copy paste .env.test JWT_SECRET here)
type : (leave it)
environment scope : (leave it)
flags : uncheck all

-- Var : 04 --
key : ENVIRONMENT_PRODUCTION_MONGO_URI
value : (copy paste .env.test mongo_uri here)
>> change database name into penjualan_production
type : (leave it)
environment scope : (leave it)
flags : uncheck all

-- Var : 05 --
key : ENVIRONMENT_PRODUCTION_JWT_SECRET
value : (copy paste .env.test JWT_SECRET here)
type : (leave it)
environment scope : (leave it)
flags : uncheck all

7. on gitlab.com
>> go to ur project u create before
>> go to CI/CD => pipeline

8. Last
>> sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
