import os

os.system('docker-compose -f docker-compose.test.yml up --abort-on-container-exit ')
os.system('docker-compose -f docker-compose.test.yml down')
