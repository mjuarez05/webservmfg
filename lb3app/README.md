# Api Configuration

# Setup

--nodejs 8.10 -> 12.15
--npm
--nvm

# Tools

server -> https://loopback.io/
client -> https://reactjs.org/
postgres -> sudo apt-get install postgres-10
pgadmin4 -> https://gist.github.com/Prototype-X/fd8bf6d8b929224621613316bf37db02

--Dump
sudo -u postgres pg_dump -U postgres MarfrigWebApp > MarfrigWebApp-29062018.sql

--Restore Dump
sudo psql -U postgres MarfrigWebApp < MarfrigWebApp-29062018.sql

otro test de git
--ENOSPC error on build react app

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# for deploy

env.json contain api URL
